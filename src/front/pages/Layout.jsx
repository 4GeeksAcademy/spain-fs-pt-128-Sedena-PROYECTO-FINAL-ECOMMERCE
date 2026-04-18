import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { LoginRegisterModal } from "../components/LoginRegisterModal.jsx";
import { CartModal } from "../components/CartModal.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Footer } from "../components/Footer.jsx";

export const Layout = () => {
	const { dispatch } = useGlobalReducer();

	const [isLoginRegisterOpen, setLoginRegisterOpen] = useState(false);
	const [loginregisterTab, setLoginRegisterTab] = useState("login");
	const [isCartOpen, setIsCartOpen] = useState(false);

	useEffect(() => {
		const savedUser = localStorage.getItem("user");

		if (savedUser) {
			dispatch({
				type: "set_user",
				payload: JSON.parse(savedUser)
			});
		}
	}, [dispatch]);

	const openLogin = () => {
		setLoginRegisterTab("login");
		setLoginRegisterOpen(true);
	};

	const openRegister = () => {
		setLoginRegisterTab("register");
		setLoginRegisterOpen(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		dispatch({
			type: "set_user",
			payload: null
		});
	};

	return (
	<div className="site-shell">
		<Navbar
			onOpenLogin={openLogin}
			onOpenRegister={openRegister}
			onOpenCart={() => setIsCartOpen(true)}
			onLogout={handleLogout}
		/>

		<main className="site-main">
			<Outlet />
		</main>

		<Footer
			onOpenLogin={openLogin}
			onOpenRegister={openRegister}
		/>

		<LoginRegisterModal
			isOpen={isLoginRegisterOpen}
			onClose={() => setLoginRegisterOpen(false)}
			initialTab={loginregisterTab}
		/>

		<CartModal
			isOpen={isCartOpen}
			onClose={() => setIsCartOpen(false)}
		/>
	</div>
);
};