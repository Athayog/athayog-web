import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Temporarily change a plan's price in Firestore (e.g. a ₹1 test payment).
//
// Usage (defaults to .env.local; use ENV_FILE=.env.prod for production):
//   ENV_FILE=.env.prod npx tsx scripts/set-plan-price.ts group-drop-in 1 0
//   ENV_FILE=.env.prod npx tsx scripts/set-plan-price.ts group-drop-in 599 5

const envPath = resolve(import.meta.dirname, "..", process.env.ENV_FILE || ".env.local");
if (existsSync(envPath)) {
	const content = readFileSync(envPath, "utf-8");
	const lines = content.split("\n");
	let i = 0;
	while (i < lines.length) {
		const trimmed = lines[i].trim();
		i++;
		if (!trimmed || trimmed.startsWith("#")) continue;
		const eq = trimmed.indexOf("=");
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		let value = trimmed.slice(eq + 1).trim();
		if (
			(value.startsWith('"') || value.startsWith("'")) &&
			!value.endsWith(value[0])
		) {
			const quote = value[0];
			while (i < lines.length) {
				value += "\n" + lines[i].trim();
				i++;
				if (value.endsWith(quote)) break;
			}
		}
		process.env[key] = value.replace(/^["']|["']$/g, "");
	}
} else {
	console.error("❌ Env file not found. Create one from .env.example");
	process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
	console.error("❌ Missing Firebase Admin credentials in the env file");
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

const [planId, subtotalStr, gstStr] = process.argv.slice(2);
const subtotal = Number(subtotalStr);
const gstPercent = gstStr ? Number(gstStr) : 5;

if (!planId || Number.isNaN(subtotal)) {
	console.error(
		"Usage: npx tsx scripts/set-plan-price.ts <planId> <subtotal> [gstPercent]",
	);
	process.exit(1);
}

async function main() {
	const ref = db.collection("plans").doc(planId);
	const doc = await ref.get();
	if (!doc.exists) {
		console.error(`❌ Plan "${planId}" not found in ${projectId}`);
		process.exit(1);
	}
	const before = doc.data()!;
	const total = Math.round(subtotal + subtotal * (gstPercent / 100));
	await ref.update({ subtotal, gstPercent, total });
	console.log(
		`✅ ${projectId} :: ${planId}: ₹${before.subtotal} → ₹${subtotal} (total ₹${total}, GST ${gstPercent}%)`,
	);
}

main().catch((err) => {
	console.error("❌ Failed:", err.message);
	process.exit(1);
});
