import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Online Yoga Teacher Training Course & Certification",
	description:
		"Live, faculty-guided online yoga teacher training (TTC) for serious practitioners and future teachers. Structured curriculum, real teaching confidence and credible certification. Apply now.",
	alternates: {
		canonical: "https://athayogliving.com/ld/yoga-ttc-online-certification",
	},
	robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
