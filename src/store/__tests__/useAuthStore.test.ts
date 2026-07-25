import { describe, it, expect, vi, beforeEach } from "vitest";
import useAuthStore from "../useAuthStore";
import type { User } from "firebase/auth";

vi.mock("@/lib/firebase", () => ({
	auth: {
		onAuthStateChanged: vi.fn(),
	},
	db: {},
}));

vi.mock("@/lib/auth", () => ({
	signInWithGoogle: vi.fn(),
	signOutUser: vi.fn(),
	sendOtp: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
	doc: vi.fn(() => ({})),
	getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
	setDoc: vi.fn(() => Promise.resolve()),
}));

describe("useAuthStore", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useAuthStore.setState({
			user: null,
			userSnapshot: null,
			loading: false,
			error: null,
			isAuthenticated: false,
			redirectPath: null,
			confirmationResult: null,
		});
	});

	it("has correct initial default state when reset", () => {
		const state = useAuthStore.getState();
		expect(state.user).toBeNull();
		expect(state.userSnapshot).toBeNull();
		expect(state.isAuthenticated).toBe(false);
		expect(state.redirectPath).toBeNull();
	});

	it("updates redirectPath correctly via setRedirectPath", () => {
		useAuthStore.getState().setRedirectPath("/account/settings");
		expect(useAuthStore.getState().redirectPath).toBe("/account/settings");

		useAuthStore.getState().setRedirectPath(null);
		expect(useAuthStore.getState().redirectPath).toBeNull();
	});

	it("clears error message via clearError", () => {
		useAuthStore.setState({ error: "Something went wrong" });
		expect(useAuthStore.getState().error).toBe("Something went wrong");

		useAuthStore.getState().clearError();
		expect(useAuthStore.getState().error).toBeNull();
	});

	it("handles successful sign out via handleLogout", async () => {
		const { signOutUser } = await import("@/lib/auth");
		vi.mocked(signOutUser).mockResolvedValueOnce(undefined);
		globalThis.fetch = vi.fn().mockResolvedValueOnce(new Response());

		useAuthStore.setState({
			isAuthenticated: true,
			user: { uid: "test-user" } as User,
		});

		await useAuthStore.getState().handleLogout();

		const state = useAuthStore.getState();
		expect(state.user).toBeNull();
		expect(state.isAuthenticated).toBe(false);
		expect(state.loading).toBe(false);
	});
});
