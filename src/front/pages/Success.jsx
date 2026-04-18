import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartByUserId, deleteCartItem } from "../../Services/BackendServices.js";

export const Success = () => {
	const [isCleaningCart, setIsCleaningCart] = useState(true);

	const clearCart = async () => {
		const savedUser = JSON.parse(localStorage.getItem("user"));

		if (!savedUser) {
			setIsCleaningCart(false);
			return;
		}

		const cartData = await getCartByUserId(savedUser.id);

		if (!cartData.error && cartData.items?.length > 0) {
			for (const item of cartData.items) {
				await deleteCartItem(item.id);
			}
		}

		setIsCleaningCart(false);
	};

	useEffect(() => {
		clearCart();
	}, []);

	return (
		<section className="success-page">
			<div className="success-card">
				<p className="success-tag">Pedido completado</p>
				<h1 className="success-title">Compra realizada con éxito</h1>
				<p className="success-description">
					{isCleaningCart
						? "Finalizando tu pedido..."
						: "Tu pedido se ha procesado correctamente. Gracias por confiar en la marca."}
				</p>

				{!isCleaningCart && (
					<Link to="/" className="success-btn">
						Volver a la tienda
					</Link>
				)}
			</div>
		</section>
	);
};