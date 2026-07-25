import React from "react";
import Link from "next/link";
import styles from "@/components/landing/TestimonialCTASection.module.css";

interface Testimonial {
	id: string;
	text: string;
}

interface TestimonialCTASectionProps {
	ctaButtonText: string;
	ctaButtonHref: string;
	sectionTitle?: string;
	testimonials: Testimonial[];
	finalText?: string;
}

export default function TestimonialCTASection({
	ctaButtonText,
	ctaButtonHref,
	sectionTitle,
	testimonials,
	finalText,
}: TestimonialCTASectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.ctaArea}>
					<Link href={ctaButtonHref} className={styles.ctaButton}>
						{ctaButtonText}
					</Link>
				</div>
				{sectionTitle && <h2 className={styles.sectionTitle}>{sectionTitle}</h2>}
				<div className={styles.grid}>
					{testimonials.map((t) => (
						<div key={t.id} className={styles.card}>
							<span className={styles.quoteOpen} aria-hidden="true">
								&ldquo;
							</span>
							<p className={styles.quoteText}>{t.text}</p>
						</div>
					))}
				</div>
				{finalText && <p className={styles.finalText}>{finalText}</p>}
			</div>
		</section>
	);
}
