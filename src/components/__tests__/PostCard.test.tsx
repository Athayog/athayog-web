import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const { mockPrismicText, mockPrismicNextImage } = vi.hoisted(() => ({
	mockPrismicText: vi.fn(({ field }: { field: { text: string }[] }) => (
		<span>{field?.[0]?.text}</span>
	)),
	mockPrismicNextImage: vi.fn(
		({
			field,
			className,
			fallbackAlt,
		}: {
			field: { url: string; alt?: string };
			className?: string;
			fallbackAlt?: string;
		}) =>
			field?.url ? (
				<img
					src={field.url}
					alt={fallbackAlt || field.alt || ""}
					className={className}
					data-testid="prismic-img"
				/>
			) : null,
	),
}));

vi.mock("@prismicio/react", () => ({
	PrismicText: mockPrismicText,
}));

vi.mock("@prismicio/next", () => ({
	PrismicNextImage: mockPrismicNextImage,
}));

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

import { PostCard } from "@/components/PostCard";

function makePost(overrides: Record<string, unknown> = {}) {
	return {
		id: "test-post-1",
		uid: "test-uid",
		data: {
			title: [{ type: "heading1", text: "Test Blog Post" }],
			description: [{ type: "paragraph", text: "A test description" }],
			publication_date: "2025-01-15",
			featured_image: {
				url: "https://images.prismic.io/test/image.jpg",
				alt: "Test image",
			},
			...overrides,
		},
	};
}

describe("PostCard", () => {
	it("renders the blog title", () => {
		render(<PostCard post={makePost()} />);
		expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
	});

	it("links to the correct blog URL", () => {
		render(<PostCard post={makePost()} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/blogs/test-uid");
	});

	it("renders the featured image when present", () => {
		render(<PostCard post={makePost()} />);
		const img = screen.getByTestId("prismic-img");
		expect(img).toHaveAttribute("src", "https://images.prismic.io/test/image.jpg");
	});

	it("does not render image when featured_image is missing", () => {
		render(<PostCard post={makePost({ featured_image: null })} />);
		expect(screen.queryByTestId("prismic-img")).not.toBeInTheDocument();
	});
});
