import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/EnquireModal";
import MapEmbed from "@/components/MapEmbed";
import TestimonialVideoCarousel from "@/components/TestimonialVideoCarousel";
import { testimonialVideos } from "@/constants/testimonialVideos";
import styles from "@/app/residential-yoga-teacher-training-bangalore/ResidentialYTT.module.css";

export const metadata: Metadata = {
	title: "Residential Yoga Teacher Training in Bangalore, India",
	description:
		"Become a globally certified yoga teacher in 30 days at Athayog Living, Indiranagar, Bangalore. Yoga Alliance USA and VYASA accredited, with accommodation, meals, expert faculty and career support.",
	alternates: {
		canonical:
			"https://athayogliving.com/residential-yoga-teacher-training-bangalore",
	},
};

const MANDALA = (
	<svg
		className={`${styles.mandala} ${styles.mandalaSpin}`}
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

const reasons = [
	[
		"Global accreditation",
		"Validated by Yoga Alliance USA and Vivekananda Yoga Anusandhana Samsthana (VYASA).",
	],
	[
		"Lifetime validity",
		"An internationally recognized certificate that stays valid for life.",
	],
	["Post-course support", "Ongoing mentorship to guide you as you begin teaching."],
	["Expert faculty", "Learn from qualified PhDs and MScs in yoga."],
	[
		"Accessible eligibility",
		"Open to anyone 16 and above, with 10th-grade education and one month of recent yoga practice.",
	],
	[
		"Accommodation",
		"A calm co-living stay in Indiranagar, close to practice spaces and city conveniences.",
	],
	["Convenient payment", "EMI and multiple payment options to make enrolment easier."],
	[
		"Yoga nutrition",
		"Guidance to craft personalised nutrition plans that support your practice.",
	],
	[
		"Career branding",
		"Practical help with personal branding, placements and career paths.",
	],
];

const faqs = [
	[
		"What is included in the residential course fee?",
		"The ₹84,999 fee includes the 30-day training, accommodation, two vegetarian meals and one hi-tea each day, course materials, certification and post-course mentorship. Travel, personal expenses and GST are separate.",
	],
	[
		"Is this course Yoga Alliance accredited?",
		"Yes. Athayog Living is a Registered Yoga School with Yoga Alliance USA. The residential course is also validated by VYASA, giving graduates a certification recognized in India and internationally.",
	],
	[
		"Who can join the residential yoga teacher training?",
		"Applicants must be at least 16 years old, have completed 10th-grade education and have maintained a yoga practice for at least one month. A sincere willingness to follow the residential routine is essential.",
	],
	[
		"Where is the accommodation located?",
		"The co-living accommodation is in Indiranagar, Bangalore, close to Athayog Living, daily conveniences and the training environment.",
	],
	[
		"What happens after I complete the course?",
		"You graduate with a lifetime-valid certificate and receive guidance in teaching, personal branding, placements and building a sustainable yoga career.",
	],
];

export default function ResidentialYogaTeacherTrainingPage() {
	return (
		<main>
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Internationally Accredited · Residential YTT · Bangalore,
							India
						</span>
						<h1>
							Residential Yoga Teacher Training in <em>Bangalore, India</em>
						</h1>
						<p className={styles.heroSub}>
							Become a globally certified yoga teacher in 30 days at Athayog
							Living, Indiranagar. A live-in yoga teacher training course
							accredited by Yoga Alliance USA and VYASA, with accommodation,
							expert faculty, mentorship and career support included.
						</p>
						<div className={styles.heroCta}>
							<a href="#enrol" className="btn btn-primary">
								Enroll Now
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-ghost"
							>
								WhatsApp 86903 33111
							</a>
						</div>
						<div className={styles.chips}>
							<span className={styles.chip}>Yoga Alliance USA</span>
							<span className={styles.chip}>VYASA validated</span>
							<span className={styles.chip}>30 days residential</span>
							<span className={styles.chip}>Lifetime certificate</span>
							<span className={styles.chip}>Accommodation included</span>
						</div>
					</div>
					<div className={styles.heroMedia}>
						<Image
							src="/images/landing/residential-yoga.jpg"
							alt="Residential yoga teacher training at Athayog Living in Bangalore"
							fill
							priority
							sizes="(max-width: 960px) 90vw, 42vw"
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>

			<section className={styles.facts}>
				<div className={`wrap ${styles.factGrid}`}>
					<div className={styles.fact}>
						<div className={styles.factNumber}>30</div>
						<div className={styles.factLabel}>Days residential</div>
					</div>
					<div className={styles.fact}>
						<div className={styles.factNumber}>₹84,999</div>
						<div className={styles.factLabel}>All-inclusive fee</div>
					</div>
					<div className={styles.fact}>
						<div className={styles.factNumber}>2</div>
						<div className={styles.factLabel}>Global accreditations</div>
					</div>
					<div className={styles.fact}>
						<div className={styles.factNumber}>16+</div>
						<div className={styles.factLabel}>Open eligibility</div>
					</div>
				</div>
			</section>

			<section className={styles.answerBand}>
				<div className="wrap">
					<Reveal>
						<p className="answer">
							Athayog Living&apos;s residential yoga teacher training is a
							30-day, live-in course in Indiranagar, Bangalore, India. You
							train, eat and stay on site, then graduate with a
							lifetime-valid certification accredited by Yoga Alliance USA
							and VYASA, recognized in India and internationally. The course
							fee is ₹84,999 and includes accommodation, two vegetarian
							meals a day, expert faculty, post-course mentorship and career
							support.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="learn">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What you will learn</span>
							<h2>A balanced blend of practice and theory</h2>
							<p className="lead">
								Every day pairs hands-on practice with the study behind
								it, so you leave ready to teach with confidence.
							</p>
						</div>
					</Reveal>
					<div className={styles.learnGrid}>
						{[
							[
								"Practical learning",
								"Breathing techniques, asanas, Sat Kriyas, pranayama and meditation, grounded in the Yoga Sutras, Bhagavad Gita, Hatha Yoga Pradipika and modern science.",
								"/images/landing/teaching.jpg",
							],
							[
								"Theoretical learning",
								"Anatomy, physiology, psychology, teaching methodology and the business of yoga, so you understand the body and the profession.",
								"/images/landing/anatomy.jpg",
							],
							[
								"Personal branding",
								"Learn to package and present your teaching, so you can sell your own courses or choose the studio and brand that fit your practice.",
								"/images/landing/feedback.jpg",
							],
							[
								"Yogic nutrition",
								"Understand yogic nutrition and how to build personalised plans that support wellbeing alongside daily practice.",
								"/images/landing/pranayama.jpg",
							],
						].map(([title, text, image]) => (
							<Reveal key={title}>
								<article className={styles.learnCard}>
									<Image
										className={styles.learnImage}
										src={image}
										alt={title}
										width={700}
										height={420}
									/>
									<div className={styles.learnBody}>
										<h3>{title}</h3>
										<p>{text}</p>
									</div>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section id="why" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why choose Athayog Living</span>
							<h2>Nine reasons this residential course stands apart</h2>
						</div>
					</Reveal>
					<div className={styles.cardGrid}>
						{reasons.map(([title, text]) => (
							<Reveal key={title}>
								<article className={styles.card}>
									<div className={styles.cardIcon}>◍</div>
									<h3>{title}</h3>
									<p>{text}</p>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section id="stay">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Where you will stay</span>
							<h2>On-site accommodation in Indiranagar</h2>
							<p className="lead">
								Set in one of the calmer, well-connected parts of
								Bangalore, the co-living stay gives you quiet to rest and
								study, with the city close at hand.
							</p>
						</div>
					</Reveal>
					<div className={styles.stayGrid}>
						<Reveal>
							<Image
								className={styles.stayImage}
								src="/images/landing/residential.jpg"
								alt="Residential accommodation near Athayog Living in Indiranagar"
								width={800}
								height={700}
							/>
						</Reveal>
						<Reveal>
							<div>
								<h3>Live the practice, not just attend it</h3>
								<p className="lead">
									A residential format creates the rhythm and community
									needed for meaningful learning.
								</p>
								<div className={styles.amenityGrid}>
									<div className={styles.amenity}>
										<h3>Stay included</h3>
										<p>
											Co-living accommodation for the full 30-day
											course.
										</p>
									</div>
									<div className={styles.amenity}>
										<h3>Daily meals</h3>
										<p>
											Two vegetarian meals and one hi-tea each day.
										</p>
									</div>
									<div className={styles.amenity}>
										<h3>Connected location</h3>
										<p>
											Indiranagar conveniences are close when you
											need them.
										</p>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section id="eligibility" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Am I eligible?</span>
							<h2>Who this residential course is for</h2>
						</div>
					</Reveal>
					<Reveal>
						<ul className={styles.checklist}>
							{[
								"You are 16 years or older.",
								"You have completed at least 10th-grade education.",
								"You have practised yoga consistently for at least one month.",
								"You can commit to living on site and following the course routine.",
								"You want a serious foundation for teaching or deeper personal practice.",
								"You are ready to learn with discipline, curiosity and respect.",
							].map((item) => (
								<li key={item}>
									<span className={styles.check}>✓</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</section>

			<section id="enrol" className={styles.fees}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Fees and what is included</span>
							<h2>One transparent, all-inclusive fee</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Everything you need for the 30-day residential course,
								from training to your stay and meals.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.feeCard}>
							<div>
								<h3>30-Day Residential Yoga Teacher Training</h3>
								<ul className={styles.included}>
									{[
										"30-day residential training",
										"Accommodation",
										"Two vegetarian meals daily",
										"One hi-tea daily",
										"Course manual and materials",
										"Yoga Alliance USA certification",
										"VYASA validation",
										"Post-course mentorship",
									].map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
							<div className={styles.feeBuy}>
								<div className={styles.amount}>₹84,999</div>
								<div className={styles.term}>
									Course fee · confirm current batch dates
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="30-Day Residential Yoga Teacher Training · ₹84,999"
									pageSource="residential-yoga-teacher-training-bangalore"
								>
									<span className="btn btn-cream">
										Enquire to Enrol
									</span>
								</EnquireModal>
								<div className={styles.finePrint}>
									EMI and payment options available. GST and travel
									expenses may apply.
								</div>
							</div>
						</div>
					</Reveal>
					<p className={styles.reassure}>
						Limited places per batch.{" "}
						<a href="https://wa.me/918690333111">
							WhatsApp us for the next start date →
						</a>
					</p>
				</div>
			</section>

			<section id="guru">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The gurus</span>
							<h2>Learn from experienced teachers</h2>
						</div>
					</Reveal>
					<div className={styles.facultyGrid}>
						<Reveal>
							<Image
								className={styles.facultyImage}
								src="/images/teachers/sharath-basavaraju.jpg"
								alt="Sharath Basavaraju, founder and principal teacher at Athayog Living"
								width={700}
								height={700}
							/>
						</Reveal>
						<Reveal>
							<div className={styles.faculty}>
								<h3>Sharath Basavaraju</h3>
								<div className={styles.role}>
									Founder and Principal Teacher
								</div>
								<p>
									Sharath was drawn to yoga as a teenager, inspired by
									his grandfather&apos;s sadhana. He was initiated into
									yoga through the teachings of Swami Satyananda
									Saraswati at the Bihar School of Yoga and went on to
									formal yogic education at SVYASA.
								</p>
								<p>
									His teaching brings together traditional yogic
									discipline, clear instruction and a grounded
									understanding of how students build a lifelong
									practice.
								</p>
								<a href="/about-us" className="btn btn-ghost">
									Read our story <ArrowRight size={16} />
								</a>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section id="reviews" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Stories from our community</h2>
							<p className="lead">
								Hear directly from Athayogis about their experience with
								us.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<TestimonialVideoCarousel videos={testimonialVideos} />
					</Reveal>
					<p style={{ marginTop: 20, color: "var(--brand-deep)" }}>
						Watch more on{" "}
						<a
							href="https://www.youtube.com/@athayogliving"
							target="_blank"
							rel="noopener noreferrer"
						>
							YouTube
						</a>
						.
					</p>
				</div>
			</section>

			<section className={styles.ctaMid}>
				<div className="wrap">
					<Reveal>
						<h2>Yoga is a spiritual science. Genuine learning matters.</h2>
						<p>
							Limited slots each batch. Begin your teaching career with
							Athayog Living in Bangalore.
						</p>
						<a href="#enrol" className="btn btn-cream">
							Start Your Enrollment
						</a>
					</Reveal>
				</div>
			</section>

			<section id="location">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Where we are</span>
							<h2>Athayog Living, Indiranagar, Bengaluru</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.locationCard}>
							<div className={styles.map}>
								<MapEmbed
									src="https://www.google.com/maps?q=Athayog%20Living%20Indiranagar%20Bengaluru&output=embed"
									title="Athayog Living Indiranagar map"
								/>
							</div>
							<div className={styles.locationBody}>
								<h3>Athayog Living</h3>
								<p>
									No. 3293, 1st Floor, 12th Main, HAL 2nd Stage,
									Indiranagar, Bengaluru, Karnataka 560038
								</p>
								<p>+91 9611771434 · info@athayogliving.com</p>
								<a
									className={styles.direction}
									href="https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA"
									target="_blank"
									rel="noopener noreferrer"
								>
									View on map <ArrowRight size={16} />
								</a>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Residential yoga teacher training FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							{faqs.map(([question, answer], index) => (
								<details key={question} open={index === 0}>
									<summary>
										{question}
										<span className={styles.faqIcon}>+</span>
									</summary>
									<div className={styles.faqAnswer}>{answer}</div>
								</details>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Explore</span>
							<h2>More ways to practise with us</h2>
						</div>
					</Reveal>
					<div className={styles.exploreGrid}>
						{[
							[
								"Weekend TTC",
								"In-studio RYT-200 in Indiranagar.",
								"/yoga-teacher-training-bangalore",
							],
							[
								"Group Classes",
								"Small-batch classes for regular practice.",
								"/group-classes-indiranagar",
							],
							[
								"Personal Training",
								"One-on-one, goal-based yoga.",
								"/personal-yoga-training-indiranagar",
							],
							[
								"Workshops",
								"Deep-dive sessions on special themes.",
								"/workshops",
							],
							["Who We Are", "The story behind Athayog.", "/about-us"],
							[
								"Trial Class",
								"Experience Athayog before you enrol.",
								"/trial-classes",
							],
						].map(([title, text, href]) => (
							<a className={styles.explore} key={title} href={href}>
								<div className={styles.exploreArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>{title}</h3>
								<p>{text}</p>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Begin</span>
						<h2>Become a globally certified yoga teacher in 30 days.</h2>
						<p>
							Residential Yoga Teacher Training in Bangalore, with
							accommodation, expert faculty and a community that supports
							your journey.
						</p>
						<div className="final-cta">
							<a href="#enrol" className="btn btn-cream">
								Enroll Now
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp Us
							</a>
							<a href="tel:+918690333111" className="btn btn-light">
								Call 86903 33111
							</a>
						</div>
						<p className={styles.micro}>Train · live · teach · transform</p>
					</Reveal>
				</div>
			</section>
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>
					30-Day Residential YTT · ₹84,999
				</span>
				<a href="#enrol" className="btn btn-cream">
					Enquire
				</a>
			</div>
		</main>
	);
}
