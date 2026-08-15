// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../route";
import { revalidateTag } from "next/cache";

vi.mock("next/cache", () => ({
	revalidateTag: vi.fn(),
}));

describe("POST /api/revalidate", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		delete process.env.REVALIDATE_TOKEN;
	});

	it("returns 503 when REVALIDATE_TOKEN is not configured", async () => {
		const req = new NextRequest("http://localhost:3000/api/revalidate", {
			method: "POST",
		});
		const res = await POST(req);

		expect(res.status).toBe(503);
		expect(revalidateTag).not.toHaveBeenCalled();
	});

	it("returns 401 when the token header is missing or wrong", async () => {
		process.env.REVALIDATE_TOKEN = "correct-token";

		const req = new NextRequest("http://localhost:3000/api/revalidate", {
			method: "POST",
			headers: { "x-revalidate-token": "wrong-token" },
		});
		const res = await POST(req);

		expect(res.status).toBe(401);
		expect(revalidateTag).not.toHaveBeenCalled();
	});

	it("revalidates the prismic tag when the token matches", async () => {
		process.env.REVALIDATE_TOKEN = "correct-token";

		const req = new NextRequest("http://localhost:3000/api/revalidate", {
			method: "POST",
			headers: { "x-revalidate-token": "correct-token" },
		});
		const res = await POST(req);

		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.revalidated).toBe(true);
		expect(revalidateTag).toHaveBeenCalledWith("prismic", "max");
	});
});
