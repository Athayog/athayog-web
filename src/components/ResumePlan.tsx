"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// After a user returns from login (PaymentModal sends
// ?plan=<planId>#pricing), scroll to and highlight the pricing card they
// intended to buy, and show a resume hint so they know what's next.
export default function ResumePlan() {
	const searchParams = useSearchParams();
	const plan = searchParams.get("plan");

	useEffect(() => {
		if (!plan) return;
		const id = `plan-${plan}`;
		const timer = setTimeout(() => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "center" });
				el.classList.add("resume-highlight");
			}
		}, 0);
		return () => clearTimeout(timer);
	}, [plan]);

	if (!plan) return null;
	return (
		<p className="resume-note">
			Ready when you are. Click Enrol to continue your enrollment.
		</p>
	);
}
