import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import styles from "@/app/group-classes-indiranagar/GroupClasses.module.css";

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

export default function GroupClassesPage() {
	return (
		<>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<span className="eyebrow">
							Group Yoga Classes · Indiranagar, Bangalore
						</span>
						<h1>
							Group Yoga Classes in Indiranagar —{" "}
							<em>Practise Together, Grow Together</em>
						</h1>
						<p className={styles.heroSub}>
							Join expert-led, small-batch group yoga classes in the heart
							of Indiranagar. Six signature formats, morning and evening
							batches, and flexible timings — open to every level. Come as
							you are, from ₹599 a drop-in or a free trial class.
						</p>
						<span className={styles.priceChip}>
							Drop-in ₹599 · monthly from ₹4,999 · morning &amp; evening
							batches · <strong>free trial class</strong>
						</span>
						<div className={styles.heroCta}>
							<a href="#trial" className="btn btn-primary">
								Book a Free Trial
							</a>
							<a href="#schedule" className="btn btn-ghost">
								View Class Schedule
							</a>
						</div>
						<div className={styles.trustRow}>
							<span>
								<span className={styles.tick}>✓</span> Small batches ·
								expert-led
							</span>
							<span>
								<span className={styles.tick}>✓</span> All levels (14+)
							</span>
							<span>850+ Athayogis · Indiranagar</span>
						</div>
					</div>
					<div className={styles.heroMedia} aria-hidden="true">
						Hero image — a group class in session at the Indiranagar studio
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
							Group yoga classes are instructor-led sessions practised
							together in a shared studio. At Athayog Living in Indiranagar,
							small-batch classes run morning and evening across six
							signature formats — from gentle alignment to dynamic flow and
							meditation — open to all levels above age 14, with drop-in and
							monthly subscription options.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 3. Why practise in a group */}
			<section className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why practise in a group</span>
							<h2>The energy of a community, the care of a small batch</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Group classes give you consistency, connection and expert
								guidance — with the accountability that keeps you coming
								back.
							</p>
						</div>
					</Reveal>
					<div className="grid-4">
						<Reveal>
							<div className={`card ${styles.bandCard}`}>
								<h3>Connect with others</h3>
								<p>
									Practise alongside like-minded people and feel the
									energy of a shared space.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={`card ${styles.bandCard}`}>
								<h3>Lasting lifestyle change</h3>
								<p>
									Yoga is more than asana — the routine builds real,
									positive habits.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={`card ${styles.bandCard}`}>
								<h3>Mind-body harmony</h3>
								<p>
									Strengthen the body and calm the mind in equal
									measure.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={`card ${styles.bandCard}`}>
								<h3>Expert guidance</h3>
								<p>
									Learn from experienced instructors who guide you every
									step of the way.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 4. Class formats */}
			<section id="formats">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Class formats</span>
							<h2>Six signature ways to practise</h2>
							<p className="lead">
								Each format is a distinct path — choose by how you want to
								feel, or move through them all as your practice deepens.
							</p>
						</div>
					</Reveal>
					<div className="grid-3">
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;Where movement, breath &amp; stillness become
									one&quot;
								</div>
								<h3>Universal Harmony</h3>
								<p>
									Intentional asana, pranayama and meditation woven into
									one complete, meditative practice.
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> seekers who want a complete
									body-and-mind approach.
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;The discipline of alignment, the grace of
									awareness&quot;
								</div>
								<h3>Rhythm of Being</h3>
								<p>
									Classical asana with precise alignment and steady
									breath — steadiness (sthira) and ease (sukha).
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> those who value precision and
									alignment.
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;Flow as a reflection of consciousness&quot;
								</div>
								<h3>Transcending Transition</h3>
								<p>
									Breath-led, sequential flow — a moving meditation that
									builds strength and adaptability.
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> lovers of dynamic, breath-synced
									practice.
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;Refinement as a path to mastery&quot;
								</div>
								<h3>Uttama Sadhana</h3>
								<p>
									Advanced asana — arm balances, inversions and refined
									alignment for committed practitioners.
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> experienced practitioners deepening
									their sadhana.
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;Journey inward through stillness &amp;
									awareness&quot;
								</div>
								<h3>Inner World</h3>
								<p>
									Meditative, restorative techniques and sensory
									withdrawal (pratyahara) for deep restoration.
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> those seeking rest, reflection and
									calm.
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<div className={styles.tagline}>
									&quot;Rest. Realign. Return to stillness&quot;
								</div>
								<h3>Sound Meditation</h3>
								<p>
									Therapeutic sound and vibration to calm the nervous
									system and rebalance the mind.
								</p>
								<div className={styles.ideal}>
									<b>Ideal for:</b> anyone seeking healing through
									stillness.{" "}
									<span style={{ color: "var(--clay)" }}>(paid)</span>
								</div>
							</div>
						</Reveal>
					</div>
					<Reveal>
						<p
							style={{
								marginTop: 24,
								fontSize: "0.95rem",
								color: "var(--brand-deep)",
							}}
						>
							Also on the timetable: <strong>Yoga with Props</strong>,{" "}
							<strong>Pranayama &amp; Trataka</strong>, and{" "}
							<strong>Aerial Yoga</strong> (a paid, per-session class).
						</p>
					</Reveal>
				</div>
			</section>

			{/* 5. Schedule */}
			<section id="schedule" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Weekly schedule</span>
							<h2>Group class timetable — Indiranagar</h2>
							<p className="lead">
								Morning and evening batches, seven days a week. Pick a
								time that fits your life.{" "}
								<span
									className={styles.verify}
									title="Update monthly from your latest schedule PDF"
								>
									(Schedule shown for reference — download the latest
									below.)
								</span>
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.schedWrap}>
							<table className={styles.sched}>
								<thead>
									<tr>
										<th className={styles.tcol}>Time</th>
										<th>Mon</th>
										<th>Tue</th>
										<th>Wed</th>
										<th>Thu</th>
										<th>Fri</th>
										<th>Sat</th>
										<th>Sun</th>
									</tr>
								</thead>
								<tbody>
									<tr className={styles.sec}>
										<td colSpan={8}>Morning batches</td>
									</tr>
									<tr>
										<td className={styles.tcol}>6:00–7:00</td>
										<td>Universal Harmony</td>
										<td>Uttama Sadhana</td>
										<td>Transcending Transition</td>
										<td>Yoga with Props</td>
										<td>Rhythm of Being</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Universal Harmony</td>
									</tr>
									<tr>
										<td className={styles.tcol}>7:00–8:00</td>
										<td>Yoga with Props</td>
										<td>Transcending Transition</td>
										<td>Universal Harmony</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana</td>
										<td>Rhythm of Being</td>
										<td>Uttama Sadhana (Arm Balance)</td>
									</tr>
									<tr>
										<td className={styles.tcol}>8:00–9:00</td>
										<td>Rhythm of Being</td>
										<td>Uttama Sadhana</td>
										<td>Yoga with Props</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Transcending Transition</td>
										<td>Universal Harmony</td>
										<td>Uttama Sadhana</td>
									</tr>
									<tr>
										<td className={styles.tcol}>9:30–10:30</td>
										<td>Uttama Sadhana</td>
										<td>Rhythm of Being</td>
										<td>Universal Harmony</td>
										<td>Pranayama</td>
										<td>Yoga with Props</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Transcending Transition</td>
									</tr>
									<tr>
										<td className={styles.tcol}>10:30–12:00</td>
										<td>—</td>
										<td>—</td>
										<td>—</td>
										<td>—</td>
										<td>—</td>
										<td>—</td>
										<td className={styles.tdPaid}>
											Aerial Yoga (paid)
										</td>
									</tr>
									<tr className={styles.sec}>
										<td colSpan={8}>Evening batches</td>
									</tr>
									<tr>
										<td className={styles.tcol}>4:00–5:00</td>
										<td>Universal Harmony</td>
										<td>Uttama Sadhana</td>
										<td>Rhythm of Being</td>
										<td>Yoga with Props</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Rhythm of Being</td>
									</tr>
									<tr>
										<td className={styles.tcol}>5:00–6:00</td>
										<td>Yoga with Props</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana</td>
										<td>Universal Harmony</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Rhythm of Being</td>
										<td>Pranayama</td>
									</tr>
									<tr>
										<td className={styles.tcol}>6:00–7:00</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Rhythm of Being</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana</td>
										<td>Pranayama</td>
										<td>Yoga with Props</td>
										<td>Universal Harmony</td>
									</tr>
									<tr>
										<td className={styles.tcol}>7:30–8:30</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana (Arm Balance)</td>
										<td>Trataka &amp; Pranayama</td>
										<td>Rhythm of Being</td>
										<td className={styles.tdPaid}>
											Aerial Yoga (paid)
										</td>
										<td>Transcending Transition</td>
										<td>Uttama Sadhana</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Reveal>
					<div className={styles.legend}>
						<span>Beginner-friendly / open to all</span>
						<span>Intermediate</span>
						<span>Advanced</span>
						<span>Meditation / Pranayama</span>
						<span style={{ color: "var(--clay)" }}>
							Aerial / Sound (paid)
						</span>
					</div>
					<div className={styles.schedNote}>
						<ul>
							<li>
								Open to all above age 14 · rights of admission reserved.
							</li>
							<li>Aerial Yoga is a paid, per-session class.</li>
							<li>
								Latecomers are not admitted beyond 5 minutes after the
								class start time.
							</li>
						</ul>
					</div>
					<div style={{ marginTop: 22 }}>
						<a
							href="https://athayog.cdn.prismic.io/athayog/ahx2NgeQX7-eWdYw_ScheduleJune26.pdf"
							className="btn btn-ghost"
							target="_blank"
							rel="noopener noreferrer"
						>
							Download the Full Schedule (PDF)
						</a>
					</div>
				</div>
			</section>

			{/* 6. Pricing */}
			<section id="pricing" className={styles.pricing}>
				<div className="wrap">
					<Reveal>
						<div className="section-head" style={{ maxWidth: 780 }}>
							<span className="eyebrow">Pricing</span>
							<h2>Membership that fits how you practise</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Drop in once, or subscribe and save — the longer you
								commit, the lower your monthly cost.
							</p>
						</div>
					</Reveal>
					<div className={styles.priceGrid}>
						<Reveal>
							<div className={styles.tier}>
								<h3>Drop-in</h3>
								<div className={styles.amt}>₹599</div>
								<div className={styles.permo}>walk-in · single class</div>
								<p>
									Try a single class or practise when you&apos;re in
									town — no commitment.
								</p>
								{/* TODO: register/enquire page not built yet */}
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-light"
								>
									Register
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.tier}>
								<h3>1 Month</h3>
								<div className={styles.amt}>₹4,999</div>
								<div className={styles.permo}>
									30 days · ₹4,999 / month
								</div>
								<p>
									Build a consistent practice with unlimited access to
									group classes for a month.
								</p>
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-light"
								>
									Register
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.tier}>
								<h3>3 Months</h3>
								<div className={styles.amt}>₹9,999</div>
								<div className={styles.permo}>
									90 days · ≈ ₹3,333 / month
								</div>
								<p>
									Commit to a season of practice and settle into a real
									routine.
								</p>
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-light"
								>
									Register
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={`${styles.tier} ${styles.feature}`}>
								<span className={styles.badge}>Best value</span>
								<h3>6 Months</h3>
								<div className={styles.amt}>₹15,999</div>
								<div className={styles.permo}>
									180 days · ≈ ₹2,666 / month
								</div>
								<p>
									Half a year of transformation, at a meaningfully lower
									monthly rate.
								</p>
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-light"
								>
									Register
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={`${styles.tier} ${styles.feature}`}>
								<span className={styles.badge}>Best value</span>
								<h3>12 Months</h3>
								<div className={styles.amt}>₹25,999</div>
								<div className={styles.permo}>
									365 days · ≈ ₹2,166 / month
								</div>
								<p>
									Our best per-month value — a full year of practice and
									community.
								</p>
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-cream"
								>
									Register
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.tier}>
								<h3>Couple · 1 Year</h3>
								<div className={styles.amt}>₹32,399</div>
								<div className={styles.permo}>365 days · for two</div>
								<p>
									Practise together for a year and keep each other
									accountable.
								</p>
								<a
									href="https://athayogliving.com/register/enquire-group-class-form"
									className="btn btn-light"
								>
									Register
								</a>
							</div>
						</Reveal>
					</div>
					<p className={styles.reassure}>
						Prices exclude 5% GST · terms apply. Pay via UPI, cards, net
						banking, PayPal or EMI (HDFC, ICICI, Bank of Baroda, Federal Bank
						&amp; more). New here?{" "}
						<a href="https://athayogliving.com/trial-classes">
							Start with a free trial class →
						</a>
					</p>
				</div>
			</section>

			{/* 7. Trainers */}
			<section id="trainers">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Your instructors</span>
							<h2>Guided by experienced practitioners</h2>
							<p className="lead">
								Founder-led and taught by a trained faculty who practise
								what they teach.
							</p>
						</div>
					</Reveal>
					<div className={styles.facGrid}>
						<Reveal>
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
						</Reveal>
						<Reveal>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3
									className={styles.verify}
									title="Add real instructor name"
								>
									[ Instructor Name ]
								</h3>
								<div
									className={`${styles.facRole} ${styles.verify}`}
									title="Add credential"
								>
									[ Credential ]
								</div>
								<p className={styles.verify} title="Add specialization">
									[ Teaches — flow / alignment / meditation. ]
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.fac}>
								<div className={styles.facAvatar}>[ photo ]</div>
								<h3
									className={styles.verify}
									title="Add real instructor name"
								>
									[ Instructor Name ]
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
						</Reveal>
					</div>
				</div>
			</section>

			{/* 8. Social proof */}
			<section id="reviews" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">In their words</span>
							<h2>Loved by our Indiranagar community</h2>
						</div>
					</Reveal>

					<div className={styles.statStrip}>
						<Reveal>
							<div className={styles.stat}>
								<div className={styles.statBig}>850+</div>
								<div className={styles.statLbl}>Athayogis</div>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.stat}>
								<div className={styles.statBig}>6</div>
								<div className={styles.statLbl}>signature formats</div>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.stat}>
								<div
									className={`${styles.statBig} ${styles.verify}`}
									title="Add verified rating"
								>
									4.9★
								</div>
								<div className={styles.statLbl}>average rating</div>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.stat}>
								<div className={styles.statBig}>7</div>
								<div className={styles.statLbl}>days a week</div>
							</div>
						</Reveal>
					</div>

					<div className={styles.vidGrid}>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=Pmvr_kFDcTA"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch member testimonial"
							>
								<Image
									src="https://img.youtube.com/vi/Pmvr_kFDcTA/hqdefault.jpg"
									alt="Athayog member testimonial video"
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
									style={{ objectFit: "cover" }}
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
						</Reveal>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=LDcffOBJ9ZU"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch member testimonial"
							>
								<Image
									src="https://img.youtube.com/vi/LDcffOBJ9ZU/hqdefault.jpg"
									alt="Athayog member testimonial video"
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
									style={{ objectFit: "cover" }}
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
						</Reveal>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=aFxeW-gUKqw"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch member testimonial"
							>
								<Image
									src="https://img.youtube.com/vi/aFxeW-gUKqw/hqdefault.jpg"
									alt="Athayog member testimonial video"
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
									style={{ objectFit: "cover" }}
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
						</Reveal>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=ugKjocoymvM"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch member testimonial"
							>
								<Image
									src="https://img.youtube.com/vi/ugKjocoymvM/hqdefault.jpg"
									alt="Athayog member testimonial video"
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
									style={{ objectFit: "cover" }}
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
						</Reveal>
					</div>

					<p className={styles.tplNote}>
						Text testimonials below are templates — replace with real,
						consented member reviews (ideally from Google, with names &amp;
						areas).
					</p>

					<div className={styles.tstGrid}>
						<Reveal>
							<div className={styles.tst}>
								<p className={styles.tstQ}>
									&quot;The 6 AM batch completely changed my mornings.
									Small group, real attention, and I actually look
									forward to it.&quot;
								</p>
								<div
									className={`${styles.tstWho} ${styles.verify}`}
									title="Replace with verified reviewer"
								>
									[ Name, Indiranagar ]
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.tst}>
								<p className={styles.tstQ}>
									&quot;I started as a nervous beginner in Universal
									Harmony and now I&apos;m doing arm balances in Uttama
									Sadhana. The progression is beautiful.&quot;
								</p>
								<div
									className={`${styles.tstWho} ${styles.verify}`}
									title="Replace with verified reviewer"
								>
									[ Name, Domlur ]
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.tst}>
								<p className={styles.tstQ}>
									&quot;Flexible timings meant I never missed a class
									despite work. Best value membership in
									Indiranagar.&quot;
								</p>
								<div
									className={`${styles.tstWho} ${styles.verify}`}
									title="Replace with verified reviewer"
								>
									[ Name, Koramangala ]
								</div>
							</div>
						</Reveal>
					</div>

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

			{/* 9. Free trial magnet */}
			<section id="trial">
				<div className="wrap">
					<Reveal>
						<div className={styles.magnet}>
							<div>
								<span className="eyebrow">Free trial class</span>
								<h2 style={{ fontSize: "2.2rem" }}>
									Try a group class in Indiranagar — free
								</h2>
								<p>
									Tell us your preferred time and level. We&apos;ll
									confirm your free trial class and help you pick the
									format that&apos;s right for you.
								</p>
							</div>
							<div className={styles.lmForm}>
								<div className={styles.lmFormRow}>
									<input
										type="text"
										placeholder="Your name"
										aria-label="Your name"
									/>
									<input
										type="tel"
										placeholder="WhatsApp / phone number"
										aria-label="Phone number"
									/>
								</div>
								<div className={styles.lmFormRow}>
									<input
										type="text"
										placeholder="Preferred time (e.g. 6 AM / evening)"
										aria-label="Preferred time"
									/>
									<a
										href="https://athayogliving.com/trial-classes"
										className="btn btn-cream"
										style={{ justifyContent: "center" }}
									>
										Book My Free Trial
									</a>
								</div>
								<span className={styles.lmMini}>
									We&apos;ll call or WhatsApp you to confirm. No
									obligation.
								</span>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 10. Location */}
			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Find us</span>
							<h2>Group yoga in the heart of Indiranagar</h2>
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

			{/* 11. CTA mid */}
			<section className={styles.ctaMid}>
				<Reveal>
					<div className="wrap">
						<h2>Your mat is waiting.</h2>
						<p>Book a free trial class or drop in from ₹599.</p>
						<a href="#trial" className="btn btn-cream">
							Book a Free Trial
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
							<h2>Group yoga classes in Indiranagar — FAQs</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<h3 className={styles.faqCat}>Getting started</h3>
							<details open>
								<summary>
									Is there a free trial class?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. You can book a free trial class to experience a
									session and find the right format before you
									subscribe.
								</div>
							</details>
							<details>
								<summary>
									Can I drop in for a single class?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. A walk-in drop-in class is ₹599 (excluding 5%
									GST) — ideal if you&apos;re visiting or want to try
									before committing to a subscription.
								</div>
							</details>
							<details>
								<summary>
									Are the classes good for beginners?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Absolutely. Several formats — like Universal Harmony
									and Yoga with Props — are beginner-friendly and open
									to all, with instructors who guide you at your level.
								</div>
							</details>
							<details>
								<summary>
									What&apos;s the minimum age?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Group classes are open to everyone above the age of
									14.
								</div>
							</details>

							<h3 className={styles.faqCat}>Schedule &amp; formats</h3>
							<details>
								<summary>
									What are the class timings in Indiranagar?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Morning batches run from 6:00 AM to 12:00 PM and
									evening batches from 4:00 PM to 8:30 PM, seven days a
									week. Download the latest schedule PDF for the full
									weekly timetable.
								</div>
							</details>
							<details>
								<summary>
									What styles of yoga do you offer?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Six signature formats — Universal Harmony, Rhythm of
									Being, Transcending Transition, Uttama Sadhana, Inner
									World and Sound Meditation — plus Yoga with Props,
									Pranayama and Aerial Yoga.
								</div>
							</details>
							<details>
								<summary>
									Is Aerial Yoga included?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Aerial Yoga is offered as a separate paid, per-session
									class rather than part of the standard group
									membership.
								</div>
							</details>
							<details>
								<summary>
									Can I come late to a class?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									To keep the practice safe and focused, latecomers are
									not admitted beyond 5 minutes after the class start
									time.
								</div>
							</details>

							<h3 className={styles.faqCat}>Membership &amp; pricing</h3>
							<details>
								<summary>
									How much do group yoga classes cost in Indiranagar?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									A drop-in is ₹599. Subscriptions are ₹4,999 (1 month),
									₹9,999 (3 months), ₹15,999 (6 months) and ₹25,999 (12
									months); a couple 1-year membership is ₹32,399. All
									prices exclude 5% GST.
								</div>
							</details>
							<details>
								<summary>
									Which membership is the best value?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									The 12-month membership at ₹25,999 works out to about
									₹2,166 per month — the lowest monthly rate — making it
									the best value for regular practitioners.
								</div>
							</details>
							<details>
								<summary>
									Do you offer EMI or online payment?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes — pay via UPI, cards, net banking, PayPal, or EMI
									through HDFC, ICICI, Bank of Baroda, Federal Bank and
									more.
								</div>
							</details>
							<details>
								<summary>
									Where exactly are you located?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Our studio is in Indiranagar, HAL 2nd Stage (12th
									Main), Bengaluru 560038 — convenient for Domlur, CV
									Raman Nagar, Koramangala and nearby areas.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 13. Explore */}
			<section className={styles.explore}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Explore</span>
							<h2>More ways to practise with us</h2>
						</div>
					</Reveal>
					<div className={styles.exGrid}>
						<Reveal>
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
						</Reveal>
						<Reveal>
							<a
								className={styles.ex}
								href="/weight-loss-program-indiranagar"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Weight Loss Program</h3>
								<p>A focused yoga program to shed weight.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/yoga-teacher-training">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Teacher Training (TTC)</h3>
								<p>Become a certified RYT-200 yoga teacher.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/workshops">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Workshops</h3>
								<p>Deep-dive sessions on special themes.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/about-us">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Who We Are</h3>
								<p>The story and philosophy behind Athayog.</p>
							</a>
						</Reveal>
						<Reveal>
							<a
								className={styles.ex}
								href="https://athayog.cdn.prismic.io/athayog/ahx2NgeQX7-eWdYw_ScheduleJune26.pdf"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Class Schedule (PDF)</h3>
								<p>Download the full weekly timetable.</p>
							</a>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 14. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Join us</span>
					</Reveal>
					<Reveal>
						<h2>Find your batch. Join the community.</h2>
					</Reveal>
					<Reveal>
						<p>
							Expert-led group yoga classes in Indiranagar — small batches,
							six formats, morning and evening. Start with a free trial or
							drop in from ₹599.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="/trial-classes" className="btn btn-cream">
								Book a Free Trial
							</a>
							<a
								href="https://athayogliving.com/register/enquire-group-class-form"
								className="btn btn-light"
							>
								Register Now
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
						Trusted by 850+ Athayogis in Indiranagar &amp; Bangalore
					</p>
				</div>
			</section>

			{/* 15. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Drop-in ₹599 · free trial</span>
				<a href="#trial" className="btn btn-cream">
					Book Now
				</a>
			</div>
		</>
	);
}
