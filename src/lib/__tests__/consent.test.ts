import { describe, it, expect, beforeEach } from "vitest";
import { readConsent, writeConsent, hasFunctionalConsent } from "../consent";

describe("consent helper utilities", () => {
	beforeEach(() => {
		document.cookie = "cookie_consent=; max-age=0; path=/";
	});

	it("returns null when no consent cookie is present", () => {
		expect(readConsent()).toBeNull();
		expect(hasFunctionalConsent()).toBe(false);
	});

	it("writes and reads essential consent", () => {
		writeConsent("essential");
		expect(readConsent()).toBe("essential");
		expect(hasFunctionalConsent()).toBe(false);
	});

	it("writes and reads functional consent", () => {
		writeConsent("functional");
		expect(readConsent()).toBe("functional");
		expect(hasFunctionalConsent()).toBe(true);
	});
});
