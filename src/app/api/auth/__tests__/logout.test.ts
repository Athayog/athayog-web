import { describe, it, expect } from "vitest";
import { POST } from "../logout/route";

describe("POST /api/auth/logout", () => {
	it("clears the __session cookie and returns success", async () => {
		const res = await POST();
		expect(res.status).toBe(200);

		const data = await res.json();
		expect(data.success).toBe(true);

		const cookieHeader = res.headers.get("set-cookie");
		expect(cookieHeader).toBeDefined();
		expect(cookieHeader).toContain("__session=");
	});
});
