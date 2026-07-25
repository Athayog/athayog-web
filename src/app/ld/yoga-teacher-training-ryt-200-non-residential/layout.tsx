import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Non-Residential Yoga Program in Bangalore | AthaYog Living",
	description:
		"A structured non-residential yoga program for working professionals in Bangalore. Guided asana, pranayama & meditation with morning & evening batches.",
	robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
