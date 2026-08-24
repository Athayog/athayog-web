import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendFormEmail } from "@/lib/forms/email";
import { strings, optional } from "@/lib/forms/schemas";

const rateMap = new Map<string, number>();

const formConfigs = {
	aerialTrial: { subject: "New Aerial Yoga Booking" },
	contactMessages: { subject: "New Contact Message" },
	enquiries: { subject: "New Enquiry" },
	groupTrial: { subject: "New Group Trial" },
	newsletter: { subject: "New Newsletter Signup" },
	personalAdsLead: { subject: "New Personal Yoga Training Lead" },
	picnicForm: { subject: "New Picnic Sign Up" },
	resume: { subject: "New Career Application" },
	trialClasses: { subject: "New Trial Class" },
	deleteAccount: {},
	group_classes_indiranagar: {},
	personal_training_indiranagar: {},
	ryt200_non_residential: {},
	ryt_residential: {},
	ttc_online: {},
} as const;

const collectionSchema = z.enum([
	"aerialTrial",
	"contactMessages",
	"deleteAccount",
	"enquiries",
	"groupTrial",
	"group_classes_indiranagar",
	"newsletter",
	"personalAdsLead",
	"personal_training_indiranagar",
	"picnicForm",
	"resume",
	"ryt200_non_residential",
	"ryt_residential",
	"trialClasses",
	"ttc_online",
]);

function isRateLimited(key: string, windowMs = 60_000, max = 5) {
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

// Common PII fields are validated with the same rules as the client forms
// (see lib/forms/schemas.ts). Unknown fields pass through so collection-
// specific fields are never rejected.
const dataSchema = z
	.object({
		fullName: strings.name.optional().or(z.literal("")),
		name: strings.name.optional().or(z.literal("")),
		email: optional.email,
		phone: optional.phone,
		phoneNumber: optional.phone,
		message: optional.message,
	})
	.passthrough();

const bodySchema = z.object({
	collection: collectionSchema,
	data: dataSchema,
});

export async function POST(request: NextRequest) {
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

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

		const formConfig = formConfigs[parsed.collection];
		if ("subject" in formConfig) {
			// Awaited so the email completes before the serverless function
			// returns; failures are logged inside sendFormEmail.
			await sendFormEmail({
				to: "info@athayogliving.com",
				subject: formConfig.subject,
				data: parsed.data,
				collection: parsed.collection,
			});
		}

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
