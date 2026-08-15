import type { RTParagraphNode } from "@prismicio/client";

/**
 * Blog helpers shared by the index, post, sitemap and rich-text rendering.
 * Dates prefer the Prismic `publication_date` field and fall back to
 * `first_publication_date` (posts missing the custom field sort by publish).
 */

interface BlogPostLike {
	data: {
		publication_date?: string | null;
	};
	first_publication_date?: string | null;
}

export function getPostDate(post: BlogPostLike): Date {
	const raw = post.data.publication_date || post.first_publication_date;
	const date = raw ? new Date(raw) : new Date(0);
	return isNaN(date.getTime()) ? new Date(0) : date;
}

export function sortPostsByDate<T extends BlogPostLike>(
	posts: T[],
	direction: "asc" | "desc" = "desc",
): T[] {
	return [...posts].sort((a, b) => {
		const diff = getPostDate(a).getTime() - getPostDate(b).getTime();
		return direction === "desc" ? -diff : diff;
	});
}

/**
 * Next post in list order (same order as the blog index, newest first).
 * Falls back to the first post when the current uid is not found.
 */
export function getNextPost<T extends BlogPostLike & { uid?: string | null }>(
	posts: T[],
	uid: string,
): T | null {
	if (posts.length <= 1) return null;
	const currentIndex = posts.findIndex((post) => post.uid === uid);
	const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % posts.length;
	return posts[nextIndex];
}

export interface TableData {
	headers: string[];
	rows: string[][];
}

export interface TableSplit {
	before: string;
	table: TableData | null;
	after: string;
}

/**
 * Parses a Prismic rich-text block that uses the `[table] ... [/table]`
 * convention (Prismic rich text has no native tables). Lines are split on `|`;
 * the first line becomes the header row.
 */
export function splitTableBlock(text: string): TableSplit {
	const start = text.indexOf("[table]");
	const end = text.indexOf("[/table]", start > -1 ? start + 7 : 0);

	if (start === -1 || end === -1) {
		return { before: text, table: null, after: "" };
	}

	const before = text.slice(0, start).trim();
	const content = text.slice(start + 7, end);
	const after = text.slice(end + 8).trim();

	const lines = content
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	let table: TableData | null = null;
	if (lines.length > 0) {
		const splitRow = (line: string) => line.split("|").map((cell) => cell.trim());
		table = {
			headers: splitRow(lines[0]),
			rows: lines.slice(1).map(splitRow),
		};
	}

	return { before, table, after };
}

export function paragraphBlock(text: string): RTParagraphNode {
	return { type: "paragraph", text, spans: [] };
}
