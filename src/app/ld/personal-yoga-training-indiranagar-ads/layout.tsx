import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Personal Yoga Trainer in Indiranagar, Bangalore | Athayog Living",
	description:
		"Certified personal yoga training in Indiranagar, Bengaluru. One-on-one sessions for weight loss, back pain, flexibility and stress, at our HAL 2nd Stage studio, your home or online. Book a free trial.",
	robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
