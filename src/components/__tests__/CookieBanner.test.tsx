import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CookieBanner from "../CookieBanner";
import { readConsent } from "@/lib/consent";

describe("CookieBanner component", () => {
	beforeEach(() => {
		document.cookie = "cookie_consent=; max-age=0; path=/";
	});

	it("renders dialog banner when consent is not yet granted", () => {
		render(<CookieBanner />);
		expect(
			screen.getByRole("dialog", { name: "Cookie preferences" }),
		).toBeInTheDocument();
		expect(screen.getByText("Cookie Preferences")).toBeInTheDocument();
	});

	it("saves essential consent on 'Reject All' click", () => {
		render(<CookieBanner />);
		const rejectBtn = screen.getByRole("button", { name: /reject all/i });
		fireEvent.click(rejectBtn);

		expect(readConsent()).toBe("essential");
	});

	it("saves functional consent on 'Accept All' click", () => {
		render(<CookieBanner />);
		const acceptBtn = screen.getByRole("button", { name: /accept all/i });
		fireEvent.click(acceptBtn);

		expect(readConsent()).toBe("functional");
	});
});
