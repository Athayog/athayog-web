import Image from "next/image";
import Reveal from "@/components/Reveal";
import TtcOnlineLdForm from "@/app/ld/yoga-ttc-online-certification/TtcOnlineLdForm";
import PageJsonLd from "@/app/ld/yoga-ttc-online-certification/PageJsonLd";
import styles from "@/app/ld/yoga-ttc-online-certification/TtcOnlineLd.module.css";

const APPLY_HREF = "/contact-us";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20details%20on%20the%20Online%20Yoga%20Teacher%20Training%20-%20cohort%20dates%2C%20eligibility%20and%20fees.";

const HERO_POINTS = [
	"Live interactive classes",
	"Structured curriculum and assessments",
	"Faculty-guided learning",
	"Limited cohort for depth and focus",
];

const FIT_POINTS = [
	"You want to teach yoga professionally, or deepen your practice seriously",
	"You prefer live, guided learning over self-paced recordings",
	"You are willing to commit time, attention and discipline",
	"You want a credible yoga teacher certification",
	"You need the flexibility of online learning without losing depth",
];

const FORMAT_POINTS = [
	"Live asana practice and alignment guidance",
	"Pranayama and breath science",
	"Meditation fundamentals",
	"Yoga philosophy and ethics",
	"Applied anatomy",
	"Teaching methodology and practice teaching",
];

const LEARNING_AREAS = [
	{
		title: "Asana Practice & Alignment",
		body: "Safe, mindful practice with a functional understanding of the body.",
		image: "/images/landing/warrior-pose.jpg",
		alt: "Asana practice and alignment, online yoga teacher training",
	},
	{
		title: "Pranayama & Breath Awareness",
		body: "Understanding breath regulation and its effects on the body and mind.",
		image: "/images/landing/pranayama.jpg",
		alt: "Pranayama and breath awareness training online",
	},
	{
		title: "Meditation & Inner Practices",
		body: "Foundational techniques for focus, steadiness and clarity.",
		image: "/images/landing/meditation.jpg",
		alt: "Meditation and inner practices, online yoga TTC",
	},
	{
		title: "Yoga Philosophy & Ethics",
		body: "Classical concepts applied to modern life and teaching.",
		image: "/images/landing/ethics.jpg",
		alt: "Yoga philosophy and ethics study online",
	},
	{
		title: "Applied Anatomy",
		body: "Understanding the body for safe teaching (non-medical).",
		image: "/images/landing/anatomy.jpg",
		alt: "Applied anatomy for safe yoga teaching, online",
	},
	{
		title: "Teaching Methodology",
		body: "Cueing, sequencing, observation and correction.",
		image: "/images/landing/teaching.jpg",
		alt: "Teaching methodology, cueing and sequencing online",
	},
	{
		title: "Practice Teaching & Feedback",
		body: "Guided teaching practice with direct faculty input.",
		image: "/images/landing/feedback.jpg",
		alt: "Practice teaching and faculty feedback online",
	},
];

const PERSONAS = [
	"Working professionals moving into teaching",
	"Dedicated practitioners seeking depth",
	"International students needing location-independent learning",
	"Wellness professionals adding yoga credentials",
	"People unable to relocate for a residential TTC",
];

const FACULTY_POINTS = [
	"Safety and alignment first",
	"Traditional principles with modern understanding",
	"Ethical teaching standards",
	"Clarity over complexity",
];

const OUTCOME_POINTS = [
	"Participants receive a yoga teacher training certification",
	"Guidance is provided on teaching readiness and scope",
	"Emphasis is placed on teaching responsibly and ethically",
];

const COMMITMENT_POINTS = [
	"Consistent live attendance",
	"Weekly study and practice time",
	"Willingness to engage and participate",
	"Commitment to learning",
];

const TESTIMONIALS = [
	"The live format made a real difference in my understanding.",
	"I finally felt confident explaining and teaching postures.",
	"This felt like real teacher training.",
];

const FAQS = [
	{
		q: "Is this yoga teacher training fully online?",
		a: "Yes. All sessions are conducted online through live, interactive classes.",
	},
	{
		q: "Is prior yoga experience required?",
		a: "Some prior practice is helpful. Suitability is assessed before enrollment.",
	},
	{
		q: "Is this program live or recorded?",
		a: "The training is primarily live-guided. Recordings may be provided for review, not as a replacement for live participation.",
	},
	{
		q: "How rigorous is the program?",
		a: "The program requires consistent attendance, practice and sincere engagement.",
	},
	{
		q: "Will I be confident to teach after completion?",
		a: "The curriculum is designed to progressively build teaching understanding, clarity and confidence.",
	},
];

