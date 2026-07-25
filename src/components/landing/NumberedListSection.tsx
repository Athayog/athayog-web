import React from "react";
import styles from "@/components/landing/NumberedListSection.module.css";

interface NumberedItem {
	id: string;
	text: string;
}

interface NumberedListSectionProps {
	title: string;
	subtitle?: string;
	items: NumberedItem[];
	variant?: "default" | "timeline" | "minimal" | "bold";
	backgroundColor?: string;
}

export default function NumberedListSection({
	title,
	subtitle,
	items,
	variant = "default",
	backgroundColor,
}: NumberedListSectionProps) {
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
				<ol
					className={`${styles.list} ${styles[variant]} ${
						variant === "timeline" ? styles.timelineLine : ""
					}`}
				>
					{items.map((item, i) => (
						<li key={item.id} className={styles.item}>
							<span className={styles.number}>{i + 1}</span>
							<span className={styles.text}>{item.text}</span>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
