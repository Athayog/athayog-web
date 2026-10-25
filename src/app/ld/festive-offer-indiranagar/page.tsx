import { CalendarCheck, Gift, HeartPulse, Wind } from "lucide-react";
import Reveal from "@/components/Reveal";
import FestiveOfferForm from "@/app/ld/festive-offer-indiranagar/FestiveOfferForm";
import PageJsonLd from "@/app/ld/festive-offer-indiranagar/PageJsonLd";
import styles from "@/app/ld/festive-offer-indiranagar/FestiveOffer.module.css";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20to%20claim%20the%20Dussehra%20%26%20Diwali%20yoga%20offer%20at%20Athayog%20Living.";

const STRIP = [
	{ strong: "Save up to 19%", rest: "" },
	{ strong: "25 limited slots", rest: "at this price" },
	{ strong: "", rest: "3, 6 & 12-month plans" },
	{ strong: "", rest: "Indiranagar, Bengaluru" },
];

const PLANS = [
	{
		term: "3-Month",
		mrp: "₹10,499",
		now: "₹9,449",
		save: "Save ₹1,050",
		per: "about ₹3,150 a month",
		featured: false,
	},
	{
		term: "6-Month",
		mrp: "₹16,799",
		now: "₹13,999",
		save: "Save ₹2,800",
		per: "about ₹2,333 a month",
		featured: true,
	},
	{
		term: "12-Month",
		mrp: "₹27,299",
		now: "₹21,999",
		save: "Save ₹5,300 · best value",
		per: "about ₹1,833 a month",
		featured: false,
	},
];

const WHY = [
	{ icon: CalendarCheck, label: "Build consistency" },
	{ icon: HeartPulse, label: "Better health" },
	{ icon: Wind, label: "Stress relief" },
	{ icon: Gift, label: "Festive savings" },
];

const STEPS = [
	{
		title: "Pick your plan",
		body: "Choose 3, 6 or 12 months at the festive price.",
	},
	{
		title: "Reserve your slot",
		body: "Send the form or message us on WhatsApp. Slots at this price are capped at 25.",
	},
	{
		title: "Begin your practice",
		body: "We confirm your batch timing and you start.",
	},
];

const FAQS = [
	{
		q: "How long is the festive offer valid?",
		a: "It is a limited-time festive offer, with only 25 slots available at this price. Once all 25 slots are taken, prices return to regular rates.",
	},
	{
		q: "What does the subscription include?",
		a: "The subscription covers your yoga classes at Athayog Living, Indiranagar, with morning and evening batch options. Our team walks you through the full inclusions when you reach out.",
	},
	{
		q: "Can I gift this to someone?",
		a: "Yes. You can claim the festive price as a gift for a family member or friend. Mention it when you reach out and we will help you set it up.",
	},
	{
		q: "How do I pay?",
		a: "We accept UPI, cards, net banking, EMI and PayPal. Our team shares the payment link once you confirm your plan.",
	},
	{
		q: "Where is the studio?",
		a: "Athayog Living is in Indiranagar, HAL 2nd Stage, Bengaluru 560038, easily reached from Domlur, CV Raman Nagar and Koramangala.",
	},
];

