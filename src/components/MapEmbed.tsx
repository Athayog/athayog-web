"use client";

import { useState, useSyncExternalStore } from "react";
import { hasFunctionalConsent, onConsentChange } from "@/lib/consent";
import styles from "@/components/MapEmbed.module.css";

interface MapEmbedProps {
	src: string;
	title: string;
	className?: string;
}

export default function MapEmbed({ src, title, className }: MapEmbedProps) {
	const consented = useSyncExternalStore(
		onConsentChange,
		hasFunctionalConsent,
		() => false,
	);
	const [loaded, setLoaded] = useState(false);

	if (!consented) {
		return (
			<div className={`${styles.placeholder} ${className || ""}`}>
				<p className={styles.placeholderText}>{title || "Google Maps embed"}</p>
				<p className={styles.placeholderHint}>
					Enable functional cookies in the banner below to load this map.
				</p>
			</div>
		);
	}

	return (
		<div className={`${styles.wrap} ${className || ""}`}>
			{!loaded && <div className={styles.skeleton} />}
			<iframe
				src={src}
				title={title}
				width="100%"
				height="100%"
				style={{
					border: 0,
					opacity: loaded ? 1 : 0,
					transition: "opacity 0.3s ease",
				}}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
}
