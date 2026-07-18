import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/useReveal", () => ({
	useReveal: () => ({
		ref: { current: null },
		inView: false,
	}),
}));

import Reveal from "@/components/Reveal";

describe("Reveal", () => {
	it("renders children", () => {
		render(
			<Reveal>
				<p>Hello</p>
			</Reveal>,
		);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("applies default className", () => {
		render(
			<Reveal>
				<span>test</span>
			</Reveal>,
		);
		const el = screen.getByText("test").parentElement;
		expect(el?.className).toContain("reveal");
	});

	it("applies custom className alongside reveal", () => {
		render(
			<Reveal className="custom">
				<span>x</span>
			</Reveal>,
		);
		const el = screen.getByText("x").parentElement;
		expect(el?.className).toContain("reveal");
		expect(el?.className).toContain("custom");
	});

	it("renders with custom tag via as prop", () => {
		render(
			<Reveal as="section">
				<p>content</p>
			</Reveal>,
		);
		const section = screen.getByText("content").closest("section");
		expect(section).toBeInTheDocument();
	});
});
