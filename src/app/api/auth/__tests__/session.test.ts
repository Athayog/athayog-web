import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../session/route";
import { createSessionCookie } from "@/lib/firebaseAdmin";

vi.mock("@/lib/firebaseAdmin", () => ({
	createSessionCookie: vi.fn(),
}));

describe("POST /api/auth/session", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns 400 when idToken is missing", async () => {
		const req = new NextRequest("http://localhost:3000/api/auth/session", {
			method: "POST",
			body: JSON.stringify({}),
		});

		const res = await POST(req);
		expect(res.status).toBe(400);

		const data = await res.json();
		expect(data.error).toBe("Missing idToken");
	});

	it("returns 200 and sets __session cookie on valid idToken", async () => {
		vi.mocked(createSessionCookie).mockResolvedValueOnce("fake-session-cookie");

		const req = new NextRequest("http://localhost:3000/api/auth/session", {
			method: "POST",
			body: JSON.stringify({ idToken: "valid-id-token" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(200);

		const data = await res.json();
		expect(data.success).toBe(true);

		const cookieHeader = res.headers.get("set-cookie");
		expect(cookieHeader).toContain("__session=fake-session-cookie");
	});

	it("returns 401 when createSessionCookie throws error", async () => {
		vi.mocked(createSessionCookie).mockRejectedValueOnce(new Error("Invalid token"));

		const req = new NextRequest("http://localhost:3000/api/auth/session", {
			method: "POST",
			body: JSON.stringify({ idToken: "invalid-token" }),
		});

		const res = await POST(req);
		expect(res.status).toBe(401);

		const data = await res.json();
		expect(data.error).toBe("Failed to create session");
	});
});
