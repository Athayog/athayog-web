import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
		if (priority) {
			return <img data-testid="hero-priority" {...rest} fetchPriority="high" />;
		}
		return <img {...rest} />;
		/* eslint-enable @next/next/no-img-element, jsx-a11y/alt-text */
	},
}));

import AboutUsPage from "../page";

describe("about-us image health", () => {
	it("every image has a non-empty alt attribute", () => {
		render(<AboutUsPage />);
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThan(0);
		for (const img of images) {
			expect(img).toHaveAttribute("alt");
			expect(img.getAttribute("alt")).not.toBe("");
		}
	});

	it("hero image uses priority preload for LCP", () => {
		render(<AboutUsPage />);
		expect(screen.getByTestId("hero-priority")).toBeInTheDocument();
	});

	it("shows all four faculty members with photos", () => {
		render(<AboutUsPage />);
		for (const name of [
			"Sharath Basavaraju",
			"Esha Reddy",
			"Ishita Kulkarni",
			"Manoj Kumar",
		]) {
			expect(screen.getAllByText(name).length).toBeGreaterThan(0);
		}
		expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(4);
	});
});
