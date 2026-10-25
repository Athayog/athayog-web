/**
 * The claim form's plan options, shared by the form and the pricing cards so a
 * card's "Claim This Offer" always preselects an option that actually exists.
 */
export const PLAN_OPTIONS = [
	"3-Month, ₹9,449",
	"6-Month, ₹13,999",
	"12-Month, ₹21,999",
	"Not sure yet, please advise",
] as const;

export type PlanOption = (typeof PLAN_OPTIONS)[number];
