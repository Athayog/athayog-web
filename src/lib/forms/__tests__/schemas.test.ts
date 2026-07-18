import { describe, it, expect } from "vitest";
import { strings, optional } from "../schemas";

describe("strings", () => {
	describe("name", () => {
		const schema = strings.name;

		it("rejects empty or too short", () => {
			expect(schema.safeParse("").success).toBe(false);
			expect(schema.safeParse("a").success).toBe(false);
		});

		it("accepts valid names", () => {
			expect(schema.safeParse("John").success).toBe(true);
			expect(schema.safeParse("Jean-Luc Picard").success).toBe(true);
		});

		it("rejects names longer than 80 chars", () => {
			const long = "a".repeat(81);
			expect(schema.safeParse(long).success).toBe(false);
		});

		it("accepts 80-char name", () => {
			const name = "a".repeat(80);
			expect(schema.safeParse(name).success).toBe(true);
		});
	});

	describe("email", () => {
		const schema = strings.email;

		it("rejects invalid emails", () => {
			expect(schema.safeParse("not-email").success).toBe(false);
			expect(schema.safeParse("").success).toBe(false);
			expect(schema.safeParse("@missing.local").success).toBe(false);
		});

		it("accepts valid emails", () => {
			expect(schema.safeParse("test@example.com").success).toBe(true);
			expect(schema.safeParse("user+tag@domain.co.in").success).toBe(true);
		});
	});

	describe("phone", () => {
		const schema = strings.phone;

		it("rejects non-10-digit or non-Indian numbers", () => {
			expect(schema.safeParse("12345").success).toBe(false);
			expect(schema.safeParse("0123456789").success).toBe(false);
			expect(schema.safeParse("1234567890").success).toBe(false);
			expect(schema.safeParse("").success).toBe(false);
		});

		it("accepts valid 10-digit Indian numbers", () => {
			expect(schema.safeParse("9876543210").success).toBe(true);
			expect(schema.safeParse("6123456789").success).toBe(true);
		});
	});

	describe("message", () => {
		const schema = strings.message;

		it("rejects messages under 10 characters", () => {
			expect(schema.safeParse("Hi").success).toBe(false);
			expect(schema.safeParse("").success).toBe(false);
		});

		it("accepts valid messages", () => {
			expect(schema.safeParse("Hello World!").success).toBe(true);
			expect(schema.safeParse("This is a valid message").success).toBe(true);
		});

		it("rejects messages longer than 2000 chars", () => {
			const long = "a".repeat(2001);
			expect(schema.safeParse(long).success).toBe(false);
		});
	});
});

describe("optional", () => {
	describe("email", () => {
		const schema = optional.email;

		it("accepts empty or missing", () => {
			expect(schema.safeParse("").success).toBe(true);
			expect(schema.safeParse(undefined).success).toBe(true);
		});

		it("rejects invalid email", () => {
			expect(schema.safeParse("bad").success).toBe(false);
		});

		it("accepts valid email", () => {
			expect(schema.safeParse("test@test.com").success).toBe(true);
		});
	});

	describe("phone", () => {
		const schema = optional.phone;

		it("accepts empty or missing", () => {
			expect(schema.safeParse("").success).toBe(true);
			expect(schema.safeParse(undefined).success).toBe(true);
		});

		it("rejects invalid phone", () => {
			expect(schema.safeParse("123").success).toBe(false);
		});

		it("accepts valid phone", () => {
			expect(schema.safeParse("9876543210").success).toBe(true);
		});
	});

	describe("message", () => {
		const schema = optional.message;

		it("accepts empty or missing", () => {
			expect(schema.safeParse("").success).toBe(true);
			expect(schema.safeParse(undefined).success).toBe(true);
		});

		it("rejects messages over 2000 chars", () => {
			const long = "a".repeat(2001);
			expect(schema.safeParse(long).success).toBe(false);
		});

		it("accepts valid message", () => {
			expect(schema.safeParse("Hello!").success).toBe(true);
		});
	});
});
