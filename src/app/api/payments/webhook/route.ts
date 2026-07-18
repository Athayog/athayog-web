import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
	try {
		const rawBody = await request.text();
		const signature = request.headers.get("X-Razorpay-Signature");

		if (!signature) {
			return NextResponse.json({ error: "Missing signature" }, { status: 400 });
		}

		// 1. Verify webhook signature
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
			.update(rawBody)
			.digest("hex");

		if (expectedSignature !== signature) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
		}

		// 2. Parse event
		const event = JSON.parse(rawBody);

		if (event.event !== "payment.captured") {
			// Acknowledge non-payment events to stop retries
			return NextResponse.json({ received: true }, { status: 200 });
		}

		const payment = event.payload.payment.entity;
		const razorpayPaymentId = payment.id;
		const razorpayOrderId = payment.order_id;

		// 3. Idempotency — skip if already processed
		const db = getAdminFirestore();
		const already = await db
			.collection("payments")
			.where("razorpayPaymentId", "==", razorpayPaymentId)
			.limit(1)
			.get();

		if (!already.empty) {
			return NextResponse.json(
				{ received: true, status: "already_processed" },
				{ status: 200 },
			);
		}

		// 4. Find and update pending order
		const orderSnapshot = await db
			.collection("payments")
			.where("razorpayOrderId", "==", razorpayOrderId)
			.where("status", "==", "pending")
			.limit(1)
			.get();

		if (orderSnapshot.empty) {
			return NextResponse.json(
				{ received: true, status: "order_not_found" },
				{ status: 200 },
			);
		}

		await orderSnapshot.docs[0].ref.update({
			razorpayPaymentId,
			status: "completed",
			verifiedAt: new Date(),
		});

		return NextResponse.json(
			{ received: true, status: "completed" },
			{ status: 200 },
		);
	} catch (err) {
		console.error("webhook error:", err);
		return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
	}
}
