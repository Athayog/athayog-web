import Image from "next/image";
import Link from "next/link";
import styles from "@/components/landing/AerialHeroSection.module.css";

interface AerialHeroProps {
	h1: string;
	subheadline: string;
	trustPoints: string[];
	primaryCTA: { text: string; href: string };
	secondaryCTA?: { text: string; href: string };
	tertiaryCTA?: { text: string; href: string };
	backgroundImage: string;
}

export default function AerialHeroSection({
	h1,
	subheadline,
	trustPoints,
	primaryCTA,
	secondaryCTA,
	tertiaryCTA,
	backgroundImage,
}: AerialHeroProps) {
	return (
		<section className={styles.hero}>
			<Image
				src={backgroundImage}
				alt=""
				fill
				style={{ objectFit: "cover" }}
				priority
			/>
			<div className={styles.overlay} />
			<div className={styles.content}>
				<h1 className={styles.h1}>{h1}</h1>
				<p className={styles.subheadline}>{subheadline}</p>
				{trustPoints.length > 0 && (
					<div className={styles.trustPoints}>
						{trustPoints.map((point) => (
							<span key={point} className={styles.pill}>
								{point}
							</span>
						))}
					</div>
				)}
				<div className={styles.ctas}>
					<Link href={primaryCTA.href} className={styles.btnPrimary}>
						{primaryCTA.text}
					</Link>
					{secondaryCTA && (
						<Link href={secondaryCTA.href} className={styles.btnOutline}>
							{secondaryCTA.text}
						</Link>
					)}
					{tertiaryCTA && (
						<Link href={tertiaryCTA.href} className={styles.btnOutline}>
							{tertiaryCTA.text}
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
