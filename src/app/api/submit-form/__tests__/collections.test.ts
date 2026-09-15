// @vitest-environment node
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockAdd = vi.fn().mockResolvedValue({ id: "test-doc-id" });
const mockCollection = vi.fn().mockReturnValue({ add: mockAdd });
const mockDb = { collection: mockCollection };

vi.mock("@/lib/firebaseAdmin", () => ({
	getAdminFirestore: () => mockDb,
}));

vi.mock("@/lib/forms/email", () => ({
	sendFormEmail: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from "../route";

// `/account/delete-request` is the only collection that deliberately does not
// notify anyone. Every other form surface must reach the info inbox.
const INTENTIONALLY_SILENT = new Set(["deleteAccount"]);

// Form surfaces reference a collection either directly (`collection: "x"`) or
// through the landing-page section kit (`formKey="x"`).
const COLLECTION_PATTERNS = [
	/collection:\s*"([a-zA-Z0-9_]+)"/g,
	/formKey="([a-zA-Z0-9_]+)"/g,
];

function sourceFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return entry.name === "__tests__" ? [] : sourceFiles(full);
		}
		return /\.tsx?$/.test(entry.name) ? [full] : [];
	});
}

function collectionsUsedInSource(): string[] {
	const found = new Set<string>();
	for (const file of sourceFiles(path.resolve(process.cwd(), "src"))) {
		// The API directory holds the registry itself, not a form surface.
		if (file.includes(path.join("app", "api"))) continue;
		const source = readFileSync(file, "utf8");
		for (const pattern of COLLECTION_PATTERNS) {
			for (const match of source.matchAll(pattern)) found.add(match[1]);
		}
	}
	return [...found].sort();
}

let nextIp = 1;
function post(collection: string) {
	return POST(
		new Request("http://localhost/api/submit-form", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// A distinct IP per request avoids the 5-per-minute rate limit.
				"x-forwarded-for": `10.1.0.${++nextIp}`,
			},
			body: JSON.stringify({
				collection,
				data: { name: "Registry Test", email: "test@example.com" },
			}),
		}) as unknown as Parameters<typeof POST>[0],
	);
}

const referenced = collectionsUsedInSource();

describe("form collection registry", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		delete process.env.FORM_EMAIL_TO;
	});

	it("finds the collections referenced by form surfaces", () => {
		// If the source scan breaks, the checks below would pass vacuously.
		expect(referenced.length).toBeGreaterThanOrEqual(15);
	});

	it.each(referenced.filter((c) => !INTENTIONALLY_SILENT.has(c)))(
		"emails a lead to info@athayogliving.com for %s",
		async (collection) => {
			const { sendFormEmail } = await import("@/lib/forms/email");

			const res = await post(collection);
			expect(
				res.status,
				`"${collection}" is used by a form but is missing from collectionSchema`,
			).toBe(201);

			expect(
				sendFormEmail,
				`"${collection}" is used by a form but has no subject in formConfigs`,
			).toHaveBeenCalledTimes(1);
			expect(sendFormEmail).toHaveBeenCalledWith(
				expect.objectContaining({ to: "info@athayogliving.com" }),
			);
		},
	);

	it("keeps deleteAccount intentionally silent", async () => {
		const { sendFormEmail } = await import("@/lib/forms/email");

		const res = await post("deleteAccount");
		expect(res.status).toBe(201);
		expect(sendFormEmail).not.toHaveBeenCalled();
	});
});
