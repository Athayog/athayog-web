"use client";

import {
	User,
	Network,
	Briefcase,
	TrendingUp,
	Brain,
	Heart,
	GraduationCap,
	RotateCcw,
	Sun,
	Moon,
	Clock,
	Users,
} from "lucide-react";
import YogaProgramHeroSection from "@/components/landing/YogaProgramHeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import ImageFeatureSection from "@/components/landing/ImageFeatureSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import TestimonialCTASection from "@/components/landing/TestimonialCTASection";
import FAQCTASection from "@/components/landing/FAQCTASection";

export default function NonResidentialYogaPage() {
	return (
		<main>
			<YogaProgramHeroSection
				title="Non-Residential Yoga Program in Bangalore"
				description="A structured non-residential yoga program designed for working professionals and serious practitioners who want discipline, continuity, and real progress without residential stay."
				features={[
					"Structured curriculum",
					"Morning & evening batches",
					"Guided asana, pranayama & meditation",
					"Limited batch intake for focused learning",
				]}
				ctaButtonText="Check Program Fit & Availability"
				backgroundImage="/images/landing/certification.jpg"
				ctaButtonHref="/contact-us"
				formKey="ryt200_non_residential"
				submitButtonText="Send Enquiry"
				submittingButtonText="Sending..."
				formSubmitUrl="/api/submit-form"
				namePlaceholder="Your name"
				emailPlaceholder="Your email"
				phonePlaceholder="Your phone number"
				messagePlaceholder="Tell us about your goals"
				successMessage="Thank you! We'll get back to you shortly."
				errorMessage="Something went wrong. Please try again."
			/>

			<FeatureSection
				title="What Is a Non-Residential Yoga Program?"
				description="A non-residential yoga program allows you to follow a structured and disciplined yoga practice without staying at the center."
				features={[
					{
						icon: <User size={24} />,
						title: "Attend guided sessions at the studio",
					},
					{
						icon: <Network size={24} />,
						title: "Follow a fixed learning structure",
					},
					{
						icon: <Briefcase size={24} />,
						title: "Maintain your professional and personal life",
					},
					{
						icon: <TrendingUp size={24} />,
						title: "Build consistency without relocation",
					},
				]}
			/>

			<NumberedListSection
				title="How the Program Works"
				subtitle="The training follows a clear, guided flow to ensure steady learning, proper support, and realistic integration with daily life."
				variant="minimal"
				items={[
					{
						id: "1",
						text: "Initial consultation to understand your goals, experience level, and availability",
					},
					{
						id: "2",
						text: "Batch allocation into morning or evening sessions based on suitability",
					},
					{
						id: "3",
						text: "Guided asana practice with emphasis on alignment, stability, and gradual strength building",
					},
					{
						id: "4",
						text: "Pranayama and breath awareness to support regulation, balance, and inner steadiness",
					},
					{
						id: "5",
						text: "Meditation and relaxation practices to develop focus, calm, and mental clarity",
					},
					{
						id: "6",
						text: "Progressive learning through a structured and continuous training approach",
					},
				]}
			/>

			<ImageFeatureSection
				title="Batch Timings Designed Around Work Life"
				description="The program schedule is structured to support consistency without disrupting professional responsibilities."
				image="/images/landing/feedback.jpg"
				imageAlt="Online yoga class with instructor guiding students"
				features={[
					{
						icon: <Sun size={20} />,
						text: "Morning batches for early-day clarity and sustained energy",
					},
					{
						icon: <Moon size={20} />,
						text: "Evening batches to release stress and unwind after work",
					},
					{
						icon: <Clock size={20} />,
						text: "Fixed timings to build discipline and regularity",
					},
					{
						icon: <Users size={20} />,
						text: "Small batch sizes for focused guidance and interaction",
					},
				]}
				ctaText="Check Available Batches"
				ctaHref="/contact-us"
			/>

			<ComparisonSection
				mainTitle="Why This Is Not a Regular Yoga Class"
				subtitle="This program focuses on commitment and outcomes."
				leftColumn={{
					title: "Regular Yoga Classes",
					items: [
						{ id: "1", text: "Drop-in format" },
						{ id: "2", text: "No learning structure" },
						{ id: "3", text: "Inconsistent attendance" },
						{ id: "4", text: "Limited progression" },
					],
				}}
				rightColumn={{
					title: "AthaYog Non-Residential Program",
					items: [
						{ id: "1", text: "Structured curriculum" },
						{ id: "2", text: "Guided learning path" },
						{ id: "3", text: "Consistent batch schedule" },
						{ id: "4", text: "Long-term physical and mental benefits" },
					],
				}}
			/>

			<FeatureSection
				title="Who Typically Chooses This Program"
				features={[
					{
						icon: <Briefcase size={24} />,
						title: "Working professionals managing stress and burnout",
					},
					{
						icon: <Brain size={24} />,
						title: "Entrepreneurs seeking mental clarity",
					},
					{
						icon: <RotateCcw size={24} />,
						title: "Individuals restarting yoga after a long break",
					},
					{
						icon: <GraduationCap size={24} />,
						title: "Beginners who want to learn yoga properly",
					},
					{ icon: <Heart size={24} />, title: "Long-term wellness seekers" },
				]}
			/>

			<SplitContentSection
				title="Program Duration, Commitment & Investment"
				titleImage="/images/landing/anatomy.jpg"
				titleImageAlt="Peaceful yoga studio"
				items={[
					{ id: "1", text: "Multiple duration options available" },
					{ id: "2", text: "Monthly and long-term plans" },
					{ id: "3", text: "Fees depend on batch and commitment period" },
					{
						id: "4",
						text: "Orientation or trial discussion before enrollment",
					},
				]}
			/>

			<TestimonialCTASection
				ctaButtonText="Get Program Details & Fee Structure"
				ctaButtonHref="/contact-us"
				sectionTitle="What Participants Share"
				testimonials={[
					{
						id: "1",
						text: "This structure finally helped me stay consistent alongside work.",
					},
					{
						id: "2",
						text: "It's not a casual class; the discipline changed my routine.",
					},
					{
						id: "3",
						text: "I wanted serious yoga without staying residential. This worked perfectly.",
					},
				]}
				finalText="Real people. Real routines. Real progress."
			/>

			<FAQCTASection
				sectionTitle="Frequently Asked Questions"
				subtext="Build a Consistent Yoga Practice Without Disrupting Your Life"
				primaryCtaText="Check Program Fit & Speak to a Yoga Advisor"
				secondaryCtaText="WhatsApp Us for initial guidance"
				faqs={[
					{
						id: "1",
						question: "Is accommodation included?",
						answer: "No. This is a non-residential yoga program. Participants attend sessions and return home.",
					},
					{
						id: "2",
						question: "Can beginners join?",
						answer: "Yes. Beginners are guided step by step with a strong focus on building proper foundations.",
					},
					{
						id: "3",
						question: "What if I miss a session?",
						answer: "Guidance is provided to help maintain continuity wherever possible.",
					},
					{
						id: "4",
						question: "Is this suitable for working professionals?",
						answer: "Yes. The program is specifically designed around working schedules.",
					},
					{
						id: "5",
						question: "How long should I commit?",
						answer: "Consistency matters. Our team will help you choose a suitable duration based on your goals and availability.",
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
