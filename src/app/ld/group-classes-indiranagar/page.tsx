import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import MapEmbed from "@/components/MapEmbed";
import GroupClassesLdForm from "@/app/ld/group-classes-indiranagar/GroupClassesLdForm";
import PageJsonLd from "@/app/ld/group-classes-indiranagar/PageJsonLd";
import styles from "@/app/ld/group-classes-indiranagar/GroupClassesLd.module.css";

const MAP_SRC =
	"https://www.google.com/maps?q=Athayog%20Living%20Indiranagar%20Bengaluru&output=embed";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20details%20on%20your%20group%20yoga%20classes%20in%20Indiranagar%20-%20batch%20timings%2C%20trial%20and%20fees.";

const HERO_POINTS = [
	"Small batch group classes",
	"Morning and evening timings",
	"Beginner-friendly structure",
	"Centrally located in Indiranagar",
];

const FIT_POINTS = [
	"You live or work near Indiranagar, Domlur, CV Raman Nagar or Koramangala",
	"You want instructor-led group yoga sessions",
	"You prefer fixed, routine-building timings",
	"You are a beginner, or restarting yoga",
	"You want flexibility, stress relief and daily movement",
];

const WHY_POINTS = [
	"Near Indiranagar",
	"Structured yoga",
	"Small batches",
	"Clean, focused studio",
];

const CLASS_STEPS = [
	"Gentle warm-up and mobility",
	"Guided asana practice, based on batch level",
	"Pranayama and breath awareness",
	"Relaxation or short meditation",
	"Cool-down and closing guidance",
];

const BATCH_POINTS = [
	"Morning yoga classes for energy and focus",
	"Evening yoga classes for stress relief after work",
	"Fixed schedules to build consistency",
	"Limited participants per batch for quality attention",
];

const COMPARISON_BAD = [
	"Overcrowded rooms",
	"One routine for everyone",
	"Limited instructor attention",
];

const COMPARISON_GOOD = [
	"Small, focused batches",
	"Instructor-led corrections",
	"Structured progression",
	"Calm, distraction-free environment",
];

const PERSONAS = [
	"Working professionals with long hours",
	"Beginners starting yoga for the first time",
	"People dealing with stress or stiffness",
	"Anyone wanting daily movement and balance",
	"Long-term wellness seekers",
];

const MEMBERSHIP_POINTS = [
	"Trial class before you commit",
	"Monthly and long-term plans available",
	"Morning and evening batch options",
	"No pressure to continue if it is not the right fit",
];

const TESTIMONIALS = [
	"The small batch size made it easy to stay consistent.",
	"A great option for beginners who want proper guidance.",
	"Convenient location and calm environment, easy to continue.",
];

const FAQS = [
	{
		q: "Are these group yoga classes suitable for beginners?",
		a: "Yes. Beginners are guided carefully with clear instructions and proper demonstrations.",
	},
	{
		q: "Can I attend a trial class?",
		a: "Yes. A trial class is available for a nominal fee. If you purchase a subscription within 48 hours, the trial fee is adjusted against your subscription.",
	},
	{
		q: "How big are the batches?",
		a: "Batch sizes are kept limited to ensure adequate instructor attention for each participant.",
	},
	{
		q: "What if I miss a class?",
		a: "Our team will guide you on how to maintain continuity wherever possible.",
	},
	{
		q: "Is the studio close to Indiranagar's main areas?",
		a: "Yes. The studio is centrally located in Indiranagar, HAL 2nd Stage, and is easily accessible.",
	},
];

