import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactUsPage from "@/app/contact-us/page";
import { useToastStore } from "@/store/useToastStore";

describe("contact-us submit confirmation", () => {
	beforeEach(() => {
		useToastStore.setState({ toasts: [] });
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
		);
		vi.stubGlobal("fbq", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("keeps exactly one h1 in the form state", () => {
		render(<ContactUsPage />);
		expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
	});

	it("keeps exactly one h1 after submitting, and announces the result", async () => {
		const user = userEvent.setup();
		render(<ContactUsPage />);

		await user.type(screen.getByLabelText(/name/i), "Priya");
		await user.type(screen.getByLabelText(/email/i), "priya@example.com");
		await user.type(screen.getByLabelText(/phone/i), "9876543210");
		await user.type(
			screen.getByLabelText(/message/i),
			"I would like to know about trial classes.",
		);
		await user.click(screen.getByRole("button", { name: /send/i }));

		expect(await screen.findByText(/message sent/i)).toBeInTheDocument();

		const headings = screen.getAllByRole("heading", { level: 1 });
		expect(headings).toHaveLength(1);
		expect(headings[0]).toHaveTextContent("Message Sent");

		const [toast] = useToastStore.getState().toasts;
		expect(toast).toMatchObject({ variant: "success", title: "Message sent" });
		expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
			source: "contactMessages",
		});
	});
});
