"use client";

import { useCallback } from "react";
import { trackLead } from "@/lib/analytics";
import { useToastStore } from "@/store/useToastStore";

type SuccessFeedback = {
	title: string;
	message?: string;
	/**
	 * Form collection name, forwarded to the lead conversion events. Omit for
	 * non-lead submissions (career applications, account deletion) so they do
	 * not inflate conversion reporting.
	 */
	source?: string;
};

/**
 * Wires a form's submit outcome to the shared notification region and the
 * lead conversion pixels.
 */
export function useFormFeedback() {
	const push = useToastStore((s) => s.push);

	const notifySuccess = useCallback(
		({ title, message, source }: SuccessFeedback) => {
			if (source) trackLead(source);
			push({ variant: "success", title, message });
		},
		[push],
	);

	const notifyError = useCallback(
		(message?: string) => {
			push({
				variant: "error",
				title: "Something went wrong",
				message: message || "Please try again in a moment.",
			});
		},
		[push],
	);

	return { notifySuccess, notifyError };
}
