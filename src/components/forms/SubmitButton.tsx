"use client";

import type { ReactNode } from "react";

type SubmitButtonProps = {
	children: ReactNode;
	isSubmitting: boolean;
	disabled?: boolean;
};

export function SubmitButton({ children, isSubmitting, disabled }: SubmitButtonProps) {
	return (
		<button
			type="submit"
			className="btn btn-primary"
			disabled={disabled || isSubmitting}
		>
			{isSubmitting ? "Submitting…" : children}
		</button>
	);
}
