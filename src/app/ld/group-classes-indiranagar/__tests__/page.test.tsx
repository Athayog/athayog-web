import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/consent", () => ({
	hasFunctionalConsent: () => false,
	onConsentChange: () => () => {},
}));

import GroupClassesLdPage from "../page";

describe("ld/group-classes-indiranagar page", () => {
	it("renders a single h1 with the primary keyword", () => {
		render(<GroupClassesLdPage />);
		const headings = screen.getAllByRole("heading", { level: 1 });
		expect(headings).toHaveLength(1);
		expect(headings[0].textContent).toContain("Group Yoga Classes");
	});

	it("uses the site phone number for call and WhatsApp CTAs", () => {
		render(<GroupClassesLdPage />);
		const links = screen.getAllByRole("link");
		expect(links.some((a) => a.getAttribute("href") === "tel:+919611771434")).toBe(
			true,
		);
		expect(
			links.some((a) =>
				(a.getAttribute("href") || "").startsWith("https://wa.me/919611771434"),
			),
		).toBe(true);
		expect(
			links.some((a) => (a.getAttribute("href") || "").includes("8690333111")),
		).toBe(false);
	});

	it("exposes the answer-first block and FAQ for structured data", () => {
		render(<GroupClassesLdPage />);
		expect(document.getElementById("aeo-answer")).toBeInTheDocument();
		expect(document.getElementById("faq")).toBeInTheDocument();
	});
});
