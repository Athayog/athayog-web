import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SubmitButton } from "@/components/forms/SubmitButton";

describe("SubmitButton", () => {
	it("renders children when not submitting", () => {
		render(<SubmitButton isSubmitting={false}>Send</SubmitButton>);
		expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
	});

	it("shows 'Submitting…' when isSubmitting is true", () => {
		render(<SubmitButton isSubmitting={true}>Send</SubmitButton>);
		const btn = screen.getByRole("button");
		expect(btn).toHaveTextContent("Submitting…");
	});

	it("is disabled when isSubmitting is true", () => {
		render(<SubmitButton isSubmitting={true}>Send</SubmitButton>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("is disabled when disabled prop is true", () => {
		render(
			<SubmitButton isSubmitting={false} disabled={true}>
				Send
			</SubmitButton>,
		);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
