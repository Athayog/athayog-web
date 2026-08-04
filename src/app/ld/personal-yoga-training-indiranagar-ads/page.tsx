import Reveal from "@/components/Reveal";
import PYTAdsForm from "@/app/ld/personal-yoga-training-indiranagar-ads/PYTAdsForm";
import PageJsonLd from "@/app/ld/personal-yoga-training-indiranagar-ads/PageJsonLd";
import styles from "@/app/ld/personal-yoga-training-indiranagar-ads/PYTAds.module.css";

const YA_VIDEOS = [
	{
		id: "Pmvr_kFDcTA",
		label: "Athayog personal yoga training member testimonial, Indiranagar",
	},
	{
		id: "aFxeW-gUKqw",
		label: "Athayog personal yoga member testimonial, Indiranagar Bengaluru",
	},
	{ id: "CrCdzkiJ46E", label: "Athayog member story, Indiranagar yoga studio" },
];

const GOALS = [
	"Weight loss",
	"Back and neck pain",
	"Flexibility",
	"Stress relief",
	"Prenatal and postnatal",
	"Beginners",
	"Seniors",
	"Athletes",
];

const TESTIMONIALS = [
	{
		quote: "My trainer built everything around my back pain. Three months in, it is gone.",
		who: "Name, Indiranagar",
	},
	{
		quote: "One-on-one at home in Indiranagar fit my schedule perfectly. I finally lost the weight.",
		who: "Name, Domlur",
	},
	{
		quote: "As a beginner I felt no judgement, just patient, expert guidance.",
		who: "Name, Koramangala",
	},
];

const FAQS = [
	{
		q: "Where is your personal yoga training in Indiranagar?",
		a: "Our studio is in Indiranagar, HAL 2nd Stage, 12th Main, Bengaluru 560038. We also offer at-home sessions across Indiranagar, Domlur, CV Raman Nagar and Koramangala, as well as online sessions.",
	},
	{
		q: "How much does personal yoga training cost in Indiranagar?",
		a: "12-session packages start at 14,999 INR online, 18,999 INR at the studio, and 27,999 INR at home. 24-session and couple packages are also available. Prices exclude 5% GST, and your first trial session is free.",
	},
	{
		q: "Can you train me at home in Indiranagar?",
		a: "Yes. We offer at-home one-on-one yoga across Indiranagar and nearby areas including Domlur, CV Raman Nagar and Koramangala, alongside studio and online options.",
	},
	{
		q: "Is the trial session really free?",
		a: "Yes. Your first trial session and goal assessment are free, with no obligation to continue.",
	},
	{
		q: "I am a beginner in Indiranagar, is that okay?",
		a: "Yes. Beginners benefit most from personal training, because you learn correct technique from day one, at your own pace, with no pressure.",
	},
	{
		q: "What timings are available for personal yoga in Indiranagar?",
		a: "You choose slots that suit you, including early mornings and evenings. We will confirm available hours after you book.",
	},
];

