import Image from "next/image";
import styles from "@/components/landing/LearningAreasSection.module.css";

interface LearningArea {
	id: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
}

interface LearningAreasProps {
	title: string;
	subtitle?: string;
	layout: "grid" | "list";
	learningAreas: LearningArea[];
}

function GridCard({ area }: { area: LearningArea }) {
	return (
		<div className={styles.gridCard}>
			<Image
				src={area.image}
				alt={area.imageAlt}
				fill
				style={{ objectFit: "cover" }}
			/>
			<div className={styles.gridOverlay}>
				<h3 className={styles.cardTitle}>{area.title}</h3>
				<p className={styles.cardDescription}>{area.description}</p>
			</div>
		</div>
	);
}

function ListCard({ area }: { area: LearningArea }) {
	return (
		<div className={styles.listCard}>
			<div className={styles.listImage}>
				<Image
					src={area.image}
					alt={area.imageAlt}
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={styles.listContent}>
				<h3 className={styles.cardTitle}>{area.title}</h3>
				<p className={styles.cardDescription}>{area.description}</p>
			</div>
		</div>
	);
}

export default function LearningAreasSection({
	title,
	subtitle,
	layout,
	learningAreas,
}: LearningAreasProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<h2 className={styles.heading}>{title}</h2>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
				<div
					className={layout === "grid" ? styles.gridLayout : styles.listLayout}
				>
					{learningAreas.map((area) =>
						layout === "grid" ? (
							<GridCard key={area.id} area={area} />
						) : (
							<ListCard key={area.id} area={area} />
						),
					)}
				</div>
			</div>
		</section>
	);
}
