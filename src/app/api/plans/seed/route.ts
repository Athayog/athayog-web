import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const PLANS = [
	{
		id: "group-drop-in",
		name: "Drop-in",
		subtotal: 599,
		gstPercent: 5,
		duration: "single class",
		category: "group-class",
		sortOrder: 1,
	},
	{
		id: "group-1-month",
		name: "1 Month",
		subtotal: 4999,
		gstPercent: 5,
		duration: "30 days",
		category: "group-class",
		sortOrder: 2,
	},
	{
		id: "group-3-month",
		name: "3 Months",
		subtotal: 9999,
		gstPercent: 5,
		duration: "90 days",
		category: "group-class",
		sortOrder: 3,
	},
	{
		id: "group-6-month",
		name: "6 Months",
		subtotal: 15999,
		gstPercent: 5,
		duration: "180 days",
		category: "group-class",
		sortOrder: 4,
	},
	{
		id: "group-12-month",
		name: "12 Months",
		subtotal: 25999,
		gstPercent: 5,
		duration: "365 days",
		category: "group-class",
		sortOrder: 5,
	},
	{
		id: "group-couple-year",
		name: "Couple · 1 Year",
		subtotal: 32399,
		gstPercent: 5,
		duration: "365 days · for two",
		category: "group-class",
		sortOrder: 6,
	},
];

function calcTotal(subtotal: number, gstPercent: number) {
	return Math.round(subtotal + subtotal * (gstPercent / 100));
}

export async function GET() {
	const db = getAdminFirestore();
	const batch = db.batch();

	for (const plan of PLANS) {
		const ref = db.collection("plans").doc(plan.id);
		batch.set(ref, {
			...plan,
			total: calcTotal(plan.subtotal, plan.gstPercent),
			active: true,
		});
	}

	await batch.commit();

	return NextResponse.json({ seeded: PLANS.length, plans: PLANS }, { status: 200 });
}
