"use client";

import { type ReactNode, type ElementType } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	threshold?: number;
};

export default function Reveal({
	children,
	as: Tag = "div",
	className = "",
	threshold = 0.12,
}: RevealProps) {
	const { ref, inView } = useReveal<HTMLDivElement>(threshold);

	return (
		<Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`.trim()}>
			{children}
		</Tag>
	);
}
