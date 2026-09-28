import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Exports form submissions (leads) from Firestore to CSV, and optionally to
// XLSX via LibreOffice.
//
// Usage (defaults to .env.local; use ENV_FILE=.env.prod for production):
//   ENV_FILE=.env.prod npm run leads:export
//   ENV_FILE=.env.prod npm run leads:export -- --days=7
//   ENV_FILE=.env.prod npm run leads:export -- --days=30 --no-xlsx
//
// Output goes to exports/ (git-ignored: it contains real customer PII).

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
	console.error(`❌ Env file not found: ${envPath}`);
	process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
	console.error("❌ Missing Firebase Admin credentials in the env file.");
	process.exit(1);
}

// Built here, outside main(), so these are plain strings. TypeScript does not
// carry the narrowing above into that function body.
const firebaseCredentials = {
	projectId,
	clientEmail,
	privateKey: privateKey.replace(/\\n/g, "\n"),
};

// One entry per collection registered in src/app/api/submit-form/route.ts.
// `lead: false` collections are still exported but called out as not being
// marketing leads.
const COLLECTIONS = [
	{ id: "contactMessages", label: "Contact messages", lead: true },
	{ id: "enquiries", label: "Enquiries (enquire modal)", lead: true },
	{ id: "trialClasses", label: "Trial classes", lead: true },
	{ id: "aerialTrial", label: "Aerial yoga bookings", lead: true },
	{ id: "groupTrial", label: "Group class trials", lead: true },
	{ id: "personalAdsLead", label: "Personal training ad leads", lead: true },
	{ id: "newsletter", label: "Newsletter signups", lead: true },
	{ id: "picnicForm", label: "Picnic signups", lead: true },
	{ id: "resume", label: "Career applications", lead: true },
	{ id: "group_classes_indiranagar", label: "LD group classes", lead: true },
	{ id: "personal_training_indiranagar", label: "LD personal training", lead: true },
	{ id: "ryt200_non_residential", label: "LD RYT200 non-residential", lead: true },
	{ id: "ryt_residential", label: "LD residential TTC", lead: true },
	{ id: "ttc_online", label: "LD online TTC", lead: true },
	{ id: "deleteAccount", label: "Account deletion requests", lead: false },
];

// PII first, then everything else alphabetically, so the sheet reads well.
const PREFERRED = [
	"name",
	"fullName",
	"email",
	"phone",
	"phoneNumber",
	"location",
	"serviceLookingFor",
	"source",
	"message",
];

const args = process.argv.slice(2);
const daysArg = args.find((a) => a.startsWith("--days="));
const days = daysArg ? Number(daysArg.split("=")[1]) : 30;
const makeXlsx = !args.includes("--no-xlsx");

if (!Number.isFinite(days) || days <= 0) {
	console.error("❌ --days must be a positive number");
	process.exit(1);
}

function normalize(value: unknown): unknown {
	if (value === null || value === undefined) return value;
	if (
		typeof value === "object" &&
		typeof (value as { toDate?: unknown }).toDate === "function"
	) {
		return (value as { toDate: () => Date }).toDate().toISOString();
	}
	if (Array.isArray(value)) return value.map(normalize);
	return value;
}

function csvCell(value: unknown): string {
	if (value === null || value === undefined) return "";
	const text = typeof value === "object" ? JSON.stringify(value) : String(value);
	return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
	const lines = [columns.map(csvCell).join(",")];
	for (const row of rows) {
		lines.push(columns.map((c) => csvCell(row[c])).join(","));
	}
	// BOM so Excel opens UTF-8 correctly. CRLF per RFC 4180.
	return "\ufeff" + lines.join("\r\n") + "\r\n";
}

function orderColumns(allRows: Record<string, unknown>[]): string[] {
	const present = new Set<string>();
	for (const row of allRows) for (const key of Object.keys(row)) present.add(key);
	present.delete("created_at");
	const preferred = PREFERRED.filter((k) => present.has(k));
	const rest = [...present].filter((k) => !PREFERRED.includes(k)).sort();
	return ["created_at", ...preferred, ...rest];
}

