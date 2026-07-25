import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountMenu from "../AccountMenu";
import useAuthStore from "@/store/useAuthStore";

vi.mock("@/lib/firebase", () => ({
	auth: {
		onAuthStateChanged: vi.fn(),
	},
	db: {},
}));

describe("AccountMenu component", () => {
	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			userSnapshot: null,
			isAuthenticated: false,
		});
	});

	it("returns null when no user is logged in", () => {
		const { container } = render(<AccountMenu />);
		expect(container.firstChild).toBeNull();
	});

	it("renders user initials when user is logged in", () => {
		useAuthStore.setState({
			userSnapshot: {
				uid: "u-123",
				displayName: "John Doe",
				email: "john@example.com",
				photoURL: null,
			},
		});

		render(<AccountMenu />);
		expect(screen.getByText("JD")).toBeInTheDocument();
	});
});
