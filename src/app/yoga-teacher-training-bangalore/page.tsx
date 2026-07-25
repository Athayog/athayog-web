import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/EnquireModal";
import styles from "@/app/yoga-teacher-training-bangalore/TTC.module.css";

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

export default function TTCBangalorePage() {
	return (
		<>
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							RYT-200 Yoga Teacher Training · Indiranagar, Bangalore
						</span>
						<h1>
							Yoga Teacher Training Course in Bangalore —{" "}
							<em>RYT-200, Weekend Format</em>
						</h1>
						<p className={styles.heroSub}>
							Become a certified yoga teacher with Athayog Living&apos;s
							Yoga Alliance (USA) accredited RYT-200 program. Weekend
							format, based in Indiranagar — designed for working
							professionals and students who want to teach without leaving
							their current routine.
						</p>
						<span className={styles.priceChip}>
							Yoga Alliance (USA) · RYT-200 · weekend batches ·{" "}
							<strong>from ₹24,999</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="#enrol" className="btn btn-primary">
								Enrol Now
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
							src="/hero-teaching.jpg"
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
							prepares you to teach yoga confidently — whether you want to
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
								At Athayog, we don&apos;t just teach you asanas — we train
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
									p: "12 weeks · Saturdays & Sundays — ideal for working professionals and students.",
								},
								{
									h: "Authentic Lineage",
									p: "Rooted in Bihar School of Yoga & SVYASA teachings — real yogic tradition.",
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
									p: "Functional anatomy for yoga — understand the body in movement and stillness.",
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

			<section id="trainers" className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your mentors</span>
							<h2>Learn from experienced practitioners</h2>
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
									[ Faculty Name ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Philosophy / Asana / Anatomy ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3 className={styles.verify} title="Add real name">
									[ Faculty Name ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Teaching Methodology / Practicum ]
								</p>
							</div>
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
							{["Pmvr_kFDcTA", "LDcffOBJ9ZU", "aFxeW-gUKqw"].map((id) => (
								<a
									className={styles.vid}
									key={id}
									href={`https://www.youtube.com/watch?v=${id}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Watch testimonial"
								>
									<Image
										src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
										alt="Athayog testimonial video"
										fill
										sizes="33vw"
										style={{ objectFit: "cover" }}
									/>
									<span className={styles.play}>{PLAY_SVG}</span>
								</a>
							))}
						</div>
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
								Weekend format, 12 weeks — Yoga Alliance (USA) accredited.
								Enrol now or enquire for the next batch.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.priceGrid}>
							<div className={styles.tier}>
								<h3>Early Bird</h3>
								<div className={styles.amt}>
									₹24,999<small>+ 5% GST · register early</small>
								</div>
								<p>
									Secure your spot at the best rate — limited seats
									available for each batch.
								</p>
								<div className={styles.incl}>
									12 weeks · weekend · RYT-200 · manual included
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Weekend RYT-200 · Early Bird ₹24,999"
									pageSource="yoga-teacher-training-bangalore"
								>
									<span className="btn btn-light">Enquire</span>
								</EnquireModal>
							</div>
							<div className={`${styles.tier} ${styles.feature}`}>
								<span className={styles.badge}>Standard</span>
								<h3>Regular</h3>
								<div className={styles.amt}>
									₹29,999<small>+ 5% GST</small>
								</div>
								<p>
									Full access to the complete RYT-200 curriculum with
									expert guidance throughout.
								</p>
								<div className={styles.incl}>
									Everything in Early Bird · extended materials
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Weekend RYT-200 · Regular ₹29,999"
									pageSource="yoga-teacher-training-bangalore"
								>
									<span className="btn btn-cream">Enquire</span>
								</EnquireModal>
							</div>
							<div className={styles.tier}>
								<h3>Online</h3>
								<div className={styles.amt}>
									₹19,999<small>+ 5% GST · live online</small>
								</div>
								<p>
									Same curriculum, delivered live — attend from anywhere
									with real-time guidance.
								</p>
								<div className={styles.incl}>
									RYT-200 · live online · manual · recorded sessions
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Weekend RYT-200 · Online ₹19,999"
									pageSource="yoga-teacher-training-bangalore"
								>
									<span className="btn btn-light">Enquire</span>
								</EnquireModal>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							Prices exclude 5% GST · EMI, UPI, cards, net banking accepted.{" "}
							<a href="https://athayogliving.com/trial-classes">
								Book a trial class →
							</a>
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
							<h2>RYT-200 Teacher Training in Bangalore — FAQs</h2>
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
									200-hour level, accredited by Yoga Alliance (USA) —
									the most widely recognized international standard for
									yoga teachers.
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
									register as an RYT-200 teacher — recognized worldwide.
								</div>
							</details>
							<details>
								<summary>
									How long is the weekend course?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									12 weeks, conducted on Saturdays and Sundays —
									designed to fit alongside a full-time job or study
									schedule.
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
									supervised practicum — everything you need to teach
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
									Early Bird registration is ₹24,999; Regular is
									₹29,999; Online is ₹19,999. All prices exclude 5% GST.
									EMI, UPI, cards and net banking are accepted.
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
									p: "One-on-one, goal-based yoga — from ₹14,999.",
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
							RYT-200 Yoga Teacher Training in Bangalore — weekend format,
							globally recognized. Enrol now for the next batch.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="#enrol" className="btn btn-cream">
								Enrol Now
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
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>RYT-200 · weekend</span>
				<a href="#enrol" className="btn btn-cream">
					Enrol
				</a>
			</div>
		</>
	);
}
