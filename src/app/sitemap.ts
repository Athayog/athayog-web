import type { MetadataRoute } from "next";

const ROOT_URL = "https://athayogliving.com";

const indexedPages = [
	"",
	"/about-us",
	"/what-we-offer",
	"/group-classes-indiranagar",
	"/personal-yoga-training-indiranagar",
	"/workshops",
	"/yoga-academy",
	"/residential-yoga-teacher-training",
	"/yoga-teacher-training-ryt-200-non-residential",
	"/yoga-ttc-online-certification",
	"/picnics",
	"/weight-loss-program-indiranagar",
	"/career",
	"/blogs",
	"/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
	return indexedPages.map((path) => ({
		url: `${ROOT_URL}${path}`,
		lastModified: new Date(),
		changeFrequency: path === "" ? "weekly" : "monthly",
		priority: path === "" ? 1 : 0.8,
	}));
}
