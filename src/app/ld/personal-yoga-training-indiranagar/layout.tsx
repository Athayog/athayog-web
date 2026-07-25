import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Personal Yoga Sessions in Bangalore | AthaYog Living",
	description:
		"Fully personalized yoga sessions in Bangalore. Dedicated trainer, studio or home-based, goal-oriented and safety-focused.",
	robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
