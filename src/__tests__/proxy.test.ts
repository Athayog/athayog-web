// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import type { DecodedIdToken } from "firebase-admin/auth";

vi.mock("@/lib/firebaseAdmin", () => ({
	verifySessionCookie: vi.fn(),
}));

describe("proxy function (Next.js 16 route protection)", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("allows unprotected routes through without redirect", async () => {
		const req = new NextRequest("http://localhost:3000/about-us");
		const res = await proxy(req);

		expect(res.headers.get("x-middleware-next")).toBe("1");
	});

	it("redirects unauthenticated requests on protected path /account", async () => {
		const req = new NextRequest("http://localhost:3000/account");
		const res = await proxy(req);

		expect(res.status).toBe(307);
		expect(res.headers.get("location")).toBe(
			"http://localhost:3000/login?redirect=%2Faccount",
		);
	});

	it("allows request when __session cookie is valid", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-123",
		} as DecodedIdToken);

		const req = new NextRequest("http://localhost:3000/account");
		req.cookies.set("__session", "valid-session");

		const res = await proxy(req);
		expect(res.headers.get("x-middleware-next")).toBe("1");
		expect(verifySessionCookie).toHaveBeenCalledWith("valid-session");
	});

	it("redirects request when __session cookie fails verification", async () => {
		vi.mocked(verifySessionCookie).mockRejectedValueOnce(new Error("Expired"));

		const req = new NextRequest("http://localhost:3000/account");
		req.cookies.set("__session", "invalid-session");

		const res = await proxy(req);
		expect(res.status).toBe(307);
		expect(res.headers.get("location")).toBe(
			"http://localhost:3000/login?redirect=%2Faccount",
		);
	});
});
