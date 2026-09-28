import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Group Yoga Classes in Indiranagar, Bangalore",
	description:
		"Instructor-led group yoga classes in Indiranagar, Bangalore. Small batches, morning and evening timings, beginner-friendly. Book a trial class at Athayog Living.",
	alternates: {
		canonical: "https://athayogliving.com/ld/group-classes-indiranagar",
	},
	robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
