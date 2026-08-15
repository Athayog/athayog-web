import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { RichTextField } from "@prismicio/client";
import { RichTextBlog } from "@/components/RichTextBlog";

vi.mock("@prismicio/react", () => ({
	PrismicRichText: ({ field }: { field: { type: string; text?: string }[] }) => (
		<>
			{field.map((block, i) => (
				<p key={i} data-testid="rich-paragraph">
					{block.text}
				</p>
			))}
		</>
	),
	PrismicLink: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function tableField(text: string): RichTextField {
	return [{ type: "paragraph", text, spans: [] }] as RichTextField;
}

describe("RichTextBlog", () => {
	it("renders a table from a [table] block", () => {
		const text = `[table]
Factor | Group Class
Pace | Fixed for the group
[/table]`;

		render(<RichTextBlog field={tableField(text)} />);

		expect(screen.getByRole("table")).toBeInTheDocument();
		const headers = screen.getAllByRole("columnheader");
		expect(headers.map((h) => h.textContent)).toEqual(["Factor", "Group Class"]);
		const cells = screen.getAllByRole("cell");
		expect(cells.map((c) => c.textContent)).toEqual(["Pace", "Fixed for the group"]);
	});

	it("keeps normal paragraphs as paragraphs", () => {
		render(<RichTextBlog field={tableField("Just a normal paragraph.")} />);

		expect(screen.queryByRole("table")).not.toBeInTheDocument();
		expect(screen.getByText("Just a normal paragraph.")).toBeInTheDocument();
	});

	it("renders text before and after a table", () => {
		const text = `Before text.
[table]
A | B
1 | 2
[/table]
After text.`;

		render(<RichTextBlog field={tableField(text)} />);

		expect(screen.getByText("Before text.")).toBeInTheDocument();
		expect(screen.getByText("After text.")).toBeInTheDocument();
		expect(screen.getByRole("table")).toBeInTheDocument();
	});
});
