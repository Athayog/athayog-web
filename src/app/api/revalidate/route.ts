import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
	const token = process.env.REVALIDATE_TOKEN;
	if (!token) {
		return NextResponse.json(
			{ error: "Revalidation is not configured" },
			{ status: 503 },
		);
	}
	if (request.headers.get("x-revalidate-token") !== token) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	revalidateTag("prismic", "max");

	return NextResponse.json({ revalidated: true, now: Date.now() });
}
