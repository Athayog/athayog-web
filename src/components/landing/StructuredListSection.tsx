import styles from "@/components/landing/StructuredListSection.module.css";

interface StructuredListSectionProps {
	title: string;
	items: Array<{
		id: string;
		icon: React.ReactNode;
		title: string;
		description: string;
	}>;
}

export default function StructuredListSection({
	title,
	items,
}: StructuredListSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.grid}>
					{items.map((item) => (
						<div key={item.id} className={styles.card}>
							<div className={styles.iconCircle}>{item.icon}</div>
							<h3 className={styles.cardTitle}>{item.title}</h3>
							<p className={styles.cardDescription}>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
