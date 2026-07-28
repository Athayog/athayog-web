import type { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const ROOT_URL = "https://athayogliving.com";

const indexedPages = [
	"",
	"/aerial-yoga-indiranagar",
	"/about-us",
	"/group-classes-indiranagar",
	"/personal-yoga-training-indiranagar",
	"/workshops",
	"/yoga-teacher-training-bangalore",
	"/yoga-teacher-training-residential",
	"/trial-classes",
	"/weight-loss-program-indiranagar",
	"/career",
	"/picnics",
	"/blogs",
	"/contact-us",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const client = createClient();
	const posts = await client.getAllByType("blog_post").catch(() => []);

	const blogEntries = posts.map((post) => ({
		url: `${ROOT_URL}/blogs/${post.uid}`,
		lastModified: new Date(post.data.publication_date || post.first_publication_date),
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}));

	return [
		...indexedPages.map((path) => ({
			url: `${ROOT_URL}${path}`,
			lastModified: new Date(),
			changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
			priority: path === "" ? 1 : 0.8,
		})),
		...blogEntries,
	];
}