export default function PYTAdsPage() {
	return (
		<main>
			<PageJsonLd />

			{/* 1. Hero */}
			<section className={styles.hero}>
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
				</svg>
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Personal Yoga Training in Indiranagar, Bengaluru
						</span>
						<h1>
							Personal Yoga Trainer in Indiranagar,{" "}
							<em>Built Around Your Goal</em>
						</h1>
						<p className={styles.heroSub}>
							One-on-one yoga in Indiranagar for weight loss, back pain,
							flexibility and stress. Train at our HAL 2nd Stage studio, at
							your home nearby, or online. Start with a free trial session.
						</p>
						<ul className={styles.ticks}>
							<li>
								<span className={styles.ck}>✓</span> Certified trainers,
								recognised by Yoga Alliance, SVYASA and AYUSH
							</li>
							<li>
								<span className={styles.ck}>✓</span> A plan built for your
								body and goal, not a generic class
							</li>
							<li>
								<span className={styles.ck}>✓</span> Flexible timings
								across Indiranagar, at studio, home or online
							</li>
							<li>
								<span className={styles.ck}>✓</span> Free trial and goal
								assessment, with no obligation
							</li>
						</ul>
						<div className={styles.rating}>
							<span className={styles.stars}>★★★★★</span>
							<span>Rated 4.9 by our Indiranagar community</span>
							<span className={styles.cert}>· 850+ Athayogis trained</span>
						</div>
					</div>

					<div className={styles.formCard} id="book">
						<span className={styles.badge}>Free trial + assessment</span>
						<div className={styles.fh}>
							Book your free trial in Indiranagar
						</div>
						<div className={styles.fs}>
							Tell us your goal. We will match you with the right trainer
							and confirm your slot.
						</div>
						<PYTAdsForm />
						<div className={styles.formOr}>or reach us instantly</div>
						<a
							className={`btn ${styles.waBtn}`}
							href="https://wa.me/918690333111?text=Hi%20Athayog%2C%20I'd%20like%20to%20book%20a%20free%20personal%20yoga%20training%20trial%20in%20Indiranagar."
							target="_blank"
							rel="noopener noreferrer"
							style={{ width: "100%", justifyContent: "center" }}
						>
							WhatsApp 86903 33111
						</a>
						<p className={styles.formFine}>
							No obligation. By submitting you agree to be contacted about
							your enquiry. See our{" "}
							<a
								href="/privacy-policy"
								target="_blank"
								rel="noopener noreferrer"
							>
								privacy policy
							</a>
							.
						</p>
					</div>
				</div>
			</section>

			{/* 2. AEO answer-first */}
			<section className={styles.aeo}>
				<div className="wrap">
					<Reveal>
						<p className={styles.aeoBlock} id="aeo-answer">
							Personal yoga training in Indiranagar is one-on-one
							instruction with a certified trainer who builds a plan around
							your body, goal and schedule. At Athayog Living in HAL 2nd
							Stage, Indiranagar, Bengaluru, you can train at the studio, at
							your home nearby, or online, for weight loss, back and neck
							pain, flexibility, stress and more. Packages start at 14,999
							INR (excluding 5% GST), and your first trial session is free.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 3. Offer strip */}
			<div className={styles.offer}>
				<div className={`wrap ${styles.offerInner}`}>
					<span>
						<strong className={styles.offerStrong}>Free trial</strong> and
						free goal assessment
					</span>
					<span className={styles.offerSep}>|</span>
					<span>Certified 1-on-1 trainers in Indiranagar</span>
					<span className={styles.offerSep}>|</span>
					<span>
						<strong className={styles.offerStrong}>
							Limited trainer slots
						</strong>{" "}
						each week
					</span>
				</div>
			</div>

			{/* 4. Trust bar */}
			<div className={styles.trustbar}>
				<div className={`wrap ${styles.trustbarInner}`}>
					<div className={styles.trustItem}>
						<span className={styles.trustNum}>850+</span> Athayogis
					</div>
					<div className={styles.trustItem}>
						<span className={styles.trustNum}>30+</span> transformations
					</div>
					<div className={styles.trustItem}>
						Yoga Alliance, SVYASA and AYUSH certified
					</div>
					<div className={styles.trustItem}>
						Serving Indiranagar, Domlur, CV Raman Nagar and Koramangala
					</div>
				</div>
			</div>

			{/* 5. Goals */}
			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.sectionHeader}>
							<span className="eyebrow">Personalised for you</span>
							<h2>Personal yoga in Indiranagar for your specific goal</h2>
							<p className="lead">
								Your trainer designs every session around where you want
								to get to.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.goals}>
							{GOALS.map((g) => (
								<div key={g} className={styles.goal}>
									<div className={styles.goalIc}>◍</div>
									<h3>{g}</h3>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<div style={{ textAlign: "center", marginTop: 34 }}>
							<a href="#book" className="btn btn-primary">
								Book My Free Trial
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 6. How it works */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className={styles.sectionHeader}>
							<span className="eyebrow">Simple to start</span>
							<h2>How personal yoga training in Indiranagar works</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.steps}>
							<div className={styles.step}>
								<div className={styles.stepNum}>1</div>
								<h3>Free assessment</h3>
								<p>
									We understand your goal, health and level, at no cost
									and with no obligation.
								</p>
							</div>
							<div className={styles.step}>
								<div className={styles.stepNum}>2</div>
								<h3>Your personal plan</h3>
								<p>
									Your trainer builds a program around your body and
									your schedule.
								</p>
							</div>
							<div className={styles.step}>
								<div className={styles.stepNum}>3</div>
								<h3>1-on-1 sessions</h3>
								<p>
									Train with full attention at the studio, your home or
									online, and track your progress.
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Pricing */}
			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.sectionHeader}>
							<span className="eyebrow">Transparent pricing</span>
							<h2>Personal yoga training cost in Indiranagar</h2>
							<p className="lead">
								Start free, then continue with the package that fits, at
								the studio, online or at home.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.priceStrip}>
							<div className={styles.pmini}>
								<div className={styles.pminiMode}>Online</div>
								<div className={styles.pminiAmt}>
									14,999 INR<small>12 sessions, from</small>
								</div>
							</div>
							<div className={`${styles.pmini} ${styles.pminiFeat}`}>
								<div className={styles.pminiMode}>
									At studio, Indiranagar
								</div>
								<div className={styles.pminiAmt}>
									18,999 INR<small>12 sessions</small>
								</div>
							</div>
							<div className={styles.pmini}>
								<div className={styles.pminiMode}>
									At home in Indiranagar
								</div>
								<div className={styles.pminiAmt}>
									27,999 INR<small>12 sessions</small>
								</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.priceNote}>
							24-session and couple packages are also available. Prices
							exclude 5% GST. EMI, UPI, cards and PayPal accepted. Your
							first trial session is free.
						</p>
					</Reveal>
					<Reveal>
						<div style={{ textAlign: "center", marginTop: 26 }}>
							<a href="#book" className="btn btn-primary">
								Claim My Free Trial
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 8. Social proof */}
			<section className={styles.proof}>
				<div className="wrap">
					<Reveal>
						<div className={`${styles.sectionHeader} ${styles.proofCenter}`}>
							<span
								className="eyebrow"
								style={{ color: "var(--brand-light)" }}
							>
								Real results
							</span>
							<h2>Trusted across Indiranagar and Bengaluru</h2>
							<p className="lead">
								Watch real member stories from our Indiranagar community.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.vidGrid}>
							{YA_VIDEOS.map((v) => (
								<a
									key={v.id}
									className={styles.vid}
									href={`https://www.youtube.com/watch?v=${v.id}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Watch testimonial`}
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
										alt={v.label}
										loading="lazy"
									/>
									<span className={styles.playOverlay}>
										<svg
											className={styles.playIcon}
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</span>
								</a>
							))}
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.tstRow}>
							{TESTIMONIALS.map((t) => (
								<div key={t.quote} className={styles.tst}>
									<p className={styles.tstQ}>&ldquo;{t.quote}&rdquo;</p>
									<div className={styles.tstWho}>[ {t.who} ]</div>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 9. Guarantee */}
			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.guarantee}>
							<span className={styles.guaranteeSeal} aria-hidden="true">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.7"
								>
									<path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />
									<path d="M9 12l2 2 4-4" />
								</svg>
							</span>
							<div>
								<h3>Try it free, with no pressure and no obligation</h3>
								<p>
									Start with a complimentary trial session and goal
									assessment at our Indiranagar studio, at your home, or
									online. Meet your trainer, feel the difference, and
									continue only if it is right for you.
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 10. FAQ */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className={styles.sectionHeader}>
							<span className="eyebrow">Quick answers</span>
							<h2>
								Personal yoga training in Indiranagar, questions answered
							</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faqWrap}>
							{FAQS.map((faq, i) => (
								<details
									key={faq.q}
									className={styles.faqItem}
									open={i === 0}
								>
									<summary className={styles.faqQ}>
										{faq.q}
										<span className={styles.faqIc}>+</span>
									</summary>
									<div className={styles.faqA}>{faq.a}</div>
								</details>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 11. Final CTA */}
			<section className={styles.finalCta}>
				<div className="wrap">
					<Reveal>
						<span className="eyebrow" style={{ color: "var(--brand-light)" }}>
							Limited slots
						</span>
						<h2>Book your free personal yoga trial in Indiranagar</h2>
						<p>
							Certified one-on-one training in Indiranagar, at the studio,
							your home, or online. It starts with one free session.
						</p>
						<div className={styles.finalBtns}>
							<a href="#book" className={`btn btn-cream`}>
								Book My Free Trial
							</a>
							<a
								className="btn btn-light"
								href="https://wa.me/918690333111?text=Hi%20Athayog%2C%20I'd%20like%20to%20book%20a%20free%20personal%20yoga%20training%20trial%20in%20Indiranagar."
								target="_blank"
								rel="noopener noreferrer"
							>
								WhatsApp Us
							</a>
							<a href="tel:+918690333111" className="btn btn-light">
								Call 86903 33111
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 12. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>
					Free trial · personal yoga training
				</span>
				<a href="#book" className="btn btn-cream">
					Book Now
				</a>
			</div>
		</main>
	);
}
