import { describe, it, expect, vi } from "vitest";

const { mockSignInWithPopup, mockSignOut, mockSignInWithPhoneNumber } = vi.hoisted(
	() => ({
		mockSignInWithPopup: vi.fn(),
		mockSignOut: vi.fn(),
		mockSignInWithPhoneNumber: vi.fn(),
	}),
);

vi.mock("firebase/auth", () => ({
	signInWithPopup: (...args: unknown[]) => mockSignInWithPopup(...args),
	signInWithPhoneNumber: (...args: unknown[]) => mockSignInWithPhoneNumber(...args),
}));

vi.mock("@/lib/firebase", () => ({
	auth: { signOut: mockSignOut },
	googleProvider: {},
}));

import { signInWithGoogle, signOutUser, sendOtp } from "../auth";

describe("auth", () => {
	describe("signInWithGoogle", () => {
		it("resolves with user on successful sign-in", async () => {
			const fakeUser = { uid: "abc123", email: "test@test.com" };
			mockSignInWithPopup.mockResolvedValue({ user: fakeUser });
			const user = await signInWithGoogle();
			expect(user).toEqual(fakeUser);
			expect(mockSignInWithPopup).toHaveBeenCalled();
		});

		it("rejects when popup fails", async () => {
			mockSignInWithPopup.mockRejectedValue(new Error("Popup blocked"));
			await expect(signInWithGoogle()).rejects.toThrow("Popup blocked");
		});
	});

	describe("signOutUser", () => {
		it("calls auth.signOut", async () => {
			mockSignOut.mockResolvedValue(undefined);
			await signOutUser();
			expect(mockSignOut).toHaveBeenCalled();
		});

		it("rejects when sign out fails", async () => {
			mockSignOut.mockRejectedValue(new Error("Sign out failed"));
			await expect(signOutUser()).rejects.toThrow("Sign out failed");
		});
	});

	describe("sendOtp", () => {
		it("calls signInWithPhoneNumber with correct args", async () => {
			const confirmationResult = { confirm: vi.fn() };
			const recaptchaVerifier = {} as import("firebase/auth").RecaptchaVerifier;
			mockSignInWithPhoneNumber.mockResolvedValue(confirmationResult);

			const result = await sendOtp("+919876543210", recaptchaVerifier);
			expect(result).toBe(confirmationResult);
			expect(mockSignInWithPhoneNumber).toHaveBeenCalled();
		});

		it("rejects on invalid phone number", async () => {
			const recaptchaVerifier = {} as import("firebase/auth").RecaptchaVerifier;
			mockSignInWithPhoneNumber.mockRejectedValue(
				new Error("Invalid phone number"),
			);
			await expect(sendOtp("123", recaptchaVerifier)).rejects.toThrow(
				"Invalid phone number",
			);
		});
	});
});
