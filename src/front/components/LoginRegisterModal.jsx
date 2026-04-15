import React, { useState, useEffect } from "react";
import { registerUser, loginUser } from "../../Services/BackendServices.js";

export const LoginRegisterModal = ({ isOpen, onClose, initialTab = "login" }) => {
	const [activeTab, setActiveTab] = useState(initialTab);

	useEffect(() => {
		if (isOpen) {
			setActiveTab(initialTab);
		}
	}, [initialTab, isOpen]);

	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});

	const [registerData, setRegisterData] = useState({
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		image: ""
	});

	const [message, setMessage] = useState("");

	const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setLoginData({
			...loginData,
			[name]: value
		});
	};

	const handleRegisterChange = (event) => {
		const { name, value } = event.target;
		setRegisterData({
			...registerData,
			[name]: value
		});
	};

	const handleRegisterSubmit = async (event) => {
		event.preventDefault();

		const data = await registerUser(registerData);

		if (data.error) {
			setMessage("Error al registrarse");
			return;
		}

		setMessage("Usuario registrado correctamente");
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();

		const data = await loginUser(loginData);

		if (data?.error) {
			setMessage("Error al iniciar sesión");
			return;
		}

		setMessage("Inicio de sesión correcto");
	};

	if (!isOpen) return null;

	return (
		<>
			<div className="loginregister-overlay" onClick={onClose}></div>

			<div className="loginregister-modal">
				<button className="loginregister-close-btn" onClick={onClose}>
					×
				</button>

				<div className="loginregister-tabs">
					<button
						className={`loginregister-tab ${activeTab === "login" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("login");
							setMessage("");
						}}
					>
						Iniciar sesión
					</button>

					<button
						className={`loginregister-tab ${activeTab === "register" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("register");
							setMessage("");
						}}
					>
						Registrarse
					</button>
				</div>

				{activeTab === "login" ? (
					<form onSubmit={handleLoginSubmit}>
						<div className="mb-3">
							<label className="form-label">Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={loginData.email}
								onChange={handleLoginChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input
								type="password"
								className="form-control"
								name="password"
								value={loginData.password}
								onChange={handleLoginChange}
							/>
						</div>

						<button type="submit" className="btn btn-dark w-100">
							Entrar
						</button>
					</form>
				) : (
					<form onSubmit={handleRegisterSubmit}>
						<div className="mb-3">
							<label className="form-label">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								value={registerData.username}
								onChange={handleRegisterChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Nombre</label>
							<input
								type="text"
								className="form-control"
								name="firstname"
								value={registerData.firstname}
								onChange={handleRegisterChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Apellidos</label>
							<input
								type="text"
								className="form-control"
								name="lastname"
								value={registerData.lastname}
								onChange={handleRegisterChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={registerData.email}
								onChange={handleRegisterChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input
								type="password"
								className="form-control"
								name="password"
								value={registerData.password}
								onChange={handleRegisterChange}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Imagen</label>
							<input
								type="text"
								className="form-control"
								name="image"
								value={registerData.image}
								onChange={handleRegisterChange}
							/>
						</div>

						<button type="submit" className="btn btn-dark w-100">
							Crear cuenta
						</button>
					</form>
				)}

				{message && <p className="mt-3 text-center">{message}</p>}
			</div>
		</>
	);
};