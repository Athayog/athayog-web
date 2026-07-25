import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthBootstrap from "@/components/AuthBootstrap";
import Providers from "@/components/Providers";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import CookieBanner from "@/components/CookieBanner";
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
				<Script
					id="gtm"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N4LH3M3');`,
					}}
				/>
				<Script
					id="fb-pixel"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1011750923226651');
fbq('track', 'PageView');`,
					}}
				/>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-N4LH3M3"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
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
