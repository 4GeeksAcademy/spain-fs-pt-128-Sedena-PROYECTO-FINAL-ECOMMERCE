"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Shirt, Cart, CartItem, ShirtVariant
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/shirts", methods=["GET"])
def get_shirts():
    shirts = Shirt.query.all()
    return jsonify([shirt.serialize() for shirt in shirts]), 200


@api.route("/shirts/<int:shirt_id>", methods=["GET"])
def get_shirt(shirt_id):
    shirt = Shirt.query.get(shirt_id)

    if shirt:
         return jsonify(shirt.serialize()), 200
        
    return jsonify({"error": "Shirt not found"}), 404


@api.route("/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):
    cart = Cart.query.filter_by(user_id=user_id).first()

    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    return jsonify(cart.serialize()), 200

@api.route("/cart/items", methods=["POST"])
def add_to_cart():
    body = request.json

    user_id = body.get("user_id")
    variant_id = body.get("shirt_variant_id")
    quantity = body.get("quantity", 1)

    cart = Cart.query.filter_by(user_id=user_id).first()

    # si no tiene carrito → lo creamos
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()

    # comprobar si ya existe ese producto en el carrito
    existing_item = CartItem.query.filter_by(
        cart_id=cart.id,
        shirt_variant_id=variant_id
    ).first()

    if existing_item:
        existing_item.quantity += quantity
    else:
        new_item = CartItem(
            cart_id=cart.id,
            shirt_variant_id=variant_id,
            quantity=quantity
        )
        db.session.add(new_item)

    db.session.commit()

    return jsonify({"message": "Item added to cart"}), 200


@api.route("/cart/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    item = CartItem.query.get(item_id)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted"}), 200