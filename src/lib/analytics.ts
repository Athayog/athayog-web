declare global {
	interface Window {
		fbq?: (...args: unknown[]) => void;
		gtag?: (...args: unknown[]) => void;
	}
}

/**
 * Fires the lead conversion events for a successful form submission.
 *
 * The Facebook pixel is the one actually installed (see ThankYouPixel); the
 * Google Ads conversion only fires when NEXT_PUBLIC_GOOGLE_ADS_ID is set, so
 * this is a safe no-op until that campaign is configured.
 *
 * Never throws: a blocked or failing pixel must not break a lead submission.
 */
export function trackLead(source: string) {
	if (typeof window === "undefined") return;

	try {
		window.fbq?.("track", "Lead", { source });
	} catch {
		/* pixel failures are never fatal */
	}

	try {
		const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
		if (!adsId) return;
		const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
		window.gtag?.("event", "conversion", {
			send_to: label ? `${adsId}/${label}` : adsId,
			event_category: "lead",
			event_label: source,
		});
	} catch {
		/* pixel failures are never fatal */
	}
}
