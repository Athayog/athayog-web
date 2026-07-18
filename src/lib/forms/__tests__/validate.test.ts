import { describe, it, expect } from "vitest";
import { z } from "zod";
import { zodField } from "../validate";

describe("zodField", () => {
	it("returns undefined for valid input", () => {
		const schema = z.string().min(2);
		const validator = zodField(schema);
		expect(validator({ value: "hello" })).toBeUndefined();
	});

	it("returns error messages array for invalid input", () => {
		const schema = z.string().email("Must be a valid email");
		const validator = zodField(schema);
		const result = validator({ value: "not-an-email" });
		expect(Array.isArray(result)).toBe(true);
		expect(result).toContain("Must be a valid email");
	});

	it("handles Zod object schemas", () => {
		const schema = z.object({
			name: z.string().min(2, "Name too short"),
			email: z.string().email("Bad email"),
		});
		const validator = zodField(schema);
		const result = validator({ value: { name: "x", email: "bad" } });
		expect(Array.isArray(result)).toBe(true);
	});

	it("returns undefined for valid object", () => {
		const schema = z.object({
			name: z.string().min(2),
			email: z.string().email(),
		});
		const validator = zodField(schema);
		const result = validator({ value: { name: "John", email: "j@j.com" } });
		expect(result).toBeUndefined();
	});

	it("passes through number schemas", () => {
		const schema = z.number().min(18);
		const validator = zodField(schema);
		expect(validator({ value: 20 })).toBeUndefined();
		const result = validator({ value: 10 });
		expect(Array.isArray(result)).toBe(true);
	});
});
