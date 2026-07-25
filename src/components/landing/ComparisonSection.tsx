import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import styles from "@/components/landing/ComparisonSection.module.css";

interface ComparisonItem {
	id: string;
	text: string;
}

interface ComparisonColumn {
	title: string;
	items: ComparisonItem[];
}

interface ComparisonSectionProps {
	mainTitle: string;
	subtitle?: string;
	leftColumn: ComparisonColumn;
	rightColumn: ComparisonColumn;
}

export default function ComparisonSection({
	mainTitle,
	subtitle,
	leftColumn,
	rightColumn,
}: ComparisonSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<h2 className={styles.mainTitle}>{mainTitle}</h2>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
				<div className={styles.grid}>
					<div className={`${styles.column} ${styles.leftCol}`}>
						<div className={styles.colHeader}>
							<h3 className={styles.colTitle}>{leftColumn.title}</h3>
						</div>
						<ul className={styles.list}>
							{leftColumn.items.map((item) => (
								<li key={item.id} className={styles.listItem}>
									<XCircle
										className={styles.xIcon}
										size={18}
										aria-hidden="true"
									/>
									<span>{item.text}</span>
								</li>
							))}
						</ul>
					</div>
					<div className={`${styles.column} ${styles.rightCol}`}>
						<div className={styles.colHeader}>
							<span className={styles.recommended}>Recommended</span>
							<h3 className={styles.colTitleLight}>{rightColumn.title}</h3>
						</div>
						<ul className={styles.list}>
							{rightColumn.items.map((item) => (
								<li key={item.id} className={styles.listItemLight}>
									<CheckCircle2
										className={styles.checkIcon}
										size={18}
										aria-hidden="true"
									/>
									<span>{item.text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
