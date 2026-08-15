// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../route";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import type { DecodedIdToken } from "firebase-admin/auth";

vi.mock("@/lib/firebaseAdmin", () => ({
	verifySessionCookie: vi.fn(),
	getAdminFirestore: vi.fn(() => ({
		collection: vi.fn(() => ({
			doc: vi.fn(() => ({
				collection: vi.fn(() => ({
					get: vi.fn(() => Promise.resolve({ docs: [] })),
				})),
			})),
		})),
	})),
}));

describe("GET /api/courses", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns 401 when __session cookie is missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/courses");
		const res = await GET(req);

		expect(res.status).toBe(401);
		const data = await res.json();
		expect(data.error).toBe("Unauthorized");
	});

	it("returns 401 when the session cookie is invalid", async () => {
		vi.mocked(verifySessionCookie).mockRejectedValueOnce(new Error("invalid"));

		const req = new NextRequest("http://localhost:3000/api/courses");
		req.cookies.set("__session", "bad-session");

		const res = await GET(req);
		expect(res.status).toBe(401);
	});

	it("returns courses for the session uid (never a client-supplied userId)", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-42",
		} as DecodedIdToken);

		const req = new NextRequest(
			"http://localhost:3000/api/courses?userId=someone-else",
		);
		req.cookies.set("__session", "valid-session");

		const res = await GET(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data).toEqual([]);
	});
});
