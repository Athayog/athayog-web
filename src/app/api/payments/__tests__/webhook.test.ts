// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../webhook/route";
import crypto from "node:crypto";

vi.mock("@/lib/firebaseAdmin", () => ({
	getAdminFirestore: vi.fn(() => {
		// Chainable mock supporting `.where(...).where(...).limit(...).get()`
		const chain = {
			where: vi.fn(() => chain),
			limit: vi.fn(() => chain),
			get: vi.fn(() => Promise.resolve({ empty: true, docs: [] })),
		};
		return { collection: vi.fn(() => chain) };
	}),
}));

describe("POST /api/payments/webhook", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		process.env.RAZORPAY_WEBHOOK_SECRET = "webhook_secret";
	});

	it("returns 400 when X-Razorpay-Signature header is missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments/webhook", {
			method: "POST",
			body: JSON.stringify({ event: "payment.captured" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Missing signature");
	});

	it("returns 400 when webhook signature is invalid", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments/webhook", {
			method: "POST",
			headers: { "X-Razorpay-Signature": "wrong_sig" },
			body: JSON.stringify({ event: "payment.captured" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Invalid signature");
	});

	it("returns 200 for non-payment.captured events", async () => {
		const rawBody = JSON.stringify({ event: "order.paid" });
		const sig = crypto
			.createHmac("sha256", "webhook_secret")
			.update(rawBody)
			.digest("hex");

		const req = new NextRequest("http://localhost:3000/api/payments/webhook", {
			method: "POST",
			headers: { "X-Razorpay-Signature": sig },
			body: rawBody,
		});

		const res = await POST(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.received).toBe(true);
	});

	it("marks the pending order failed on payment.failed", async () => {
		const { getAdminFirestore } = await import("@/lib/firebaseAdmin");
		const mockUpdate = vi.fn().mockResolvedValue(undefined);
		vi.mocked(getAdminFirestore).mockReturnValueOnce({
			collection: vi.fn(() => {
				const chain = {
					where: vi.fn(() => chain),
					limit: vi.fn(() => chain),
					get: vi.fn(() =>
						Promise.resolve({
							empty: false,
							docs: [{ ref: { update: mockUpdate } }],
						}),
					),
				};
				return chain;
			}),
		} as never);

		const rawBody = JSON.stringify({
			event: "payment.failed",
			payload: {
				payment: {
					entity: { id: "pay_fail_1", order_id: "order_1" },
				},
			},
		});
		const sig = crypto
			.createHmac("sha256", "webhook_secret")
			.update(rawBody)
			.digest("hex");

		const req = new NextRequest("http://localhost:3000/api/payments/webhook", {
			method: "POST",
			headers: { "X-Razorpay-Signature": sig },
			body: rawBody,
		});

		const res = await POST(req);
		expect(res.status).toBe(200);
		expect(mockUpdate).toHaveBeenCalledWith(
			expect.objectContaining({ status: "failed" }),
		);
	});
});
