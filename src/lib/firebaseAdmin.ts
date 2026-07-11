import "server-only";
import { cert, initializeApp, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function formatPrivateKey(key: string) {
	return key.replace(/\\n/g, "\n");
}

function getAdminApp() {
	if (getApps().length > 0) {
		return getApp();
	}

	const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY;

	if (!projectId || !clientEmail || !privateKey) {
		throw new Error("Missing Firebase Admin environment variables");
	}

	return initializeApp({
		credential: cert({
			projectId,
			clientEmail,
			privateKey: formatPrivateKey(privateKey),
		}),
	});
}

export function getAdminAuth() {
	return getAuth(getAdminApp());
}

export function getAdminFirestore() {
	return getFirestore(getAdminApp());
}

export async function verifyIdToken(idToken: string) {
	const auth = getAdminAuth();
	return auth.verifyIdToken(idToken);
}

export async function createSessionCookie(idToken: string, expiresIn: number) {
	const auth = getAdminAuth();
	return auth.createSessionCookie(idToken, { expiresIn });
}

export async function verifySessionCookie(sessionCookie: string) {
	const auth = getAdminAuth();
	return auth.verifySessionCookie(sessionCookie, true);
}
