import { Phone, MessageCircle } from "lucide-react";
import styles from "@/components/landing/FAQCTASection.module.css";

interface FAQ {
	id: string;
	question: string;
	answer: string;
}

interface FAQCTAProps {
	sectionTitle?: string;
	faqs: FAQ[];
	subtext: string;
	primaryCtaText: string;
	secondaryCtaText: string;
	onPrimaryCtaClick: () => void;
	onSecondaryCtaClick: () => void;
}

export default function FAQCTASection({
	sectionTitle,
	faqs,
	subtext,
	primaryCtaText,
	secondaryCtaText,
	onPrimaryCtaClick,
	onSecondaryCtaClick,
}: FAQCTAProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<div className={styles.faqCol}>
					{sectionTitle && <h2 className={styles.heading}>{sectionTitle}</h2>}
					<div className={styles.faqList}>
						{faqs.map((faq) => (
							<details key={faq.id} className={styles.details}>
								<summary className={styles.summary}>
									{faq.question}
								</summary>
								<div className={styles.answer}>{faq.answer}</div>
							</details>
						))}
					</div>
				</div>
				<div className={styles.ctaCol}>
					<p className={styles.subtext}>{subtext}</p>
					<button
						type="button"
						onClick={onPrimaryCtaClick}
						className={styles.btnPrimary}
					>
						<Phone size={18} />
						{primaryCtaText}
					</button>
					<button
						type="button"
						onClick={onSecondaryCtaClick}
						className={styles.btnOutline}
					>
						<MessageCircle size={18} />
						{secondaryCtaText}
					</button>
				</div>
			</div>
		</section>
	);
}
