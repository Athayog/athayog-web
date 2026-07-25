import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Sound Meditation in Indiranagar | AthaYog Living",
	description:
		"Experience deep relaxation through guided sound meditation in Indiranagar. Reduce stress, improve sleep, and find mental clarity.",
	robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
