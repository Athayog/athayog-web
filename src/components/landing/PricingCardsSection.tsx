import React from "react";
import Link from "next/link";
import styles from "@/components/landing/PricingCardsSection.module.css";

interface PricingCard {
	title: string;
	price: string;
	note?: string;
	ctaText: string;
	ctaHref: string;
	featured?: boolean;
}

interface PricingCardsSectionProps {
	title: string;
	pricingCards: PricingCard[];
	trustNote?: string;
	backgroundColor?: string;
}

export default function PricingCardsSection({
	title,
	pricingCards,
	trustNote,
	backgroundColor,
}: PricingCardsSectionProps) {
	return (
		<section
			className={styles.section}
			style={backgroundColor ? { background: backgroundColor } : undefined}
		>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.grid}>
					{pricingCards.map((card, i) => (
						<div
							key={i}
							className={`${styles.card} ${card.featured ? styles.featured : ""}`}
						>
							{card.featured && (
								<span className={styles.badge}>Best Value</span>
							)}
							<h3 className={styles.cardTitle}>{card.title}</h3>
							<div className={styles.price}>{card.price}</div>
							{card.note && <p className={styles.note}>{card.note}</p>}
							<Link
								href={card.ctaHref}
								className={`${styles.cta} ${
									card.featured ? styles.ctaFeatured : styles.ctaDefault
								}`}
							>
								{card.ctaText}
							</Link>
						</div>
					))}
				</div>
				{trustNote && <p className={styles.trustNote}>{trustNote}</p>}
			</div>
		</section>
	);
}
