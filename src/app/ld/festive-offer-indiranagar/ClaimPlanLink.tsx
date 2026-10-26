"use client";

import { usePlanPickStore } from "@/app/ld/festive-offer-indiranagar/planPickStore";
import type { PlanOption } from "@/app/ld/festive-offer-indiranagar/plans";
import styles from "@/app/ld/festive-offer-indiranagar/FestiveOffer.module.css";

type ClaimPlanLinkProps = {
	plan: PlanOption;
	featured?: boolean;
};

/**
 * A pricing card CTA that jumps to the claim form and preselects that plan, so
 * the visitor does not have to choose the same plan twice.
 */
export default function ClaimPlanLink({ plan, featured = false }: ClaimPlanLinkProps) {
	const choose = usePlanPickStore((s) => s.choose);

	return (
		<a
			href="#claim"
			className={`btn ${featured ? styles.goldBtn : "btn-ghost"}`}
			onClick={() => choose(plan)}
		>
			Claim This Offer
		</a>
	);
}
