import React from "react";
import styles from "@/components/landing/FeatureSection.module.css";

interface Feature {
	icon: React.ReactNode;
	title: string;
}

interface FeatureSectionProps {
	title: string;
	description?: string;
	features: Feature[];
}

export default function FeatureSection({
	title,
	description,
	features,
}: FeatureSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2 className={styles.title}>{title}</h2>
					{description && <p className={styles.desc}>{description}</p>}
				</div>
				<div className={styles.grid}>
					{features.map((feature, i) => (
						<div key={i} className={styles.card}>
							<div className={styles.icon}>{feature.icon}</div>
							<span className={styles.cardTitle}>{feature.title}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