export default function FestiveOfferPage() {
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

				<div className="wrap">
					<div className={styles.heroInner}>
						<span className={styles.festBadge}>
							Dussehra &amp; Diwali Exclusive
						</span>
						<h1>
							This Festive Season, <em>Light Up Your Wellbeing</em>
						</h1>
						<p className={styles.heroSub}>
							Gift yourself, or someone you love, the gift of consistency,
							better health and inner peace. Festive prices on yoga
							subscriptions at Athayog Living, Indiranagar.
						</p>
						<div className={styles.scar}>
							<span className={styles.pulse} aria-hidden="true" />{" "}
							Limited-time offer · 25 limited slots
						</div>
						<div className={styles.heroCta}>
							<a href="#plans" className={`btn ${styles.goldBtn}`}>
								See Festive Offers
							</a>
							<a
								href={WHATSAPP_HREF}
								className="btn btn-light"
								target="_blank"
								rel="noopener noreferrer"
							>
								Claim on WhatsApp
							</a>
						</div>
					</div>
				</div>
			</section>

			<div className={styles.strip}>
				<div className="wrap">
					<div className={styles.stripInner}>
						{STRIP.map((item) => (
							<span key={item.strong + item.rest}>
								{item.strong && <b>{item.strong}</b>}
								{item.rest}
							</span>
						))}
					</div>
				</div>
			</div>

			<section id="plans">
				<div className="wrap">
					<Reveal>
						<div className={styles.center}>
							<span className="eyebrow">Festive pricing</span>
							<h2>Dussehra &amp; Diwali subscription offers</h2>
							<p className="lead">
								Lock in the festive price before all 25 slots are taken.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.plans}>
							{PLANS.map((plan) => (
								<div
									key={plan.term}
									className={`${styles.plan} ${
										plan.featured ? styles.planFeat : ""
									}`}
								>
									{plan.featured && (
										<span className={styles.planTag}>
											Most popular
										</span>
									)}
									<span className={styles.planTerm}>{plan.term}</span>
									<div className={styles.planMrp}>{plan.mrp}</div>
									<div className={styles.planNow}>{plan.now}</div>
									<div className={styles.planSave}>{plan.save}</div>
									<div className={styles.planPer}>{plan.per}</div>
									<a
										href="#claim"
										className={`btn ${
											plan.featured ? styles.goldBtn : "btn-ghost"
										}`}
									>
										Claim This Offer
									</a>
								</div>
							))}
						</div>
					</Reveal>
					<Reveal>
						<p className={styles.planNote}>
							Festive prices on yoga subscriptions at Athayog Living,
							Indiranagar. Our team shares full inclusions and applicable
							taxes when you reach out.
						</p>
					</Reveal>
				</div>
			</section>

			<section className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className={styles.center}>
							<span className="eyebrow">Why commit now</span>
							<h2>A healthier festive season, carried into the new year</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.why}>
							{WHY.map(({ icon: Icon, label }) => (
								<div key={label}>
									<div className={styles.whyIc} aria-hidden="true">
										<Icon size={28} />
									</div>
									<h3>{label}</h3>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.center}>
							<span className="eyebrow">Simple to claim</span>
							<h2>Claim your festive price in 3 steps</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className={styles.steps}>
							{STEPS.map((step, i) => (
								<div key={step.title} className={styles.step}>
									<div className={styles.stepNum}>{i + 1}</div>
									<h3>{step.title}</h3>
									<p>{step.body}</p>
								</div>
							))}
						</div>
					</Reveal>
				</div>
			</section>

			<section id="claim" className={styles.parchment}>
				<div className="wrap">
					<Reveal>
						<div className={styles.claim}>
							<FestiveOfferForm />
						</div>
					</Reveal>
				</div>
			</section>

			<section>
				<div className="wrap">
					<Reveal>
						<div className={styles.center}>
							<span className="eyebrow">Good to know</span>
							<h2>Festive offer, answered</h2>
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

			<section className={styles.finalCta}>
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Limited festive offer</span>
						<h2>Light up more than your home this festive season</h2>
						<p>
							Claim your Dussehra and Diwali yoga price before all 25
							festive slots are taken.
						</p>
						<div className={styles.finalBtns}>
							<a href="#claim" className={`btn ${styles.goldBtn}`}>
								Claim My Festive Price
							</a>
							<a
								href={WHATSAPP_HREF}
								className={`btn ${styles.waBtn}`}
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
				<a href="tel:+919611771434" className="btn btn-light">
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
				<a href="#claim" className={`btn ${styles.goldBtn}`}>
					Claim Offer
				</a>
			</div>
		</main>
	);
}
