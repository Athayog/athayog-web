"use client";

import { useState } from "react";
import styles from "@/app/personal-yoga-training-indiranagar/PT.module.css";

type Mode = "studio" | "online" | "home";

const PRICES: Record<Mode, { p12: string; p24: string; pc: string; loc: string }> = {
	studio: {
		p12: "₹18,999",
		p24: "₹31,999",
		pc: "₹31,999",
		loc: "at studio",
	},
	online: {
		p12: "₹14,999",
		p24: "₹25,499",
		pc: "₹25,499",
		loc: "online",
	},
	home: {
		p12: "₹27,999",
		p24: "₹44,599",
		pc: "₹44,599",
		loc: "at home",
	},
};

export default function PricingModebar() {
	const [mode, setMode] = useState<Mode>("studio");
	const p = PRICES[mode];

	return (
		<>
			<div
				className={styles.modebar}
				role="tablist"
				aria-label="Choose where you train"
			>
				{(["studio", "online", "home"] as Mode[]).map((m) => (
					<button
						key={m}
						className={`${styles.modeBtn} ${mode === m ? styles.active : ""}`}
						role="tab"
						aria-selected={mode === m}
						onClick={() => setMode(m)}
					>
						{m === "studio"
							? "At Studio"
							: m === "online"
								? "Online"
								: "At Home"}
					</button>
				))}
			</div>

			<div className={styles.priceGrid}>
				<div className={styles.tier}>
					<h3>12 Sessions</h3>
					<div className={styles.amt}>
						{p.p12}
						<small>+ 5% GST · 12 days</small>
					</div>
					<p>
						Twelve one-on-one sessions with your personalized plan — ideal to
						build a strong, consistent practice.
					</p>
					<div className={styles.incl}>
						1-on-1 · personalized plan · progress tracking · {p.loc}
					</div>
					<a
						href="https://athayogliving.com/register/enquire-personal-session-form"
						className="btn btn-light"
					>
						Enquire
					</a>
				</div>
				<div className={`${styles.tier} ${styles.feature}`}>
					<span className={styles.badge}>Best value</span>
					<h3>24 Sessions</h3>
					<div className={styles.amt}>
						{p.p24}
						<small>+ 5% GST · 24 days</small>
					</div>
					<p>
						Twenty-four sessions for deeper, lasting results — the most
						popular choice for real transformation.
					</p>
					<div className={styles.incl}>
						Everything in 12 · extended progression · {p.loc}
					</div>
					<a
						href="https://athayogliving.com/register/enquire-personal-session-form"
						className="btn btn-cream"
					>
						Enquire
					</a>
				</div>
				<div className={styles.tier}>
					<h3>Couple · 12 Sessions</h3>
					<div className={styles.amt}>
						{p.pc}
						<small>+ 5% GST · 12 days · for two</small>
					</div>
					<p>
						Train together — twelve one-on-one sessions for two, sharing the
						journey and the motivation.
					</p>
					<div className={styles.incl}>Two people · 12 sessions · {p.loc}</div>
					<a
						href="https://athayogliving.com/register/enquire-personal-session-form"
						className="btn btn-light"
					>
						Enquire
					</a>
				</div>
			</div>
		</>
	);
}
