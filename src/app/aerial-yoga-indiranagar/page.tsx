import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import TestimonialVideoCarousel from "@/components/TestimonialVideoCarousel";
import { testimonialVideos } from "@/constants/testimonialVideos";
import MapEmbed from "@/components/MapEmbed";
import MagnetForm from "@/app/aerial-yoga-indiranagar/MagnetForm";
import styles from "@/app/aerial-yoga-indiranagar/AerialYoga.module.css";

export const metadata: Metadata = {
	title: "Aerial Yoga Classes in Indiranagar, Bangalore | ₹599 a Session | Athayog Living",
	description:
		"Aerial yoga in Indiranagar, Bengaluru at Athayog Living — silk hammock-supported practice that builds strength, flexibility and balance while gently decompressing the spine. Friday 7:30 PM & Sunday 10:30 AM. ₹599 per session. Limited slots — book your class.",
	alternates: { canonical: "https://athayogliving.com/aerial-yoga-indiranagar" },
};

const CALENDAR_SVG = (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
		<rect x="3" y="5" width="18" height="16" rx="2" />
		<line x1="3" y1="10" x2="21" y2="10" />
		<line x1="8" y1="3" x2="8" y2="7" />
		<line x1="16" y1="3" x2="16" y2="7" />
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

export default function AerialYogaPage() {
	return (
		<main>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Aerial Yoga · Indiranagar, Bangalore
						</span>
						<h1>
							Aerial Yoga in Indiranagar — <em>It&apos;s Here</em>
						</h1>
						<p className={styles.heroTag}>Defy Gravity. Discover Balance.</p>
						<p className={styles.heroSub}>
							Experience yoga in a whole new way with our silk
							hammock-supported practice — designed to improve strength,
							flexibility, balance and confidence, while gently
							decompressing the spine.
						</p>
						<span className={styles.priceChip}>
							<strong>₹599 per session</strong> · Friday 7:30 PM &amp;
							Sunday 10:30 AM · limited slots
						</span>
						<div className={styles.heroCta}>
							<a href="#book" className="btn btn-primary">
								Book Your Class Today
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-ghost"
							>
								WhatsApp 86903 33111
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Beginners &amp;
								experienced welcome
							</span>
							<span>
								<span className={styles.tick}>✓</span> Certified
								instructors
							</span>
							<span>Athayog Living Yoga Academy, Indiranagar</span>
						</div>
					</div>
					<div className={styles.heroMedia}>
						<Image
							src="/landing-page-hero-4.jpg"
							alt="Aerial yoga at Athayog Living, Indiranagar — silk hammock practice"
							fill
							sizes="(max-width: 960px) 0vw, 40vw"
							priority
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>

			{/* 2. Timings */}
			<section id="timings" className={styles.times} style={{ padding: "44px 0" }}>
				<div className="wrap">
					<div className={styles.timesGrid}>
						<div className={styles.slot}>
							<span className={styles.cal} aria-hidden="true">
								{CALENDAR_SVG}
							</span>
							<span>
								<span className={styles.slotDay}>Friday</span>
								<span className={styles.slotTime}>7:30 PM</span>
							</span>
						</div>
						<div className={styles.slot}>
							<span className={styles.cal} aria-hidden="true">
								{CALENDAR_SVG}
							</span>
							<span>
								<span className={styles.slotDay}>Sunday</span>
								<span className={styles.slotTime}>10:30 AM</span>
							</span>
						</div>
					</div>
				</div>
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
							Aerial yoga is a practice done with the support of a soft silk
							hammock suspended from the ceiling. The hammock takes part of
							your body weight, which lets you move into postures with
							better alignment and less strain — building strength,
							flexibility and balance while gently decompressing the spine.
							At Athayog Living in Indiranagar, aerial classes run Friday at
							7:30 PM and Sunday at 10:30 AM for ₹599 a session, and are
							suitable for beginners and experienced practitioners alike.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 4. The practice */}
			<section id="what">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The practice</span>
							<h2>Yoga, held in the air</h2>
							<p className="lead">
								The hammock isn&apos;t a gimmick — it&apos;s a tool. By
								supporting part of your weight, it changes what your body
								can safely access.
							</p>
						</div>
					</Reveal>
					<div className="grid-3">
						<Reveal>
							<div className="card">
								<div className={styles.exArrow}>◍</div>
								<h3>Supported, not strained</h3>
								<p>
									The silk hammock carries part of your body weight, so
									you can hold postures with better alignment and less
									pressure on the joints.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.exArrow}>◍</div>
								<h3>Gentle spinal decompression</h3>
								<p>
									Suspension allows the spine to lengthen and release —
									a welcome antidote to long hours at a desk.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.exArrow}>◍</div>
								<h3>Playful and confidence-building</h3>
								<p>
									Inversions and shapes that feel out of reach on the
									mat become approachable — and genuinely joyful.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 5. Benefits */}
			<section id="benefits" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why try aerial yoga?</span>
							<h2>What the practice gives you</h2>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.benefits}>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>Improves flexibility and mobility</strong> —
									move deeper, with support.
								</span>
							</li>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>Builds core strength and stability</strong> —
									the hammock demands constant engagement.
								</span>
							</li>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>Enhances balance and posture</strong> —
									retrain how you carry yourself.
								</span>
							</li>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>
										Relieves stress and promotes deep relaxation
									</strong>{" "}
									— float, breathe, release.
								</span>
							</li>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>Gently decompresses the spine</strong> — space
									and length where you need it most.
								</span>
							</li>
							<li>
								<span className={styles.ck}>✓</span>
								<span>
									<strong>
										Suitable for beginners and experienced
										practitioners
									</strong>{" "}
									— every level is guided.
								</span>
							</li>
						</ul>
					</Reveal>
				</div>
			</section>

			{/* 6. Your first class */}
			<section id="how">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your first class</span>
							<h2>What to expect when you arrive</h2>
							<p className="lead">
								No experience needed — just curiosity and comfortable
								clothes.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.steps}>
							<div className={styles.step}>
								<div className={styles.stepNum}>1</div>
								<h3>Book your slot</h3>
								<p>
									Slots are limited, so reserve your hammock ahead of
									Friday or Sunday class.
								</p>
							</div>
							<div className={styles.step}>
								<div className={styles.stepNum}>2</div>
								<h3>Arrive &amp; settle</h3>
								<p>
									Come a few minutes early. Your instructor sets your
									hammock height and talks you through the basics.
								</p>
							</div>
							<div className={styles.step}>
								<div className={styles.stepNum}>3</div>
								<h3>Practise, supported</h3>
								<p>
									Guided sequences — warm-up, supported postures, gentle
									inversions, and deep relaxation in the silk.
								</p>
							</div>
							<div className={styles.step}>
								<div className={styles.stepNum}>4</div>
								<h3>Float out lighter</h3>
								<p>
									Most people leave taller, looser and grinning. Come
									back and go further next week.
								</p>
							</div>
						</div>
					</Reveal>

					<Reveal>
						<div className={styles.safety}>
							<h3>Practising safely</h3>
							<p>
								Aerial yoga is welcoming to beginners, but it isn&apos;t
								right for everyone on every day. Please speak to us before
								booking if any of the following apply — we&apos;ll advise
								honestly, and suggest a mat-based class if it&apos;s the
								better choice for you:
							</p>
							<ul>
								<li>Pregnancy, or recent surgery</li>
								<li>
									Glaucoma, recent eye conditions, or ear/inner-ear
									problems
								</li>
								<li>
									High or unmanaged blood pressure, heart conditions, or
									vertigo
								</li>
								<li>
									Recent injury — especially to the spine, shoulders or
									wrists
								</li>
							</ul>
							<p style={{ marginTop: 10 }}>
								Come on a relatively empty stomach (2–3 hours after
								eating), wear a fitted top that covers the underarms and
								full-length leggings, and remove jewellery and watches so
								nothing catches the fabric.
							</p>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Aerial vs Mat */}
			<section id="why" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The difference</span>
							<h2>Aerial yoga vs a traditional mat class</h2>
							<p className="lead">
								Both are yoga. The hammock simply opens a different door —
								and works beautifully alongside your regular practice.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div style={{ overflowX: "auto" }}>
							<table className={styles.vs}>
								<thead>
									<tr>
										<th>What matters</th>
										<th>Mat-based class</th>
										<th>Aerial yoga</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Support</td>
										<td>Your body carries all the load</td>
										<td>The hammock shares your weight</td>
									</tr>
									<tr>
										<td>Spine</td>
										<td>Lengthening through effort</td>
										<td>Gentle decompression through suspension</td>
									</tr>
									<tr>
										<td>Inversions</td>
										<td>Demanding, take time to build</td>
										<td>
											Accessible from early on, safely supported
										</td>
									</tr>
									<tr>
										<td>Core</td>
										<td>Engaged in specific postures</td>
										<td>Engaged almost continuously for stability</td>
									</tr>
									<tr>
										<td>Feel</td>
										<td>Grounding and steady</td>
										<td>Freeing, playful, weightless</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Reveal>
					<Reveal>
						<p
							style={{
								marginTop: 20,
								fontSize: "0.95rem",
								color: "var(--brand-deep)",
							}}
						>
							Many Athayogis pair aerial with our{" "}
							<a
								href="/group-classes-indiranagar"
								style={{
									borderBottom: "1px solid var(--brand-deep)",
									color: "var(--brand-deep)",
								}}
							>
								regular group classes
							</a>{" "}
							— the two complement each other beautifully.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 8. Pricing */}
			<section id="pricing" className={styles.pricing}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 760 }}>
							<span className="eyebrow">Pricing</span>
							<h2>One class, one simple price</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Aerial yoga is a paid, per-session class — book the slots
								you want, no membership required.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.pcard}>
							<div>
								<h3>Aerial Yoga Session</h3>
								<p className={styles.pcardDesc}>
									A guided silk-hammock class at our Indiranagar studio,
									open to beginners and experienced practitioners.
								</p>
								<ul className={styles.incl}>
									<li>Expert-led guided class</li>
									<li>Hammock &amp; equipment provided</li>
									<li>Warm-up to deep relaxation</li>
									<li>Beginner-friendly guidance</li>
									<li>Friday 7:30 PM slot</li>
									<li>Sunday 10:30 AM slot</li>
								</ul>
							</div>
							<div className={styles.pcardBuy}>
								<div className={styles.pcardAmt}>₹599</div>
								<div className={styles.pcardTerm}>per session</div>
								<a href="#book" className="btn btn-cream">
									Book Your Class
								</a>
								<a
									href="https://wa.me/918690333111"
									className="btn btn-light"
								>
									WhatsApp to Reserve
								</a>
								<div className={styles.pcardFine}>
									Limited slots · UPI, cards, net banking &amp; PayPal
									accepted.
								</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							Interested in a regular aerial practice?{" "}
							<a href="https://wa.me/918690333111">
								Ask us about multi-session packages
							</a>
							.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 9. Book — magnet form */}
			<section id="book">
				<div className="wrap">
					<Reveal>
						<div className={styles.magnet}>
							<div>
								<span className="eyebrow">Limited slots available</span>
								<h2 style={{ fontSize: "2.2rem" }}>
									Book your aerial yoga class today
								</h2>
								<p>
									Tell us which slot you&apos;d like — Friday 7:30 PM or
									Sunday 10:30 AM — and we&apos;ll confirm your hammock.
									New to aerial? Say so, and we&apos;ll look after you.
								</p>
							</div>
							<MagnetForm />
						</div>
					</Reveal>
				</div>
			</section>

			{/* 10. Social proof */}
			<section id="reviews" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Loved by our Indiranagar community</h2>
							<p className="lead">
								Real stories from Athayogis — 850+ and growing.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<TestimonialVideoCarousel videos={testimonialVideos} />
					</Reveal>
					<Reveal>
						<p style={{ marginTop: 20, color: "var(--brand-deep)" }}>
							Featured members: Ramya Shree, Srishti Mehrotra, Naisargi
							Ruparelia, Athulya G, Varna.
						</p>
					</Reveal>
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

			{/* 11. Mid CTA */}
			<section className={styles.ctaMid}>
				<div className="wrap">
					<Reveal>
						<h2>Fly beyond limits. Flow beyond fear.</h2>
						<p>
							Friday 7:30 PM · Sunday 10:30 AM · ₹599 a session · limited
							slots.
						</p>
						<a href="#book" className="btn btn-cream">
							Book Your Class Today
						</a>
					</Reveal>
				</div>
			</section>

			{/* 12. Location */}
			<section id="location">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Venue</span>
							<h2>Athayog Living Yoga Academy, Indiranagar</h2>
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
								<p>
									Call / WhatsApp: <strong>+91 86903 33111</strong> ·
									info@athayogliving.com
								</p>
								<p style={{ fontSize: "0.9rem" }}>
									Easy to reach from Domlur, CV Raman Nagar, Koramangala
									&amp; nearby.
								</p>
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

			{/* 13. FAQ */}
			<section id="faq" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Aerial yoga in Indiranagar — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>Getting started</h3>
							<details open>
								<summary>
									What is aerial yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Aerial yoga is a practice done with a soft silk
									hammock suspended from the ceiling. The hammock
									supports part of your body weight, letting you move
									into postures with better alignment and less strain —
									building strength, flexibility and balance while
									gently decompressing the spine.
								</div>
							</details>
							<details>
								<summary>
									Do I need any experience?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									No. Our aerial classes are suitable for beginners and
									experienced practitioners alike — the instructor sets
									your hammock and guides you through every step.
								</div>
							</details>
							<details>
								<summary>
									Do I need to be strong or flexible to start?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Not at all. The hammock supports you, which is
									precisely what makes aerial so accessible. Strength
									and flexibility are what you build, not what you need
									to arrive with.
								</div>
							</details>
							<details>
								<summary>
									What should I wear and bring?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Wear a fitted top that covers your underarms (the
									fabric can rub) and full-length leggings. Remove
									jewellery, watches and anything sharp that could snag
									the silk. Practise on a relatively empty stomach — 2–3
									hours after a meal.
								</div>
							</details>

							<h3 className={styles.faqCat}>Timings &amp; booking</h3>
							<details>
								<summary>
									When are the aerial yoga classes?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Aerial yoga runs twice a week at our Indiranagar
									studio: <strong>Friday at 7:30 PM</strong> and{" "}
									<strong>Sunday at 10:30 AM</strong>.
								</div>
							</details>
							<details>
								<summary>
									How much does aerial yoga cost in Indiranagar?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Aerial yoga is ₹599 per session. It&apos;s a paid,
									per-session class — separate from the standard
									group-class membership — so you can simply book the
									slots you want.
								</div>
							</details>
							<details>
								<summary>
									Do I need to book in advance?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — slots are limited by the number of hammocks, so
									we recommend reserving ahead. Call or WhatsApp us on
									86903 33111 to confirm your place.
								</div>
							</details>
							<details>
								<summary>
									Is aerial included in my group-class membership?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									No. Aerial yoga is offered as a separate paid,
									per-session class rather than part of the standard
									group membership.
								</div>
							</details>

							<h3 className={styles.faqCat}>Safety &amp; suitability</h3>
							<details>
								<summary>
									Is aerial yoga safe?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Practised under trained guidance with properly rigged
									equipment, aerial yoga is very safe. Your instructor
									sets your hammock height, guides your alignment and
									progresses you at your own pace.
								</div>
							</details>
							<details>
								<summary>
									Who should avoid aerial yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Please talk to us first if you&apos;re pregnant, have
									had recent surgery, or live with glaucoma or other eye
									conditions, inner-ear problems, vertigo, unmanaged
									high blood pressure, heart conditions, or a recent
									spine, shoulder or wrist injury. We&apos;ll advise
									honestly and may suggest a mat-based class instead. If
									in doubt, check with your doctor.
								</div>
							</details>
							<details>
								<summary>
									Will I be upside down?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Gentle inversions are part of the practice and are one
									of its real joys — but they&apos;re always optional,
									supported, and introduced progressively. You&apos;re
									never pushed into anything.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 14. Explore */}
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
							<a className={styles.ex} href="/group-classes-indiranagar">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Group Classes</h3>
								<p>Six signature formats — from ₹599 drop-in.</p>
							</a>
							<a
								className={styles.ex}
								href="/personal-yoga-training-indiranagar"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Personal Training</h3>
								<p>One-on-one, goal-based — from ₹14,999.</p>
							</a>
							<a
								className={styles.ex}
								href="/weight-loss-program-indiranagar"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Weight Loss Program</h3>
								<p>Holistic 3-month transformation.</p>
							</a>
							<a
								className={styles.ex}
								href="/yoga-teacher-training-bangalore"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Teacher Training (TTC)</h3>
								<p>RYT-200 certification from ₹24,999.</p>
							</a>
							<a className={styles.ex} href="/about-us">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Who We Are</h3>
								<p>Our story, lineage and teachers.</p>
							</a>
							<a className={styles.ex} href="/trial-classes">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Free Trial Class</h3>
								<p>Try a regular class on the mat, free.</p>
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 15. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Book now</span>
						<h2>Aerial yoga is here. Come and try it.</h2>
						<p>
							Silk-hammock yoga at Athayog Living, Indiranagar — ₹599 a
							session, Friday evenings and Sunday mornings. Slots are
							limited.
						</p>
						<div className="final-cta">
							<a href="#book" className="btn btn-cream">
								Book Your Class
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp 86903 33111
							</a>
							<a href="tel:+918690333111" className="btn btn-light">
								Call Us
							</a>
						</div>
						<p
							style={{
								fontFamily: "var(--font-label)",
								letterSpacing: "0.2em",
								fontSize: "0.78rem",
								color: "var(--brand-light)",
								marginTop: 26,
								textTransform: "uppercase",
							}}
						>
							Fly Beyond Limits · Flow Beyond Fear
						</p>
					</Reveal>
				</div>
			</section>

			{/* 16. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Aerial Yoga · ₹599 / session</span>
				<a href="#book" className="btn btn-cream">
					Book Now
				</a>
			</div>

			{/* JSON-LD structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@graph": [
							{
								"@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
								"@id": "https://athayogliving.com/#org",
								name: "Athayog Living",
								alternateName: "Athayog Living Yoga Academy",
								slogan: "A Sanctum For The Spirit",
								url: "https://athayogliving.com/",
								telephone: "+91-8690333111",
								email: "info@athayogliving.com",
								priceRange: "₹₹",
								image: "https://images.prismic.io/athayog/Zvf-FrVsGrYSwGfu_Unfilled_LOGO.png",
								address: {
									"@type": "PostalAddress",
									streetAddress:
										"No. 3293, 1st Floor, 12th Main, HAL 2nd Stage, Indiranagar",
									addressLocality: "Bengaluru",
									addressRegion: "Karnataka",
									postalCode: "560038",
									addressCountry: "IN",
								},
								geo: {
									"@type": "GeoCoordinates",
									latitude: 12.9784,
									longitude: 77.6408,
								},
								areaServed: [
									"Indiranagar",
									"Domlur",
									"CV Raman Nagar",
									"Koramangala",
									"Bengaluru",
								],
								sameAs: [
									"https://www.facebook.com/athayogliving/",
									"https://in.linkedin.com/company/athayog-living",
									"https://www.instagram.com/athayogliving/",
								],
								founder: {
									"@id": "https://athayogliving.com/#sharath",
								},
							},
							{
								"@type": "Person",
								"@id": "https://athayogliving.com/#sharath",
								name: "Sharath Basavaraju",
								jobTitle: "Founder & Principal Teacher",
								worksFor: {
									"@id": "https://athayogliving.com/#org",
								},
							},
							{
								"@type": "Service",
								serviceType: "Aerial Yoga Class",
								name: "Aerial Yoga in Indiranagar",
								description:
									"Silk hammock-supported aerial yoga classes in Indiranagar, Bengaluru. Improves flexibility and mobility, builds core strength and stability, enhances balance and posture, relieves stress and gently decompresses the spine. Suitable for beginners and experienced practitioners.",
								provider: {
									"@id": "https://athayogliving.com/#org",
								},
								areaServed: {
									"@type": "Place",
									name: "Indiranagar, Bengaluru",
								},
								offers: {
									"@type": "Offer",
									price: "599",
									priceCurrency: "INR",
									availability:
										"https://schema.org/LimitedAvailability",
									description:
										"Per-session aerial yoga class. Limited slots.",
								},
								hoursAvailable: [
									{
										"@type": "OpeningHoursSpecification",
										dayOfWeek: "Friday",
										opens: "19:30",
									},
									{
										"@type": "OpeningHoursSpecification",
										dayOfWeek: "Sunday",
										opens: "10:30",
									},
								],
							},
							{
								"@type": "BreadcrumbList",
								itemListElement: [
									{
										"@type": "ListItem",
										position: 1,
										name: "Home",
										item: "https://athayogliving.com/",
									},
									{
										"@type": "ListItem",
										position: 2,
										name: "Aerial Yoga in Indiranagar",
										item: "https://athayogliving.com/aerial-yoga-indiranagar",
									},
								],
							},
							{
								"@type": "FAQPage",
								mainEntity: [
									{
										"@type": "Question",
										name: "What is aerial yoga?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "Aerial yoga is a practice done with a soft silk hammock suspended from the ceiling. The hammock supports part of your body weight, letting you move into postures with better alignment and less strain, building strength, flexibility and balance while gently decompressing the spine.",
										},
									},
									{
										"@type": "Question",
										name: "When are the aerial yoga classes in Indiranagar?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "Aerial yoga runs twice a week at Athayog Living, Indiranagar: Friday at 7:30 PM and Sunday at 10:30 AM.",
										},
									},
									{
										"@type": "Question",
										name: "How much does aerial yoga cost in Indiranagar?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "Aerial yoga is 599 INR per session. It is a paid, per-session class, separate from the standard group-class membership.",
										},
									},
									{
										"@type": "Question",
										name: "Do I need any experience to try aerial yoga?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "No. Aerial classes are suitable for beginners and experienced practitioners alike, and the instructor sets your hammock and guides you through every step.",
										},
									},
									{
										"@type": "Question",
										name: "Who should avoid aerial yoga?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "Speak to the studio first if you are pregnant, have had recent surgery, or live with glaucoma or other eye conditions, inner-ear problems, vertigo, unmanaged high blood pressure, heart conditions, or a recent spine, shoulder or wrist injury. A mat-based class may be recommended instead.",
										},
									},
									{
										"@type": "Question",
										name: "What should I wear to an aerial yoga class?",
										acceptedAnswer: {
											"@type": "Answer",
											text: "Wear a fitted top that covers the underarms and full-length leggings, and remove jewellery and watches so nothing catches the fabric. Practise on a relatively empty stomach, 2 to 3 hours after a meal.",
										},
									},
								],
							},
						],
					}),
				}}
			/>
		</main>
	);
}
