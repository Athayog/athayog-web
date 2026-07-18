"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GIS_URL = "https://accounts.google.com/gsi/client";

interface GoogleCredentialResponse {
	credential: string;
	select_by: string;
}

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: GoogleCredentialResponse) => void;
						auto_select?: boolean;
						cancel_on_tap_outside?: boolean;
					}) => void;
					prompt: (
						callback?: (notification: {
							isNotDisplayed: () => boolean;
							isSkippedMoment: () => boolean;
							getDismissedReason: () => string;
							getMomentType: () => string;
						}) => void,
					) => void;
					renderButton: (
						element: HTMLElement,
						options: {
							theme?: "outline" | "filled_blue";
							size?: "large" | "medium";
							text?: "signin_with" | "signup_with" | "continue_with";
							shape?: "rectangular" | "pill" | "circle" | "square";
							width?: number;
						},
					) => void;
				};
			};
		};
	}
}

function loadGISScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${GIS_URL}"]`)) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = GIS_URL;
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () =>
			reject(new Error("Failed to load Google Identity Services"));
		document.head.appendChild(script);
	});
}

interface UseGoogleOneTapOptions {
	onSuccess: () => void;
	onError: (error: string) => void;
	onLoading: (loading: boolean) => void;
	disabled?: boolean;
	buttonRef: React.RefObject<HTMLDivElement | null>;
}

export function useGoogleOneTap({
	onSuccess,
	onError,
	onLoading,
	disabled = false,
	buttonRef,
}: UseGoogleOneTapOptions) {
	const [isLoaded, setIsLoaded] = useState(false);
	const callbackRef = useRef<((response: GoogleCredentialResponse) => void) | null>(
		null,
	);

	const onGoogleCredential = useCallback(
		async (response: GoogleCredentialResponse) => {
			onLoading(true);
			try {
				const credential = GoogleAuthProvider.credential(response.credential);
				const result = await signInWithCredential(auth, credential);
				const user = result.user;

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

				onSuccess();
			} catch (err) {
				onError("Failed to sign in with Google");
				console.error("One Tap sign-in error:", err);
			} finally {
				onLoading(false);
			}
		},
		[onSuccess, onError, onLoading],
	);

	useEffect(() => {
		callbackRef.current = onGoogleCredential;
	});

	useEffect(() => {
		if (disabled) return;

		const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
		if (!clientId) {
			console.warn(
				"NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set — falling back to popup sign-in",
			);
			return;
		}

		let cancelled = false;

		loadGISScript()
			.then(() => {
				if (cancelled || !window.google) return;

				window.google.accounts.id.initialize({
					client_id: clientId,
					callback: (response: GoogleCredentialResponse) => {
						callbackRef.current?.(response);
					},
					auto_select: true,
					cancel_on_tap_outside: true,
				});

				window.google.accounts.id.prompt();

				if (buttonRef.current) {
					window.google.accounts.id.renderButton(buttonRef.current, {
						theme: "outline",
						size: "large",
						text: "continue_with",
						shape: "rectangular",
						width: buttonRef.current.offsetWidth || 300,
					});
				}

				if (!cancelled) {
					setIsLoaded(true);
				}
			})
			.catch((err) => {
				if (!cancelled) {
					console.error("Failed to load GIS:", err);
				}
			});

		return () => {
			cancelled = true;
		};
	}, [disabled, onGoogleCredential, buttonRef]);

	return { isLoaded };
}
