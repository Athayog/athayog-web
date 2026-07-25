import React from "react";
import styles from "@/components/landing/IconBenefitsSection.module.css";

interface Benefit {
	id: string;
	icon: React.ReactNode;
	title: string;
	description: string;
}

interface IconBenefitsSectionProps {
	title: string;
	subtitle?: string;
	benefits: Benefit[];
	backgroundColor?: string;
}

export default function IconBenefitsSection({
	title,
	subtitle,
	benefits,
	backgroundColor,
}: IconBenefitsSectionProps) {
	return (
		<section
			className={styles.section}
			style={backgroundColor ? { background: backgroundColor } : undefined}
		>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2 className={styles.title}>{title}</h2>
					{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
				</div>
				<div className={styles.grid}>
					{benefits.map((benefit) => (
						<div key={benefit.id} className={styles.card}>
							<div className={styles.iconCircle}>{benefit.icon}</div>
							<h3 className={styles.cardTitle}>{benefit.title}</h3>
							<p className={styles.cardDesc}>{benefit.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
