"use client";

import {
	Frown,
	Ban,
	Clock,
	Sparkles,
	Home,
	Scale,
	RefreshCw,
	Network,
	Sun,
	Moon,
	MessageCircle,
} from "lucide-react";
import YogaProgramHeroSection from "@/components/landing/YogaProgramHeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import ImageFeatureSection from "@/components/landing/ImageFeatureSection";
import BentoGridSection from "@/components/landing/BentoGridSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import IconListSection from "@/components/landing/IconListSection";
import TestimonialCTASection from "@/components/landing/TestimonialCTASection";
import FAQCTASection from "@/components/landing/FAQCTASection";

export default function ResidentialYogaPage() {
	return (
		<main>
			<YogaProgramHeroSection
				title="Residential Yoga Program in Bangalore for Deep, Structured Yogic Living"
				description="An immersive residential yoga program designed for individuals seeking discipline, clarity, and inner transformation through a structured yogic lifestyle."
				features={[
					"Full residential stay",
					"Structured daily routine",
					"Guided asana, pranayama & meditation",
					"Limited intake for depth and focus",
				]}
				ctaButtonText="Check Eligibility & Program Availability"
				backgroundImage="/images/landing/residential.jpg"
				ctaButtonHref="/contact-us"
				formKey="ryt_residential"
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
				title="Who This Residential Yoga Program Is For"
				features={[
					{
						icon: <Frown size={24} />,
						title: "Feel mentally, emotionally, or physically exhausted",
					},
					{
						icon: <Ban size={24} />,
						title: "Want to step away from daily distractions completely",
					},
					{
						icon: <Clock size={24} />,
						title: "Are seeking discipline, silence, and a structured routine",
					},
					{
						icon: <Sparkles size={24} />,
						title: "Are open to guided yogic living",
					},
					{
						icon: <Home size={24} />,
						title: "Can commit to staying residential for the program duration",
					},
				]}
			/>

			<ImageFeatureSection
				title="What Is a Residential Yoga Program at AthaYog Living?"
				description="A residential yoga program at AthaYog Living is a full-time, immersive yogic experience where participants live on campus and follow a structured daily routine guided by experienced instructors."
				image="/images/landing/residential-yoga.jpg"
				imageAlt="Group of people practicing yoga in a peaceful studio"
				features={[
					{
						icon: <Scale size={20} />,
						text: "Yogic discipline over convenience",
					},
					{
						icon: <RefreshCw size={20} />,
						text: "Consistency over flexibility",
					},
					{
						icon: <Network size={20} />,
						text: "Lifestyle integration over isolated sessions",
					},
				]}
			/>

			<BentoGridSection
				autoLayout={false}
				cards={[
					{
						id: "title",
						type: "title",
						title: "A Typical Day in the Residential Program",
					},
					{
						id: "morning",
						type: "icon",
						icon: <Sun size={24} />,
						text: "Morning asana and pranayama practice",
					},
					{
						id: "silence",
						type: "text-image-side",
						text: "Periods of silence and reflection",
						image: "/images/landing/pranayama.jpg",
						imageAlt: "Pranayama practice",
						imagePosition: "right",
					},
					{
						id: "learning",
						type: "text-image-side",
						text: "Guided learning and practice sessions",
						image: "/images/landing/meditation.jpg",
						imageAlt: "Guided learning",
						imagePosition: "left",
					},
					{ id: "meals", type: "text", text: "Mindful meals and rest" },
					{
						id: "evening",
						type: "icon",
						icon: <Moon size={24} />,
						text: "Evening practices and relaxation",
					},
					{
						id: "rest",
						type: "text",
						text: "Early rest to support discipline",
					},
				]}
			/>

			<NumberedListSection
				title="Why Residential Practice Creates Deeper Change"
				subtitle="True change requires removal from distractions."
				items={[
					{ id: "1", text: "Detachment from constant stimulation" },
					{ id: "2", text: "Resetting of habits and routines" },
					{ id: "3", text: "Deeper awareness of body and breath" },
					{ id: "4", text: "Mental clarity through disciplined living" },
				]}
			/>

			<SplitContentSection
				title="Who Typically Chooses This Program"
				titleImage="/images/landing/who-chooses.png"
				titleImageAlt="Peaceful yoga studio"
				items={[
					{ id: "1", text: "Burned-out professionals seeking clarity" },
					{ id: "2", text: "Entrepreneurs and founders at transition points" },
					{ id: "3", text: "Individuals facing emotional or lifestyle shifts" },
					{ id: "4", text: "Serious yoga aspirants wanting depth" },
					{ id: "5", text: "People seeking long-term mental balance" },
				]}
			/>

			<IconListSection
				title="Guided, Safe, and Supportive Environment"
				items={[
					{ id: "1", text: "Experienced instructors" },
					{ id: "2", text: "Safe, progressive practice" },
					{ id: "3", text: "Clear daily structure" },
					{ id: "4", text: "Supportive residential environment" },
				]}
			/>

			<FeatureSection
				title="Program Duration & Commitment"
				features={[
					{ icon: <Clock size={24} />, title: "Multiple duration options" },
					{ icon: <Scale size={24} />, title: "Intentional commitment levels" },
					{
						icon: <MessageCircle size={24} />,
						title: "Suitability discussion before enrollment",
					},
					{
						icon: <Ban size={24} />,
						title: "No pressure to join if not aligned",
					},
				]}
			/>

			<TestimonialCTASection
				ctaButtonText="Discuss Program Fit & Duration"
				ctaButtonHref="/contact-us"
				sectionTitle="Participant Experiences"
				testimonials={[
					{
						id: "1",
						text: "The structure brought clarity I hadn't experienced in years.",
					},
					{
						id: "2",
						text: "This was not a retreat. It was a disciplined reset of my lifestyle.",
					},
					{
						id: "3",
						text: "Living the routine changed how I relate to my work and mind.",
					},
				]}
				finalText="Real people. Real commitment. Real inner shifts."
			/>

			<FAQCTASection
				sectionTitle="Frequently Asked Questions"
				subtext="Step Away From Noise. Step Into Structure."
				primaryCtaText="Check Eligibility & Speak to a Program Advisor"
				secondaryCtaText="Or WhatsApp Us for initial guidance"
				faqs={[
					{
						id: "1",
						question: "Is this a retreat or a long-term program?",
						answer: "This is a structured residential yoga program, not a leisure retreat.",
					},
					{
						id: "2",
						question: "Do I need prior yoga experience?",
						answer: "No. Beginners and experienced practitioners are both guided appropriately.",
					},
					{
						id: "3",
						question: "What level of discipline is expected?",
						answer: "Participants are expected to follow the daily routine sincerely.",
					},
					{
						id: "4",
						question: "Is accommodation included?",
						answer: "Yes. This is a fully residential program with stay included.",
					},
					{
						id: "5",
						question: "How do I know if this program is right for me?",
						answer: "Our team will help assess suitability before enrollment.",
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
