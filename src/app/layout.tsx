import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthBootstrap from "@/components/AuthBootstrap";
import Providers from "@/components/Providers";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import CookieBanner from "@/components/CookieBanner";
import TrackingScripts from "@/components/TrackingScripts";
import "@/app/globals.css";

const cormorantGaramond = Cormorant_Garamond({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
});

const cinzel = Cinzel({
	variable: "--font-label",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
	variable: "--font-body",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://athayogliving.com"),
	title: {
		default: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
		template: "%s | Athayog Living",
	},
	description:
		"Athayog Living is a yoga and wellness platform in Indiranagar, Bangalore offering group classes, personal training, teacher training, workshops, and weight loss programs rooted in tradition.",
	icons: {
		icon: "/icon.png",
		apple: "/icon.png",
	},
	manifest: "/manifest.json",
	openGraph: {
		type: "website",
		locale: "en_IN",
		siteName: "Athayog Living",
		title: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
		description:
			"Athayog Living is a yoga and wellness platform in Indiranagar, Bangalore offering group classes, personal training, teacher training, workshops, and weight loss programs rooted in tradition.",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Athayog Living — Yoga & Wellness in Indiranagar, Bengaluru",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
		description:
			"Athayog Living is a yoga and wellness platform in Indiranagar, Bangalore offering group classes, personal training, teacher training, workshops, and weight loss programs rooted in tradition.",
		images: ["/opengraph-image"],
	},
	alternates: {
		canonical: "https://athayogliving.com",
	},
	other: {
		"google-site-verification": "MFdD5TUc66yWX-w0hwFHmVkJWyt8BAkzk-g3jR4KLlo",
	},
};

export const viewport = {
	themeColor: "#566B3F",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-scroll-behavior="smooth"
			className={`${cormorantGaramond.variable} ${cinzel.variable} ${inter.variable}`}
		>
			<body>
				<TrackingScripts />
				<AuthBootstrap />
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
				<PrismicPreview repositoryName={repositoryName} />
				<CookieBanner />
			</body>
		</html>
	);
}
