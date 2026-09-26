import styles from "@/components/forms/FormStatus.module.css";

type FormStatusProps = {
	/** Render the confirmation only once the submission succeeded. */
	submitted: boolean;
	/** Optional heading. Omit for the single-sentence landing page treatment. */
	title?: string;
	message: string;
	/**
	 * Heading level for `title`. Use "h1" where the confirmation replaces a
	 * page's only heading, so the page still has exactly one `<h1>`.
	 */
	titleAs?: "p" | "h1";
	/** Use on dark bands so the text stays legible. */
	tone?: "default" | "onDark";
	/** Tighter spacing, for use inside a modal. */
	compact?: boolean;
};

/**
 * The shared, visual submit confirmation.
 *
 * This is deliberately not a live region: the announcement comes from
 * ToastRegion, and two live regions for one submission would be read twice.
 */
export default function FormStatus({
	submitted,
	title,
	message,
	titleAs: TitleTag = "p",
	tone = "default",
	compact = false,
}: FormStatusProps) {
	if (!submitted) return null;

	const classes = [
		styles.status,
		title ? styles.titled : styles.standalone,
		tone === "onDark" ? styles.onDark : "",
		compact ? styles.compact : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classes}>
			{title && <TitleTag className={styles.title}>{title}</TitleTag>}
			<p className={styles.message}>{message}</p>
		</div>
	);
}
