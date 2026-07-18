import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load .env.local
const envPath = resolve(import.meta.dirname, "..", ".env.local");
if (existsSync(envPath)) {
	const content = readFileSync(envPath, "utf-8");
	for (const line of content.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const eq = trimmed.indexOf("=");
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		const value = trimmed
			.slice(eq + 1)
			.trim()
			.replace(/^["']|["']$/g, "");
		process.env[key] = value;
	}
} else {
	console.error("❌ .env.local not found. Create one from .env.example");
	process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
	console.error("❌ Missing Firebase Admin credentials in .env.local");
	console.error(
		"   Required: NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY",
	);
	process.exit(1);
}

if (!getApps().length) {
	initializeApp({
		credential: cert({
			projectId,
			clientEmail,
			privateKey: privateKey.replace(/\\n/g, "\n"),
		}),
	});
}

const db = getFirestore();

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

async function main() {
	// Check if plans already exist
	const existing = await db.collection("plans").get();
	if (!existing.empty) {
		console.log(`ℹ️  Plans already exist (${existing.size} found). Skipping seed.`);
		process.exit(0);
	}

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
	console.log(`✅ Seeded ${PLANS.length} plans to Firestore (collection: plans)`);
	PLANS.forEach((p) =>
		console.log(
			`   · ${p.id}: ₹${p.subtotal} (+${p.gstPercent}% GST = ₹${calcTotal(p.subtotal, p.gstPercent)})`,
		),
	);
}

main().catch((err) => {
	console.error("❌ Seed failed:", err.message);
	process.exit(1);
});
