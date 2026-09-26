import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GroupClassesLdForm from "../GroupClassesLdForm";

const PROPS = {
	badge: "Book a trial",
	title: "Check batch timings and trial",
	intro: "Share a few details and we will send today's available batches.",
};

describe("GroupClassesLdForm confirmation", () => {
	beforeEach(() => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("renders an empty live region before submitting so the update is announced", () => {
		render(<GroupClassesLdForm {...PROPS} />);

		const status = screen.getByRole("status");
		expect(status).toHaveAttribute("aria-live", "polite");
		expect(status).toBeEmptyDOMElement();
		expect(screen.getByRole("button", { name: /send enquiry/i })).toBeInTheDocument();
	});

	it("replaces the whole card body with an announced confirmation", async () => {
		const user = userEvent.setup();
		render(<GroupClassesLdForm {...PROPS} />);

		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText("Phone"), "9876543210");
		await user.click(screen.getByRole("button", { name: /send enquiry/i }));

		const confirmation = await screen.findByText(/thank you/i);
		expect(confirmation).toBeInTheDocument();
		expect(screen.getByRole("status")).toHaveTextContent(/thank you/i);

		expect(
			screen.queryByRole("button", { name: /send enquiry/i }),
		).not.toBeInTheDocument();
		expect(screen.queryByText(PROPS.title)).not.toBeInTheDocument();
		expect(screen.queryByText(PROPS.intro)).not.toBeInTheDocument();
		expect(screen.queryByRole("link", { name: /whatsapp/i })).not.toBeInTheDocument();
	});

	it("posts to the landing page collection", async () => {
		const user = userEvent.setup();
		render(<GroupClassesLdForm {...PROPS} />);

		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText("Phone"), "9876543210");
		await user.click(screen.getByRole("button", { name: /send enquiry/i }));
		await screen.findByText(/thank you/i);

		const [, init] = vi.mocked(fetch).mock.calls[0];
		const body = JSON.parse(init?.body as string);
		expect(body.collection).toBe("group_classes_indiranagar");
		expect(body.data).toMatchObject({ name: "Priya", phone: "9876543210" });
	});
});
