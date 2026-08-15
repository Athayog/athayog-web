"use client";

import {
	TrendingUp,
	Heart,
	User,
	Clock,
	Ruler,
	Brain,
	Target,
	Eye,
	CalendarDays,
	Settings,
	Layers,
	MessageCircle,
} from "lucide-react";
import YogaProgramHeroSection from "@/components/landing/YogaProgramHeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import ImageFeatureSection from "@/components/landing/ImageFeatureSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import BentoGridSection from "@/components/landing/BentoGridSection";
import OptionsShowcaseSection from "@/components/landing/OptionsShowcaseSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import TestimonialCTASection from "@/components/landing/TestimonialCTASection";
import FAQCTASection from "@/components/landing/FAQCTASection";

export default function PersonalYogaTrainingIndiranagarPage() {
	return (
		<main>
			<YogaProgramHeroSection
				title="Personal Yoga Sessions in Bangalore"
				description="Experience fully personalized yoga sessions designed around your body, health goals, schedule, and limitations delivered through focused one-on-one guidance."
				features={[
					"100% personalized programs",
					"Dedicated yoga trainer",
					"Studio or home-based sessions",
					"Goal-oriented & safety-focused",
				]}
				ctaButtonText="Book a Personal Consultation"
				submitButtonText="Send Enquiry"
				submittingButtonText="Sending…"
				formSubmitUrl="/api/submit-form"
				namePlaceholder="Your name"
				emailPlaceholder="you@example.com"
				phonePlaceholder="Phone number"
				messagePlaceholder="Tell us about your goals or concerns"
				successMessage="Thank you! We'll get back to you shortly."
				errorMessage="Something went wrong. Please try again."
				backgroundImage="/images/landing-page-hero-2.jpg"
				ctaButtonHref="/contact-us"
				formKey="personal_training_indiranagar"
			/>
			<FeatureSection
				title="Is Personal Yoga the Right Choice for You?"
				description="Personal yoga sessions are ideal if you are looking for focused guidance tailored to your body, goals, and schedule."
				features={[
					{
						icon: <TrendingUp />,
						title: "Want faster and more focused results",
					},
					{
						icon: <Heart />,
						title: "Have specific concerns like back pain, stress, weight, or stiffness",
					},
					{
						icon: <User />,
						title: "Prefer individual attention and privacy",
					},
					{
						icon: <Clock />,
						title: "Need flexible scheduling around work or family",
					},
					{
						icon: <Ruler />,
						title: "Want proper alignment, correction, and progress tracking",
					},
				]}
			/>
			<ImageFeatureSection
				title="What Are Personal Yoga Sessions?"
				description="Personal yoga sessions are one-on-one classes where every aspect of the practice, from posture selection to pace, intensity and progression, is customized to your needs."
				image="/images/mental-health/2.png"
				imageAlt="One-on-one yoga session with instructor guiding a student"
				features={[
					{
						icon: <User />,
						text: "A dedicated yoga trainer focused entirely on you",
					},
					{
						icon: <Target />,
						text: "Programs designed around your personal goals and concerns",
					},
					{
						icon: <Eye />,
						text: "Continuous observation and real-time correction",
					},
					{
						icon: <TrendingUp />,
						text: "Safe, progressive improvement with guided tracking",
					},
				]}
			/>
			<NumberedListSection
				title="How Your Personal Yoga Program Is Designed"
				variant="bold"
				subtitle="Each personal yoga program follows a structured, step-by-step approach to ensure safety, clarity, and steady progress."
				items={[
					{
						id: "1",
						text: "Initial consultation and assessment to understand your body, lifestyle, and current condition",
					},
					{
						id: "2",
						text: "Goal mapping based on your needs such as health concerns, stress management, or fitness objectives",
					},
					{
						id: "3",
						text: "Customized program design tailored to your goals, capacity, and pace",
					},
					{
						id: "4",
						text: "Guided one-on-one sessions with continuous instruction and correction",
					},
					{
						id: "5",
						text: "Ongoing progress review and adjustments as your practice evolves",
					},
				]}
			/>
			<BentoGridSection
				autoLayout={false}
				cards={[
					{
						id: "title",
						type: "title",
						title: "Personal Yoga for Specific Needs",
					},
					{
						id: "pain",
						type: "icon",
						icon: <Heart />,
						text: "Back & neck pain management through safe, corrective practice",
					},
					{
						id: "stress",
						type: "icon",
						icon: <Brain />,
						text: "Stress, anxiety, and burnout support through breath and mindful movement",
					},
					{
						id: "weight",
						type: "text-image-side",
						text: "Weight management with balanced, sustainable yoga routines",
						image: "/images/mental-health/1.png",
						imageAlt: "Yoga practice for strength and balance",
						imagePosition: "left",
					},
					{
						id: "beginners",
						type: "text",
						text: "Beginner-friendly guidance with strong foundational learning",
					},
					{
						id: "posture",
						type: "icon",
						icon: <Ruler />,
						text: "Lifestyle and postural correction through daily habit awareness",
					},
					{
						id: "progress",
						type: "text",
						text: "Programs adapt as your body and capacity change over time",
					},
				]}
			/>
			<OptionsShowcaseSection
				mainTitle="Studio-Based or Home-Based Personal Yoga"
				options={[
					{
						title: "Studio-Based Personal Yoga",
						items: [
							{ id: "1", text: "Controlled, distraction-free environment" },
							{ id: "2", text: "Full access to props and space" },
						],
					},
					{
						title: "Home-Based Personal Yoga",
						items: [
							{ id: "1", text: "Comfort and privacy of your home" },
							{ id: "2", text: "Flexible scheduling" },
						],
					},
					{
						title: "Hybrid Option",
						items: [
							{ id: "1", text: "Combination of studio and home sessions" },
						],
					},
				]}
			/>
			<ComparisonSection
				mainTitle="Why Personal Yoga Delivers Faster Results Than Group Classes"
				leftColumn={{
					title: "Group Yoga Classes",
					items: [
						{ id: "1", text: "Shared attention" },
						{ id: "2", text: "Fixed pace" },
						{ id: "3", text: "General routine" },
						{ id: "4", text: "Limited corrections" },
						{ id: "5", text: "Slower progress" },
					],
				}}
				rightColumn={{
					title: "Personal Yoga Sessions",
					items: [
						{ id: "1", text: "100% trainer focus" },
						{ id: "2", text: "Your pace" },
						{ id: "3", text: "Customized program" },
						{ id: "4", text: "Detailed alignment" },
						{ id: "5", text: "Faster, safer outcomes" },
					],
				}}
			/>
			<SplitContentSection
				title="Guided by Experienced Yoga Professionals"
				titleImage="/images/Who_Chooses.png"
				titleImageAlt="Peaceful yoga studio"
				items={[
					{ id: "1", text: "Alignment and injury prevention" },
					{ id: "2", text: "Respecting physical limitations" },
					{ id: "3", text: "Progressive, sustainable practice" },
					{ id: "4", text: "Long-term health" },
				]}
			/>
			<FeatureSection
				title="Program Investment & Commitment"
				features={[
					{
						icon: <CalendarDays />,
						title: "Session-based and monthly options available",
					},
					{
						icon: <Settings />,
						title: "Pricing depends on frequency, format, and goals",
					},
					{ icon: <Layers />, title: "No one-size-fits-all packages" },
					{
						icon: <MessageCircle />,
						title: "Consultation before commitment",
					},
				]}
			/>
			<TestimonialCTASection
				ctaButtonText="Get a Personalized Plan & Fee Structure"
				ctaButtonHref="/contact-us"
				sectionTitle="What Clients Experience"
				testimonials={[
					{
						id: "1",
						text: "The one-on-one attention made a huge difference to my posture and pain.",
					},
					{
						id: "2",
						text: "This is the first time yoga felt truly designed for my body.",
					},
					{
						id: "3",
						text: "Consistency became easy when the program was built around my schedule.",
					},
				]}
				finalText="Real experiences. Calm progress. Sustainable change."
			/>
			<FAQCTASection
				sectionTitle="Frequently Asked Questions"
				subtext="A Yoga Program Designed Entirely Around You"
				primaryCtaText="Book a Personal Consultation"
				secondaryCtaText="Or WhatsApp Us for initial guidance"
				faqs={[
					{
						id: "1",
						question: "Is personal yoga suitable for beginners?",
						answer: "Yes. Beginners often benefit the most from one-on-one guidance and individualized attention.",
					},
					{
						id: "2",
						question: "How often should personal yoga sessions be?",
						answer: "Frequency depends on your goals, availability, and physical condition. Your trainer will guide you on what's appropriate.",
					},
					{
						id: "3",
						question: "Is home-based yoga as effective as studio sessions?",
						answer: "Both can be effective when guided properly. Your trainer will advise what works best for you.",
					},
					{
						id: "4",
						question:
							"Is personal yoga safe for injuries or physical limitations?",
						answer: "Yes. Sessions are carefully adapted based on your condition, limitations, and comfort level.",
					},
					{
						id: "5",
						question: "How soon will I see results?",
						answer: "Most clients notice improvements in mobility, comfort, or mental clarity within a few weeks of consistent practice.",
					},
				]}
				onPrimaryCtaClick={() => {
					window.open("tel:+919611771434", "_self");
				}}
				onSecondaryCtaClick={() => {
					window.open("https://wa.me/+919611771434", "_blank");
				}}
			/>
		</main>
	);
}
