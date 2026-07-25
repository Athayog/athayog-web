import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Aerial Yoga Classes in Indiranagar | AthaYog Living",
	description:
		"Join small-batch aerial yoga classes in Indiranagar, Bangalore. Build core strength, improve flexibility, and release stress. Only 10 participants per batch.",
	robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
