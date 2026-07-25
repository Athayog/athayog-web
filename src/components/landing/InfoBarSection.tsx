import styles from "@/components/landing/InfoBarSection.module.css";

interface InfoBarSectionProps {
	items: Array<{ label: string; value: string }>;
}

export default function InfoBarSection({ items }: InfoBarSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.grid}>
				{items.map((item) => (
					<div key={item.label} className={styles.item}>
						<div className={styles.label}>{item.label}</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
		</section>
	);
}
