import { Link } from "react-router-dom";
import React from "react";

export const Navbar = ({ onOpenLogin, onOpenRegister, onOpenCart }) => {
	return (
		<nav className="navbar navbar-expand-lg bg-light px-4 py-3 border-bottom">
			<div className="container-fluid">
				<a className="navbar-brand fw-bold" href="/">
					MARCA
				</a>

				<div className="d-flex gap-2">
					<button className="btn btn-outline-dark" onClick={onOpenLogin}>
						Iniciar sesión
					</button>

					<button className="btn btn-dark" onClick={onOpenRegister}>
						Registrarse
					</button>

					<button className="btn btn-secondary" onClick={onOpenCart}>
						Carrito
					</button>
				</div>
			</div>
		</nav>
	);
};