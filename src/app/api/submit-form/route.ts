import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const rateMap = new Map<string, number>();

function isRateLimited(key: string, windowMs = 15000, max = 5) {
	const now = Date.now();
	const last = rateMap.get(key);
	if (last && now - last < windowMs) {
		const count = (rateMap.get(key + ":count") as number) || 1;
		rateMap.set(key + ":count", count + 1);
		if (count >= max) return true;
	} else {
		rateMap.set(key, now);
		rateMap.set(key + ":count", 1);
	}
	return false;
}

const bodySchema = z.object({
	collection: z.string().min(1),
	data: z.record(z.string(), z.unknown()),
});

export async function POST(request: NextRequest) {
	const ip = request.headers.get("x-forwarded-for") || "unknown";

	if (isRateLimited(ip)) {
		return NextResponse.json(
			{ error: "Too many requests. Please wait a moment." },
			{ status: 429 },
		);
	}

	try {
		const json = await request.json();
		const parsed = bodySchema.parse(json);

		const db = getAdminFirestore();
		await db.collection(parsed.collection).add({
			...parsed.data,
			createdAt: new Date(),
		});

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: err.issues },
				{ status: 400 },
			);
		}
		return NextResponse.json(
			{ error: "Failed to submit form. Please try again." },
			{ status: 500 },
		);
	}
}
