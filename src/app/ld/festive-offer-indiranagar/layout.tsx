import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dussehra & Diwali Yoga Offer in Indiranagar | Up to 19% Off",
	description:
		"Festive Dussehra and Diwali yoga offer at Athayog Living, Indiranagar. Save on 3, 6 and 12-month subscriptions. Limited-time offer, 25 slots. Claim your price today.",
	alternates: {
		canonical: "https://athayogliving.com/ld/festive-offer-indiranagar",
	},
	robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
