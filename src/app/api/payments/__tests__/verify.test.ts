// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../verify/route";
import crypto from "node:crypto";

vi.mock("@/lib/firebaseAdmin", () => ({
	getAdminFirestore: vi.fn(() => ({
		collection: vi.fn(() => ({
			where: vi.fn(() => ({
				limit: vi.fn(() => ({
					get: vi.fn(() => Promise.resolve({ empty: true, docs: [] })),
				})),
			})),
		})),
	})),
}));

describe("POST /api/payments/verify", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		process.env.RAZORPAY_KEY_SECRET = "test_secret";
	});

	it("returns 400 when required fields are missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments/verify", {
			method: "POST",
			body: JSON.stringify({ razorpay_payment_id: "pay_123" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Missing payment details");
	});

	it("returns 400 when HMAC signature is invalid", async () => {
		const req = new NextRequest("http://localhost:3000/api/payments/verify", {
			method: "POST",
			body: JSON.stringify({
				razorpay_payment_id: "pay_123",
				razorpay_order_id: "order_123",
				razorpay_signature: "invalid_sig",
			}),
		});

		const res = await POST(req);
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toBe("Invalid signature");
	});

	it("verifies valid HMAC signature successfully", async () => {
		const orderId = "order_123";
		const paymentId = "pay_123";
		const secret = "test_secret";

		const validSignature = crypto
			.createHmac("sha256", secret)
			.update(`${orderId}|${paymentId}`)
			.digest("hex");

		const req = new NextRequest("http://localhost:3000/api/payments/verify", {
			method: "POST",
			body: JSON.stringify({
				razorpay_payment_id: paymentId,
				razorpay_order_id: orderId,
				razorpay_signature: validSignature,
			}),
		});

		// Default mock returns empty order snapshot
		const res = await POST(req);
		expect(res.status).toBe(404);
		const data = await res.json();
		expect(data.error).toBe("Order not found");
	});
});
