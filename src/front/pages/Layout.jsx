import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { LoginRegisterModal } from "../components/LoginRegisterModal.jsx";
import { CartModal } from "../components/CartModal.jsx";
import ScrollToTop from "../components/ScrollToTop"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.

export const Layout = () => {
	const [isloginregisterOpen, setIsLoginRegisterOpen] = useState(false);
	const [loginregisterTab, setLoginRegisterTab] = useState("login");
	const [isCartOpen, setIsCartOpen] = useState(false);

	const openLogin = () => {
		setLoginRegisterTab("login");
		setIsLoginRegisterOpen(true);
	};

	const openRegister = () => {
		setLoginRegisterTab("register");
		setIsLoginRegisterOpen(true);
	};

	return (
		<>
			<Navbar
				onOpenLogin={openLogin}
				onOpenRegister={openRegister}
				onOpenCart={() => setIsCartOpen(true)}
			/>

			<Outlet />

			<LoginRegisterModal
				isOpen={isloginregisterOpen}
				onClose={() => setIsLoginRegisterOpen(false)}
				initialTab={loginregisterTab}
			/>

			<CartModal
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
			/>
		</>
	);
};