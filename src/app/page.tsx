import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Flower, Users, Sparkles, Leaf } from "lucide-react";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/app/NewsletterForm";
import styles from "@/app/Home.module.css";

export const metadata: Metadata = {
	title: "Yoga Classes in Indiranagar, Bangalore | Athayog Living — Yoga Studio",
	description:
		"Certified yoga classes in Indiranagar, Bengaluru at Athayog Living. Group classes, personal training and RYT-200 teacher training — Yoga Alliance, SVYASA & AYUSH recognized. Book a trial class today.",
	openGraph: {
		title: "Athayog Living — Yoga & Wellness in Indiranagar, Bangalore",
	},
};

const PLAY_SVG = (
	<svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
		<path d="M8 5v14l11-7z" />
	</svg>
);

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

export default function Home() {
	return (
		<>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Certified Yoga Studio · Indiranagar, Bangalore
						</span>
						<h1>
							Yoga Classes in Indiranagar —{" "}
							<em>Transforming Lives Through Yoga</em>
						</h1>
						<p className={styles.heroSub}>
							Awaken your mind, body and spirit with Athayog Living. Group
							classes, personal training and RYT-200 teacher training —
							guided by certified teachers, recognized by Yoga Alliance,
							SVYASA and AYUSH.
						</p>
						<span className={styles.priceChip}>
							Group classes from ₹599 · personal from ₹14,999 ·{" "}
							<strong>trial class</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="/trial-classes" className="btn btn-primary">
								Start Your Yoga Journey
							</a>
							<a href="#offer" className="btn btn-ghost">
								Explore Classes
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Yoga Alliance ·
								SVYASA · AYUSH
							</span>
							<span>
								<span className={styles.tick}>✓</span> Certified, caring
								teachers
							</span>
							<span>Indiranagar &amp; Jayanagar</span>
						</div>
					</div>
					<div className={styles.heroMedia} aria-hidden="true">
						[ Hero image · practice at the Indiranagar studio ]
					</div>
				</div>
			</section>

			{/* 2. Statbar */}
			<section className={styles.statbar}>
				<Reveal>
					<div className={`wrap ${styles.statGrid}`}>
						<div className={styles.stat}>
							<div className={styles.statNumber}>60+</div>
							<div className={styles.statLabel}>Graduates</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>850+</div>
							<div className={styles.statLabel}>Athayogis</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>30+</div>
							<div className={styles.statLabel}>Transformations</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>20+</div>
							<div className={styles.statLabel}>Events</div>
						</div>
					</div>
				</Reveal>
			</section>

			{/* 3. Answer */}
			<section
				style={{
					padding: "38px 0",
					background: "var(--parchment)",
					borderBottom: "1px solid var(--line)",
				}}
			>
				<div className="wrap">
					<Reveal>
						<p className="answer">
							Athayog Living is a certified yoga studio in Indiranagar,
							Bengaluru, offering group classes, one-on-one personal
							training and RYT-200 yoga teacher training. Our academy and
							teachers are recognized by Yoga Alliance (USA), SVYASA and
							AYUSH — so you practise with authentic guidance and globally
							recognized credentials, in the heart of Indiranagar (with a
							second branch in Jayanagar).
						</p>
					</Reveal>
				</div>
			</section>

			{/* 4. What We Offer */}
			<section id="offer">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What we offer</span>
							<h2>A path for every practitioner</h2>
							<p className="lead">
								Whether you want community, personal attention, a
								transformation, or a teaching career — there&apos;s a way
								in.
							</p>
						</div>
					</Reveal>
					<div className="grid-3">
						<Reveal>
							<div className="card">
								<span className="eyebrow">Community</span>
								<h3>Group Classes</h3>
								<p>
									Small-batch classes across six signature formats,
									morning and evening, open to all levels (14+).
								</p>
								<div className={styles.priceChip}>
									From ₹599 · ₹4,999/month
								</div>
								<a
									href="/group-classes-indiranagar"
									className="btn btn-ghost"
								>
									Explore Group Classes
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<span className="eyebrow">1-on-1</span>
								<h3>Personal Training</h3>
								<p>
									Private, goal-based yoga — weight loss, flexibility,
									back pain, stress &amp; more — at studio, home or
									online.
								</p>
								<div className={styles.priceChip}>
									From ₹14,999 · 12/24 sessions
								</div>
								<a
									href="/personal-yoga-training-indiranagar"
									className="btn btn-ghost"
								>
									Explore Personal Training
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<span className="eyebrow">Career</span>
								<h3>Yoga Teacher Training</h3>
								<p>
									Become a certified RYT-200 teacher — online, weekend,
									residential or international formats.
								</p>
								<div className={styles.priceChip}>
									From ₹24,999 · Yoga Alliance (USA)
								</div>
								<a
									href="/yoga-teacher-training"
									className="btn btn-ghost"
								>
									Explore TTC
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<span className="eyebrow">Deep-dive</span>
								<h3>Workshops</h3>
								<p>
									Focused sessions on special themes — pranayama,
									alignment, meditation and seasonal intensives.
								</p>
								<a href="/workshops" className="btn btn-ghost">
									Explore Workshops
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div
								className="card"
								style={{
									background: "var(--brand-dark)",
									color: "var(--cream)",
									borderColor: "var(--brand-dark)",
								}}
							>
								<span
									className="eyebrow"
									style={{ color: "var(--brand-light)" }}
								>
									Not sure?
								</span>
								<h3 style={{ color: "var(--cream)" }}>
									Start with a Trial Class
								</h3>
								<p style={{ color: "#DCE2CE" }}>
									Experience a class, meet our teachers, and we&apos;ll
									help you choose the right path — no obligation.
								</p>
								<a href="/trial-classes" className="btn btn-cream">
									Book a Trial Class
								</a>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 5. Class Formats Teaser */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ marginBottom: 24 }}>
							<span className="eyebrow">Our practice</span>
							<h2>Six signature class formats</h2>
							<p className="lead">
								From gentle alignment to dynamic flow and meditation —
								each a distinct path.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.chips}>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Universal Harmony
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Rhythm of Being
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Transcending Transition
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Uttama Sadhana
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Inner World
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#formats"
							>
								Sound Meditation
							</a>
							<a
								className={styles.chip}
								href="/group-classes-indiranagar#schedule"
							>
								+ Props, Pranayama &amp; Aerial
							</a>
						</div>
					</Reveal>
					<Reveal>
						<div style={{ marginTop: 26 }}>
							<a
								href="/group-classes-indiranagar#schedule"
								className="btn btn-ghost"
							>
								See the Full Class Schedule
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 6. Why Athayog */}
			<section id="why" className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why Athayog</span>
							<h2>Authentic yoga, taught with care</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Our instructors are professional, attentive and caring —
								passionate about yoga, with a deep understanding of the
								practice and a focus on the individual.
							</p>
						</div>
					</Reveal>
					<div className={styles.whyGrid}>
						<Reveal>
							<div className={styles.why}>
								<Flower size={22} className={styles.whyIcon} />
								<h3>Certified teachers</h3>
								<p>
									Trained and recognized by Yoga Alliance, SVYASA and
									AYUSH.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.why}>
								<Users size={22} className={styles.whyIcon} />
								<h3>Caring &amp; attentive</h3>
								<p>
									Small batches and real, individual attention in every
									class.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.why}>
								<Sparkles size={22} className={styles.whyIcon} />
								<h3>Authentic tradition</h3>
								<p>
									Ancient yogic wisdom brought into modern daily life.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.why}>
								<Leaf size={22} className={styles.whyIcon} />
								<h3>A growing community</h3>
								<p>850+ Athayogis across two Bengaluru studios.</p>
							</div>
						</Reveal>
					</div>
					<Reveal>
						<div className={styles.certRow}>
							<b>Recognized by:</b> Yoga Alliance (RYS · USA) · SVYASA ·
							Ministry of AYUSH, Government of India
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Our Story */}
			<section id="story">
				<div className={`wrap ${styles.story}`}>
					<Reveal>
						<div
							className={styles.storyMedia}
							style={{ position: "relative", overflow: "hidden" }}
						>
							<Image
								src="/sharath-basavaraju.png"
								alt="Sharath Basavaraju, Founder of Athayog Living"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					</Reveal>
					<Reveal>
						<div>
							<span className="eyebrow">Our story</span>
							<h2 style={{ marginTop: 8 }}>
								Embrace wellness, the yogic way
							</h2>
							<p
								style={{
									margin: "12px 0",
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								Athayog Living is devoted to preserving the legacy of Yog
								by integrating its true purpose, philosophy and practices
								into modern daily life. We share transformational tools
								that help you reconnect with your true nature and move
								toward higher living.
							</p>
							<p
								style={{
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								When you register, we offer consultations and lifestyle
								guidance to help you embrace a complete yogic lifestyle —
								empowering you to practise on your own and embed ancient
								wisdom into everyday reality.
							</p>
							<blockquote>&quot;A sanctum for the spirit.&quot;</blockquote>
							<a href="/about-us" className="btn btn-ghost">
								Learn More About Us
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 8. Testimonials */}
			<section id="reviews" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Why people love Athayog Living</h2>
							<p className="lead">
								Real stories from our community of Athayogis.
							</p>
						</div>
					</Reveal>
					<div className={styles.vidGrid}>
						{[1, 2, 3, 4, 5, 6].map((n) => {
							const ids = [
								"Pmvr_kFDcTA",
								"LDcffOBJ9ZU",
								"aFxeW-gUKqw",
								"ugKjocoymvM",
								"CrCdzkiJ46E",
								"K_IWigtdBmI",
							];
							const id = ids[n - 1];
							return (
								<Reveal key={id}>
									<a
										className={styles.vid}
										href={`https://www.youtube.com/watch?v=${id}`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Watch testimonial"
									>
										<Image
											src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
											alt="Athayog member testimonial video"
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
											style={{
												objectFit: "cover",
											}}
										/>
										<span className={styles.play}>{PLAY_SVG}</span>
									</a>
								</Reveal>
							);
						})}
					</div>
					<Reveal>
						<p
							style={{
								marginTop: 24,
								fontSize: "0.92rem",
								color: "var(--brand-deep)",
							}}
						>
							Watch more on{" "}
							<a
								href="https://www.youtube.com/@athayogliving"
								style={{
									borderBottom: "1px solid var(--brand-deep)",
									color: "var(--brand-deep)",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								YouTube
							</a>{" "}
							· read our{" "}
							<a
								href="https://share.google/tFCEaxzVsbCdRpYwY"
								style={{
									borderBottom: "1px solid var(--brand-deep)",
									color: "var(--brand-deep)",
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								Google reviews
							</a>
							.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 9. Event */}
			<section id="event">
				<div className={`wrap ${styles.event}`}>
					<Reveal>
						<div>
							<span className="eyebrow">Community &amp; events</span>
							<h2 style={{ marginTop: 8 }}>Yoga Arambha 2025</h2>
							<p
								style={{
									margin: "12px 0",
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								On the International Day of Yoga, Athayog Living presented
								Yoga Arambha 2025 at Kittur Rani Chennamma Stadium — a
								morning of mindful movement, community spirit and a
								celebration of wellness and unity.
							</p>
							<p
								style={{
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								The session was led by founder Sharath Basavaraju, with
								Chief Guest Shri Tejasvi Surya. With our Indiranagar
								flagship and a new second branch in Jayanagar, our
								community continues to grow across Bengaluru.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.eventMedia} aria-hidden="true">
							[ Yoga Arambha 2025 event ]
						</div>
					</Reveal>
				</div>
			</section>

			{/* 10. Location */}
			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Our studios</span>
							<h2>Find us in Indiranagar &amp; Jayanagar</h2>
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
								<h3>Indiranagar (flagship)</h3>
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
								<div className={styles.branch}>
									<h3>Jayanagar (branch)</h3>
									<p
										className={styles.verify}
										title="Add the exact Jayanagar studio address"
									>
										[ Add Jayanagar studio address, Bengaluru 5600xx ]
									</p>
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 11. CTA Mid */}
			<section className={styles.ctaMid}>
				<Reveal>
					<div className="wrap">
						<h2>Begin where you are.</h2>
						<p>Book a trial class and feel the Athayog difference.</p>
						<a href="/trial-classes" className="btn btn-cream">
							Book a Trial Class
						</a>
					</div>
				</Reveal>
			</section>

			{/* 12. FAQ */}
			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Yoga classes in Indiranagar — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>Getting started</h3>
							<details open>
								<summary>
									Which class should I start with?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									If you&apos;re new, start with a beginner-friendly
									group class (like Universal Harmony) or a trial, and
									our teachers will guide you to the right format.
									Prefer focused attention? Personal training builds a
									plan around your goal from day one.
								</div>
							</details>
							<details>
								<summary>
									How many times a week would you recommend?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									For steady progress, 3–4 sessions a week works well
									for most people. Our memberships give you the
									flexibility to practise as often as you like across
									morning and evening batches.
								</div>
							</details>
							<details>
								<summary>
									I&apos;m not flexible — can I still practise yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Absolutely. Flexibility is a result of yoga, not a
									requirement to begin. Our teachers meet you where you
									are and progress you safely at your own pace.
								</div>
							</details>
							<details>
								<summary>
									What is the minimum age to start yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Our group classes are open to everyone above the age
									of 14.
								</div>
							</details>

							<h3 className={styles.faqCat}>In the class</h3>
							<details>
								<summary>
									Do you teach pranayama in class?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. Breathwork (pranayama) is woven into our
									practice, with dedicated pranayama and Trataka
									sessions on the schedule too.
								</div>
							</details>
							<details>
								<summary>
									What should I wear, and should I bring a mat?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Wear comfortable, breathable clothing you can move
									freely in. Carrying your own yoga mat is recommended
									for hygiene and comfort.
								</div>
							</details>
							<details>
								<summary>
									When should I eat — before or after practice?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Practise on a relatively empty stomach — ideally 2–3
									hours after a meal. A light snack well before class is
									fine if needed; eat a proper meal afterwards.
								</div>
							</details>

							<h3 className={styles.faqCat}>Benefits &amp; safety</h3>
							<details>
								<summary>
									Will I lose weight with yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — an active, consistent practice supports healthy,
									sustainable weight management, especially alongside
									mindful eating. program adds structure, nutrition
									guidance and progress tracking.
								</div>
							</details>
							<details>
								<summary>
									Is yoga good for health? Any side-effects?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yoga supports strength, flexibility, stress relief and
									overall wellbeing. Practised correctly under trained
									guidance it&apos;s very safe; simply let your teacher
									know about any injuries or conditions so classes can
									be adapted.
								</div>
							</details>
							<details>
								<summary>
									Do you offer yoga for pregnancy and post-pregnancy?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — we offer specialized prenatal and postnatal
									guidance, best delivered through personal training so
									the practice is tailored safely to your stage.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 13. Newsletter / Lead */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className={styles.magnet}>
							<div>
								<span className="eyebrow">Stay inspired</span>
								<h2 style={{ fontSize: "2.1rem" }}>
									Yoga tips, wellness insights &amp; special offers
								</h2>
								<p>
									Join our list for practice tips, wellbeing insights
									and members-only offers — and begin your mindful
									journey with us.
								</p>
							</div>
							<NewsletterForm />
						</div>
					</Reveal>
				</div>
			</section>

			{/* 14. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Join us</span>
					</Reveal>
					<Reveal>
						<h2>Your yoga journey starts in Indiranagar.</h2>
					</Reveal>
					<Reveal>
						<p>
							Certified group classes, personal training and teacher
							training — all in one trusted studio. Book a trial trial and
							begin today.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="/trial-classes" className="btn btn-cream">
								Start Your Yoga Journey
							</a>
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
						Trusted by 850+ Athayogis across Indiranagar &amp; Jayanagar,
						Bengaluru
					</p>
				</div>
			</section>

			{/* 15. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Trial class · from ₹599</span>
				<a href="/trial-classes" className="btn btn-cream">
					Book Now
				</a>
			</div>
		</>
	);
}
