import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/firebaseAdmin";

const SESSION_EXPIRY = 60 * 60 * 24 * 7 * 1000; // 7 days

export async function POST(request: NextRequest) {
	try {
		const { idToken } = await request.json();

		if (!idToken) {
			return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
		}

		const sessionCookie = await createSessionCookie(idToken, SESSION_EXPIRY);

		const response = NextResponse.json({ success: true });
		response.cookies.set("__session", sessionCookie, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: SESSION_EXPIRY / 1000,
			path: "/",
		});

		return response;
	} catch {
		return NextResponse.json({ error: "Failed to create session" }, { status: 401 });
	}
}
