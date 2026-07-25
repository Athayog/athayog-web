import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/EnquireModal";
import styles from "@/app/workshops/Workshops.module.css";

const MANDALA = (
	<svg
		className={`${styles.mandalaBg} ${styles.mandalaSpin}`}
		viewBox="0 0 200 200"
		fill="none"
		stroke="currentColor"
		strokeWidth="0.5"
		aria-hidden="true"
	>
		<circle cx="100" cy="100" r="96" />
		<circle cx="100" cy="100" r="78" />
		<circle cx="100" cy="100" r="58" />
		<circle cx="100" cy="100" r="38" />
		<circle cx="100" cy="100" r="18" />
		{Array.from({ length: 12 }, (_, i) => (
			<ellipse
				key={i}
				cx="100"
				cy="52"
				rx="11"
				ry="30"
				transform={`rotate(${i * 30} 100 100)`}
			/>
		))}
	</svg>
);

export default function WorkshopsPage() {
	return (
		<>
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<span className="eyebrow">Deep-dive sessions · Indiranagar</span>
					<h1>
						Workshops at Athayog — <em>Deepen Your Practice</em>
					</h1>
					<p className={styles.heroSub}>
						At Athayog, we believe that learning never stops. Our workshops
						are specially designed to offer a deep dive into various aspects
						of yoga, wellness and holistic living — whether you&apos;re
						looking to refine your techniques, explore new yoga styles or gain
						insights into health and mindfulness.
					</p>
					<span className={styles.priceChip}>
						Expert instructors · accessible to all levels ·{" "}
						<strong>enquire for upcoming dates</strong>
					</span>
					<div className={styles.heroCta}>
						<EnquireModal service="Workshop" pageSource="workshops">
							<span className="btn btn-primary">Enquire Now</span>
						</EnquireModal>
						<a href="https://wa.me/918690333111" className="btn btn-ghost">
							WhatsApp Us
						</a>
					</div>
				</div>
			</section>

			<section
				style={{
					padding: "38px 0",
					background: "var(--parchment)",
					borderTop: "1px solid var(--line)",
					borderBottom: "1px solid var(--line)",
				}}
			>
				<div className="wrap">
					<Reveal>
						<p className="answer">
							Each workshop is led by experienced instructors who are
							passionate about sharing their expertise. You&apos;ll not only
							learn advanced techniques but also engage in meaningful
							discussions and practical applications that you can
							incorporate into your daily life.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="why">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why join our workshops</span>
							<h2>Expand your knowledge and grow your practice</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "Expert Guidance",
									p: "Learn from experienced instructors who bring a wealth of knowledge and a passion for teaching.",
								},
								{
									h: "Variety of Topics",
									p: "From advanced asanas and pranayama techniques to meditation and yoga philosophy — a broad spectrum of subjects.",
								},
								{
									h: "Community Atmosphere",
									p: "Connect with fellow yoga enthusiasts and build a supportive network.",
								},
								{
									h: "Holistic Approach",
									p: "Focus on mind, body, and spirit — workshops designed to be accessible to all levels.",
								},
							].map((w, i) => (
								<div className="card" key={i}>
									<h3>{w.h}</h3>
									<p>{w.p}</p>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<div style={{ marginTop: 28, textAlign: "center" }}>
							<EnquireModal service="Workshop" pageSource="workshops">
								<span className="btn btn-primary">Reserve Your Spot</span>
							</EnquireModal>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Workshops at our Indiranagar studio</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.locCard}>
							<div className={styles.locMap}>
								<iframe
									loading="lazy"
									title="Athayog Living Indiranagar map"
									src="https://www.google.com/maps?q=Athayog%20Living%20Indiranagar%20Bengaluru&output=embed"
								/>
							</div>
							<div className={styles.locBody}>
								<h3>Athayog Living, Indiranagar</h3>
								<p>
									No. 3293, 1st Floor, 12th Main, HAL 2nd Stage,
									Indiranagar, Bengaluru, Karnataka 560038
								</p>
								<p>+91 8690333111 · info@athayogliving.com</p>
								<a
									className={styles.dir}
									href="https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA"
									target="_blank"
									rel="noopener noreferrer"
								>
									Get directions <ArrowRight size={16} />
								</a>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Join us</span>
					</Reveal>
					<Reveal>
						<h2>Take your yoga journey to the next level.</h2>
					</Reveal>
					<Reveal>
						<p>
							Whether you&apos;re a beginner or a seasoned practitioner,
							there&apos;s something here for you. Keep an eye on our
							calendar for upcoming workshops.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<EnquireModal service="Workshop" pageSource="workshops">
								<span className="btn btn-cream">Enquire Now</span>
							</EnquireModal>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp Us
							</a>
							<a href="/contact-us" className="btn btn-light">
								Contact Us
							</a>
						</div>
					</Reveal>
					<p className="micro">
						Trusted by 850+ Athayogis in Indiranagar & Bangalore
					</p>
				</div>
			</section>
		</>
	);
}
