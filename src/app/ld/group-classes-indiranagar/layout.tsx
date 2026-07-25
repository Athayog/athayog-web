import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Group Yoga Classes in Indiranagar | AthaYog Living",
	description:
		"Join instructor-led group yoga classes in Indiranagar, Bangalore. Small batches, morning & evening timings, beginner-friendly.",
	robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
