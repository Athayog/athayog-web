import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GroupClassesLdForm from "../GroupClassesLdForm";
import { useToastStore } from "@/store/useToastStore";

const PROPS = {
	badge: "Book a trial",
	title: "Check batch timings and trial",
	intro: "Share a few details and we will send today's available batches.",
};

describe("GroupClassesLdForm confirmation", () => {
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

	async function submit() {
		const user = userEvent.setup();
		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText("Phone"), "9876543210");
		await user.click(screen.getByRole("button", { name: /send enquiry/i }));
	}

	it("replaces the whole card body with the confirmation", async () => {
		render(<GroupClassesLdForm {...PROPS} />);
		await submit();

		expect(await screen.findByText(/thank you/i)).toBeInTheDocument();

		expect(
			screen.queryByRole("button", { name: /send enquiry/i }),
		).not.toBeInTheDocument();
		expect(screen.queryByText(PROPS.title)).not.toBeInTheDocument();
		expect(screen.queryByText(PROPS.intro)).not.toBeInTheDocument();
		expect(screen.queryByRole("link", { name: /whatsapp/i })).not.toBeInTheDocument();
	});

	it("raises a success toast and fires the lead pixel", async () => {
		render(<GroupClassesLdForm {...PROPS} />);
		await submit();
		await screen.findByText(/thank you/i);

		const [toast] = useToastStore.getState().toasts;
		expect(toast).toMatchObject({ variant: "success", title: "Enquiry sent" });
		expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
			source: "group_classes_indiranagar",
		});
	});

	it("raises an error toast when the api fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Too many requests." }),
			}),
		);
		render(<GroupClassesLdForm {...PROPS} />);
		await submit();

		await vi.waitFor(() => {
			const [toast] = useToastStore.getState().toasts;
			expect(toast).toMatchObject({
				variant: "error",
				title: "Something went wrong",
				message: "Too many requests.",
			});
		});
		expect(window.fbq).not.toHaveBeenCalled();
	});

	it("posts to the landing page collection", async () => {
		render(<GroupClassesLdForm {...PROPS} />);
		await submit();
		await screen.findByText(/thank you/i);

		const [, init] = vi.mocked(fetch).mock.calls[0];
		const body = JSON.parse(init?.body as string);
		expect(body.collection).toBe("group_classes_indiranagar");
		expect(body.data).toMatchObject({ name: "Priya", phone: "9876543210" });
	});
});
