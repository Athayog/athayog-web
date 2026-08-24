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

vi.mock("@/lib/firebase", () => ({
	auth: { onAuthStateChanged: vi.fn() },
	db: {},
	storage: {},
	app: {},
	googleProvider: {},
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	useSearchParams: () => new URLSearchParams(),
}));

import GroupClassesPage from "../page";

describe("group-classes image health", () => {
	it("every image has a non-empty alt attribute", () => {
		render(<GroupClassesPage />);
		const images = screen.getAllByRole("img");
		expect(images.length).toBeGreaterThan(0);
		for (const img of images) {
			expect(img).toHaveAttribute("alt");
			expect(img.getAttribute("alt")).not.toBe("");
		}
	});

	it("hero image uses priority preload for LCP", () => {
		render(<GroupClassesPage />);
		expect(screen.getByTestId("hero-priority")).toBeInTheDocument();
	});
});
