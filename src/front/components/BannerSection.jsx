import React from "react";

export const BannerSection = () => {
	return (
		<section className="banner-section-pro">
			<div className="banner-text-pro">
				<p className="section-label">Filosofía</p>
				<h2 className="banner-title-pro">
					Moda que<br />
					tiene <em>sentido</em>
				</h2>
				<p className="banner-body-pro">
					Cada pieza se diseña pensando en su durabilidad. Apostamos por una
					estética limpia, intencional y con personalidad. Compra menos, elige mejor.
				</p>
				<button className="brand-btn-primary">Conoce más</button>
			</div>

			

			<div className="banner-images-pro">
				<div className="banner-image-box-pro"></div>
				<div className="banner-image-box-pro second"></div>
			</div>
		</section>
	);
};