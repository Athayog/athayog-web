"use client";

import {
	MapPin,
	Users,
	Clock,
	GraduationCap,
	Activity,
	Briefcase,
	Brain,
	PersonStanding,
	Heart,
	Play,
	CalendarDays,
	Sun,
	ThumbsUp,
} from "lucide-react";
import YogaProgramHeroSection from "@/components/landing/YogaProgramHeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import ClassOverviewSection from "@/components/landing/ClassOverviewSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import ImageFeatureSection from "@/components/landing/ImageFeatureSection";
import TestimonialCTASection from "@/components/landing/TestimonialCTASection";
import FAQCTASection from "@/components/landing/FAQCTASection";

export default function GroupClassesIndiranagarPage() {
	return (
		<main>
			<YogaProgramHeroSection
				title="Group Yoga Classes in Indiranagar & Nearby"
				description="Join instructor-led group yoga classes in Indiranagar designed for consistency, correct practice, and long-term wellness."
				features={[
					"Small batch group classes",
					"Morning & evening timings",
					"Beginner-friendly structure",
					"Centrally located in Indiranagar, Bangalore",
				]}
				ctaButtonText="Book a Trial Class"
				submitButtonText="Send Enquiry"
				submittingButtonText="Sending…"
				formSubmitUrl="/api/submit-form"
				namePlaceholder="Your name"
				emailPlaceholder="you@example.com"
				phonePlaceholder="Phone number"
				messagePlaceholder="Any questions or requirements?"
				successMessage="Thank you! We'll get back to you shortly."
				errorMessage="Something went wrong. Please try again."
				backgroundImage="/images/landing/anatomy.jpg"
				ctaButtonHref="/contact-us"
				formKey="group_classes_indiranagar"
			/>
			<FeatureSection
				title="Are These Group Yoga Classes Right for You?"
				description="These group classes are well suited for individuals looking to build a steady, guided yoga practice as part of their daily routine."
				features={[
					{ icon: <MapPin />, title: "Live or work near Indiranagar" },
					{
						icon: <Users />,
						title: "Want instructor-led group yoga sessions",
					},
					{
						icon: <Clock />,
						title: "Prefer fixed, routine-building timings",
					},
					{
						icon: <GraduationCap />,
						title: "Are a beginner or restarting yoga",
					},
					{
						icon: <Activity />,
						title: "Seek flexibility, stress relief, and daily movement",
					},
				]}
			/>
			<ClassOverviewSection
				mainTitle="Why Choose Group Yoga Classes in Indiranagar at AthaYog Living"
				highlights={[
					"Near Indiranagar",
					"Structured yoga",
					"Small batches",
					"Clean, focused studio",
				]}
				sections={[
					{
						title: "What to Expect in Our Group Yoga Classes",
						subtitle: "A Typical Class Includes:",
						items: [
							{ id: "1", text: "Gentle warm-up and mobility" },
							{
								id: "2",
								text: "Guided asana practice (based on batch level)",
							},
							{ id: "3", text: "Pranayama and breath awareness" },
							{ id: "4", text: "Relaxation or short meditation" },
							{ id: "5", text: "Cool-down and closing guidance" },
						],
					},
					{
						title: "Morning & Evening Yoga Batches Available",
						subtitle:
							"We offer flexible batch timings to fit real-life schedules.",
						items: [
							{
								id: "1",
								text: "Morning yoga classes for energy and focus",
							},
							{
								id: "2",
								text: "Evening yoga classes for stress relief after work",
							},
							{ id: "3", text: "Fixed schedules to build consistency" },
							{
								id: "4",
								text: "Limited participants per batch for quality attention",
							},
						],
						note: "Batch availability changes, so booking is recommended.",
					},
				]}
				ctaText="Check Today's Available Batches"
				ctaHref="/contact-us"
			/>
			<ComparisonSection
				mainTitle="How Our Group Yoga Classes Are Different"
				leftColumn={{
					title: "Typical Group Yoga Classes",
					items: [
						{ id: "1", text: "Overcrowded rooms" },
						{ id: "2", text: "One routine for everyone" },
						{ id: "3", text: "Limited instructor attention" },
					],
				}}
				rightColumn={{
					title: "AthaYog Group Yoga Classes",
					items: [
						{ id: "1", text: "Small, focused batches" },
						{ id: "2", text: "Instructor-led corrections" },
						{ id: "3", text: "Structured progression" },
						{ id: "4", text: "Calm, distraction-free environment" },
					],
				}}
			/>
			<ImageFeatureSection
				title="Who Commonly Joins Our Indiranagar Group Classes"
				description="Our group classes are designed for everyday practitioners looking to build consistency, balance, and wellbeing."
				image="/images/mental-health/wellbeing.png"
				imageAlt="Group yoga class at AthaYog Living studio in Indiranagar"
				features={[
					{
						icon: <Briefcase />,
						text: "Working professionals managing long hours",
					},
					{
						icon: <GraduationCap />,
						text: "Beginners starting yoga for the first time",
					},
					{
						icon: <Brain />,
						text: "Individuals dealing with stress or stiffness",
					},
					{
						icon: <PersonStanding />,
						text: "People looking for daily movement and balance",
					},
					{ icon: <Heart />, text: "Long-term wellness seekers" },
				]}
			/>
			<FeatureSection
				title="Flexible Membership Options"
				description="Our group yoga programs are designed to be simple and transparent."
				features={[
					{ icon: <Play />, title: "Trial class before commitment" },
					{
						icon: <CalendarDays />,
						title: "Monthly and long-term plans available",
					},
					{
						icon: <Sun />,
						title: "Morning and evening batch options",
					},
					{
						icon: <ThumbsUp />,
						title: "No pressure to continue if it's not the right fit",
					},
				]}
			/>
			<TestimonialCTASection
				ctaButtonText="Get Trial & Fee Details"
				ctaButtonHref="/contact-us"
				sectionTitle="What Our Members Say"
				testimonials={[
					{
						id: "1",
						text: "The small batch size made it easy to stay consistent.",
					},
					{
						id: "2",
						text: "Great option for beginners who want proper guidance.",
					},
					{
						id: "3",
						text: "Convenient location and calm environment, easy to continue.",
					},
				]}
				finalText="Real local experiences. No exaggerated promises."
			/>
			<FAQCTASection
				sectionTitle="Frequently Asked Questions"
				subtext="Start Your Yoga Practice Near Indiranagar. Without Overthinking It"
				primaryCtaText="Book a Trial Class"
				secondaryCtaText="Call / WhatsApp Us for batch timings and directions"
				faqs={[
					{
						id: "1",
						question: "Are these group yoga classes suitable for beginners?",
						answer: "Yes. Beginners are guided carefully with clear instructions and proper demonstrations.",
					},
					{
						id: "2",
						question: "Can I attend a trial class?",
						answer: "Yes. A trial class is available for a nominal fee. If you purchase a subscription within 48 hours, the trial fee will be adjusted against your subscription.",
					},
					{
						id: "3",
						question: "How big are the batches?",
						answer: "Batch sizes are kept limited to ensure adequate instructor attention for each participant.",
					},
					{
						id: "4",
						question: "What if I miss a class?",
						answer: "Our team will guide you on how to maintain continuity wherever possible.",
					},
					{
						id: "5",
						question: "Is the studio close to Indiranagar's main areas?",
						answer: "Yes. The studio is centrally located in Indiranagar and is easily accessible.",
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
