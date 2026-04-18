import React, { useEffect, useState } from "react";
import { createCheckoutSession, getCartByUserId } from "../../Services/BackendServices.js";

export const CheckOut = () => {
	const [cart, setCart] = useState(null);

	const loadCart = async () => {
		const savedUser = JSON.parse(localStorage.getItem("user"));

		if (!savedUser) {
			setCart({ items: [] });
			return;
		}

		const data = await getCartByUserId(savedUser.id);

		if (!data.error) {
			setCart(data);
		}
	};

	useEffect(() => {
		loadCart();
	}, []);

	const handlePayment = async () => {
		const savedUser = JSON.parse(localStorage.getItem("user"));

		if (!savedUser) {
			return;
		}

		const data = await createCheckoutSession(savedUser.id);

		if (data.error || !data.url) {
			alert("No se pudo iniciar el pago");
			return;
		}

		window.location.href = data.url;
	};

	const total =
		cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

	return (
		<section className="CheckOut-page">
			<div className="CheckOut-wrapper">
				<div className="CheckOut-left">
					<p className="CheckOut-tag">Finalizar compra</p>
					<h1 className="CheckOut-title">Resumen del pedido</h1>
					<p className="CheckOut-description">
						Revisa tu pedido antes de completar la compra.
					</p>

					<div className="CheckOut-items">
						{cart && cart.items.length > 0 ? (
							cart.items.map((item) => (
								<div key={item.id} className="CheckOut-item">
									<img
										src={item.image || "https://i.pravatar.cc/200?img=18"}
										alt={item.shirt_name}
										className="CheckOut-item-image"
									/>

									<div className="CheckOut-item-info">
										<h4>{item.shirt_name}</h4>
										<p>Talla: {item.size}</p>
										<p>Cantidad: {item.quantity}</p>
										<p>{item.price}€</p>
									</div>
								</div>
							))
						) : (
							<p className="CheckOut-empty">Tu carrito está vacío.</p>
						)}
					</div>
				</div>

				<div className="CheckOut-right">
					<div className="CheckOut-summary-card">
						<p className="CheckOut-summary-label">Total</p>
						<h2 className="CheckOut-total">{total}€</h2>

						<p className="CheckOut-note">
							Serás redirigido a Stripe para completar el pago.
						</p>

						<button
							className="CheckOut-pay-btn"
							onClick={handlePayment}
							disabled={!cart || cart.items.length === 0}
						>
							Pagar pedido
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};