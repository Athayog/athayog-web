import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useSearchParams: () => new URLSearchParams(),
}));

import FestiveOfferPage from "../page";

describe("ld/festive-offer-indiranagar page", () => {
	it("renders a single h1", () => {
		render(<FestiveOfferPage />);
		const headings = screen.getAllByRole("heading", { level: 1 });
		expect(headings).toHaveLength(1);
		expect(headings[0].textContent).toContain("Festive Season");
	});

	it("shows all three festive prices with their strike-through MRP", () => {
		render(<FestiveOfferPage />);
		for (const [mrp, now] of [
			["₹10,499", "₹9,449"],
			["₹16,799", "₹13,999"],
			["₹27,299", "₹21,999"],
		]) {
			expect(screen.getByText(mrp)).toBeInTheDocument();
			expect(screen.getByText(now)).toBeInTheDocument();
		}
	});

	it("uses the site phone number, never the second number from the mockup", () => {
		render(<FestiveOfferPage />);
		const links = screen.getAllByRole("link");
		expect(links.some((a) => a.getAttribute("href") === "tel:+919611771434")).toBe(
			true,
		);
		expect(
			links.some((a) => (a.getAttribute("href") || "").includes("8690333111")),
		).toBe(false);
	});

	it("exposes the claim anchor and the FAQ for structured data", () => {
		render(<FestiveOfferPage />);
		expect(document.getElementById("claim")).toBeInTheDocument();
		expect(document.getElementById("plans")).toBeInTheDocument();
	});
});
