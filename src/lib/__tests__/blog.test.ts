import { describe, it, expect } from "vitest";
import {
	getPostDate,
	sortPostsByDate,
	getNextPost,
	splitTableBlock,
	paragraphBlock,
} from "@/lib/blog";

describe("getPostDate", () => {
	it("prefers publication_date over first_publication_date", () => {
		const post = {
			data: { publication_date: "2025-06-01" },
			first_publication_date: "2024-01-01",
		};
		expect(getPostDate(post).toISOString().slice(0, 10)).toBe("2025-06-01");
	});

	it("falls back to first_publication_date when publication_date is missing", () => {
		const post = { data: {}, first_publication_date: "2024-03-15" };
		expect(getPostDate(post).toISOString().slice(0, 10)).toBe("2024-03-15");
	});

	it("returns the epoch for missing or invalid dates", () => {
		expect(getPostDate({ data: {}, first_publication_date: null })).toEqual(
			new Date(0),
		);
		expect(getPostDate({ data: { publication_date: "not-a-date" } })).toEqual(
			new Date(0),
		);
	});
});

describe("sortPostsByDate", () => {
	const posts = [
		{ uid: "old", data: { publication_date: "2024-01-01" } },
		{ uid: "new", data: { publication_date: "2025-06-01" } },
		{ uid: "fallback", data: {}, first_publication_date: "2024-06-01" },
	];

	it("sorts newest first by default", () => {
		expect(sortPostsByDate(posts).map((p) => p.uid)).toEqual([
			"new",
			"fallback",
			"old",
		]);
	});

	it("sorts oldest first with direction asc", () => {
		expect(sortPostsByDate(posts, "asc").map((p) => p.uid)).toEqual([
			"old",
			"fallback",
			"new",
		]);
	});

	it("does not mutate the input array", () => {
		const copy = [...posts];
		sortPostsByDate(posts);
		expect(posts).toEqual(copy);
	});
});

describe("getNextPost", () => {
	const posts = [
		{ uid: "newest", data: { publication_date: "2025-06-01" } },
		{ uid: "middle", data: { publication_date: "2025-01-15" } },
		{ uid: "oldest", data: { publication_date: "2024-03-01" } },
	];

	it("returns the next post in descending (index) order", () => {
		expect(getNextPost(posts, "newest")?.uid).toBe("middle");
		expect(getNextPost(posts, "middle")?.uid).toBe("oldest");
	});

	it("wraps from the last post back to the first", () => {
		expect(getNextPost(posts, "oldest")?.uid).toBe("newest");
	});

	it("returns null when there are fewer than two posts", () => {
		expect(getNextPost([posts[0]], "newest")).toBeNull();
		expect(getNextPost([], "newest")).toBeNull();
	});

	it("falls back to the first post when the uid is not found", () => {
		expect(getNextPost(posts, "unknown")?.uid).toBe("newest");
	});
});

describe("splitTableBlock", () => {
	it("parses header and body rows", () => {
		const text = `[table]
Factor | Group Class | Personal Session
Pace | Fixed for the group | Adjusted to you
Breath guidance | Encouraged | Actively refined
[/table]`;
		const { table, before, after } = splitTableBlock(text);
		expect(before).toBe("");
		expect(after).toBe("");
		expect(table).toEqual({
			headers: ["Factor", "Group Class", "Personal Session"],
			rows: [
				["Pace", "Fixed for the group", "Adjusted to you"],
				["Breath guidance", "Encouraged", "Actively refined"],
			],
		});
	});

	it("returns text around the markers and skips blank lines", () => {
		const text = `Intro paragraph.

[table]
A | B

1 | 2
[/table]

Outro paragraph.`;
		const split = splitTableBlock(text);
		expect(split.before).toBe("Intro paragraph.");
		expect(split.after).toBe("Outro paragraph.");
		expect(split.table).toEqual({
			headers: ["A", "B"],
			rows: [["1", "2"]],
		});
	});

	it("returns no table when the closing marker is missing", () => {
		const text = "some text with [table] but never closed";
		const split = splitTableBlock(text);
		expect(split.table).toBeNull();
		expect(split.before).toBe(text);
	});
});

describe("paragraphBlock", () => {
	it("builds a plain Prismic paragraph block", () => {
		expect(paragraphBlock("hello")).toEqual({
			type: "paragraph",
			text: "hello",
			spans: [],
		});
	});
});
