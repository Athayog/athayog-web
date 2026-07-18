import { NextResponse } from "next/server";
import { getActivePlans } from "@/lib/razorpay";

export async function GET() {
	try {
		const plans = await getActivePlans();
		return NextResponse.json({ plans }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
	}
}
