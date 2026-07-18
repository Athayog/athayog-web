import type { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PostCard } from "@/components/PostCard";
import styles from "@/app/blogs/Blogs.module.css";

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getByUID("page", "blogs");

	return {
		title: page.data.meta_title || prismic.asText(page.data.title),
		description: page.data.meta_description,
		openGraph: {
			title: page.data.meta_title || undefined,
			images: page.data.meta_image?.url ? [{ url: page.data.meta_image.url }] : [],
		},
	};
}

export default async function BlogIndex() {
	const client = createClient();
	const page = await client.getByUID("page", "blogs");
	const posts = await client.getAllByType("blog_post", {
		orderings: [
			{ field: "my.blog_post.publication_date", direction: "desc" },
			{ field: "document.first_publication_date", direction: "desc" },
		],
	});

	return (
		<section>
			<div className="wrap">
				<div className={styles.sectionHead}>
					<SliceZone slices={page.data.slices} components={components} />
				</div>
				{posts.length > 0 ? (
					<div
						style={{
							display: "grid",
							gridTemplateColumns:
								posts.length < 3
									? "repeat(auto-fill, minmax(320px, 1fr))"
									: "repeat(auto-fit, minmax(320px, 1fr))",
							gap: 26,
						}}
					>
						{posts.map((post) => (
							<PostCard post={post} key={post.id} />
						))}
					</div>
				) : (
					<p
						style={{
							textAlign: "center",
							fontSize: "1.1rem",
							color: "var(--brand-deep)",
							marginTop: 60,
						}}
					>
						No blog posts yet. Check back soon.
					</p>
				)}
			</div>
		</section>
	);
}
