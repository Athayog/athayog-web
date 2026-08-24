import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/thank-you/ThankYou.module.css";
import ThankYouPixel from "@/app/thank-you/ThankYouPixel";

export const metadata: Metadata = {
	title: "Thank You | Athayog Living",
	description: "Thank you for reaching out. We'll get back to you within 24 hours.",
	alternates: { canonical: "https://athayogliving.com/thank-you" },
	robots: { index: false, follow: false },
};

export default function ThankYouPage() {
	return (
		<main className={styles.page}>
			<ThankYouPixel />
			<section className={styles.card}>
				<div className={styles.icon}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						width="48"
						height="48"
					>
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
						<polyline points="22 4 12 14.01 9 11.01" />
					</svg>
				</div>

				<h1 className={styles.heading}>Thank You!</h1>
				<p className={styles.sub}>
					We&apos;ve received your enquiry. Our team will get back to you within
					24 hours.
				</p>

				<div className={styles.actions}>
					<Link href="/" className="btn btn-primary">
						Back to Home
					</Link>
					<a
						href="https://wa.me/919611771434"
						className="btn btn-ghost"
						target="_blank"
						rel="noopener noreferrer"
					>
						WhatsApp Us
					</a>
				</div>
			</section>
		</main>
	);
}
