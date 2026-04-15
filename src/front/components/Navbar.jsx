import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ onOpenLogin, onOpenRegister, onOpenCart, loggedUser, onLogout }) => {
	return (
		<nav className="navbar navbar-expand-lg bg-light px-4 py-3 border-bottom">
			<div className="container-fluid">
				<Link className="navbar-brand fw-bold" to="/">
					MARCA
				</Link>

				<div className="d-flex gap-2 align-items-center">
					{loggedUser ? (
						<>
							<Link className="btn btn-outline-dark" to={`/profile/${loggedUser.id}`}>
								Mi perfil
							</Link>
							<button className="btn btn-dark" onClick={onLogout}>
								Cerrar sesión
							</button>
						</>
					) : (
						<>
							<button className="btn btn-outline-dark" onClick={onOpenLogin}>
								Iniciar sesión
							</button>

							<button className="btn btn-dark" onClick={onOpenRegister}>
								Registrarse
							</button>
						</>
					)}

					<button className="btn btn-secondary" onClick={onOpenCart}>
						Carrito
					</button>
				</div>
			</div>
		</nav>
	);
};