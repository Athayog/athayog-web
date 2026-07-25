"use client";

import {
	GraduationCap,
	Tv,
	Clock,
	BadgeCheck,
	Laptop,
	Briefcase,
	Sparkles,
	Globe,
	ShieldCheck,
	MapPinOff,
	Scale,
} from "lucide-react";
import YogaProgramHeroSection from "@/components/landing/YogaProgramHeroSection";
import ImageFeatureSection from "@/components/landing/ImageFeatureSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import LearningAreasSection from "@/components/landing/LearningAreasSection";
import FeatureSection from "@/components/landing/FeatureSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import IconListSection from "@/components/landing/IconListSection";
import TestimonialCTASection from "@/components/landing/TestimonialCTASection";
import FAQCTASection from "@/components/landing/FAQCTASection";

export default function OnlineTTCPage() {
	return (
		<main>
			<YogaProgramHeroSection
				title="Online Yoga Teacher Training Course for Serious Practitioners & Future Teachers"
				description="A structured, live-guided online yoga teacher training (TTC) designed for individuals who want authentic yogic education, real teaching confidence, and credible certification."
				features={[
					"Live interactive classes",
					"Structured curriculum & assessments",
					"Faculty-guided learning",
					"Limited cohort for depth & focus",
				]}
				ctaButtonText="Check Eligibility & Apply"
				backgroundImage="/images/landing-page-hero-10.jpg"
				ctaButtonHref="/contact-us"
				formKey="ttc_online"
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

			<ImageFeatureSection
				title="Is This Online Yoga Teacher Training Right for You?"
				description="This online TTC is suitable if you"
				image="/images/landing-page-hero-11.jpg"
				imageAlt="Group of people practicing yoga in a peaceful studio"
				features={[
					{
						icon: <GraduationCap size={20} />,
						text: "Want to teach yoga professionally or deepen your practice seriously",
					},
					{
						icon: <Tv size={20} />,
						text: "Prefer live, guided learning over self-paced recordings",
					},
					{
						icon: <Clock size={20} />,
						text: "Are willing to commit time, attention, and discipline",
					},
					{
						icon: <BadgeCheck size={20} />,
						text: "Want a credible yoga teacher certification.",
					},
					{
						icon: <Laptop size={20} />,
						text: "Need the flexibility of online learning without losing depth",
					},
				]}
			/>

			<NumberedListSection
				title="What Is an Online Yoga Teacher Training Program?"
				subtitle="An online yoga teacher training course at AthaYog Living is a live, instructor-led educational program that delivers the depth of a traditional TTC through a structured online format."
				items={[
					{ id: "1", text: "Live asana practice & alignment guidance" },
					{ id: "2", text: "Pranayama and breath science" },
					{ id: "3", text: "Meditation fundamentals" },
					{ id: "4", text: "Yoga philosophy & ethics" },
					{ id: "5", text: "Applied anatomy" },
					{ id: "6", text: "Teaching methodology & practice teaching" },
				]}
			/>

			<LearningAreasSection
				title="What You Will Learn in the Online TTC"
				subtitle="Core Learning Areas:"
				layout="grid"
				learningAreas={[
					{
						id: "1",
						title: "Asana Practice & Alignment",
						description:
							"Safe, mindful practice with functional understanding",
						image: "/images/warrior_pose.png",
						imageAlt: "Asana practice and alignment",
					},
					{
						id: "2",
						title: "Pranayama & Breath Awareness",
						description: "Understanding breath regulation and its effects",
						image: "/images/pranayama.png",
						imageAlt: "Pranayama breathing techniques",
					},
					{
						id: "3",
						title: "Meditation & Inner Practices",
						description: "Foundational techniques for focus and clarity",
						image: "/images/Medi.jpg",
						imageAlt: "Meditation and inner practices",
					},
					{
						id: "4",
						title: "Yoga Philosophy & Ethics",
						description: "Classical concepts applied to modern life",
						image: "/images/ethics.jpg",
						imageAlt: "Yoga philosophy study",
					},
					{
						id: "5",
						title: "Applied Anatomy",
						description:
							"Understanding the body for safe teaching (non-medical)",
						image: "/images/anatomy.jpg",
						imageAlt: "Teaching methodology",
					},
					{
						id: "6",
						title: "Teaching Methodology",
						description: "Cueing, sequencing, observation, and correction",
						image: "/images/teaching.jpg",
						imageAlt: "Teaching methodology",
					},
					{
						id: "7",
						title: "Practice Teaching & Feedback",
						description: "Guided teaching practice with faculty input",
						image: "/images/feedback.jpg",
						imageAlt: "Practice teaching and feedback",
					},
				]}
			/>

			<FeatureSection
				title="Who Typically Joins This Online TTC"
				features={[
					{
						icon: <Briefcase size={24} />,
						title: "Working professionals transitioning into teaching",
					},
					{
						icon: <Sparkles size={24} />,
						title: "Dedicated yoga practitioners seeking depth",
					},
					{
						icon: <Globe size={24} />,
						title: "International students needing location-independent learning",
					},
					{
						icon: <ShieldCheck size={24} />,
						title: "Wellness professionals adding yoga credentials",
					},
					{
						icon: <MapPinOff size={24} />,
						title: "Individuals unable to relocate for residential TTC",
					},
				]}
			/>

			<SplitContentSection
				title="Guided by Experienced Teachers"
				titleImage="/images/certification.jpg"
				titleImageAlt="Peaceful yoga studio"
				items={[
					{ id: "1", text: "Safety and alignment" },
					{ id: "2", text: "Traditional principles with modern understanding" },
					{ id: "3", text: "Ethical teaching standards" },
					{ id: "4", text: "Clarity over complexity" },
				]}
			/>

			<ImageFeatureSection
				title="Certification & Professional Outcomes"
				image="/images/teaching.jpg"
				imageAlt="Group of people practicing yoga in a peaceful studio"
				reverseLayout={true}
				features={[
					{
						icon: <BadgeCheck size={20} />,
						text: "Participants receive yoga teacher training certification",
					},
					{
						icon: <GraduationCap size={20} />,
						text: "Guidance is provided on teaching readiness and scope",
					},
					{
						icon: <Scale size={20} />,
						text: "Emphasis is placed on teaching responsibly and ethically",
					},
				]}
			/>

			<IconListSection
				title="Duration, Schedule & Commitment Expectations"
				description="This online yoga teacher training requires:"
				items={[
					{ id: "1", text: "Consistent live attendance" },
					{ id: "2", text: "Weekly study and practice time" },
					{ id: "3", text: "Willingness to engage and participate" },
					{ id: "4", text: "Commitment to learning" },
				]}
			/>

			<TestimonialCTASection
				ctaButtonText="Discuss Eligibility & Schedule Fit"
				ctaButtonHref="/contact-us"
				sectionTitle="What Graduates Share"
				testimonials={[
					{
						id: "1",
						text: "The live format made a huge difference in my understanding.",
					},
					{
						id: "2",
						text: "I finally felt confident explaining and teaching postures.",
					},
					{ id: "3", text: "This felt like real teacher training" },
				]}
				finalText="Honest learning experiences. No exaggeration."
			/>

			<FAQCTASection
				sectionTitle="Frequently Asked Questions"
				subtext="Learn Yoga Deeply. Teach With Integrity. From Anywhere."
				primaryCtaText="Check Eligibility & Apply"
				secondaryCtaText="WhatsApp Us for initial guidance"
				faqs={[
					{
						id: "1",
						question: "Is this yoga teacher training fully online?",
						answer: "Yes. All sessions are conducted online through live, interactive classes.",
					},
					{
						id: "2",
						question: "Is prior yoga experience required?",
						answer: "Some prior practice is helpful. Suitability is assessed before enrollment.",
					},
					{
						id: "3",
						question: "Is this program live or recorded?",
						answer: "The training is primarily live-guided. Recordings may be provided for review, not as a replacement for live participation.",
					},
					{
						id: "4",
						question: "How rigorous is the program?",
						answer: "The program requires consistent attendance, practice, and sincere engagement.",
					},
					{
						id: "5",
						question: "Will I be confident to teach after completion?",
						answer: "The curriculum is designed to progressively build teaching understanding, clarity, and confidence.",
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
