// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../webhook/route";
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
});
