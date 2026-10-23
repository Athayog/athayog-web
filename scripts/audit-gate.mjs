#!/usr/bin/env node
import { execFileSync } from "node:child_process";

// Audits dependencies and fails on any HIGH/CRITICAL advisory that is not
// explicitly accepted below.
//
// Why not just `npm audit --audit-level=high`: some advisories have no patched
// release at all. A raw gate fails forever on those, which trains everyone to
// ignore the check. This gate stays strict for anything new while keeping the
// handful of unfixable ones visible and justified.
//
// Rules for ACCEPTED:
//   - one entry per advisory, with the reason and what would clear it
//   - remove the entry as soon as a fix ships
//   - never add an advisory just to make a red build green

const ACCEPTED = new Map([
	[
		"GHSA-86w9-cpqp-85rv",
		"node-forge RSA PKCS#1 v1.5 signature verification (via firebase-admin v12). " +
			"No patched node-forge release exists. The only npm fix is firebase-admin 14, " +
			"which breaks the Vercel build (jose@6 / ERR_REQUIRE_ESM). Revisit when " +
			"firebase-admin can move off v12.",
	],
]);

function runAudit() {
	try {
		return execFileSync("npm", ["audit", "--json"], {
			encoding: "utf8",
			maxBuffer: 64 * 1024 * 1024,
		});
	} catch (error) {
		// npm audit exits non-zero when vulnerabilities exist; the JSON report
		// is still written to stdout.
		if (error.stdout) return error.stdout;
		throw error;
	}
}

function advisoryId(via) {
	const url = via.url ?? "";
	const id = url.split("/").pop();
	return id || via.title || "(unknown)";
}

const report = JSON.parse(runAudit());
const vulnerabilities = report.vulnerabilities ?? {};

const advisories = new Map();
for (const [name, vulnerability] of Object.entries(vulnerabilities)) {
	if (vulnerability.severity !== "high" && vulnerability.severity !== "critical") {
		continue;
	}
	for (const via of vulnerability.via ?? []) {
		// A string `via` only means "depends on a flagged package"; the advisory
		// itself is reported on the package that owns it.
		if (typeof via !== "object") continue;
		const id = advisoryId(via);
		if (!advisories.has(id)) {
			advisories.set(id, {
				id,
				title: via.title ?? "(no title)",
				severity: via.severity ?? vulnerability.severity,
				packages: new Set(),
			});
		}
		advisories.get(id).packages.add(name);
	}
}

const accepted = [];
const blocking = [];
for (const advisory of advisories.values()) {
	(ACCEPTED.has(advisory.id) ? accepted : blocking).push(advisory);
}

console.log(`Audit gate: ${advisories.size} HIGH/CRITICAL advisories found.`);

for (const advisory of accepted) {
	console.log(`\n  ACCEPTED ${advisory.id} [${advisory.severity}]`);
	console.log(`  ${advisory.title}`);
	console.log(`  affects: ${[...advisory.packages].join(", ")}`);
	console.log(`  reason: ${ACCEPTED.get(advisory.id)}`);
}

for (const advisory of blocking) {
	console.log(`\n  BLOCKING ${advisory.id} [${advisory.severity}]`);
	console.log(`  ${advisory.title}`);
	console.log(`  affects: ${[...advisory.packages].join(", ")}`);
}

if (blocking.length > 0) {
	console.error(
		`\n❌ ${blocking.length} unaccepted HIGH/CRITICAL advisor${blocking.length === 1 ? "y" : "ies"}.`,
	);
	console.error(
		"   Patch it, or add a justified entry to ACCEPTED in scripts/audit-gate.mjs.",
	);
	process.exit(1);
}

console.log("\n✅ No unaccepted HIGH/CRITICAL advisories.");
