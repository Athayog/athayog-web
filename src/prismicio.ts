import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

export const repositoryName =
	process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || "athayog";

const routes: prismic.ClientConfig["routes"] = [
	{ type: "page", path: "/", uid: "home" },
	{ type: "page", path: "/:uid" },
	{ type: "blog_post", path: "/blogs/:uid" },
];

export const createClient = (config: prismic.ClientConfig = {}) => {
	const client = prismic.createClient(repositoryName, {
		routes,
		fetchOptions:
			process.env.NODE_ENV === "production"
				? { next: { tags: ["prismic"] }, cache: "force-cache" }
				: { next: { revalidate: 5 } },
		...config,
	});

	prismicNext.enableAutoPreviews({ client });

	return client;
};
