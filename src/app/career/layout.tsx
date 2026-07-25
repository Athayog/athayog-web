import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Careers at Athayog Living | Join Our Yoga Team in Bangalore",
	description:
		"Join Athayog Living, a certified yoga studio in Indiranagar, Bengaluru. We're looking for passionate yoga teachers, centre managers, sales executives and graphic designers. Apply with your resume today.",
	alternates: { canonical: "https://athayogliving.com/career" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
