import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Book a Trial Yoga Class | Indiranagar | Athayog Living",
	description:
		"Experience Athayog Living with a trial yoga class in Indiranagar, Bangalore. Choose from group classes, personal training or teacher training. Fill out the form and we'll confirm your session within 24 hours.",
	alternates: { canonical: "https://athayogliving.com/trial-classes" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
