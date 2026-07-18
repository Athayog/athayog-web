import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import { getPlan, getActivePlans, createPaymentDoc } from "@/lib/razorpay";

// Dynamic import for Razorpay (avoids build-time init)
async function getRazorpay() {
	const Razorpay = (await import("razorpay")).default;
	return new Razorpay({
		key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
		key_secret: process.env.RAZORPAY_KEY_SECRET!,
	});
}

export async function POST(request: NextRequest) {
	try {
		// 1. Verify auth
		const session = request.cookies.get("__session")?.value;
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const decoded = await verifySessionCookie(session);
		if (!decoded) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// 2. Parse body
		const { planId } = await request.json();
		if (!planId || typeof planId !== "string") {
			return NextResponse.json({ error: "planId is required" }, { status: 400 });
		}

		// 3. Guard: check if ANY plans exist
		const existingPlans = await getActivePlans();
		if (existingPlans.length === 0) {
			console.error(
				"[create-order] No active plans found in Firestore. Run 'npm run plans:seed'.",
			);
			return NextResponse.json(
				{
					error: "Payment system is not configured. Please contact support.",
				},
				{ status: 500 },
			);
		}

		// 4. Fetch plan from Firestore (authoritative — never trust client amount)
		const plan = await getPlan(planId);
		if (!plan || !plan.active) {
			return NextResponse.json(
				{ error: "Invalid or inactive plan" },
				{ status: 400 },
			);
		}

		// 4. Create Razorpay order
		const razorpay = await getRazorpay();
		const order = await razorpay.orders.create({
			amount: plan.total * 100, // rupees → paise
			currency: "INR",
			receipt: `plan_${planId}_${Date.now()}`,
			notes: { planId, userId: decoded.uid },
		});

		// 5. Save pending payment doc to Firestore
		const docId = await createPaymentDoc({
			userId: decoded.uid,
			plan,
			razorpayOrderId: order.id,
		});

		return NextResponse.json(
			{
				razorpayOrderId: order.id,
				amount: order.amount,
				currency: order.currency,
				keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
				docId,
			},
			{ status: 201 },
		);
	} catch (err) {
		console.error("create-order error:", err);
		return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
	}
}
