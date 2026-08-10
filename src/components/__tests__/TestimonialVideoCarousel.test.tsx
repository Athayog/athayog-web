import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: ({ alt, src }: { alt: string; src: string }) => (
		<span aria-label={alt} data-src={src} />
	),
}));

import TestimonialVideoCarousel from "@/components/TestimonialVideoCarousel";

const videos = [
	{
		id: "review-01",
		src: "/video/Review_01.mp4",
		poster: "/video/posters/Review_01.webp",
		alt: "First member testimonial",
	},
];

describe("TestimonialVideoCarousel", () => {
	it("does not create a video element until a visitor chooses to play one", () => {
		render(<TestimonialVideoCarousel videos={videos} />);

		expect(document.querySelector("video source")).not.toBeInTheDocument();
		expect(screen.getByLabelText("First member testimonial")).toHaveAttribute(
			"data-src",
			"/video/posters/Review_01.webp",
		);

		fireEvent.click(
			screen.getByRole("button", { name: "Play First member testimonial" }),
		);

		expect(document.querySelector("video source")).toHaveAttribute(
			"src",
			"/video/Review_01.mp4",
		);
	});
});
