"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setInView(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold },
		);

		const raf = requestAnimationFrame(() => {
			observer.observe(el);
		});

		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	}, [threshold]);

	return { ref, inView };
}
