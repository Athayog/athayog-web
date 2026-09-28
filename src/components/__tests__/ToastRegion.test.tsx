import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastRegion from "@/components/ToastRegion";
import { useToastStore } from "@/store/useToastStore";

describe("ToastRegion", () => {
	beforeEach(() => {
		useToastStore.setState({ toasts: [] });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders an empty live region before any toast exists", () => {
		render(<ToastRegion />);
		const region = screen.getByRole("status");
		expect(region).toHaveAttribute("aria-live", "polite");
		expect(region).toBeEmptyDOMElement();
	});

	it("shows a pushed toast inside the live region", () => {
		render(<ToastRegion />);

		act(() => {
			useToastStore
				.getState()
				.push({ variant: "success", title: "Enquiry sent", message: "Thanks." });
		});

		expect(screen.getByText("Enquiry sent")).toBeInTheDocument();
		expect(screen.getByText("Thanks.")).toBeInTheDocument();
		expect(screen.getByRole("status")).toHaveTextContent("Enquiry sent");
	});

	it("can be dismissed by the user", async () => {
		const user = userEvent.setup();
		render(<ToastRegion />);

		act(() => {
			useToastStore
				.getState()
				.push({ variant: "error", title: "Something went wrong" });
		});

		await user.click(screen.getByRole("button", { name: /dismiss notification/i }));
		expect(useToastStore.getState().toasts).toHaveLength(0);
	});

	it("auto-dismisses after the timeout", () => {
		vi.useFakeTimers();
		render(<ToastRegion />);

		act(() => {
			useToastStore.getState().push({ variant: "success", title: "Enquiry sent" });
		});
		expect(useToastStore.getState().toasts).toHaveLength(1);

		act(() => {
			vi.advanceTimersByTime(6000);
		});
		expect(useToastStore.getState().toasts).toHaveLength(0);
	});
});
