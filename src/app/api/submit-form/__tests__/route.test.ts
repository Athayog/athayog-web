import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAdd = vi.fn().mockResolvedValue({ id: "test-doc-id" });
const mockCollection = vi.fn().mockReturnValue({ add: mockAdd });
const mockDb = { collection: mockCollection };

vi.mock("@/lib/firebaseAdmin", () => ({
	getAdminFirestore: () => mockDb,
}));

vi.mock("@/lib/forms/email", () => ({
	sendFormEmail: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from "../route";

let nextIp = 1;
function ip() {
	return `10.0.0.${++nextIp}`;
}

function createRequest(body: unknown, reqIp?: string) {
	return new Request("http://localhost/api/submit-form", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-forwarded-for": reqIp || ip(),
		},
		body: JSON.stringify(body),
	});
}

describe("POST /api/submit-form", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns 201 for valid submission", async () => {
		const req = createRequest({
			collection: "testForm",
			data: { name: "John", email: "j@j.com" },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(201);
		const json = await res.json();
		expect(json.success).toBe(true);
		expect(mockCollection).toHaveBeenCalledWith("testForm");
		expect(mockAdd).toHaveBeenCalled();
	});

	it("sends email when email config present", async () => {
		const { sendFormEmail } = await import("@/lib/forms/email");
		const req = createRequest({
			collection: "trialClasses",
			data: { name: "John" },
			email: { to: "info@test.com", subject: "New Lead" },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(201);
		expect(sendFormEmail).toHaveBeenCalledWith({
			to: "info@test.com",
			subject: "New Lead",
			data: { name: "John" },
			collection: "trialClasses",
		});
	});

	it("returns 400 for missing collection", async () => {
		const req = createRequest({ data: { name: "John" } });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(400);
		const json = await res.json();
		expect(json.error).toBe("Validation failed");
	});

	it("returns 400 for missing data", async () => {
		const req = createRequest({ collection: "test" });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid email in config", async () => {
		const req = createRequest({
			collection: "test",
			data: { name: "John" },
			email: { to: "not-an-email", subject: "Test" },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(400);
	});

	it("includes createdAt timestamp in saved data", async () => {
		const req = createRequest({
			collection: "test",
			data: { name: "John" },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res = await POST(req as any);
		expect(res.status).toBe(201);
		expect(mockAdd).toHaveBeenCalled();
		const savedData = mockAdd.mock.calls[0][0];
		expect(savedData.name).toBe("John");
		expect(savedData.createdAt).toBeInstanceOf(Date);
	});

	it("returns 429 when rate limited", async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const r = (b: unknown) => POST(createRequest(b, "10.0.0.99") as any);
		for (let i = 0; i < 6; i++) {
			await r({ collection: "test", data: { i } });
		}
		const res = await r({ collection: "test", data: {} });
		expect(res.status).toBe(429);
	});
});
