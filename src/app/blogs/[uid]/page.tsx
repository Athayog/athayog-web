import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { RichTextBlog } from "@/components/RichTextBlog";

type Params = Promise<{ uid: string }>;

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const client = createClient();
	const { uid } = await params;
	const page = await client.getByUID("blog_post", uid).catch(() => notFound());

	return {
		title: page.data.meta_title || prismic.asText(page.data.title),
		description: page.data.meta_description,
		openGraph: {
			title: page.data.meta_title || undefined,
			images: page.data.meta_image?.url ? [{ url: page.data.meta_image.url }] : [],
		},
		alternates: { canonical: `https://athayogliving.com/blogs/${uid}` },
	};
}

export default async function BlogPost({ params }: { params: Params }) {
	const { uid } = await params;
	const client = createClient();

	const page = await client.getByUID("blog_post", uid).catch(() => notFound());

	const posts = await client.getAllByType("blog_post", {
		orderings: [{ field: "my.blog_post.publication_date", direction: "asc" }],
	});

	const getNextPost = () => {
		if (posts.length <= 1) return null;
		const currentIndex = posts.findIndex((post) => post.uid === uid);
		const nextIndex = (currentIndex + 1) % posts.length;
		return posts[nextIndex];
	};

	const nextPost = getNextPost();
	const { slices, title, publication_date, description, featured_image } = page.data;

	return (
		<main>
			<section>
				<div className="wrap">
					<article style={{ maxWidth: 760, margin: "0 auto" }}>
						<span className="eyebrow">Blog</span>

						<div style={{ marginTop: 8, marginBottom: 12 }}>
							<RichTextBlog field={title} />
						</div>

						{publication_date && (
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.9rem",
									color: "var(--clay)",
									fontWeight: 500,
									margin: "0 0 28px",
								}}
							>
								{new Intl.DateTimeFormat("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								}).format(new Date(publication_date))}
							</p>
						)}

						{featured_image && (
							<div
								style={{
									borderRadius: 4,
									overflow: "hidden",
									marginBottom: 32,
								}}
							>
								<PrismicNextImage
									field={featured_image}
									style={{
										width: "100%",
										height: "auto",
										display: "block",
									}}
									fallbackAlt=""
								/>
							</div>
						)}

						{description && (
							<div
								style={{
									fontSize: "1.05rem",
									lineHeight: 1.8,
									marginBottom: 40,
								}}
							>
								<RichTextBlog field={description} />
							</div>
						)}
					</article>

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "BlogPosting",
								headline: prismic.asText(title),
								description: page.data.meta_description || "",
								image: featured_image?.url || "",
								datePublished: publication_date || undefined,
								author: {
									"@type": "Person",
									name: "Sharath Basavaraju",
								},
								publisher: {
									"@type": "Organization",
									name: "Athayog Living",
									logo: {
										"@type": "ImageObject",
										url: "https://athayogliving.com/Logo.png",
									},
								},
							}),
						}}
					/>

					<div style={{ maxWidth: 760, margin: "0 auto" }}>
						<SliceZone slices={slices} components={components} />
					</div>

					{nextPost && (
						<div
							style={{
								maxWidth: 760,
								margin: "48px auto 0",
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<Link
								href={`/blogs/${nextPost.uid}`}
								className="btn btn-primary"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 8,
								}}
							>
								Next Blog
								<span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
									→
								</span>
							</Link>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("blog_post");

	return pages.map((page) => ({ uid: page.uid }));
}
