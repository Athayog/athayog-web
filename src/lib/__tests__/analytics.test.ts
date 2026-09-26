import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackLead } from "@/lib/analytics";

describe("trackLead", () => {
	beforeEach(() => {
		vi.stubGlobal("fbq", vi.fn());
		vi.stubGlobal("gtag", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
	});

	it("fires the Facebook Lead event with the source", () => {
		trackLead("contactMessages");
		expect(window.fbq).toHaveBeenCalledWith("track", "Lead", {
			source: "contactMessages",
		});
	});

	it("does not fire a Google Ads conversion when no ads id is configured", () => {
		trackLead("contactMessages");
		expect(window.gtag).not.toHaveBeenCalled();
	});

	it("fires a Google Ads conversion once the ads id is set", () => {
		vi.stubEnv("NEXT_PUBLIC_GOOGLE_ADS_ID", "AW-123456789");
		trackLead("trialClasses");
		expect(window.gtag).toHaveBeenCalledWith(
			"event",
			"conversion",
			expect.objectContaining({ send_to: "AW-123456789" }),
		);
	});

	it("never throws when the pixels are missing or broken", () => {
		vi.unstubAllGlobals();
		vi.stubGlobal(
			"fbq",
			vi.fn(() => {
				throw new Error("blocked");
			}),
		);
		expect(() => trackLead("newsletter")).not.toThrow();
	});
});
