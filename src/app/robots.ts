import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/login",
					"/account",
					"/payment-success",
					"/thank-you",
					"/athayog-app/*",
				],
			},
		],
		sitemap: "https://athayogliving.com/sitemap.xml",
	};
}
