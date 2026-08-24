import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentModal from "../PaymentModal";
import useAuthStore from "@/store/useAuthStore";

vi.mock("@/lib/firebase", () => ({
	auth: {
		onAuthStateChanged: vi.fn(),
	},
	db: {},
}));

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: pushMock,
	}),
}));

describe("PaymentModal component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useAuthStore.setState({
			isAuthenticated: false,
		});
	});

	it("renders trigger button children", () => {
		render(
			<PaymentModal
				planId="group-monthly"
				planName="Group Monthly Pass"
				subtotal={4000}
				total={4000}
			>
				Subscribe Now
			</PaymentModal>,
		);

		const button = screen.getByRole("button", { name: "Subscribe Now" });
		expect(button).toBeInTheDocument();
	});

	it("redirects unauthenticated user to login on click", () => {
		render(
			<PaymentModal
				planId="group-monthly"
				planName="Group Monthly Pass"
				subtotal={4000}
				total={4000}
			>
				Subscribe Now
			</PaymentModal>,
		);

		const button = screen.getByRole("button", { name: "Subscribe Now" });
		fireEvent.click(button);

		// Should send the user to login with a redirect back to the pricing
		// section (highlighting their intended plan) so they can resume.
		expect(pushMock).toHaveBeenCalledWith(
			"/login?redirect=%2F%3Fplan%3Dgroup-monthly%23pricing",
		);
	});
});
