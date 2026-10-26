import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FestiveOfferForm from "../FestiveOfferForm";
import { useToastStore } from "@/store/useToastStore";
import { usePlanPickStore } from "@/app/ld/festive-offer-indiranagar/planPickStore";

describe("FestiveOfferForm", () => {
	beforeEach(() => {
		useToastStore.setState({ toasts: [] });
		usePlanPickStore.setState({ pendingPlan: null });
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
		await user.type(screen.getByLabelText(/phone/i), "9876543210");
		await user.selectOptions(
			screen.getByLabelText(/plan you want/i),
			"6-Month, ₹13,999",
		);
		await user.click(screen.getByRole("button", { name: /claim my festive/i }));
	}

	it("offers the three festive plans plus an advise option", () => {
		render(<FestiveOfferForm />);
		const select = screen.getByLabelText(/plan you want/i);

		expect(select.tagName).toBe("SELECT");
		for (const option of [
			"3-Month, ₹9,449",
			"6-Month, ₹13,999",
			"12-Month, ₹21,999",
			"Not sure yet, please advise",
		]) {
			expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
		}
	});

	it("will not submit until a plan is chosen", async () => {
		const user = userEvent.setup();
		render(<FestiveOfferForm />);

		await user.type(screen.getByLabelText("Name"), "Priya");
		await user.type(screen.getByLabelText(/phone/i), "9876543210");
		await user.click(screen.getByRole("button", { name: /claim my festive/i }));

		expect(await screen.findByText(/please select a plan/i)).toBeInTheDocument();
		expect(fetch).not.toHaveBeenCalled();
	});

	it("posts the claim, confirms inline, toasts and fires the lead pixel", async () => {
		render(<FestiveOfferForm />);
		await submit();

		expect(await screen.findByText(/offer claimed/i)).toBeInTheDocument();

		const [, init] = vi.mocked(fetch).mock.calls[0];
		const body = JSON.parse(init?.body as string);
		expect(body.collection).toBe("festiveOffer");
		expect(body.data).toMatchObject({
			name: "Priya",
			phone: "9876543210",
			plan: "6-Month, ₹13,999",
		});

		const [toast] = useToastStore.getState().toasts;
		expect(toast).toMatchObject({ variant: "success", title: "Offer claimed" });
		expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
			source: "festiveOffer",
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
		render(<FestiveOfferForm />);
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

	it("applies a plan chosen from a pricing card, then clears it", () => {
		usePlanPickStore.getState().choose("3-Month, ₹9,449");
		render(<FestiveOfferForm />);

		expect(screen.getByLabelText(/plan you want/i)).toHaveValue("3-Month, ₹9,449");
		expect(usePlanPickStore.getState().pendingPlan).toBeNull();
	});
});
