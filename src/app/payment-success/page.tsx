import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Payment Successful | Athayog Living",
	robots: { index: false, follow: false },
};

const PLAN_NAMES: Record<string, string> = {
	"group-drop-in": "Drop-in",
	"group-1-month": "1 Month",
	"group-3-month": "3 Months",
	"group-6-month": "6 Months",
	"group-12-month": "12 Months",
	"group-couple-year": "Couple · 1 Year",
};

async function SuccessContent({ planParam }: { planParam: string | undefined }) {
	const planName = PLAN_NAMES[planParam || ""] || "your plan";

	return (
		<div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
			<span className="eyebrow">Thank You</span>
			<h2 style={{ marginTop: 8 }}>Payment Successful</h2>
			<p className="lead" style={{ marginBottom: 24 }}>
				Your {planName} is now active. Welcome to Athayog Living!
			</p>
			<div
				style={{
					display: "flex",
					gap: 14,
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				<Link href="/account" className="btn btn-primary">
					View in My Account
				</Link>
				<Link href="/group-classes-indiranagar" className="btn btn-ghost">
					Back to Classes
				</Link>
			</div>
		</div>
	);
}

export default async function PaymentSuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ plan?: string }>;
}) {
	const { plan } = await searchParams;

	return (
		<section style={{ background: "var(--cream)" }}>
			<div className="wrap">
				<Suspense
					fallback={
						<div style={{ textAlign: "center", padding: 48 }}>Loading…</div>
					}
				>
					<SuccessContent planParam={plan} />
				</Suspense>
			</div>
		</section>
	);
}