async function main() {
	const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

	console.log(`Project : ${projectId}`);
	console.log(`Env file: ${process.env.ENV_FILE || ".env.local"}`);
	console.log(`Window  : last ${days} days (since ${cutoff.toISOString()})`);
	console.log("");

	if (getApps().length === 0) {
		initializeApp({
			credential: cert(firebaseCredentials),
		});
	}
	const db = getFirestore();

	const outDir = resolve(import.meta.dirname, "..", "exports");
	const perCollectionDir = resolve(outDir, "by-collection");
	mkdirSync(perCollectionDir, { recursive: true });

	const combined: Record<string, unknown>[] = [];
	const summary: Array<{ id: string; label: string; total: number; inWindow: number }> =
		[];

	for (const collection of COLLECTIONS) {
		const ref = db.collection(collection.id);
		const totalAgg = await ref.count().get();
		const snapshot = await ref
			.where("createdAt", ">=", cutoff)
			.orderBy("createdAt", "desc")
			.get();

		const rows = snapshot.docs.map((doc) => {
			const raw = doc.data();
			const row: Record<string, unknown> = {
				form_collection: collection.id,
				created_at: normalize(raw.createdAt) ?? "",
				doc_id: doc.id,
			};
			for (const [key, value] of Object.entries(raw)) {
				if (key === "createdAt") continue;
				row[key] = normalize(value);
			}
			return row;
		});

		summary.push({
			id: collection.id,
			label: collection.label,
			total: totalAgg.data().count,
			inWindow: rows.length,
		});

		if (rows.length > 0) {
			const columns = orderColumns(rows);
			writeFileSync(
				resolve(perCollectionDir, `${collection.id}.csv`),
				toCsv(rows, columns),
			);
			combined.push(...rows);
		}
	}

	const pad = (s: string, n: number) => s.padEnd(n);
	console.log(`${pad("collection", 32)} ${pad("label", 30)} in-window / total`);
	for (const row of summary) {
		console.log(
			`${pad(row.id, 32)} ${pad(row.label, 30)} ${row.inWindow} / ${row.total}`,
		);
	}

	const totalLeads = summary
		.filter((r) => COLLECTIONS.find((c) => c.id === r.id)?.lead)
		.reduce((sum, r) => sum + r.inWindow, 0);
	console.log("");
	console.log(`Total rows in window : ${combined.length}`);
	console.log(`Of which marketing   : ${totalLeads} (excludes deleteAccount)`);

	if (combined.length === 0) {
		console.log("\nNo submissions in this window, nothing written.");
		return;
	}

	combined.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
	const combinedCsv = resolve(outDir, `leads-last-${days}d.csv`);
	writeFileSync(combinedCsv, toCsv(combined, orderColumns(combined)));

	console.log("");
	console.log(`✅ CSV written : ${combinedCsv}`);
	console.log(`✅ Per-form    : ${perCollectionDir}/<collection>.csv`);

	if (makeXlsx) {
		try {
			const profile = resolve(import.meta.dirname, "..", ".next", "lo-profile");
			mkdirSync(profile, { recursive: true });
			execFileSync(
				"soffice",
				[
					`-env:UserInstallation=file://${profile}`,
					"--headless",
					"--convert-to",
					"xlsx",
					"--outdir",
					outDir,
					combinedCsv,
				],
				{ stdio: "pipe", timeout: 120_000 },
			);
			const xlsx = resolve(outDir, `leads-last-${days}d.xlsx`);
			if (existsSync(xlsx)) console.log(`✅ XLSX written: ${xlsx}`);
			else console.log("⚠️  XLSX was not produced; use the CSV instead.");
		} catch (err) {
			console.error("⚠️  XLSX conversion failed, CSV is still valid:", err);
		}
	}

	console.log("");
	console.log(
		"⚠️  This file contains customer PII. exports/ is git-ignored - keep it that way,",
	);
	console.log(
		"    and do not paste it into tickets, chat, or the (public) repository.",
	);
}

main().catch((err) => {
	console.error("❌ Export failed:", err);
	process.exit(1);
});
