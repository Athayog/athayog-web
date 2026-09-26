import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TtcOnlineLdForm from "../TtcOnlineLdForm";

describe("TtcOnlineLdForm confirmation", () => {
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
		render(<TtcOnlineLdForm />);

		const status = screen.getByRole("status");
		expect(status).toHaveAttribute("aria-live", "polite");
		expect(status).toBeEmptyDOMElement();
		expect(screen.getByRole("button", { name: /send enquiry/i })).toBeInTheDocument();
	});

	it("announces the confirmation and replaces the form after a successful submit", async () => {
		const user = userEvent.setup();
		render(<TtcOnlineLdForm />);

		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText("Phone"), "9876543210");
		await user.click(screen.getByRole("button", { name: /send enquiry/i }));

		expect(await screen.findByText(/enquiry received/i)).toBeInTheDocument();
		expect(screen.getByRole("status")).toHaveTextContent(/enquiry received/i);
		expect(
			screen.queryByRole("button", { name: /send enquiry/i }),
		).not.toBeInTheDocument();
	});

	it("posts to the online TTC collection", async () => {
		const user = userEvent.setup();
		render(<TtcOnlineLdForm />);

		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText("Phone"), "9876543210");
		await user.click(screen.getByRole("button", { name: /send enquiry/i }));
		await screen.findByText(/enquiry received/i);

		const [, init] = vi.mocked(fetch).mock.calls[0];
		const body = JSON.parse(init?.body as string);
		expect(body.collection).toBe("ttc_online");
		expect(body.data).toMatchObject({ name: "Priya", phone: "9876543210" });
	});
});
