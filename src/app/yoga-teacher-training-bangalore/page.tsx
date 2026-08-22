import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TestimonialVideoCarousel from "@/components/TestimonialVideoCarousel";
import { testimonialVideos } from "@/constants/testimonialVideos";
import { TEACHERS } from "@/constants/teachers";
import MapEmbed from "@/components/MapEmbed";
import EnquireModal from "@/components/EnquireModal";
import styles from "@/app/yoga-teacher-training-bangalore/TTC.module.css";

export const metadata: Metadata = {
	title: "RYT-200 Yoga Teacher Training Weekend | Bangalore | Athayog Living",
	description:
		"Become a certified yoga teacher with Athayog Living's RYT-200 weekend program in Bangalore. Yoga Alliance (USA) accredited, 12-week format, expert faculty. Course fee ₹35,999 plus GST.",
	alternates: {
		canonical: "https://athayogliving.com/yoga-teacher-training-bangalore",
	},
};

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

export default function TTCBangalorePage() {
	return (
		<main>
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							RYT-200 Yoga Teacher Training · Indiranagar, Bangalore
						</span>
						<h1>
							Yoga Teacher Training Course in Bangalore:{" "}
							<em>RYT-200, Weekend Format</em>
						</h1>
						<p className={styles.heroSub}>
							Become a certified yoga teacher with Athayog Living&apos;s
							Yoga Alliance (USA) accredited RYT-200 program. Weekend
							format, based in Indiranagar, designed for working
							professionals and students who want to teach without leaving
							their current routine.
						</p>
						<span className={styles.priceChip}>
							Yoga Alliance (USA) · RYT-200 · weekend batches ·{" "}
							<strong>from ₹35,999 + GST</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="#enrol" className="btn btn-primary">
								Enrol Now
							</a>
							<a href="/trial-classes" className="btn btn-ghost">
								Book a Trial Class
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Yoga Alliance (USA)
								RYS accredited
							</span>
							<span>
								<span className={styles.tick}>✓</span> Weekend format · 12
								weeks
							</span>
							<span>SVYASA · AYUSH recognized</span>
						</div>
					</div>
					<div
						className={styles.heroMedia}
						style={{ position: "relative", overflow: "hidden" }}
					>
						<Image
							src="/images/heroes/hero-teaching.jpg"
							alt="Yoga teacher training weekend batch in session at Athayog Living, Indiranagar"
							fill
							sizes="(max-width: 960px) 0vw, 40vw"
							priority
							style={{ objectFit: "cover" }}
						/>
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
							Athayog Living&apos;s RYT-200 Yoga Teacher Training Course in
							Bangalore is a Yoga Alliance (USA) accredited program that
							prepares you to teach yoga confidently, whether you want to
							become a full-time instructor or simply deepen your personal
							practice. Held in the weekend format at our Indiranagar
							studio, this 12-week course combines traditional yogic
							philosophy, asana, pranayama, anatomy, teaching methodology,
							and practicum under expert guidance.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="about">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What makes this TTC special</span>
							<h2>A teacher training built on authentic lineage</h2>
							<p className="lead">
								At Athayog, we don&apos;t just teach you asanas; we train
								you to become a teacher rooted in the philosophy,
								discipline and wisdom of traditional Yog.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "RYT-200 Accredited",
									p: "Graduate with a globally recognized Yoga Alliance (USA) certification.",
								},
								{
									h: "Weekend Format",
									p: "12 weeks · Saturdays & Sundays, ideal for working professionals and students.",
								},
								{
									h: "Authentic Lineage",
									p: "Rooted in authentic yogic lineage and SVYASA teachings, a real yogic tradition.",
								},
								{
									h: "Expert Faculty",
									p: "Led by founder Sharath Basavaraju and experienced instructors who practise what they teach.",
								},
							].map((c, i) => (
								<div className="card" key={i}>
									<div
										style={{
											fontSize: "1.5rem",
											color: "var(--brand-deep)",
											marginBottom: 4,
										}}
									>
										◍
									</div>
									<h3>{c.h}</h3>
									<p>{c.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="curriculum" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Curriculum</span>
							<h2>What you will learn</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-3">
							{[
								{
									h: "Asana & Alignment",
									p: "Master classical asanas, alignment principles, modifications and hands-on adjustments.",
								},
								{
									h: "Pranayama & Meditation",
									p: "Breathwork techniques, meditation practices and their application in teaching.",
								},
								{
									h: "Philosophy",
									p: "Study of Patanjali&apos;s Yoga Sutras and traditional yogic philosophy.",
								},
								{
									h: "Anatomy",
									p: "Functional anatomy for yoga: understand the body in movement and stillness.",
								},
								{
									h: "Teaching Methodology",
									p: "Sequence design, cueing, class management and the art of holding space.",
								},
								{
									h: "Practicum",
									p: "Real teaching practice, feedback sessions and building confidence as an instructor.",
								},
							].map((c, i) => (
								<div className="card" key={i}>
									<h3>{c.h}</h3>
									<p>{c.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="trainers" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your mentors</span>
							<h2>Learn from experienced practitioners</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.facGrid}>
							{TEACHERS.map((teacher) => (
								<Reveal key={teacher.name}>
									<div className={styles.fac}>
										<div className={styles.facAvatar}>
											<Image
												src={teacher.photo}
												alt={teacher.alt}
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
										<h3>{teacher.name}</h3>
										<div className={styles.facRole}>
											{teacher.role}
										</div>
										<p>{teacher.bio}</p>
									</div>
								</Reveal>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="reviews">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Community</span>
							<h2>Trusted by 850+ Athayogis</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.statStrip}>
							<div className={styles.stat}>
								<div className={styles.statBig}>60+</div>
								<div className={styles.statLbl}>Graduates</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>RYT-200</div>
								<div className={styles.statLbl}>Yoga Alliance (USA)</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>12</div>
								<div className={styles.statLbl}>weeks · weekend</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>4.9★</div>
								<div className={styles.statLbl}>average rating</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<TestimonialVideoCarousel videos={testimonialVideos} />
					</Reveal>
					<Reveal>
						<p style={{ marginTop: 20, color: "var(--brand-deep)" }}>
							Featured graduates: Vetri Selvan, NanahaKumar Sellappan,
							Akshita Satish, Nidhi, Roopa Sreeram.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="enrol" className={styles.pricing}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 780 }}>
							<span className="eyebrow">Pricing</span>
							<h2>RYT-200 Teacher Training · Bangalore</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Weekend format, 12 weeks, Yoga Alliance (USA) accredited.
								Enrol now or enquire for the next batch.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={`${styles.priceGrid} ${styles.singlePriceGrid}`}>
							<div className={styles.tier}>
								<h3>Weekend RYT-200</h3>
								<div className={styles.amt}>
									₹35,999<small>+ 5% GST</small>
								</div>
								<p>
									Complete RYT-200 training with expert guidance
									throughout the 12-week weekend programme.
								</p>
								<div className={styles.incl}>
									12 weeks · weekend · RYT-200 · manual included
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Weekend RYT-200 · ₹35,999 + GST"
									pageSource="yoga-teacher-training-bangalore"
								>
									<span className="btn btn-light">Enquire</span>
								</EnquireModal>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							Price excludes 5% GST · EMI, UPI, cards, net banking accepted.{" "}
							<a href="/trial-classes">Book a trial class →</a>
						</p>
					</Reveal>
				</div>
			</section>

			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Your TTC journey starts in Indiranagar</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.locCard}>
							<div className={styles.locMap}>
								<MapEmbed
									src="https://www.google.com/maps?q=Athayog%20Living%20Indiranagar%20Bengaluru&output=embed"
									title="Athayog Living Indiranagar map"
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

			<section className={styles.ctaMid}>
				<div className="wrap">
					<Reveal>
						<h2>Ready to become a certified yoga teacher?</h2>
						<p>Enrol in the next weekend batch in Indiranagar.</p>
						<a href="#enrol" className="btn btn-cream">
							Enrol Now
						</a>
					</Reveal>
				</div>
			</section>

			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>RYT-200 Teacher Training in Bangalore: FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>About the course</h3>
							<details open>
								<summary>
									What is RYT-200?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									RYT-200 is a Registered Yoga Teacher credential at the
									200-hour level, accredited by Yoga Alliance (USA), the
									most widely recognized international standard for yoga
									teachers.
								</div>
							</details>
							<details>
								<summary>
									Is this a certified course?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. Athayog Living is a Registered Yoga School (RYS)
									with Yoga Alliance (USA). On completion, you can
									register as an RYT-200 teacher, recognized worldwide.
								</div>
							</details>
							<details>
								<summary>
									How long is the weekend course?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									12 weeks, conducted on Saturdays and Sundays, designed
									to fit alongside a full-time job or study schedule.
								</div>
							</details>
							<details>
								<summary>
									What will I learn?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									The curriculum covers asana, pranayama, meditation,
									yogic philosophy (Patanjali&apos;s Yoga Sutras),
									functional anatomy, teaching methodology and
									supervised practicum, everything you need to teach
									with confidence.
								</div>
							</details>
							<h3 className={styles.faqCat}>Enrolment & logistics</h3>
							<details>
								<summary>
									What are the fees?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									The Weekend RYT-200 course fee is ₹35,999, excluding
									5% GST. EMI, UPI, cards and net banking are accepted.
								</div>
							</details>
							<details>
								<summary>
									Where is it held?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									At our studio in Indiranagar, HAL 2nd Stage (12th
									Main), Bengaluru 560038, convenient for Domlur, CV
									Raman Nagar, Koramangala and nearby.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			<section className={styles.explore}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Explore</span>
							<h2>More ways to practise with us</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.exGrid}>
							{[
								{
									h: "Group Classes",
									p: "Small-batch classes from ₹599 drop-in.",
									u: "/group-classes-indiranagar",
								},
								{
									h: "Personal Training",
									p: "One-on-one, goal-based yoga, from ₹14,999.",
									u: "/personal-yoga-training-indiranagar",
								},
								{
									h: "TTC Residential",
									p: "Full-time residential TTC at Athayog.",
									u: "/yoga-teacher-training-residential",
								},
								{
									h: "Workshops",
									p: "Deep-dive sessions on special themes.",
									u: "/workshops",
								},
								{
									h: "Who We Are",
									p: "The story and philosophy behind Athayog.",
									u: "/about-us",
								},
								{
									h: "Trial Class",
									p: "Experience Athayog before you enrol.",
									u: "/trial-classes",
								},
							].map((c, i) => (
								<a className={styles.ex} key={i} href={c.u}>
									<div className={styles.exArrow}>
										<ArrowRight size={18} />
									</div>
									<h3>{c.h}</h3>
									<p>{c.p}</p>
								</a>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="enrol2" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Begin</span>
					</Reveal>
					<Reveal>
						<h2>Your teaching journey starts here.</h2>
					</Reveal>
					<Reveal>
						<p>
							RYT-200 Yoga Teacher Training in Bangalore, weekend format,
							globally recognized. Enrol now for the next batch.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="#enrol" className="btn btn-cream">
								Enrol Now
							</a>
							<a href="/trial-classes" className="btn btn-light">
								Book a Trial Class
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp Us
							</a>
						</div>
					</Reveal>
					<p className="micro">
						Trusted by 850+ Athayogis in Indiranagar & Bangalore
					</p>
				</div>
			</section>
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>RYT-200 · weekend</span>
				<a href="#enrol" className="btn btn-cream">
					Enrol
				</a>
			</div>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Product",
						name: "Yoga Teacher Training RYT-200: Weekend Batch",
						description:
							"200-hour yoga teacher training certification in Bengaluru. Weekend batches with Yoga Alliance, SVYASA, AYUSH recognition.",
						brand: {
							"@type": "Organization",
							name: "Athayog Living",
						},
						url: "https://athayogliving.com/yoga-teacher-training-bangalore",
						offers: {
							"@type": "Offer",
							name: "Weekend RYT-200 Teacher Training",
							price: "35999",
							priceCurrency: "INR",
							availability: "https://schema.org/InStock",
						},
					}),
				}}
			/>
		</main>
	);
}