export default function GroupClassesLdPage() {
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
							Group Yoga Classes · Indiranagar, Bangalore
						</span>
						<h1>
							Group Yoga Classes in <em>Indiranagar</em> and Nearby
						</h1>
						<p className={styles.heroSub}>
							Instructor-led group yoga classes in Indiranagar, built for
							consistency, correct practice and long-term wellbeing. Morning
							and evening batches, beginner-friendly.
						</p>
						<ul className={styles.heroList}>
							{HERO_POINTS.map((point) => (
								<li key={point}>
									<span className={styles.ck}>✓</span> {point}
								</li>
							))}
						</ul>
						<div className={styles.heroCta}>
							<a href="#enquire" className="btn btn-primary">
								Book a Trial Class
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
						<GroupClassesLdForm
							badge="Book a trial"
							title="Check batch timings and trial"
							intro="Share a few details and we will send today's available morning and evening batches, trial and fee details."
						/>
					</div>
				</div>
			</section>

			<div className={styles.trustbar}>
				<div className="wrap">
					<div className={styles.trustbarInner}>
						<span>
							<b>Small</b> focused batches
						</span>
						<span>
							<b>Morning</b> and evening timings
						</span>
						<span>
							<b>Beginner</b> friendly
						</span>
						<span>Yoga Alliance · SVYASA · AYUSH recognised</span>
					</div>
				</div>
			</div>

			<section className={styles.aeo}>
				<div className="wrap">
					<Reveal>
						<p className="answer" id="aeo-answer">
							Athayog Living runs instructor-led group yoga classes in
							Indiranagar, Bengaluru, in small batches with morning and
							evening timings. Each class moves through a gentle warm-up,
							guided asana practice for your batch level, pranayama and
							breath awareness, and a short relaxation or meditation.
							Classes are beginner-friendly, the studio is centrally located
							in HAL 2nd Stage, and a trial class is available before you
							commit. Batch places are limited, so booking ahead is
							recommended.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="fit">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Is this right for you?</span>
							<h2>Are these group yoga classes right for you?</h2>
							<p className="lead">
								A strong fit if you want a steady, guided practice as part
								of your daily routine.
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
							<span className="eyebrow">Why Athayog Living</span>
							<h2>
								Why choose group yoga classes in Indiranagar at Athayog
								Living
							</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.why}>
							{WHY_POINTS.map((point) => (
								<div key={point}>
									<div className={styles.whyIc} aria-hidden="true">
										◍
									</div>
									<h3>{point}</h3>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="class">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What to expect</span>
							<h2>What a typical group yoga class includes</h2>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.numlist}>
							{CLASS_STEPS.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ul>
					</Reveal>
				</div>
			</section>

			<section className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Timings</span>
							<h2>Morning and evening yoga batches</h2>
							<p className="lead">
								Flexible batch timings that fit real-life schedules in and
								around Indiranagar.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.numlist}>
							{BATCH_POINTS.map((point) => (
								<li key={point}>{point}</li>
							))}
						</ul>
					</Reveal>
					<Reveal>
						<p className={styles.batchNote}>
							Batch availability changes, so booking ahead is recommended.
						</p>
					</Reveal>
					<Reveal>
						<div className={styles.batchesCta}>
							<a href="#enquire" className="btn btn-primary">
								Check Today&apos;s Available Batches
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="difference">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The difference</span>
							<h2>How our group yoga classes are different</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.compare}>
							<div className={`${styles.cmp} ${styles.cmpPlain}`}>
								<h3>Typical group yoga classes</h3>
								<ul>
									{COMPARISON_BAD.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div className={`${styles.cmp} ${styles.cmpGood}`}>
								<span className={styles.cmpTag}>Recommended</span>
								<h3>Athayog group yoga classes</h3>
								<ul>
									{COMPARISON_GOOD.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Our members</span>
							<h2>Who commonly joins our Indiranagar group classes</h2>
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

			<section id="membership">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Simple and transparent</span>
							<h2>Flexible membership options</h2>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.checklist}>
							{MEMBERSHIP_POINTS.map((point) => (
								<li key={point}>
									<span className={styles.ck}>✓</span> {point}
								</li>
							))}
						</ul>
					</Reveal>
					<Reveal>
						<div className={styles.membershipCta}>
							<a href="#enquire" className={`btn ${styles.goldBtn}`}>
								Get Trial &amp; Fee Details
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="reviews" className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What members say</span>
							<h2>Real local experiences</h2>
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
							Real local experiences, with no exaggerated promises.{" "}
							<span
								className="verify"
								title="Attribute with real names or link Google reviews to strengthen trust"
							>
								[ attribute with real reviewer names / link Google reviews
								]
							</span>
						</p>
					</Reveal>
				</div>
			</section>

			<section id="location">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Centrally located in Indiranagar</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.locCard}>
							<div className={styles.locMap}>
								<MapEmbed
									src={MAP_SRC}
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
									Easily reached from Domlur, CV Raman Nagar,
									Koramangala and nearby.
								</p>
								<p>
									Call: <strong>9611771434</strong> ·
									info@athayogliving.com
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

			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.ctaBand}>
							<h2>Start your yoga practice near Indiranagar</h2>
							<p>
								Without overthinking it. Book a trial class and find your
								batch.
							</p>
							<a href="#enquire" className="btn btn-cream">
								Book a Trial Class
							</a>
							<a
								href={WHATSAPP_HREF}
								className={`btn ${styles.waBtn}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								WhatsApp Us
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="faq" className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Group yoga classes in Indiranagar, FAQs</h2>
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
						<span className="eyebrow">Book now</span>
						<h2>
							Start your yoga practice near Indiranagar, without
							overthinking it
						</h2>
						<p>
							Small-batch, instructor-led group yoga classes with morning
							and evening timings. Begin with a trial.
						</p>
						<div className="final-cta">
							<a href="#enquire" className="btn btn-cream">
								Book a Trial Class
							</a>
							<a
								href={WHATSAPP_HREF}
								className="btn btn-light"
								target="_blank"
								rel="noopener noreferrer"
							>
								WhatsApp Us
							</a>
							<a href="tel:+919611771434" className="btn btn-light">
								Call 96117 71434
							</a>
						</div>
						<p className={styles.motto}>A Sanctum For The Spirit</p>
					</Reveal>
				</div>
			</section>

			<div className={styles.stickyCta}>
				<a
					href="tel:+919611771434"
					className={`btn btn-light ${styles.stickyCall}`}
				>
					Call
				</a>
				<a
					href={WHATSAPP_HREF}
					className={`btn ${styles.waBtn}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					WhatsApp
				</a>
				<a href="#enquire" className="btn btn-cream">
					Book Trial
				</a>
			</div>
		</main>
	);
}
