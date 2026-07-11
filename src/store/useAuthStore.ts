"use client";

import { create } from "zustand";
import type { User, ConfirmationResult } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { signInWithGoogle, signOutUser, sendOtp } from "@/lib/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
	isAuthenticated: boolean;
	redirectPath: string | null;
	confirmationResult: ConfirmationResult | null;

	setRedirectPath: (path: string | null) => void;
	initializeAuth: () => () => void;
	handleSignIn: () => Promise<void>;
	handleLogout: () => Promise<void>;
	handleSendOtp: (
		phoneNumber: string,
		recaptchaVerifier: import("firebase/auth").RecaptchaVerifier,
	) => Promise<void>;
	handleSignInWithOtp: (otp: string) => Promise<void>;
	clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	loading: true,
	error: null,
	isAuthenticated: false,
	redirectPath: null,
	confirmationResult: null,

	setRedirectPath: (path) => set({ redirectPath: path }),
	clearError: () => set({ error: null }),

	initializeAuth: () => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const idToken = await user.getIdToken();
					await fetch("/api/auth/session", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ idToken }),
					});
				} catch {
					// Session cookie creation failed — client state still works
				}
			}
			set({ user, loading: false, isAuthenticated: !!user });
		});
		return unsubscribe;
	},

	handleSignIn: async () => {
		set({ loading: true, error: null });
		try {
			const user = await signInWithGoogle();

			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);
			if (!userDoc.exists()) {
				await setDoc(userDocRef, {
					uid: user.uid,
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					createdAt: new Date(),
				});
			}

			const idToken = await user.getIdToken();
			await fetch("/api/auth/session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken }),
			});

			set({ user, isAuthenticated: true });
		} catch (err) {
			set({ error: "Failed to sign in with Google" });
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	handleLogout: async () => {
		set({ loading: true, error: null });
		try {
			await signOutUser();
			await fetch("/api/auth/logout", { method: "POST" });
			set({ user: null, isAuthenticated: false });
		} catch {
			set({ error: "Failed to log out" });
		} finally {
			set({ loading: false });
		}
	},

	handleSendOtp: async (phoneNumber, recaptchaVerifier) => {
		set({ loading: true, error: null });
		try {
			const result = await sendOtp(phoneNumber, recaptchaVerifier);
			set({ confirmationResult: result });
		} catch (err) {
			set({ error: "Failed to send OTP. Check your phone number." });
			throw err;
		} finally {
			set({ loading: false });
		}
	},

	handleSignInWithOtp: async (otp) => {
		set({ loading: true, error: null });
		try {
			const { confirmationResult } = get();
			if (!confirmationResult) {
				throw new Error("No OTP confirmation result. Please request OTP first.");
			}

			const userCredential = await confirmationResult.confirm(otp);
			const user = userCredential.user;

			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);
			if (!userDoc.exists()) {
				await setDoc(userDocRef, {
					uid: user.uid,
					phoneNumber: user.phoneNumber,
					createdAt: new Date(),
				});
			}

			const idToken = await user.getIdToken();
			await fetch("/api/auth/session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken }),
			});

			set({ user, isAuthenticated: true });
		} catch (err) {
			set({ error: "Invalid OTP. Please try again." });
			throw err;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useAuthStore;
