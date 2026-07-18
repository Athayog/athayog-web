import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookie } from "@/lib/firebaseAdmin";
import { getPaymentsByUser } from "@/lib/razorpay";

export async function GET(request: NextRequest) {
	const session = request.cookies.get("__session")?.value;
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const decoded = await verifySessionCookie(session);
	if (!decoded) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const payments = await getPaymentsByUser(decoded.uid);
		return NextResponse.json({ payments }, { status: 200 });
	} catch (err) {
		console.error("GET /api/payments error:", err);
		return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
	}
}
