import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";
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

describe("Header component", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			userSnapshot: null,
			isAuthenticated: false,
		});
	});

	it("renders brand logo with correct alt attribute", () => {
		render(<Header />);
		const logo = screen.getByAltText("Athayog Living");
		expect(logo).toBeInTheDocument();
	});

	it("renders primary nav links", () => {
		render(<Header />);
		const nav = screen.getByRole("navigation", { name: "Primary" });
		expect(nav).toBeInTheDocument();
	});

	it("renders Login link when user is not authenticated", () => {
		render(<Header />);
		const loginLink = screen.getByRole("link", { name: /login/i });
		expect(loginLink).toBeInTheDocument();
		expect(loginLink.getAttribute("href")).toBe("/login");
	});

	it("renders AccountMenu button when user is authenticated", () => {
		useAuthStore.setState({
			isAuthenticated: true,
			userSnapshot: {
				uid: "user-1",
				displayName: "Jane Doe",
				email: "jane@example.com",
				photoURL: null,
				phoneNumber: null,
			},
		});

		render(<Header />);
		expect(screen.queryByRole("link", { name: /^login$/i })).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Account menu" })).toBeInTheDocument();
	});
});
