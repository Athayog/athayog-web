"use client";

import type { ReactNode } from "react";

type SubmitButtonProps = {
	children: ReactNode;
	isSubmitting: boolean;
	disabled?: boolean;
	className?: string;
};

export function SubmitButton({
	children,
	isSubmitting,
	disabled,
	className,
}: SubmitButtonProps) {
	return (
		<button
			type="submit"
			className={className || "btn btn-primary"}
			disabled={disabled || isSubmitting}
		>
			{isSubmitting ? "Submitting…" : children}
		</button>
	);
}
