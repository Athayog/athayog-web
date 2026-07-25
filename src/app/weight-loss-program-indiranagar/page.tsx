import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/EnquireModal";
import styles from "@/app/weight-loss-program-indiranagar/WL.module.css";

export const metadata: Metadata = {
	title: "Yoga Weight Loss Program in Indiranagar, Bangalore | Athayog Living",
	description:
		"Join Athayog Living's expert-led 3-month yoga weight loss program in Indiranagar. Sustainable results with daily asana, 108 Surya Namaskar, kriya cleansing, BMI tracking, weekly reassessments and nutrition counselling.",
	alternates: {
		canonical: "https://athayogliving.com/weight-loss-program-indiranagar",
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

export default function WeightLossPage() {
	return (
		<main>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							3-Month Yoga Weight Loss Program · Indiranagar
						</span>
						<h1>
							Yoga for Weight Loss in Indiranagar —{" "}
							<em>Sustainable, Guided, Whole-Body</em>
						</h1>
						<p className={styles.heroSub}>
							A structured 3-month program that helps you lose weight the
							healthy way — through daily asana practice, breath and
							movement, backed by real personalized support: BMI tracking,
							weekly reassessments, nutrition consultation and counselling.
						</p>
						<span className={styles.priceChip}>
							3-month holistic program · expert-led · personalized support ·{" "}
							<strong>trial available</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="#program" className="btn btn-primary">
								Register Now
							</a>
							<a
								href="https://athayogliving.com/trial-classes"
								className="btn btn-ghost"
							>
								Book a Trial Class
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Sustainable, not
								crash
							</span>
							<span>
								<span className={styles.tick}>✓</span> BMI &amp; weekly
								reassessment
							</span>
							<span>Nutrition &amp; counselling included</span>
						</div>
					</div>
					<div
						className={styles.heroMedia}
						style={{ position: "relative", overflow: "hidden" }}
					>
						<Image
							src="/hero-warrior-pose.png"
							alt="Dynamic warrior pose practice — strength-building yoga at Athayog Living, Indiranagar"
							fill
							sizes="(max-width: 960px) 0vw, 40vw"
							priority
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>

			{/* 2. Answer */}
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
							Yes — a structured yoga program supports healthy, sustainable
							weight loss by combining active asana practice, breathwork and
							lifestyle guidance that build strength, mobility and steadier
							habits. Athayog&apos;s 3-month program in Indiranagar pairs
							daily practice with personalized support — BMI tracking,
							weekly reassessments, nutrition consultation and counselling —
							so the results you reach are results you can keep.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 3. Why yoga for weight loss */}
			<section id="how">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why yoga for weight loss</span>
							<h2>More than a workout — a whole-body reset</h2>
							<p className="lead">
								Crash diets fade. Yoga works because it changes how your
								body and mind move through daily life — not just how you
								exercise for an hour.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "Active, calorie-working practice",
									p: "Dynamic asana and flowing sequences build heat, strength and stamina across the whole body.",
								},
								{
									h: "Strength & mobility",
									p: "Build lean strength and open tight joints — so movement feels good and stays sustainable.",
								},
								{
									h: "Calmer mind, steadier habits",
									p: "Breathwork and meditation ease stress, which supports better sleep and more mindful choices.",
								},
								{
									h: "Guided & measured",
									p: "Expert coaching with regular check-ins keeps you progressing safely — never guessing.",
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

			{/* 4. The 3-month plan */}
			<section id="method" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The 3-month plan</span>
							<h2>A weekly rhythm designed for results</h2>
							<p className="lead">
								Every week follows a proven structure that balances
								intensity, endurance and recovery.
							</p>
						</div>
					</Reveal>
					<div className={styles.method}>
						<div className={styles.methodCopy}>
							<Reveal>
								<p>
									The program runs over three months with a clear weekly
									rhythm — intense asana through the week to build
									strength and burn energy, an endurance-building Surya
									Namaskar session, and traditional cleansing practice —
									always balanced with rest and recovery.
								</p>
								<p>
									Because it&apos;s progressive and supervised, you
									build capacity gradually rather than pushing into
									burnout — the reason results last well beyond the
									three months.
								</p>
								<div className={styles.safe}>
									A healthy, guided approach — not a crash program. Your
									plan is paced to your body, with regular reassessment.
									If you have a medical condition or are new to intense
									exercise, we&apos;ll adapt accordingly.
								</div>
							</Reveal>
						</div>
						<Reveal>
							<div className={styles.weekCard}>
								<h3>Your week, structured</h3>
								<ul className={styles.weekList}>
									<li>
										<span className={styles.dayLabel}>Mon–Thu</span>
										<span>
											Intense asana practice — build strength,
											flexibility and active calorie burn.
										</span>
									</li>
									<li>
										<span className={styles.dayLabel}>Friday</span>
										<span>
											108 Surya Namaskar — a full-body endurance
											workout that becomes a milestone in itself.
										</span>
									</li>
									<li>
										<span className={styles.dayLabel}>Sunday</span>
										<span>
											Kriya practice — traditional yogic cleansing
											techniques.
										</span>
									</li>
									<li>
										<span className={styles.dayLabel}>Recovery</span>
										<span>
											Built-in rest so the body adapts, repairs and
											grows stronger.
										</span>
									</li>
								</ul>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 5. Personalized Support */}
			<section id="support" className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Personalized support</span>
							<h2>
								You&apos;re measured, guided and supported — every week
							</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								This is what separates a real program from a generic
								class. You never train blind, and you&apos;re never on
								your own.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "BMI Check",
									p: "Start with a clear baseline so progress is tracked against real numbers, not guesswork.",
								},
								{
									h: "Weekly Reassessments",
									p: "Regular check-ins to review progress and fine-tune your plan week by week.",
								},
								{
									h: "Nutrition Consultation",
									p: "Personalized, sustainable guidance on eating well — built around your body and goals.",
								},
								{
									h: "Counselling Sessions",
									p: "Support for the mindset and motivation that make lasting change actually stick.",
								},
							].map((c, i) => (
								<div
									className="card"
									key={i}
									style={{
										background: "#43542F",
										borderColor: "rgba(245,243,234,.14)",
									}}
								>
									<div
										style={{
											fontSize: "1.5rem",
											color: "var(--brand-light)",
											marginBottom: 4,
										}}
									>
										◍
									</div>
									<h3 style={{ color: "var(--cream)" }}>{c.h}</h3>
									<p style={{ color: "#DCE2CE" }}>{c.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 6. Why this beats crash diet */}
			<section id="why">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The difference</span>
							<h2>Why this beats a crash diet or a generic gym plan</h2>
							<p className="lead">
								Fast fixes rebound. A guided, whole-person program is how
								the weight stays off.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div style={{ overflowX: "auto" }}>
							<table className={styles.vs}>
								<thead>
									<tr>
										<th>What matters</th>
										<th>Crash diet / generic gym</th>
										<th>Athayog 3-Month Program</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Sustainability</td>
										<td>Rapid loss, quick rebound</td>
										<td>Gradual, lasting change</td>
									</tr>
									<tr>
										<td>Whole person</td>
										<td>Body only</td>
										<td>Body, breath & mind</td>
									</tr>
									<tr>
										<td>Tracking</td>
										<td>Little to none</td>
										<td>BMI + weekly reassessment</td>
									</tr>
									<tr>
										<td>Nutrition</td>
										<td>One-size diet sheet</td>
										<td>Personalized consultation</td>
									</tr>
									<tr>
										<td>Mindset</td>
										<td>Willpower alone</td>
										<td>Counselling & support built in</td>
									</tr>
									<tr>
										<td>Guidance</td>
										<td>Train alone</td>
										<td>Expert-led, every session</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Trainers */}
			<section id="trainers" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your team</span>
							<h2>Guided by experienced practitioners</h2>
							<p className="lead">
								Founder-led, with instructors and support staff who coach
								you through every stage.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.facGrid}>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>
									<Image
										src="/sharath-basavaraju.png"
										alt="Sharath Basavaraju"
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>
								<h3>Sharath Basavaraju</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Confirm credential"
								>
									[ Credential ] · Founder & Lead Trainer
								</div>
								<p className={styles.verify} title="Add bio">
									[ Years of practice & specialization. ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3 className={styles.verify} title="Add real name">
									[ Trainer / Nutritionist ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Nutrition & wellness focus. ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3 className={styles.verify} title="Add real name">
									[ Counsellor / Coach ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Behaviour & motivation support. ]
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 8. Social Proof */}
			<section id="reviews">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Real transformations from our community</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.statStrip}>
							<div className={styles.stat}>
								<div className={styles.statBig}>3</div>
								<div className={styles.statLbl}>month program</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>30+</div>
								<div className={styles.statLbl}>transformations</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>850+</div>
								<div className={styles.statLbl}>Athayogis</div>
							</div>
							<div className={styles.stat}>
								<div
									className={`${styles.statBig} ${styles.verify}`}
									title="Add verified rating"
								>
									4.9★
								</div>
								<div className={styles.statLbl}>average rating</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.vidGrid}>
							{["Pmvr_kFDcTA", "aFxeW-gUKqw", "LDcffOBJ9ZU"].map((id) => (
								<a
									className={styles.vid}
									key={id}
									href={`https://www.youtube.com/watch?v=${id}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Watch transformation testimonial"
								>
									<Image
										src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
										alt="Athayog transformation testimonial video"
										fill
										sizes="(max-width: 640px) 100vw, 33vw"
										style={{ objectFit: "cover" }}
									/>
									<span className={styles.play}>{PLAY_SVG}</span>
								</a>
							))}
						</div>
					</Reveal>
					<p className={styles.tplNote}>
						Text testimonials are omitted here in favour of real video stories
						— add consented member results (with permission) as the program
						builds its gallery.
					</p>
					<Reveal>
						<p
							style={{
								marginTop: 20,
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

			{/* 9. Program / Enrol */}
			<section id="program" className={styles.program}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 760 }}>
							<span className="eyebrow">Enrol</span>
							<h2>The 3-Month Weight Loss Program</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Everything you need for a healthy, guided transformation —
								in one program.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.pcard}>
							<div>
								<h3>3-Month Weight Loss Program</h3>
								<p style={{ color: "#DCE2CE", fontSize: "0.98rem" }}>
									A complete, expert-led program combining structured
									practice with weekly personalized support.
								</p>
								<ul className={styles.incl}>
									<li>Mon–Thu intense asana practice</li>
									<li>Friday 108 Surya Namaskar</li>
									<li>Sunday kriya cleansing practice</li>
									<li>BMI check & baseline</li>
									<li>Weekly reassessments</li>
									<li>Nutrition consultation</li>
									<li>Counselling sessions</li>
									<li>Expert guidance throughout</li>
								</ul>
							</div>
							<div className={styles.pcardBuy}>
								<div
									className={`${styles.buyAmt} ${styles.verify}`}
									title="The program page does not publish a price — add your 3-month program fee here"
								>
									₹[fee]
								</div>
								<div className={styles.buyTerm}>
									for the full 3-month program{" "}
									<span
										className={styles.verify}
										title="Confirm if GST applies"
									>
										(+ GST if applicable)
									</span>
								</div>
								<EnquireModal
									service="Weight Loss Program"
									pageSource="weight-loss-program-indiranagar"
								>
									<span
										className={`btn btn-cream ${styles.buyBtn}`}
										style={{
											width: "100%",
											justifyContent: "center",
											marginBottom: 10,
										}}
									>
										Register Now
									</span>
								</EnquireModal>
								<a
									href="https://athayogliving.com/trial-classes"
									className="btn btn-light"
									style={{ width: "100%", justifyContent: "center" }}
								>
									Book a Trial Class
								</a>
								<div className={styles.buyFine}>
									EMI, UPI, cards, net banking & PayPal accepted.
								</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							Not sure if it&apos;s right for you? Start with a trial class,
							or <a href="https://wa.me/918690333111">WhatsApp us</a> to
							talk it through.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 10. Lead Magnet */}
			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.magnet}>
							<div>
								<span className="eyebrow">Get started</span>
								<h2 style={{ fontSize: "2.2rem" }}>
									Ready to start your transformation?
								</h2>
								<p>
									Tell us a little about your goal and we&apos;ll help
									you begin — with a trial class or a call to walk you
									through the program.
								</p>
							</div>
							<div className={styles.lmForm}>
								<input
									type="text"
									placeholder="Your name"
									aria-label="Your name"
									className={styles.lmInput}
								/>
								<input
									type="tel"
									placeholder="WhatsApp / phone number"
									aria-label="Phone number"
									className={styles.lmInput}
								/>
								<input
									type="text"
									placeholder="Your goal (optional)"
									aria-label="Your goal"
									className={styles.lmInput}
								/>
								<EnquireModal
									service="Weight Loss Program"
									pageSource="weight-loss-program-indiranagar"
								>
									<span
										className="btn btn-cream"
										style={{
											width: "100%",
											justifyContent: "center",
										}}
									>
										Register / Enquire
									</span>
								</EnquireModal>
								<span className={styles.lmMini}>
									We&apos;ll call or WhatsApp you to confirm. No
									obligation.
								</span>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 11. Location */}
			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Your program starts in Indiranagar</h2>
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
								<p style={{ fontSize: "0.9rem" }}>
									Convenient for Domlur, CV Raman Nagar, Koramangala &
									nearby.
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

			{/* 12. CTA Mid */}
			<section className={styles.ctaMid}>
				<div className="wrap">
					<Reveal>
						<h2>Change that lasts starts with one step.</h2>
						<p>Register for the 3-month program, or try a trial first.</p>
						<a href="#program" className="btn btn-cream">
							Register Now
						</a>
					</Reveal>
				</div>
			</section>

			{/* 13. FAQ */}
			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Yoga weight loss program in Indiranagar — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>How it works</h3>
							<details open>
								<summary>
									Does yoga really help with weight loss?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. An active, well-structured yoga practice builds
									strength and stamina, supports a healthier metabolism,
									and — combined with breathwork, better sleep and
									mindful eating — helps you lose weight in a way that
									lasts. This program adds nutrition and progress
									tracking to make results sustainable.
								</div>
							</details>
							<details>
								<summary>
									How long is the program?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									It&apos;s a 3-month program with a structured weekly
									rhythm — intense asana on weekdays, 108 Surya Namaskar
									on Friday, and kriya cleansing on Sunday, balanced
									with recovery.
								</div>
							</details>
							<details>
								<summary>
									What&apos;s included?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Structured practice plus full personalized support: a
									BMI check, weekly reassessments, a nutrition
									consultation and counselling sessions — all guided by
									experienced instructors.
								</div>
							</details>
							<details>
								<summary>
									Is it safe for beginners?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. The program is progressive and supervised, so
									beginners build capacity gradually. If you have a
									medical condition or are new to intense exercise, your
									plan is adapted to suit you.
								</div>
							</details>
							<h3 className={styles.faqCat}>Approach & results</h3>
							<details>
								<summary>
									Is this a crash program?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									No — and that&apos;s the point. It&apos;s a healthy,
									guided approach paced to your body, with weekly
									reassessment, so the change is gradual and sustainable
									rather than a quick fix that rebounds.
								</div>
							</details>
							<details>
								<summary>
									What is 108 Surya Namaskar?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									It&apos;s a traditional practice of 108 rounds of Sun
									Salutation — a complete, endurance-building full-body
									workout that becomes a rewarding weekly milestone as
									your fitness grows.
								</div>
							</details>
							<details>
								<summary>
									Do you provide a diet plan?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									You receive a personalized nutrition consultation
									focused on sustainable, balanced eating built around
									your body and goals, rather than a restrictive
									one-size diet sheet.
								</div>
							</details>
							<h3 className={styles.faqCat}>Enrolment & logistics</h3>
							<details>
								<summary>
									How much does the program cost?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									<span
										className={styles.verify}
										title="Add the real 3-month program fee — not published on the source page"
									>
										[ Add the 3-month program fee here. ]
									</span>{" "}
									You can register online or book a trial first. EMI,
									UPI, cards, net banking and PayPal are accepted.
								</div>
							</details>
							<details>
								<summary>
									Can I try before enrolling?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — book a trial class to experience the practice
									and speak with our team before you commit.
								</div>
							</details>
							<details>
								<summary>
									Where is it held?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									At our studio in Indiranagar, HAL 2nd Stage (12th
									Main), Bengaluru 560038 — convenient for Domlur, CV
									Raman Nagar, Koramangala and nearby.
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
							<a
								className={styles.ex}
								href="/personal-yoga-training-indiranagar"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Personal Training</h3>
								<p>One-on-one, goal-based yoga — from ₹14,999.</p>
							</a>
							<a className={styles.ex} href="/group-classes-indiranagar">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Group Classes</h3>
								<p>Small-batch classes from ₹599 drop-in.</p>
							</a>
							<a className={styles.ex} href="/yoga-teacher-training">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Teacher Training (TTC)</h3>
								<p>Become a certified RYT-200 yoga teacher.</p>
							</a>
							<a className={styles.ex} href="/workshops">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Workshops</h3>
								<p>Deep-dive sessions on special themes.</p>
							</a>
							<a className={styles.ex} href="/about-us">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Who We Are</h3>
								<p>The story and philosophy behind Athayog.</p>
							</a>
							<a className={styles.ex} href="/trial-classes">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Trial Class</h3>
								<p>Experience Athayog before you enrol.</p>
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 15. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Begin</span>
					</Reveal>
					<Reveal>
						<h2>Transform your body and mind — sustainably.</h2>
					</Reveal>
					<Reveal>
						<p>
							An expert-led, 3-month yoga weight loss program in
							Indiranagar, with the personalized support that makes results
							last. Register today or start with a trial.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="#program" className="btn btn-cream">
								Register Now
							</a>
							<a
								href="https://athayogliving.com/trial-classes"
								className="btn btn-light"
							>
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

			{/* 16. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>3-month program · trial</span>
				<a href="#program" className="btn btn-cream">
					Register
				</a>
			</div>
		</main>
	);
}
