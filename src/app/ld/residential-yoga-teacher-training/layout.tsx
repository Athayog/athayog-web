import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Residential Yoga Program in Bangalore | AthaYog Living",
	description:
		"An immersive residential yoga program in Bangalore for deep, structured yogic living. Full stay, guided daily routine, limited intake.",
	robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
