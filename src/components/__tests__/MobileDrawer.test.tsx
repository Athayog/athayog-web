import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileDrawer from "../MobileDrawer";
import useAuthStore from "@/store/useAuthStore";

vi.mock("@/lib/firebase", () => ({
	auth: {
		onAuthStateChanged: vi.fn(),
	},
	db: {},
}));

vi.mock("next/navigation", () => ({
	usePathname: () => "/",
}));

describe("MobileDrawer component", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			userSnapshot: null,
			isAuthenticated: false,
		});
	});

	it("renders burger button to toggle mobile menu", () => {
		render(<MobileDrawer />);
		const burgerBtn = screen.getByRole("button", { name: "Open menu" });
		expect(burgerBtn).toBeInTheDocument();
	});
});
