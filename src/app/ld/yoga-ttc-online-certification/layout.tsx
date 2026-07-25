import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Online Yoga Teacher Training Course | AthaYog Living",
	description:
		"A structured, live-guided online yoga teacher training (TTC) for serious practitioners and future teachers. Credible certification.",
	robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
