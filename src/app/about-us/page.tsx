import { Flower, Users, Sparkles, Leaf, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import HeroImage from "./HeroImage";
import styles from "./AboutUs.module.css";

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

export default function AboutUsPage() {
	return (
		<>
			{/* 1. Hero */}
			<section className={styles.hero}>
				{MANDALA}
				<div className={`wrap ${styles.heroGrid}`}>
					<div>
						<Reveal>
							<span className="eyebrow">Who We Are · Athayog Living</span>
						</Reveal>
						<Reveal>
							<h1>
								Your Journey to <em>Balance &amp; Wellness</em>
							</h1>
						</Reveal>
						<Reveal>
							<p className={styles.heroSub}>
								Athayog Living is dedicated to preserving the ancient
								legacy of Yog — integrating its true purpose, philosophy
								and practice into modern daily life, and making timeless
								wisdom accessible to everyone.
							</p>
						</Reveal>
						<Reveal>
							<div className={styles.heroCta}>
								<a href="/trial-classes" className="btn btn-primary">
									Begin Your Journey
								</a>
								<a href="#founder" className="btn btn-ghost">
									Meet the Founder
								</a>
							</div>
						</Reveal>
						<Reveal>
							<div className={styles.trustRow}>
								<span>
									<span className={styles.tick}>✓</span> Yoga Alliance ·
									SVYASA · AYUSH
								</span>
								<span>
									<span className={styles.tick}>✓</span> Rooted in
									authentic lineage
								</span>
								<span>Indiranagar &amp; Jayanagar</span>
							</div>
						</Reveal>
					</div>
					<HeroImage />
				</div>
			</section>

			{/* 2. Statbar */}
			<section className={styles.statbar}>
				<Reveal>
					<div className={`wrap ${styles.statGrid}`}>
						<div className={styles.stat}>
							<div className={styles.statNumber}>60+</div>
							<div className={styles.statLabel}>Graduates</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>850+</div>
							<div className={styles.statLabel}>Athayogis</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>30+</div>
							<div className={styles.statLabel}>Transformations</div>
						</div>
						<div className={styles.stat}>
							<div className={styles.statNumber}>20+</div>
							<div className={styles.statLabel}>Events</div>
						</div>
					</div>
				</Reveal>
			</section>

			{/* 3. Answer snippet */}
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
							Athayog Living is a certified yoga studio in Indiranagar,
							Bengaluru, founded by Sharath Basavaraju — who was trained
							through the teachings of the Bihar School of Yoga and holds a
							formal yogic education from SVYASA. The studio offers group
							classes, personal training, a weight-loss program and RYT-200
							teacher training, all rooted in authentic tradition and
							recognized by Yoga Alliance (USA), SVYASA and AYUSH.
						</p>
					</Reveal>
				</div>
			</section>

			{/* 4. Mission */}
			<section id="mission">
				<div className="wrap split">
					<Reveal>
						<div>
							<span className="eyebrow">Our mission</span>
							<h2 style={{ marginTop: 8 }}>
								Ancient wisdom, woven into modern life
							</h2>
							<p>
								At Athayog, our studio is a sacred space — an oasis of
								knowledge and truth where individuals experience profound
								transformation on their journey toward higher living.
								Embracing a holistic yogic lifestyle takes the right flow
								of knowledge to fully embody, and that&apos;s where we
								come in.
							</p>
							<p>
								We educate and illuminate with clear direction, sharing
								transformational tools that help you reconnect with your
								true nature. Supported by the pillars of ancient yogic
								knowledge, we encourage genuine change toward higher
								living.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="split-media">
							<img
								src="https://images.prismic.io/athayog/ZzI2Lq8jQArT0tLq_18c80ed967a14416f2b609443d4f2638-min.jpeg?auto=format,compress&w=1000"
								alt="Athayog Living studio — a sanctum for the spirit"
								loading="lazy"
							/>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 5. Values */}
			<section style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What we stand for</span>
							<h2>The pillars of our practice</h2>
						</div>
					</Reveal>
					<div className="grid-4">
						<Reveal>
							<div className="card">
								<Flower size={24} color="var(--brand-deep)" />
								<h3>Authenticity</h3>
								<p>
									Yog taught in its true spirit — rooted in tradition,
									philosophy and lineage.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<Users size={24} color="var(--brand-deep)" />
								<h3>Accessibility</h3>
								<p>
									Timeless wisdom made relevant and approachable for
									everyone, at every level.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<Sparkles size={24} color="var(--brand-deep)" />
								<h3>Transformation</h3>
								<p>
									Tools that reconnect you with your true nature and
									move you toward higher living.
								</p>
							</div>
						</Reveal>
						<Reveal>
							<div className="card">
								<Leaf size={24} color="var(--brand-deep)" />
								<h3>Self-reliance</h3>
								<p>
									We empower you to practise on your own — a complete
									yogic lifestyle, embodied.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 6. Founder */}
			<section id="founder">
				<div className={`wrap ${styles.founder}`}>
					<Reveal>
						<div className={styles.founderPortrait}>
							<img
								src="https://images.prismic.io/athayog/ZwkonYF3NbkBXRkx_fb60f7a9773bc2ef0e1749f502bbaabb.png?auto=format,compress&w=900"
								alt="Sharath Basavaraju, Founder and Principal Teacher of Athayog Living"
								loading="lazy"
							/>
						</div>
					</Reveal>
					<Reveal>
						<div>
							<span className="eyebrow">The Founder</span>
							<h2 style={{ marginTop: 8 }}>Sharath Basavaraju</h2>
							<p
								style={{
									margin: "12px 0",
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								Even as an idea still taking shape, Athayog&apos;s purpose
								was clear: the faith in Yog had to be restored. As a young
								teenager, Sharath was intrigued by his grandfather&apos;s
								sadhana — finding inspiration in his discipline and
								perseverance, traits he would come to embody himself.
							</p>
							<p
								style={{
									margin: "0 0 12px",
									color: "var(--brand-deep)",
									fontSize: "1.05rem",
								}}
							>
								His initiation into the world of Yog came through the
								teachings of{" "}
								<strong>
									Swami Satyananda Saraswati at the Bihar School of Yoga
								</strong>
								, followed by a formal yogic education at the{" "}
								<strong>
									Swami Vivekananda Yoga Anusandhana Samsthana (SVYASA)
								</strong>
								. With the blessings of his gurus, his practice evolved
								into a way of being. His intent: to share these learnings
								and guide people toward transformation through consistent,
								directed and self-motivated effort.
							</p>
							<ul className={styles.authList}>
								<li>
									<span className={styles.authKey}>Role</span>
									<span>
										Founder &amp; Principal Teacher, Athayog Living
									</span>
								</li>
								<li>
									<span className={styles.authKey}>Lineage</span>
									<span>
										Teachings of Swami Satyananda Saraswati · Bihar
										School of Yoga
									</span>
								</li>
								<li>
									<span className={styles.authKey}>
										Formal education
									</span>
									<span>
										Swami Vivekananda Yoga Anusandhana Samsthana
										(SVYASA)
									</span>
								</li>
								<li>
									<span className={styles.authKey}>Community</span>
									<span>
										60+ certified teachers &amp; 850+ Athayogis guided
									</span>
								</li>
								<li>
									<span className={styles.authKey}>Events led</span>
									<span>
										Yoga Arambha 2025 &amp; 2026 · International Day
										of Yoga · with Chief Guest Shri Tejasvi Surya
									</span>
								</li>
							</ul>
							<blockquote className={styles.quote}>
								&quot;To be a good teacher, you first have to be a good
								student.&quot;
							</blockquote>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 7. Lineage */}
			<section id="lineage" className="band">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Lineage &amp; recognition</span>
							<h2>Grounded in tradition, recognized worldwide</h2>
							<p className="lead" style={{ color: "#DCE2CE" }}>
								Our teaching draws from two of India&apos;s most respected
								yogic institutions — and carries credentials recognized
								across the globe.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.lineage}>
							<div className={styles.lin}>
								<h3>Bihar School of Yoga</h3>
								<p>
									Founder&apos;s initiation through the teachings of
									Swami Satyananda Saraswati.
								</p>
							</div>
							<div className={styles.lin}>
								<h3>SVYASA</h3>
								<p>
									Formal yogic education from Swami Vivekananda Yoga
									Anusandhana Samsthana, Bengaluru.
								</p>
							</div>
							<div className={styles.lin}>
								<h3>Yoga Alliance (USA)</h3>
								<p>
									RYS-accredited — graduates are eligible to register as
									RYT-200, recognized worldwide.
								</p>
							</div>
							<div className={styles.lin}>
								<h3>Ministry of AYUSH</h3>
								<p>
									Recognized under the Government of India&apos;s
									Ministry of AYUSH.
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 8. Team */}
			<section id="team">
				<div className="wrap split">
					<Reveal>
						<div className="split-media">
							<img
								src="https://images.prismic.io/athayog/ZwkoDIF3NbkBXRga_2af795c9168f022b9c7d0a917fd08e4f.jpg?auto=format,compress&w=1000"
								alt="The Athayog Living teaching team"
								loading="lazy"
							/>
						</div>
					</Reveal>
					<Reveal>
						<div>
							<span className="eyebrow">Meet our team</span>
							<h2 style={{ marginTop: 8 }}>
								Journeys stitched together by Yog
							</h2>
							<p>
								Our team is a diverse group of young, energetic and
								dynamic individuals — our journeys interwoven on the quest
								for true yogic knowledge. A mutual faith in the
								institution of Yog guides us onto the path of truth and
								illuminates the way ahead.
							</p>
							<p>
								When you register with us, we offer a free consultation
								and lifestyle guidance to help you attain higher living —
								empowering you to progress and, in time, to practise on
								your own.
							</p>
							<a href="/trial-classes" className="btn btn-ghost">
								Practise With Us
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 9. Testimonials */}
			<section id="reviews" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Heartfelt testimonials</span>
							<h2>The community we&apos;ve built</h2>
						</div>
					</Reveal>
					<div className={styles.vidGrid}>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=Pmvr_kFDcTA"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch testimonial"
							>
								<img
									src="https://img.youtube.com/vi/Pmvr_kFDcTA/hqdefault.jpg"
									alt="Athayog member testimonial video"
									loading="lazy"
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
								aria-label="Watch testimonial"
							>
								<img
									src="https://img.youtube.com/vi/LDcffOBJ9ZU/hqdefault.jpg"
									alt="Athayog member testimonial video"
									loading="lazy"
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
						</Reveal>
						<Reveal>
							<a
								className={styles.vid}
								href="https://www.youtube.com/watch?v=CrCdzkiJ46E"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Watch testimonial"
							>
								<img
									src="https://img.youtube.com/vi/CrCdzkiJ46E/hqdefault.jpg"
									alt="Athayog member testimonial video"
									loading="lazy"
								/>
								<span className={styles.play}>{PLAY_SVG}</span>
							</a>
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

			{/* 10. What We Offer */}
			<section id="offer">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">What we offer</span>
							<h2>Ways to practise with Athayog</h2>
						</div>
					</Reveal>
					<div className={styles.exGrid}>
						{/* TODO: wire up each route after page is built */}
						<Reveal>
							<a className={styles.ex} href="/group-classes-indiranagar">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Group Classes</h3>
								<p>Small-batch classes from ₹599 drop-in.</p>
							</a>
						</Reveal>
						<Reveal>
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
								<p>Holistic 3-month transformation.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/yoga-teacher-training">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Yoga Teacher Training</h3>
								<p>RYT-200 certification from ₹24,999.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/workshops">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Workshops</h3>
								<p>Focused deep-dive sessions.</p>
							</a>
						</Reveal>
						<Reveal>
							<a className={styles.ex} href="/trial-classes">
								<div className={styles.exArrow}>
									<ArrowRight size={18} />
								</div>
								<h3>Free Trial Class</h3>
								<p>Experience Athayog before you begin.</p>
							</a>
						</Reveal>
					</div>
				</div>
			</section>

			{/* 11. Location */}
			<section id="location" style={{ background: "var(--parchment)" }}>
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Visit us</span>
							<h2>Our home in Indiranagar</h2>
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
									A second branch in Jayanagar serves South Bengaluru.
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

			{/* 12. FAQ */}
			<section id="faq">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">About us</span>
							<h2>Frequently asked questions</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.faq}>
							<details open>
								<summary>
									Who founded Athayog Living?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Athayog Living was founded by Sharath Basavaraju, its
									Principal Teacher. Inspired as a teenager by his
									grandfather&apos;s sadhana, he was initiated into Yog
									through the teachings of Swami Satyananda Saraswati at
									the Bihar School of Yoga, and holds a formal yogic
									education from SVYASA.
								</div>
							</details>
							<details>
								<summary>
									What makes Athayog&apos;s yoga authentic?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Our teaching is rooted in genuine lineage — the Bihar
									School of Yoga and SVYASA — and stays true to the
									philosophy and practice of traditional Yog, rather
									than a purely fitness-led approach. We&apos;re also
									recognized by Yoga Alliance (USA) and AYUSH.
								</div>
							</details>
							<details>
								<summary>
									What does Athayog Living offer?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Group classes, one-on-one personal training, a 3-month
									weight-loss program, RYT-200 yoga teacher training,
									and workshops — across our Indiranagar and Jayanagar
									studios.
								</div>
							</details>
							<details>
								<summary>
									Where is Athayog Living located?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Our flagship studio is in Indiranagar, HAL 2nd Stage
									(12th Main), Bengaluru 560038, with a second branch in
									Jayanagar.
								</div>
							</details>
							<details>
								<summary>
									Is Athayog Living certified?
									<span className={styles.faqIcon}>+</span>
								</summary>
								<div className={styles.faqAnswer}>
									Yes. Athayog is recognized by Yoga Alliance (USA) as a
									Registered Yoga School, is affiliated with SVYASA, and
									is recognized under the Ministry of AYUSH, Government
									of India.
								</div>
							</details>
						</div>
					</Reveal>
				</div>
			</section>

			{/* 13. Final CTA */}
			<section id="enrol" className="final">
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Begin</span>
					</Reveal>
					<Reveal>
						<h2>Step onto the path toward higher living.</h2>
					</Reveal>
					<Reveal>
						<p>
							Whether you&apos;re here for a first class or a teaching
							career, your journey with Athayog begins with a single step.
							Book a free trial and experience it for yourself.
						</p>
					</Reveal>
					<Reveal>
						<div className="final-cta">
							<a href="/trial-classes" className="btn btn-cream">
								Book a Free Trial
							</a>
							<a href="/contact-us" className="btn btn-light">
								Contact Us
							</a>
							<a
								href="https://wa.me/918690333111"
								className="btn btn-light"
							>
								WhatsApp Us
							</a>
						</div>
					</Reveal>
					<p className="micro" style={{ marginTop: 22 }}>
						A Sanctum For The Spirit · Indiranagar &amp; Jayanagar, Bengaluru
					</p>
				</div>
			</section>

			{/* 14. Sticky mobile CTA */}
			<div className={styles.stickyCta}>
				<span className={styles.stickyMeta}>Who we are · Athayog Living</span>
				<a href="/trial-classes" className="btn btn-cream">
					Free Trial
				</a>
			</div>
		</>
	);
}
