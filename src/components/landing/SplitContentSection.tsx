import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import styles from "@/components/landing/SplitContentSection.module.css";

interface SplitItem {
	id: string;
	text: string;
}

interface SplitContentSectionProps {
	title: string;
	titleImage?: string;
	titleImageAlt?: string;
	items: SplitItem[];
	backgroundColor?: string;
}

export default function SplitContentSection({
	title,
	titleImage,
	titleImageAlt,
	items,
	backgroundColor,
}: SplitContentSectionProps) {
	return (
		<section
			className={styles.section}
			style={backgroundColor ? { background: backgroundColor } : undefined}
		>
			<div className={styles.wrapper}>
				<div className={styles.layout}>
					<div className={styles.left}>
						{titleImage ? (
							<div className={styles.imageBlock}>
								<Image
									src={titleImage}
									alt={titleImageAlt || title}
									fill
									className={styles.image}
									sizes="(max-width: 960px) 100vw, 42vw"
								/>
								<div className={styles.overlay} />
								<h2 className={styles.imageTitle}>{title}</h2>
							</div>
						) : (
							<h2 className={styles.title}>{title}</h2>
						)}
					</div>
					<div className={styles.right}>
						<ul className={styles.list}>
							{items.map((item) => (
								<li key={item.id} className={styles.listItem}>
									<CheckCircle2
										className={styles.checkIcon}
										size={20}
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
