"use client";

const COOKIE_NAME = "cookie_consent";

export type ConsentLevel = "essential" | "functional";

let listeners: Array<() => void> = [];

export function readConsent(): ConsentLevel | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie
		.split("; ")
		.find((c) => c.startsWith(`${COOKIE_NAME}=`));
	if (!match) return null;
	return match.split("=")[1] as ConsentLevel;
}

export function writeConsent(level: ConsentLevel) {
	const maxAge = 365 * 24 * 60 * 60;
	document.cookie = `${COOKIE_NAME}=${level}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
	listeners.forEach((l) => l());
}

export function onConsentChange(callback: () => void): () => void {
	listeners = [...listeners, callback];
	return () => {
		listeners = listeners.filter((l) => l !== callback);
	};
}

export function hasFunctionalConsent(): boolean {
	return readConsent() === "functional";
}
