
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { LoginRegisterModal } from "../components/LoginRegisterModal.jsx";
import { CartModal } from "../components/CartModal.jsx";

export const Layout = () => {
	const [isloginregisterOpen, setLoginRegisterOpen] = useState(false);
	const [loginregisterTab, setLoginRegisterTab] = useState("login");
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [loggedUser, setLoggedUser] = useState(null);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");

		if (savedUser) {
			setLoggedUser(JSON.parse(savedUser));
		}
	}, []);

	const openLogin = () => {
		setLoginRegisterTab("login");
		setLoginRegisterOpen(true);
	};

	const openRegister = () => {
		setLoginRegisterTab("register");
		setLoginRegisterOpen(true);
	};

	const handleLogin = (user) => {
	setLoggedUser(user);
};

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedUser(null);
	};

	return (
		<>
			<Navbar
				onOpenLogin={openLogin}
				onOpenRegister={openRegister}
				onOpenCart={() => setIsCartOpen(true)}
				loggedUser={loggedUser}
				onLogout={handleLogout}/>

			<Outlet />

			<LoginRegisterModal
				isOpen={isloginregisterOpen}
				onClose={() => setLoginRegisterOpen(false)}
				initialTab={loginregisterTab}
				onLogin={handleLogin} />

			<CartModal
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)} />
		</>
	);
};