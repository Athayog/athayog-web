import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookie } from "@/lib/firebaseAdmin";

const PROTECTED_PATHS = ["/account"];
const LOGIN_PATH = "/login";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isProtected = PROTECTED_PATHS.some(
		(path) => pathname === path || pathname.startsWith(path + "/"),
	);

	if (!isProtected) {
		return NextResponse.next();
	}

	const sessionCookie = request.cookies.get("__session")?.value;

	if (!sessionCookie) {
		const loginUrl = new URL(LOGIN_PATH, request.url);
		loginUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(loginUrl);
	}

	try {
		await verifySessionCookie(sessionCookie);
		return NextResponse.next();
	} catch {
		const loginUrl = new URL(LOGIN_PATH, request.url);
		loginUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(loginUrl);
	}
}

export const config = {
	matcher: ["/account/:path*"],
};
