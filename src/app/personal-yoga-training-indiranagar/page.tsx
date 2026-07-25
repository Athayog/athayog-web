import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import styles from "@/app/personal-yoga-training-indiranagar/PT.module.css";

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

const GOAL_ICONS = ["◍", "◍", "◍", "◍", "◍", "◍", "◍", "◍"];

export default function PersonalTrainingPage() {
	return (
		<>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Personal Yoga Training · Indiranagar, Bangalore
						</span>
						<h1>
							The Best Personal Yoga Training in Indiranagar —{" "}
							<em>Built Entirely Around You</em>
						</h1>
						<p className={styles.heroSub}>
							One-on-one yoga with a certified trainer, designed for your
							body, your goal and your schedule — whether that&apos;s weight
							loss, flexibility, back-pain relief, stress, or simply
							starting right. Train at our Indiranagar studio, at home, or
							online.
						</p>
						<span className={styles.priceChip}>
							Certified trainers · studio / home / online · packages from{" "}
							<strong>₹14,999</strong> · free trial class
						</span>
						<div className={styles.heroCta}>
							<a href="#book" className="btn btn-primary">
								Book Your Free Trial
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-ghost"
							>
								WhatsApp Us
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Yoga Alliance ·
								SVYASA · AYUSH certified
							</span>
							<span>
								<span className={styles.tick}>✓</span> 1-on-1, goal-based
							</span>
							<span>850+ Athayogis · 30+ transformations</span>
						</div>
					</div>
					<div className={styles.heroMedia} aria-hidden="true">
						[ Hero image — a trainer guiding a one-on-one session ]
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
							Personal yoga training is one-on-one instruction tailored to
							your body, health goals and schedule. Instead of following a
							group class, you work privately with a certified trainer who
							builds a plan around your needs — correcting your form,
							adjusting the pace, and progressing you faster than any
							generic class can.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 3. Goals */}
			<section id="goals">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What&apos;s your goal?</span>
							<h2>Personal yoga for exactly what you need</h2>
							<p className="lead">
								Every plan starts with your goal. Tell us where you want
								to get to, and your trainer builds the path.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "Weight loss &amp; toning",
									p: "Targeted, sustainable sessions to shed weight and build strength.",
								},
								{
									h: "Flexibility &amp; mobility",
									p: "Open tight hips, hamstrings and shoulders — safely and steadily.",
								},
								{
									h: "Back &amp; neck pain relief",
									p: "Ease desk-job aches with therapeutic, alignment-focused yoga.",
								},
								{
									h: "Stress &amp; anxiety",
									p: "Breathwork and calming practice to steady the mind.",
								},
								{
									h: "Prenatal &amp; postnatal",
									p: "Gentle, expert-guided yoga through and after pregnancy.",
								},
								{
									h: "Beginners' foundation",
									p: "Learn correctly from day one, at your own comfortable pace.",
								},
								{
									h: "Seniors' gentle yoga",
									p: "Mobility, balance and wellbeing with careful, patient guidance.",
								},
								{
									h: "Athletes &amp; performance",
									p: "Improve recovery, breath and range for your sport.",
								},
							].map((g, i) => (
								<div className="card" key={i}>
									<div className={styles.goalIcon}>{GOAL_ICONS[i]}</div>
									<h3>{g.h}</h3>
									<p>{g.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 4. Trust Band */}
			<section className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why trust us</span>
							<h2>Certified trainers. Real transformations.</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								You&apos;re not getting a random instructor — you&apos;re
								training with certified teachers from one of
								Indiranagar&apos;s most trusted yoga schools.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.trustGrid}>
							{[
								{
									h: "Certified",
									p: "Trainers hold Yoga Alliance, SVYASA and AYUSH-recognized credentials.",
								},
								{
									h: "Experienced",
									p: "Led by founder Sharath Basavaraju and a trained faculty of practitioners.",
								},
								{
									h: "Personalized",
									p: "A plan built for your body and goal — not a one-size class.",
								},
								{
									h: "Local &amp; flexible",
									p: "At our Indiranagar studio, at your home nearby, or live online.",
								},
							].map((t, i) => (
								<div className={styles.trustCell} key={i}>
									<h3>{t.h}</h3>
									<p>{t.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 5. How It Works */}
			<section id="how">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">How it works</span>
							<h2>From first session to real results</h2>
							<p className="lead">
								A simple, structured path — personalized from the very
								first conversation.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									n: "1",
									h: "Free assessment",
									p: "We understand your goals, health history and current level in a no-obligation trial.",
								},
								{
									n: "2",
									h: "Your personal plan",
									p: "Your trainer designs a program around your goal, body and schedule.",
								},
								{
									n: "3",
									h: "1-on-1 sessions",
									p: "Train privately — at the studio, your home, or online — with full attention on you.",
								},
								{
									n: "4",
									h: "Track &amp; progress",
									p: "We measure progress and adjust the plan so you keep moving forward.",
								},
							].map((s) => (
								<div className="card" key={s.n}>
									<div className={styles.stepNum}>{s.n}</div>
									<h3>{s.h}</h3>
									<p>{s.p}</p>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<div style={{ marginTop: 34 }}>
							<a href="#book" className="btn btn-ghost">
								Start with a Free Trial
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 6. Where you train */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Where you train</span>
							<h2>At the studio, at home, or online</h2>
							<p className="lead">
								Choose whatever fits your life — the personalization stays
								the same.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-3">
							{[
								{
									h: "At our Indiranagar studio",
									p: "Train in a calm, dedicated space in the heart of Indiranagar, HAL 2nd Stage.",
								},
								{
									h: "At your home",
									p: "Private, on-site sessions at your place across Indiranagar and nearby areas — available as 12 or 24-session packages.",
								},
								{
									h: "Live online",
									p: "One-on-one over video — same trainer, same personalized plan, from anywhere.",
								},
							].map((c, i) => (
								<div
									className="card"
									style={{
										background: "var(--cream)",
									}}
									key={i}
								>
									<h3>{c.h}</h3>
									<p>{c.p}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Why PT vs Group */}
			<section id="why">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">The difference</span>
							<h2>Why personal training beats a group class</h2>
							<p className="lead">
								Group classes are great — but when you have a specific
								goal, a body that needs care, or limited time, nothing
								matches one-on-one.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div style={{ overflowX: "auto" }}>
							<table className={styles.vs}>
								<thead>
									<tr>
										<th>What matters</th>
										<th>Group class</th>
										<th>Personal training</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Attention</td>
										<td>Shared across the room</td>
										<td>100% on you, every minute</td>
									</tr>
									<tr>
										<td>Your goal</td>
										<td>Generic sequence for all</td>
										<td>Plan built for your exact goal</td>
									</tr>
									<tr>
										<td>Form &amp; safety</td>
										<td>Little individual correction</td>
										<td>Hands-on correction &amp; injury care</td>
									</tr>
									<tr>
										<td>Pace</td>
										<td>Set by the class</td>
										<td>Set by your body</td>
									</tr>
									<tr>
										<td>Schedule</td>
										<td>Fixed timings</td>
										<td>Flexible — you pick the slot</td>
									</tr>
									<tr>
										<td>Results</td>
										<td>Gradual, general</td>
										<td>Faster, measurable progress</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 8. Trainers */}
			<section id="trainers" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your trainers</span>
							<h2>Guided by certified practitioners</h2>
							<p className="lead">
								Founder-led and taught by an experienced faculty who
								practise what they teach.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.facGrid}>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3>Sharath Basavaraju</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Confirm credential"
								>
									[ Credential ] · Founder &amp; Lead Trainer
								</div>
								<p className={styles.verify} title="Add bio">
									[ Years of practice &amp; specialization. ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3
									className={styles.verify}
									title="Add real trainer name"
								>
									[ Trainer Name ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Weight loss / therapy / prenatal. ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3
									className={styles.verify}
									title="Add real trainer name"
								>
									[ Trainer Name ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Specialization. ]
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 9. Social Proof */}
			<section id="reviews">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Loved by our Indiranagar community</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.statStrip}>
							<div className={styles.stat}>
								<div className={styles.statBig}>850+</div>
								<div className={styles.statLbl}>Athayogis trained</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statBig}>30+</div>
								<div className={styles.statLbl}>transformations</div>
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
							<div className={styles.stat}>
								<div className={styles.statBig}>20+</div>
								<div className={styles.statLbl}>events hosted</div>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.vidGrid}>
							{[
								"Pmvr_kFDcTA",
								"LDcffOBJ9ZU",
								"aFxeW-gUKqw",
								"ugKjocoymvM",
							].map((id) => (
								<a
									className={styles.vid}
									key={id}
									href={`https://www.youtube.com/watch?v=${id}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Watch client testimonial"
								>
									<Image
										src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
										alt="Athayog client testimonial video"
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
										style={{ objectFit: "cover" }}
									/>
									<span className={styles.play}>{PLAY_SVG}</span>
								</a>
							))}
						</div>
					</Reveal>
					<p className={styles.tplNote}>
						Text testimonials below are templates — replace with real,
						consented client reviews (ideally from Google, with names, areas
						&amp; results).
					</p>
					<Reveal>
						<div className={styles.tstGrid}>
							{[
								{
									q: "My trainer built everything around my back pain. Three months in, the pain's gone and I'm stronger than ever.",
									w: "[ Name, Indiranagar ]",
								},
								{
									q: "One-on-one at home fit my crazy schedule perfectly. I lost the weight I'd struggled with for years.",
									w: "[ Name, Domlur ]",
								},
								{
									q: "As a complete beginner I felt zero judgement — just patient, expert guidance. Best decision I made.",
									w: "[ Name, Koramangala ]",
								},
							].map((t, i) => (
								<div className={styles.tst} key={i}>
									<p className={styles.tstQ}>&quot;{t.q}&quot;</p>
									<div
										className={`${styles.tstWho} ${styles.verify}`}
										title="Replace with verified reviewer"
									>
										{t.w}
									</div>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<p
							style={{
								marginTop: 24,
								fontSize: "0.92rem",
								color: "var(--brand-deep)",
							}}
						>
							Read our{" "}
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
							</a>{" "}
							· watch more on{" "}
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
							</a>
							.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 10. Pricing */}
			<section id="pricing" className={styles.pricing}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 780 }}>
							<span className="eyebrow">Pricing</span>
							<h2>Personal training packages</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Transparent 12 or 24-session packages — at the studio,
								online, or at your home. Start with a free trial class on
								request.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.modebar}>
							<span className={`${styles.modeBtn} ${styles.active}`}>
								At Studio
							</span>
							<span className={styles.modeBtn}>Online</span>
							<span className={styles.modeBtn}>At Home</span>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.priceGrid}>
							<div className={styles.tier}>
								<h3>12 Sessions</h3>
								<div className={styles.amt}>
									₹18,999
									<small>+ 5% GST · 12 days</small>
								</div>
								<p>
									Twelve one-on-one sessions with your personalized plan
									— ideal to build a strong, consistent practice.
								</p>
								<div className={styles.incl}>
									1-on-1 · personalized plan · progress tracking · at
									studio
								</div>
								{/* TODO: replace with real registration form */}
								<a
									href="https://athayogliving.com/register/enquire-personal-session-form"
									className="btn btn-light"
								>
									Enquire
								</a>
							</div>
							<div className={`${styles.tier} ${styles.feature}`}>
								<span className={styles.badge}>Best value</span>
								<h3>24 Sessions</h3>
								<div className={styles.amt}>
									₹31,999
									<small>+ 5% GST · 24 days</small>
								</div>
								<p>
									Twenty-four sessions for deeper, lasting results — the
									most popular choice for real transformation.
								</p>
								<div className={styles.incl}>
									Everything in 12 · extended progression · at studio
								</div>
								<a
									href="https://athayogliving.com/register/enquire-personal-session-form"
									className="btn btn-cream"
								>
									Enquire
								</a>
							</div>
							<div className={styles.tier}>
								<h3>Couple · 12 Sessions</h3>
								<div className={styles.amt}>
									₹31,999
									<small>+ 5% GST · 12 days · for two</small>
								</div>
								<p>
									Train together — twelve one-on-one sessions for two,
									sharing the journey and the motivation.
								</p>
								<div className={styles.incl}>
									Two people · 12 sessions · at studio
								</div>
								<a
									href="https://athayogliving.com/register/enquire-personal-session-form"
									className="btn btn-light"
								>
									Enquire
								</a>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							1 free trial class provided on request · prices exclude 5%
							GST. Pay via UPI, cards, net banking, PayPal, or EMI (HDFC,
							ICICI, Bank of Baroda, Federal Bank &amp; more).{" "}
							<a href="/trial-classes">Book your free trial →</a>
						</p>
					</Reveal>
				</div>
			</section>

			{/* 11. Lead Magnet / Book */}
			<section id="book">
				<div className="wrap">
					<Reveal>
						<div className={styles.magnet}>
							<div>
								<span className="eyebrow">Free trial</span>
								<h2 style={{ fontSize: "2.2rem" }}>
									Book your free personal yoga trial in Indiranagar
								</h2>
								<p>
									Tell us your goal and preferred time. We&apos;ll match
									you with the right trainer and confirm your free trial
									session — at the studio, your home, or online.
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
									placeholder="Your goal (e.g. weight loss, back pain)"
									aria-label="Your goal"
									className={styles.lmInput}
								/>
								<a
									href="/trial-classes"
									className="btn btn-cream"
									style={{
										justifyContent: "center",
									}}
								>
									Book My Free Trial
								</a>
								<span className={styles.lmMini}>
									We&apos;ll call or WhatsApp you to confirm. No
									obligation.
								</span>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 12. Location */}
			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Personal yoga training in the heart of Indiranagar</h2>
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
								<p className={styles.verify} title="Add studio hours">
									[ Open: add days &amp; hours ]
								</p>
								<p style={{ fontSize: "0.9rem" }}>
									Serving Indiranagar, Domlur, CV Raman Nagar,
									Koramangala &amp; nearby — at-home sessions on
									request.
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

			{/* 13. CTA Mid */}
			<section className={styles.ctaMid}>
				<Reveal>
					<div className="wrap">
						<h2>Your goal deserves a plan of its own.</h2>
						<p>Start with a free trial session — no obligation.</p>
						<a href="#book" className="btn btn-cream">
							Book Your Free Trial
						</a>
					</div>
				</Reveal>
			</section>

			{/* 14. FAQ */}
			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Questions</span>
							<h2>Personal yoga training in Indiranagar — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>Getting started</h3>
							<details open>
								<summary>
									What is personal yoga training?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Personal yoga training is private, one-on-one
									instruction where a certified trainer builds a plan
									around your specific goals, body and schedule — with
									full attention, form correction and faster progress
									than a group class.
								</div>
							</details>
							<details>
								<summary>
									Is there a free trial?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. We start with a free, no-obligation assessment
									session so you can set your goals and experience the
									difference before you commit.
								</div>
							</details>
							<details>
								<summary>
									Is it suitable for complete beginners?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Absolutely. Beginners benefit most from personal
									training because you learn correct technique from day
									one, at your own pace, with no pressure.
								</div>
							</details>

							<h3 className={styles.faqCat}>Goals &amp; results</h3>
							<details>
								<summary>
									Can personal yoga help with weight loss?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. Your trainer designs sessions that combine
									active, calorie-burning sequences with strength and
									breathwork, tailored to your body and progress.
								</div>
							</details>
							<details>
								<summary>
									Can it help with back or neck pain?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — therapeutic, alignment-focused yoga is one of
									the most requested reasons clients start. Sessions are
									adapted carefully to your condition.
								</div>
							</details>
							<details>
								<summary>
									How soon will I see results?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Most clients feel improvements in flexibility, energy
									and stress within a few weeks; visible physical
									results depend on your goal, consistency and starting
									point.
								</div>
							</details>
							<details>
								<summary>
									Do you offer prenatal or senior yoga?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. We offer specialized prenatal/postnatal and
									gentle senior-focused personal training with trainers
									experienced in these areas.
								</div>
							</details>

							<h3 className={styles.faqCat}>Logistics &amp; pricing</h3>
							<details>
								<summary>
									Can you train me at home?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — we offer at-home (on-site) personal sessions
									across Indiranagar and nearby areas, as 12 or
									24-session packages (₹27,999 and ₹44,599 respectively,
									excluding GST), alongside studio and online options.
								</div>
							</details>
							<details>
								<summary>
									How much does personal yoga training cost in
									Indiranagar?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Packages are priced by sessions and location
									(excluding 5% GST). At the studio: 12 sessions
									₹18,999, 24 sessions ₹31,999, couple (12) ₹31,999.
									Online: 12 sessions ₹14,999, 24 sessions ₹25,499,
									couple ₹25,499. At home: 12 sessions ₹27,999, 24
									sessions ₹44,599, couple ₹44,599. A free trial class
									is provided on request.
								</div>
							</details>
							<details>
								<summary>
									How flexible are the timings?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Very. You pick slots that suit you, including early
									mornings and evenings.
								</div>
							</details>
							<details>
								<summary>
									Where exactly are you located?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Our studio is in Indiranagar, HAL 2nd Stage (12th
									Main), serving Domlur, CV Raman Nagar, Koramangala and
									nearby — with at-home and online options too.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 15. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Get started</span>
					</Reveal>
					<Reveal>
						<h2>Your best practice starts with a plan made for you.</h2>
					</Reveal>
					<Reveal>
						<p>
							Certified, one-on-one yoga training in Indiranagar — at the
							studio, your home, or online. Book a free trial and feel the
							difference.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="#book" className="btn btn-cream">
								Book Your Free Trial
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp Us
							</a>
							<a href="tel:+918690333111" className="btn btn-light">
								Call +91 86903 33111
							</a>
						</div>
					</Reveal>
					<p className="micro">
						Trusted by 850+ Athayogis in Indiranagar &amp; Bangalore
					</p>
				</div>
			</section>

			{/* 16. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Free trial · personal yoga</span>
				<a href="#book" className="btn btn-cream">
					Book Now
				</a>
			</div>
		</>
	);
}
