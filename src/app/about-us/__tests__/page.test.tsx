import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: (
		props: React.ImgHTMLAttributes<HTMLImageElement> & {
			priority?: boolean;
			fill?: boolean;
		},
	) => {
		const { priority, ...rest } = props;
		if (priority) {
			return <img data-testid="hero-priority" {...rest} fetchPriority="high" />;
		}
		return <img {...rest} />;
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
});
