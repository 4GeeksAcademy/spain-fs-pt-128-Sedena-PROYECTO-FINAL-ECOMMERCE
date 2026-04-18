import React, { useEffect, useState, useRef } from "react";
import { CardCamisetasMediana } from "../components/CardCamisetasMediana.jsx";
import { HeaderBody } from "../components/HeaderBody.jsx";
import { BannerSection } from "../components/BannerSection.jsx";
import { getShirts } from "../../Services/BackendServices.js";

export const Home = () => {
	const [shirts, setShirts] = useState([]);
	const productsRef = useRef(null);

	const loadShirts = async () => {
		const data = await getShirts();

		if (!data.error) {
			setShirts(data);
		}
	};

	useEffect(() => {
		loadShirts();
	}, []);

	const scrollToCollection = () => {
		if (productsRef.current) {
			productsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<HeaderBody onViewCollection={scrollToCollection} />

			<section ref={productsRef} className="products-section">
				<div className="products-header">
					<div>
						<p className="section-label">Colección</p>
						<h2 className="section-title">Nuestras camisetas</h2>
					</div>
				</div>

				<div className="products-grid">
					{shirts.map((shirt) => (
						<CardCamisetasMediana key={shirt.id} shirt={shirt} />
					))}
				</div>
			</section>

			<BannerSection />
		</>
	);
};