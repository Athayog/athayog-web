import Image from "next/image";
import styles from "@/components/landing/BentoGridSection.module.css";

interface BentoCard {
	id: string;
	type:
		| "title"
		| "icon"
		| "image"
		| "text"
		| "icon-text"
		| "image-text"
		| "text-image-side";
	title?: string;
	icon?: React.ReactNode;
	image?: string;
	imageAlt?: string;
	text?: string;
	imagePosition?: "left" | "right";
	featured?: boolean;
	gridSize?: { xs?: number; sm?: number; md?: number; lg?: number };
}

interface BentoGridProps {
	autoLayout?: boolean;
	cards: BentoCard[];
}

function BentoCardItem({ card, autoLayout }: { card: BentoCard; autoLayout: boolean }) {
	const spanStyle: React.CSSProperties = {};
	if (!autoLayout && card.gridSize) {
		if (card.gridSize.xs) spanStyle.gridColumn = `span ${card.gridSize.xs}`;
	}

	const classNames = [
		styles.card,
		card.featured ? styles.featured : "",
		!autoLayout && card.gridSize?.sm ? styles[`sm${card.gridSize.sm}`] : "",
		!autoLayout && card.gridSize?.md ? styles[`md${card.gridSize.md}`] : "",
		!autoLayout && card.gridSize?.lg ? styles[`lg${card.gridSize.lg}`] : "",
	]
		.filter(Boolean)
		.join(" ");

	switch (card.type) {
		case "title":
			return (
				<div className={`${classNames} ${styles.cardTitle}`} style={spanStyle}>
					<h3 className={styles.titleText}>{card.title}</h3>
				</div>
			);

		case "icon":
			return (
				<div className={`${classNames} ${styles.cardIcon}`} style={spanStyle}>
					<div className={styles.iconWrap}>{card.icon}</div>
					{card.text && <p className={styles.cardText}>{card.text}</p>}
				</div>
			);

		case "image":
			return (
				<div className={`${classNames} ${styles.cardImage}`} style={spanStyle}>
					{card.image && (
						<Image
							src={card.image}
							alt={card.imageAlt || ""}
							fill
							style={{ objectFit: "cover" }}
						/>
					)}
				</div>
			);

		case "text":
			return (
				<div className={classNames} style={spanStyle}>
					{card.text && <p className={styles.cardText}>{card.text}</p>}
				</div>
			);

		case "icon-text":
			return (
				<div className={`${classNames} ${styles.cardIconText}`} style={spanStyle}>
					{card.icon && <span className={styles.inlineIcon}>{card.icon}</span>}
					{card.text && <span className={styles.cardText}>{card.text}</span>}
				</div>
			);

		case "image-text":
			return (
				<div
					className={`${classNames} ${styles.cardImageText}`}
					style={spanStyle}
				>
					{card.image && (
						<div className={styles.imageTextImg}>
							<Image
								src={card.image}
								alt={card.imageAlt || ""}
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					)}
					{card.text && <p className={styles.cardText}>{card.text}</p>}
				</div>
			);

		case "text-image-side":
			return (
				<div
					className={`${classNames} ${styles.cardTextImageSide} ${
						card.imagePosition === "left" ? styles.imgLeft : styles.imgRight
					}`}
					style={spanStyle}
				>
					{card.text && <p className={styles.cardText}>{card.text}</p>}
					{card.image && (
						<div className={styles.sideImage}>
							<Image
								src={card.image}
								alt={card.imageAlt || ""}
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					)}
				</div>
			);

		default:
			return null;
	}
}

export default function BentoGridSection({ autoLayout = true, cards }: BentoGridProps) {
	return (
		<section className={styles.section}>
			<div
				className={`${styles.grid} ${autoLayout ? styles.autoGrid : ""}`}
				style={autoLayout ? undefined : { gridTemplateColumns: "repeat(3, 1fr)" }}
			>
				{cards.map((card) => (
					<BentoCardItem key={card.id} card={card} autoLayout={autoLayout} />
				))}
			</div>
		</section>
	);
}
