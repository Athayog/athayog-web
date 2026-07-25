import { CheckCircle2 } from "lucide-react";
import styles from "@/components/landing/OptionsShowcaseSection.module.css";

interface OptionItem {
	id: string;
	text: string;
}

interface Option {
	title: string;
	items: OptionItem[];
}

interface OptionsShowcaseProps {
	mainTitle: string;
	options: Option[];
}

export default function OptionsShowcaseSection({
	mainTitle,
	options,
}: OptionsShowcaseProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{mainTitle}</h2>
				<div className={styles.grid}>
					{options.map((option) => (
						<div key={option.title} className={styles.card}>
							<h3 className={styles.cardTitle}>{option.title}</h3>
							<ul className={styles.list}>
								{option.items.map((item) => (
									<li key={item.id} className={styles.listItem}>
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
					))}
				</div>
			</div>
		</section>
	);
}
