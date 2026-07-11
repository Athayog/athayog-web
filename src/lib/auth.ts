"use client";

import {
	signInWithPopup,
	signInWithPhoneNumber,
	type ConfirmationResult,
	type RecaptchaVerifier,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export async function signInWithGoogle() {
	const result = await signInWithPopup(auth, googleProvider);
	return result.user;
}

export async function signOutUser() {
	await auth.signOut();
}

export async function sendOtp(
	phoneNumber: string,
	recaptchaVerifier: RecaptchaVerifier,
): Promise<ConfirmationResult> {
	return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}
