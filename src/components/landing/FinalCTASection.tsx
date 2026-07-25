import Link from "next/link";
import styles from "@/components/landing/FinalCTASection.module.css";

interface FinalCTASectionProps {
	title: string;
	primaryCTA: { text: string; href: string };
	secondaryCTA?: { text: string; href: string };
	tertiaryCTA?: { text: string; href: string };
}

export default function FinalCTASection({
	title,
	primaryCTA,
	secondaryCTA,
	tertiaryCTA,
}: FinalCTASectionProps) {
	return (
		<section className={styles.section}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.actions}>
				<Link href={primaryCTA.href} className={styles.primary}>
					{primaryCTA.text}
				</Link>
				{secondaryCTA && (
					<Link href={secondaryCTA.href} className={styles.secondary}>
						{secondaryCTA.text}
					</Link>
				)}
				{tertiaryCTA && (
					<Link href={tertiaryCTA.href} className={styles.tertiary}>
						{tertiaryCTA.text}
					</Link>
				)}
			</div>
		</section>
	);
}
