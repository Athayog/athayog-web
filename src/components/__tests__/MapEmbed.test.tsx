import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MapEmbed from "../MapEmbed";
import { writeConsent } from "@/lib/consent";

describe("MapEmbed component", () => {
	beforeEach(() => {
		document.cookie = "cookie_consent=; max-age=0; path=/";
	});

	it("renders placeholder when functional consent is missing", () => {
		render(
			<MapEmbed
				src="https://maps.google.com/embed"
				title="Athayog Indiranagar Studio"
			/>,
		);

		expect(screen.getByText("Athayog Indiranagar Studio")).toBeInTheDocument();
		expect(screen.getByText(/enable functional cookies/i)).toBeInTheDocument();
		expect(screen.queryByTitle("Athayog Indiranagar Studio")).not.toBeInTheDocument();
	});

	it("renders Google Maps iframe when functional consent is granted", () => {
		writeConsent("functional");

		render(
			<MapEmbed
				src="https://maps.google.com/embed"
				title="Athayog Indiranagar Studio"
			/>,
		);

		const iframe = screen.getByTitle("Athayog Indiranagar Studio");
		expect(iframe).toBeInTheDocument();
		expect(iframe.getAttribute("src")).toBe("https://maps.google.com/embed");
	});
});
