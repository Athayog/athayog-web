import { CheckCircle2 } from "lucide-react";
import styles from "@/components/landing/StudioLocationSection.module.css";

interface StudioLocationSectionProps {
	title: string;
	features: Array<{ id: string; text: string }>;
}

export default function StudioLocationSection({
	title,
	features,
}: StudioLocationSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.features}>
					{features.map((feature) => (
						<div key={feature.id} className={styles.feature}>
							<CheckCircle2 className={styles.icon} />
							<span>{feature.text}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
