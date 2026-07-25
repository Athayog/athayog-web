import Link from "next/link";
import styles from "@/components/landing/ClassOverviewSection.module.css";

interface SectionItem {
	id: string;
	text: string;
}

interface Section {
	title: string;
	subtitle?: string;
	items: SectionItem[];
	note?: string;
}

interface ClassOverviewProps {
	mainTitle: string;
	highlights: string[];
	sections: Section[];
	ctaText: string;
	ctaHref: string;
}

export default function ClassOverviewSection({
	mainTitle,
	highlights,
	sections,
	ctaText,
	ctaHref,
}: ClassOverviewProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<h2 className={styles.heading}>{mainTitle}</h2>
				{highlights.length > 0 && (
					<div className={styles.pills}>
						{highlights.map((h) => (
							<span key={h} className={styles.pill}>
								{h}
							</span>
						))}
					</div>
				)}
				<div className={styles.sections}>
					{sections.map((sec) => (
						<div key={sec.title} className={styles.block}>
							<h3 className={styles.blockTitle}>{sec.title}</h3>
							{sec.subtitle && (
								<p className={styles.blockSubtitle}>{sec.subtitle}</p>
							)}
							<ul className={styles.itemList}>
								{sec.items.map((item, idx) => (
									<li key={item.id} className={styles.item}>
										<span className={styles.number}>{idx + 1}</span>
										{item.text}
									</li>
								))}
							</ul>
							{sec.note && <p className={styles.note}>{sec.note}</p>}
						</div>
					))}
				</div>
				<Link href={ctaHref} className={styles.btnPrimary}>
					{ctaText}
				</Link>
			</div>
		</section>
	);
}
