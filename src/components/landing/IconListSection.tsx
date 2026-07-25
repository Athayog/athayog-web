import styles from "@/components/landing/IconListSection.module.css";

interface IconListSectionProps {
	title: string;
	description?: string;
	items: Array<{ id: string; text: string }>;
}

export default function IconListSection({
	title,
	description,
	items,
}: IconListSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{title}</h2>
				{description && <p className={styles.description}>{description}</p>}
				<div className={styles.items}>
					{items.map((item, index) => (
						<div key={item.id} className={styles.item}>
							<span className={styles.number}>{index + 1}</span>
							<span className={styles.text}>{item.text}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
