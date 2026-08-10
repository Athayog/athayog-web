import type { MetadataRoute } from "next";

const protectedPaths = [
	"/login",
	"/account",
	"/payment-success",
	"/thank-you",
	"/athayog-app/*",
];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: [
					"GPTBot",
					"ClaudeBot",
					"anthropic-ai",
					"Google-Extended",
					"Applebot-Extended",
					"CCBot",
					"Meta-ExternalAgent",
					"Bytespider",
					"Diffbot",
					"Omgilibot",
					"Omgili",
					"cohere-ai",
					"img2dataset",
					"AI2Bot",
				],
				disallow: "/",
			},
			{
				userAgent: [
					"Googlebot",
					"Bingbot",
					"Applebot",
					"OAI-SearchBot",
					"PerplexityBot",
				],
				allow: "/",
				disallow: protectedPaths,
			},
			{
				userAgent: "*",
				allow: "/",
				disallow: protectedPaths,
			},
		],
		sitemap: "https://athayogliving.com/sitemap.xml",
	};
}
