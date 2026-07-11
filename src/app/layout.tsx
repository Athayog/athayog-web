import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
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
	title: "Athayog Living",
	description:
		"Athayog Living is a yoga and wellness platform that offers a variety of classes, workshops, and resources to help individuals achieve physical, mental, and spiritual well-being. Our mission is to promote a holistic approach to health and wellness through the practice of yoga and mindfulness.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${cormorantGaramond.variable} ${cinzel.variable} ${inter.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}
