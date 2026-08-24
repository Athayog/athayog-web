import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load the env file (defaults to .env.local; use ENV_FILE=.env.prod for
// the production project, e.g. ENV_FILE=.env.prod npm run plans:seed)
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
		// Support multi-line quoted values (e.g. a private key pasted with
		// real line breaks) by consuming lines until the closing quote.
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

async function main() {
	const snapshot = await db.collection("plans").get();

	if (snapshot.empty) {
		console.error("");
		console.error("❌  ERROR: No plans found in Firestore (collection: 'plans').");
		console.error("   The payment flow will fail — every 'Register' click returns");
		console.error("   'Invalid or inactive plan' for all pricing tiers.");
		console.error("");
		console.error("   To fix, run:   npm run plans:seed");
		console.error("");
		process.exit(1);
	}

	const inactive: string[] = [];
	let active = 0;

	snapshot.forEach((doc) => {
		const data = doc.data();
		if (data.active === false) {
			inactive.push(doc.id);
		} else {
			active++;
		}
	});

	const total = active + inactive.length;

	if (inactive.length > 0) {
		console.error("");
		console.error(`⚠️  WARNING: ${inactive.length}/${total} plan(s) are inactive:`);
		for (const id of inactive) {
			console.error(`   · ${id}`);
		}
		console.error(`   ${active} plan(s) are active — payment flow works for those.`);
		console.error("");
		// Exit code 2 = warning, but still blocks deploy if zero active
		if (active === 0) {
			console.error("❌  ERROR: No active plans. Payments will not work.");
			console.error("   Run 'npm run plans:seed' to re-seed all plans as active.");
			process.exit(1);
		}
		console.error("   Check passed with warnings. Review before deploying.");
		process.exit(2);
	}

	console.log(`✅  ${total} plans found in Firestore (all active)`);
	for (const doc of snapshot.docs) {
		const d = doc.data();
		const label = `₹${d.subtotal}${d.total ? ` → ₹${d.total} with GST` : ""}`;
		console.log(`   · ${doc.id} (${label})`);
	}
	console.log("   Payment flow is ready.");
	process.exit(0);
}

main().catch((err) => {
	console.error("❌ Check failed:", err.message);
	process.exit(1);
});
