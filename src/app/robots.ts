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
					"/athayog-app/*",
					"/privacy-policy",
					"/refund-policy",
					"/terms-of-service",
				],
			},
		],
		sitemap: "https://athayogliving.com/sitemap.xml",
	};
}
