import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import styles from "./PostCard.module.css";

export function PostCard({ post }: { post: any }) {
	const { data, uid } = post;

	return (
		<Link href={`/blogs/${uid}`} className={styles.card}>
			{data.featured_image && (
				<PrismicNextImage
					field={data.featured_image}
					className={styles.image}
					fallbackAlt=""
				/>
			)}
			<div className={styles.body}>
				<h3 className={styles.title}>
					<PrismicText field={data.title} />
				</h3>
				<p className={styles.date}>
					{new Intl.DateTimeFormat("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					}).format(
						new Date(data.publication_date || ""),
					)}
				</p>
			</div>
		</Link>
	);
}
