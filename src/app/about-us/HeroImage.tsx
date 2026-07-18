"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AboutUs.module.css";

export default function HeroImage() {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className={`${styles.heroMedia} ${!loaded ? styles.shimmerBg : ""}`}
			aria-hidden="true"
		>
			<Image
				src="https://images.prismic.io/athayog/ZwkoDIF3NbkBXRga_2af795c9168f022b9c7d0a917fd08e4f.jpg?auto=format,compress&w=1000"
				alt="Yoga practice at Athayog Living, Indiranagar"
				width={1000}
				height={1250}
				priority
				onLoad={() => setLoaded(true)}
				style={{
					opacity: loaded ? 1 : 0,
					transition: "opacity 0.3s",
				}}
			/>
		</div>
	);
}
