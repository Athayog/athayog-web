import Link from "next/link";
import styles from "@/components/Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={`wrap ${styles.inner}`}>
				<div className={styles.grid}>
					<div className={styles.brandCol}>
						<div className={styles.brand}>ATHAYOG LIVING</div>
						<div className={styles.tag}>A Sanctum For The Spirit</div>
						<p className={styles.desc}>
							Authentic, certified yoga in Indiranagar &amp; Jayanagar,
							Bengaluru — group, personal, weight-loss &amp; teacher
							training.
						</p>
						<p className={styles.address}>
							No. 3293, 1st Floor, 12th Main, HAL 2nd Stage, Indiranagar,
							Bengaluru, Karnataka 560038
						</p>
						<p className={styles.contact}>
							+91 8690333111 · info@athayogliving.com
						</p>
					</div>

					<div className={styles.col}>
						<h4 className={styles.colTitle}>What We Offer</h4>
						<nav className={styles.colLinks}>
							<Link href="/group-classes-indiranagar">Group Classes</Link>
							<Link href="/personal-yoga-training-indiranagar">
								Personal Training
							</Link>
							<Link href="/weight-loss-program-indiranagar">
								Weight Loss Program
							</Link>
							<Link href="/yoga-academy">Yoga Teacher Training</Link>
							<Link href="/workshops">Workshops</Link>
							<Link href="/picnics">Excursion / Picnics</Link>
						</nav>
					</div>

					<div className={styles.col}>
						<h4 className={styles.colTitle}>Site</h4>
						<nav className={styles.colLinks}>
							<Link href="/">Home</Link>
							<Link href="/about-us">Who We Are</Link>
							<Link href="/blogs">Blog</Link>
							<Link href="/contact-us">Contact Us</Link>
							<Link href="/trial-classes">Trial Class</Link>
						</nav>
					</div>

					<div className={styles.col}>
						<h4 className={styles.colTitle}>Legal</h4>
						<nav className={styles.colLinks}>
							<Link href="/privacy-policy">Privacy Policy</Link>
							<Link href="/refund-policy">Refund Policy</Link>
							<Link href="/terms-of-service">Terms of Service</Link>
							<Link href="/career">Career</Link>
						</nav>
					</div>
				</div>

				<div className={styles.bottom}>
					<span>© 2026 Athayog Living. All rights reserved.</span>
					<span>
						Yoga Alliance · SVYASA · AYUSH · Payments: UPI, cards, EMI, PayPal
					</span>
				</div>
			</div>
		</footer>
	);
}
