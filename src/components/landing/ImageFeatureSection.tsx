import Image from "next/image";
import Link from "next/link";
import styles from "@/components/landing/ImageFeatureSection.module.css";

interface Feature {
	icon: React.ReactNode;
	text: string;
}

interface ImageFeatureProps {
	title: string;
	description?: string;
	image: string;
	imageAlt: string;
	features: Feature[];
	ctaText?: string;
	ctaHref?: string;
	reverseLayout?: boolean;
}

export default function ImageFeatureSection({
	title,
	description,
	image,
	imageAlt,
	features,
	ctaText,
	ctaHref,
	reverseLayout = false,
}: ImageFeatureProps) {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<div
					className={`${styles.mediaCol} ${reverseLayout ? styles.order2 : ""}`}
				>
					<Image
						src={image}
						alt={imageAlt}
						width={500}
						height={400}
						className={styles.image}
					/>
				</div>
				<div
					className={`${styles.contentCol} ${reverseLayout ? styles.order1 : ""}`}
				>
					<h2 className={styles.title}>{title}</h2>
					{description && <p className={styles.description}>{description}</p>}
					<ul className={styles.featureList}>
						{features.map((feat) => (
							<li key={feat.text} className={styles.featureItem}>
								<span className={styles.featureIcon}>{feat.icon}</span>
								<span>{feat.text}</span>
							</li>
						))}
					</ul>
					{ctaText && ctaHref && (
						<Link href={ctaHref} className={styles.btnPrimary}>
							{ctaText}
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