export default function TtcOnlineLdPage() {
	return (
		<main className={styles.page}>
			<PageJsonLd />

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

				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Online Yoga Teacher Training · Live &amp; Faculty-Guided
						</span>
						<h1>
							Online Yoga Teacher Training Course for{" "}
							<em>Serious Practitioners and Future Teachers</em>
						</h1>
						<p className={styles.heroSub}>
							A structured, live-guided online yoga teacher training
							designed for people who want authentic yogic education, real
							teaching confidence and a credible certification.
						</p>
						<ul className={styles.heroList}>
							{HERO_POINTS.map((point) => (
								<li key={point}>
									<span className={styles.ck}>✓</span> {point}
								</li>
							))}
						</ul>
						<div className={styles.heroCta}>
							<a href={APPLY_HREF} className="btn btn-primary">
								Check Eligibility &amp; Apply
							</a>
							<a
								href={WHATSAPP_HREF}
								className="btn btn-ghost"
								target="_blank"
								rel="noopener noreferrer"
							>
								WhatsApp Us
							</a>
						</div>
					</div>

					<div className={styles.formCard} id="enquire">
						<span className={styles.badge}>Enquire now</span>
						<div className={styles.fh}>Speak to us about the next cohort</div>
						<div className={styles.fs}>
							Share a few details and we will guide you on eligibility,
							schedule fit and the application.
						</div>
						<TtcOnlineLdForm />
						<div className={styles.formOr}>Prefer a quick chat?</div>
						<a
							className={`btn ${styles.waBtn} ${styles.fullBtn}`}
							href={WHATSAPP_HREF}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Chat with Athayog Living on WhatsApp"
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								width="19"
								height="19"
								aria-hidden="true"
							>
								<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2 .8.5 1.2.6 1.4.5.2-.1.5-.6.7-.8.2-.3.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.2z" />
							</svg>
							Chat with us on WhatsApp
						</a>
						<p className={styles.waNote}>
							<span className={styles.dot} aria-hidden="true" /> We usually
							reply within a few minutes
						</p>
						<p className={styles.formFine}>
							By sending this enquiry you agree to be contacted about the
							course and accept our{" "}
							<a
								href="/privacy-policy"
								target="_blank"
								rel="noopener noreferrer"
							>
								privacy policy
							</a>
							. No obligation.
						</p>
					</div>
				</div>
			</section>

			<section className={styles.aeo}>
				<div className="wrap">
					<Reveal>
						<p className="answer" id="aeo-answer">
							An online yoga teacher training course at Athayog Living is a
							live, instructor-led program that delivers the depth of a
							traditional TTC through a structured online format. You learn
							asana practice and alignment, pranayama, meditation, yoga
							philosophy, applied anatomy, and teaching methodology, with
							practice teaching and faculty feedback. Sessions are live
							rather than pre-recorded, the cohort is kept small for depth,
							and graduates receive a yoga teacher training certification.
							It suits people who want to teach professionally or deepen
							their practice, without relocating for a residential course.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="fit">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Is this right for you?</span>
							<h2>Is this online yoga teacher training right for you?</h2>
							<p className="lead">
								This online TTC is a strong fit if the following sounds
								like you.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.checklist}>
							{FIT_POINTS.map((point) => (
								<li key={point}>
									<span className={styles.ck}>✓</span> {point}
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</section>

			<section className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The format</span>
							<h2>What is an online yoga teacher training program?</h2>
							<p className="lead">
								A live, instructor-led education that brings the depth of
								a traditional TTC into a structured online format.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.numlist}>
							{FORMAT_POINTS.map((point) => (
								<li key={point}>{point}</li>
							))}
						</ul>
					</Reveal>
				</div>
			</section>

			<section id="curriculum">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Core learning areas</span>
							<h2>What you will learn in the online TTC</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.learnGrid}>
							{LEARNING_AREAS.map((area) => (
								<article key={area.title} className={styles.lc}>
									<div className={styles.lcMedia}>
										<Image
											src={area.image}
											alt={area.alt}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
											style={{ objectFit: "cover" }}
										/>
									</div>
									<div className={styles.lcBody}>
										<h3>{area.title}</h3>
										<p>{area.body}</p>
									</div>
								</article>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The cohort</span>
							<h2>Who typically joins this online TTC</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.persona}>
							{PERSONAS.map((persona) => (
								<div key={persona}>
									<div className={styles.personaIc} aria-hidden="true">
										◍
									</div>
									{persona}
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="faculty">
				<div className="wrap">
					<Reveal>
						<div className={styles.split}>
							<div className={styles.splitBody}>
								<span className="eyebrow">
									Guided by experienced teachers
								</span>
								<h2>
									Learn from teachers who value clarity over complexity
								</h2>
								<p>
									Athayog Living is grounded in a recognized lineage and
									holds Yoga Alliance, SVYASA and AYUSH recognition. Our
									teaching keeps you close to the essentials that
									matter.
								</p>
								<ul className={styles.plist}>
									{FACULTY_POINTS.map((point) => (
										<li key={point}>
											<span className={styles.ck}>✓</span> {point}
										</li>
									))}
								</ul>
							</div>
							<div className={styles.splitMedia}>
								<Image
									src="/images/landing/teaching.jpg"
									alt="Experienced faculty guiding online yoga teacher training"
									fill
									sizes="(max-width: 960px) 100vw, 50vw"
									style={{ objectFit: "cover" }}
								/>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section className={styles.outcomes}>
				<div className="wrap">
					<Reveal>
						<div className={styles.split}>
							<div className={styles.splitMedia}>
								<Image
									src="/images/landing/certification.jpg"
									alt="Yoga teacher training certification and professional outcomes"
									fill
									sizes="(max-width: 960px) 100vw, 50vw"
									style={{ objectFit: "cover" }}
								/>
							</div>
							<div className={styles.splitBody}>
								<span className="eyebrow">
									Certification &amp; outcomes
								</span>
								<h2>Certification and professional outcomes</h2>
								<ul className={styles.plist}>
									{OUTCOME_POINTS.map((point) => (
										<li key={point}>
											<span className={styles.ck}>✓</span> {point}
										</li>
									))}
								</ul>
								<a
									href={APPLY_HREF}
									className={`btn btn-primary ${styles.splitCta}`}
								>
									Check Eligibility &amp; Apply
								</a>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section className={styles.commit}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What we expect</span>
							<h2>Duration, schedule and commitment</h2>
							<p className="lead">
								This is real teacher training. It asks for genuine
								engagement.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.numlist}>
							{COMMITMENT_POINTS.map((point) => (
								<li key={point}>{point}</li>
							))}
						</ul>
					</Reveal>
					<Reveal>
						<div className={styles.commitCta}>
							<a href={APPLY_HREF} className="btn btn-cream">
								Discuss Eligibility &amp; Schedule Fit
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="reviews">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What graduates share</span>
							<h2>Honest learning experiences</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.tstRow}>
							{TESTIMONIALS.map((quote) => (
								<div key={quote} className={styles.tst}>
									<p className={styles.tstQ}>&ldquo;{quote}&rdquo;</p>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.tstNote}>
							Honest learning experiences, with no exaggeration.{" "}
							<span
								className="verify"
								title="Add attributed graduate names or link Google/YouTube reviews to strengthen EEAT"
							>
								[ attribute with real names or link video reviews ]
							</span>
						</p>
					</Reveal>
				</div>
			</section>

			<section id="faq" className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Frequently asked questions</h2>
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

			<section className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Apply now</span>
						<h2>Learn yoga deeply. Teach with integrity. From anywhere.</h2>
						<p>
							Live, faculty-guided online yoga teacher training with a small
							cohort and a credible certification.
						</p>
						<div className="final-cta">
							<a href={APPLY_HREF} className="btn btn-cream">
								Check Eligibility &amp; Apply
							</a>
							<a
								href={WHATSAPP_HREF}
								className="btn btn-light"
								target="_blank"
								rel="noopener noreferrer"
							>
								WhatsApp Us
							</a>
						</div>
						<p className={styles.motto}>A Sanctum For The Spirit</p>
					</Reveal>
				</div>
			</section>

			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Online TTC · live cohorts</span>
				<a
					href="tel:+919611771434"
					className={`btn btn-light ${styles.stickyCall}`}
				>
					Call
				</a>
				<a href={APPLY_HREF} className="btn btn-cream">
					Apply
				</a>
			</div>
		</main>
	);
}
