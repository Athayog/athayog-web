import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
	try {
		const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
			await request.json();

		if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
			return NextResponse.json(
				{ error: "Missing payment details" },
				{ status: 400 },
			);
		}

		// 1. Verify HMAC signature
		const body = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
			.update(body)
			.digest("hex");

		if (expectedSignature !== razorpay_signature) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
		}

		// 2. Idempotency check — skip if already completed
		const db = getAdminFirestore();
		const existsSnapshot = await db
			.collection("payments")
			.where("razorpayPaymentId", "==", razorpay_payment_id)
			.limit(1)
			.get();

		if (!existsSnapshot.empty) {
			const existing = existsSnapshot.docs[0].data();
			return NextResponse.json(
				{
					success: true,
					status: existing.status,
					message: "Payment already processed",
				},
				{ status: 200 },
			);
		}

		// 3. Update payment doc
		const orderSnapshot = await db
			.collection("payments")
			.where("razorpayOrderId", "==", razorpay_order_id)
			.limit(1)
			.get();

		if (orderSnapshot.empty) {
			return NextResponse.json({ error: "Order not found" }, { status: 404 });
		}

		await orderSnapshot.docs[0].ref.update({
			razorpayPaymentId: razorpay_payment_id,
			status: "completed",
			verifiedAt: new Date(),
		});

		return NextResponse.json({ success: true, status: "completed" }, { status: 200 });
	} catch (err) {
		console.error("verify payment error:", err);
		return NextResponse.json({ error: "Verification failed" }, { status: 500 });
	}
}
