import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../create-order/route";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import { getPlan, getActivePlans } from "@/lib/razorpay";
import type { DecodedIdToken } from "firebase-admin/auth";
import type { Plan } from "@/lib/razorpay";

vi.mock("@/lib/firebaseAdmin", () => ({
	verifySessionCookie: vi.fn(),
}));

vi.mock("@/lib/razorpay", () => ({
	getPlan: vi.fn(),
	getActivePlans: vi.fn(),
	createPaymentDoc: vi.fn(),
}));

describe("POST /api/payments/create-order", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns 401 when __session cookie is missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments/create-order", {
			method: "POST",
			body: JSON.stringify({ planId: "group-monthly" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(401);
		const data = await res.json();
		expect(data.error).toBe("Unauthorized");
	});

	it("returns 400 when planId is missing from request body", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-123",
		} as DecodedIdToken);

		const req = new NextRequest("http://localhost:3000/api/payments/create-order", {
			method: "POST",
			body: JSON.stringify({}),
		});
		req.cookies.set("__session", "valid-session");

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("planId is required");
	});

	it("returns 500 if no active plans exist in database", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-123",
		} as DecodedIdToken);
		vi.mocked(getActivePlans).mockResolvedValueOnce([]);

		const req = new NextRequest("http://localhost:3000/api/payments/create-order", {
			method: "POST",
			body: JSON.stringify({ planId: "group-monthly" }),
		});
		req.cookies.set("__session", "valid-session");

		const res = await POST(req);
		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data.error).toBe(
			"Payment system is not configured. Please contact support.",
		);
	});

	it("returns 400 when requested plan does not exist or is inactive", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-123",
		} as DecodedIdToken);
		vi.mocked(getActivePlans).mockResolvedValueOnce([
			{ id: "p1" } as unknown as Plan,
		]);
		vi.mocked(getPlan).mockResolvedValueOnce(null);

		const req = new NextRequest("http://localhost:3000/api/payments/create-order", {
			method: "POST",
			body: JSON.stringify({ planId: "invalid-plan" }),
		});
		req.cookies.set("__session", "valid-session");

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Invalid or inactive plan");
	});
});
