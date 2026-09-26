import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/image", () => ({
	default: (
		props: React.ImgHTMLAttributes<HTMLImageElement> & {
			priority?: boolean;
			fill?: boolean;
		},
	) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { priority, fill: _fill, ...rest } = props;
		/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
		return <img {...rest} />;
		/* eslint-enable @next/next/no-img-element, jsx-a11y/alt-text */
	},
}));

import TtcOnlineLdPage from "../page";

describe("ld/yoga-ttc-online-certification page", () => {
	it("every image has a non-empty alt attribute", () => {
		render(<TtcOnlineLdPage />);
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThanOrEqual(9);
		for (const img of images) {
			expect(img).toHaveAttribute("alt");
			expect(img.getAttribute("alt")).not.toBe("");
		}
	});

	it("renders a single h1 about the online TTC", () => {
		render(<TtcOnlineLdPage />);
		const headings = screen.getAllByRole("heading", { level: 1 });
		expect(headings).toHaveLength(1);
		expect(headings[0].textContent).toContain("Online Yoga Teacher Training");
	});

	it("uses the site phone number for call CTAs", () => {
		render(<TtcOnlineLdPage />);
		const links = screen.getAllByRole("link");
		expect(links.some((a) => a.getAttribute("href") === "tel:+919611771434")).toBe(
			true,
		);
		expect(
			links.some((a) => (a.getAttribute("href") || "").includes("8690333111")),
		).toBe(false);
	});

	it("exposes the answer-first block and FAQ for structured data", () => {
		render(<TtcOnlineLdPage />);
		expect(document.getElementById("aeo-answer")).toBeInTheDocument();
		expect(document.getElementById("faq")).toBeInTheDocument();
	});
});
