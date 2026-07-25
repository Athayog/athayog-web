// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "../route";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import { getPaymentsByUser, type PaymentDoc } from "@/lib/razorpay";
import type { DecodedIdToken } from "firebase-admin/auth";

vi.mock("@/lib/firebaseAdmin", () => ({
	verifySessionCookie: vi.fn(),
}));

vi.mock("@/lib/razorpay", () => ({
	getPaymentsByUser: vi.fn(),
}));

describe("GET /api/payments", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns 401 when __session cookie is missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments");
		const res = await GET(req);

		expect(res.status).toBe(401);
		const data = await res.json();
		expect(data.error).toBe("Unauthorized");
	});

	it("returns payments list for authenticated user", async () => {
		vi.mocked(verifySessionCookie).mockResolvedValueOnce({
			uid: "user-999",
		} as DecodedIdToken);
		vi.mocked(getPaymentsByUser).mockResolvedValueOnce([
			{ id: "pay_1", amount: 3000, status: "completed" } as unknown as PaymentDoc,
		]);

		const req = new NextRequest("http://localhost:3000/api/payments");
		req.cookies.set("__session", "valid-session");

		const res = await GET(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.payments).toHaveLength(1);
		expect(data.payments[0].id).toBe("pay_1");
		expect(getPaymentsByUser).toHaveBeenCalledWith("user-999");
	});
});
