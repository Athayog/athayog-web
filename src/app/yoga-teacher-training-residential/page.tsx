import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquireModal from "@/components/EnquireModal";
import styles from "@/app/yoga-teacher-training-residential/RTTC.module.css";

export const metadata: Metadata = {
	title: "Online RYT-200 Yoga Teacher Training | Athayog Living",
	description:
		"Earn your RYT-200 yoga teacher certification online with Athayog Living. Live interactive sessions, Yoga Alliance (USA) accredited, learn from anywhere. Self-paced and live-online formats from ₹14,999.",
	alternates: {
		canonical: "https://athayogliving.com/yoga-teacher-training-residential",
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

export default function RTTCPage() {
	return (
		<main>
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							RYT-200 Yoga Teacher Training · Online
						</span>
						<h1>
							Online Yoga Teacher Training —{" "}
							<em>RYT-200, Live & Interactive</em>
						</h1>
						<p className={styles.heroSub}>
							Become a certified yoga teacher from anywhere in the world.
							Athayog Living&apos;s RYT-200 online program — Yoga Alliance
							(USA) accredited, live sessions with expert instructors, and
							the same curriculum as our in-studio course.
						</p>
						<span className={styles.priceChip}>
							Yoga Alliance (USA) · RYT-200 · live online ·{" "}
							<strong>from ₹19,999</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="#enrol" className="btn btn-primary">
								Enrol Now
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
								<span className={styles.tick}>✓</span> Yoga Alliance (USA)
								RYS
							</span>
							<span>
								<span className={styles.tick}>✓</span> Live · interactive
							</span>
							<span>Attend from anywhere</span>
						</div>
					</div>
					<div
						className={styles.heroMedia}
						style={{ position: "relative", overflow: "hidden" }}
					>
						<Image
							src="/hero-certification.jpg"
							alt="RYT-200 yoga teacher training graduates receiving certification at Athayog Living"
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
							Athayog Living&apos;s online RYT-200 program delivers the full
							teacher training experience — live and interactive — so you
							can earn a globally recognized certification without
							travelling to Bengaluru. Same curriculum, same accreditation,
							same expert faculty: asana, pranayama, philosophy, anatomy,
							methodology and practicum, delivered in real time.
						</p>
					</Reveal>
				</div>
			</section>

			<section id="about">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">About the program</span>
							<h2>Teacher training, wherever you are</h2>
							<p className="lead">
								Live online sessions with the same curriculum,
								accreditation and instructors as our in-studio RYT-200 —
								built for learners who need flexibility without
								compromising on quality.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-4">
							{[
								{
									h: "RYT-200 Accredited",
									p: "Yoga Alliance (USA) recognized — teach anywhere in the world.",
								},
								{
									h: "Live & Interactive",
									p: "Real-time instruction, not pre-recorded — ask questions, get feedback.",
								},
								{
									h: "Self-Paced Elements",
									p: "Recorded sessions for review alongside live classes.",
								},
								{
									h: "Global Community",
									p: "Learn alongside peers from across India and beyond.",
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
							<h2>What you will learn — online</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className="grid-3">
							{[
								{
									h: "Asana & Alignment",
									p: "Master classical asanas with detailed online cueing and virtual adjustments.",
								},
								{
									h: "Pranayama & Meditation",
									p: "Guided breathwork and meditation practices for personal and teaching use.",
								},
								{
									h: "Yogic Philosophy",
									p: "Deep study of Patanjali&apos;s Yoga Sutras and traditional texts.",
								},
								{
									h: "Functional Anatomy",
									p: "Understand the body — online demonstrations with detailed visuals.",
								},
								{
									h: "Teaching Methodology",
									p: "Sequence design, online class management and holding space virtually.",
								},
								{
									h: "Practicum",
									p: "Real teaching practice via video — with live feedback from faculty.",
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
							<h2>Learn from the same faculty as our in-studio program</h2>
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
									[ Credential ] · Founder
								</div>
								<p className={styles.verify} title="Add bio">
									[ Lead faculty. ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3 className={styles.verify} title="Add real name">
									[ Faculty ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Asana & Philosophy ]
								</p>
							</div>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3 className={styles.verify} title="Add real name">
									[ Faculty ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Methodology & Practicum ]
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="enrol" className={styles.pricing}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 780 }}>
							<span className="eyebrow">Pricing</span>
							<h2>Online RYT-200 · Yoga Alliance (USA)</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Live online, self-paced review — enrol now for the next
								batch.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.priceGrid}>
							<div className={styles.tier}>
								<h3>Early Bird</h3>
								<div className={styles.amt}>
									₹19,999<small>+ 5% GST · register early</small>
								</div>
								<p>
									Best rate — limited slots per batch. Live instruction
									+ recorded review.
								</p>
								<div className={styles.incl}>
									RYT-200 · live online · manual · recordings
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Online RYT-200 · Early Bird ₹19,999"
									pageSource="yoga-teacher-training-residential"
								>
									<span className="btn btn-light">Enquire</span>
								</EnquireModal>
							</div>
							<div className={`${styles.tier} ${styles.feature}`}>
								<span className={styles.badge}>Standard</span>
								<h3>Regular</h3>
								<div className={styles.amt}>
									₹24,999<small>+ 5% GST</small>
								</div>
								<p>
									Full online RYT-200 experience — live sessions with
									extended resources.
								</p>
								<div className={styles.incl}>
									Everything in Early Bird · extended catalog
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Online RYT-200 · Regular ₹24,999"
									pageSource="yoga-teacher-training-residential"
								>
									<span className="btn btn-cream">Enquire</span>
								</EnquireModal>
							</div>
							<div className={styles.tier}>
								<h3>Self-Paced</h3>
								<div className={styles.amt}>
									₹14,999<small>+ 5% GST</small>
								</div>
								<p>
									Pre-recorded curriculum with periodic live Q&A — learn
									at your own speed.
								</p>
								<div className={styles.incl}>
									Recorded · live Q&A · manual · certification
								</div>
								<EnquireModal
									service="Yoga Teacher Training"
									plan="Online RYT-200 · Self-Paced ₹14,999"
									pageSource="yoga-teacher-training-residential"
								>
									<span className="btn btn-light">Enquire</span>
								</EnquireModal>
							</div>
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.reassure}>
							Prices exclude 5% GST · EMI, UPI, cards accepted.{" "}
							<a href="https://wa.me/918690333111">WhatsApp us →</a>
						</p>
					</Reveal>
				</div>
			</section>

			<section className={styles.ctaMid}>
				<div className="wrap">
					<Reveal>
						<h2>Ready to earn your RYT-200 online?</h2>
						<p>
							Enrol in the next online batch — live, interactive and
							globally recognized.
						</p>
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
							<h2>Online RYT-200 — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<details open>
								<summary>
									Is the online TTC Yoga Alliance accredited?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — Athayog Living is a Registered Yoga School
									(RYS). The online RYT-200 carries the same
									accreditation as our in-studio program, recognized
									worldwide.
								</div>
							</details>
							<details>
								<summary>
									Are sessions live or recorded?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Core sessions are live and interactive — you attend in
									real time, ask questions and get feedback. Sessions
									are also recorded so you can review at your own pace.
								</div>
							</details>
							<details>
								<summary>
									How long is the program?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									The live-online format typically spans 12 weeks, with
									flexibility built in for self-paced learners.
								</div>
							</details>
							<details>
								<summary>
									What equipment do I need?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									A stable internet connection, a device with a camera,
									and a yoga mat — that&apos;s all you need to get
									started.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			<section id="explore">
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
									h: "Weekend TTC",
									p: "In-studio RYT-200 — weekend format, Indiranagar.",
									u: "/yoga-teacher-training-bangalore",
								},
								{
									h: "Group Classes",
									p: "Small-batch classes from ₹599 drop-in.",
									u: "/group-classes-indiranagar",
								},
								{
									h: "Personal Training",
									p: "One-on-one, goal-based — from ₹14,999.",
									u: "/personal-yoga-training-indiranagar",
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

			<section id="final" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Begin</span>
					</Reveal>
					<Reveal>
						<h2>Your teaching journey starts online.</h2>
					</Reveal>
					<Reveal>
						<p>
							RYT-200 Yoga Teacher Training — live online, globally
							recognized. Enrol now for the next batch.
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
						Trusted by 850+ Athayogis across India & beyond
					</p>
				</div>
			</section>
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Online RYT-200 · from ₹14,999</span>
				<a href="#enrol" className="btn btn-cream">
					Enrol
				</a>
			</div>
		</main>
	);
}
