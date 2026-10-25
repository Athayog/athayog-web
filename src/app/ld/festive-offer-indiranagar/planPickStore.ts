"use client";

import { create } from "zustand";
import type { PlanOption } from "@/app/ld/festive-offer-indiranagar/plans";

interface PlanPickState {
	/** A plan chosen from a pricing card, waiting to be applied to the form. */
	pendingPlan: PlanOption | null;
	choose: (plan: PlanOption) => void;
	clear: () => void;
}

export const usePlanPickStore = create<PlanPickState>((set) => ({
	pendingPlan: null,
	choose: (plan) => set({ pendingPlan: plan }),
	clear: () => set({ pendingPlan: null }),
}));
