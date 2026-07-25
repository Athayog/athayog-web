import { Flower2, Dumbbell, Sparkles, Brain } from "lucide-react";
import AerialHeroSection from "@/components/landing/AerialHeroSection";
import InfoBarSection from "@/components/landing/InfoBarSection";
import IconBenefitsSection from "@/components/landing/IconBenefitsSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import PricingCardsSection from "@/components/landing/PricingCardsSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import StudioLocationSection from "@/components/landing/StudioLocationSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

export default function AerialYogaIndiranagarPage() {
	return (
		<main>
			<AerialHeroSection
				h1="Aerial Yoga Classes in Indiranagar | Strength, Flexibility & Stress Relief"
				subheadline="Defy gravity. Build core strength. Release stress — in guided, small-batch Aerial Yoga sessions."
				trustPoints={[
					"Small batch: Only 10 participants",
					"Suitable for 15–50 yrs | Working professionals welcome",
					"Beginner-friendly | Instructor-led",
				]}
				primaryCTA={{
					text: "Book Your Session – ₹699",
					href: "https://rzp.io/rzp/UX3HbMvu",
				}}
				secondaryCTA={{
					text: "Get 4 Sessions – ₹2,499",
					href: "https://rzp.io/rzp/q55F7v2",
				}}
				tertiaryCTA={{
					text: "Get 8 Sessions – ₹4,699",
					href: "https://rzp.io/rzp/0Abz1tpq",
				}}
				backgroundImage="/images/landing-page-hero-4.jpg"
			/>
			<InfoBarSection
				items={[
					{ label: "Location", value: "AthaYog Indiranagar" },
					{ label: "Time", value: "Every Thursday | 10:30 – 11:30 AM" },
					{
						label: "Session Type",
						value: "Instructor-guided Aerial Yoga",
					},
					{ label: "Capacity", value: "10 per batch" },
				]}
			/>
			<IconBenefitsSection
				title="Why Choose Aerial Yoga Over Regular Yoga?"
				benefits={[
					{
						id: "1",
						icon: <Flower2 />,
						title: "Improves Spinal Decompression",
						description:
							"Release tension and decompress your spine naturally",
					},
					{
						id: "2",
						icon: <Dumbbell />,
						title: "Builds Lean Muscle",
						description: "Without joint pressure or high impact",
					},
					{
						id: "3",
						icon: <Sparkles />,
						title: "Enhances Balance & Flexibility",
						description: "Improve coordination and body awareness",
					},
					{
						id: "4",
						icon: <Brain />,
						title: "Reduces Work Stress",
						description: "Combat sedentary lifestyle effects",
					},
				]}
			/>
			<SplitContentSection
				title="Designed For"
				items={[
					{
						id: "1",
						text: "Working professionals with sedentary routines",
					},
					{
						id: "2",
						text: "Fitness beginners looking for low-impact strength",
					},
					{ id: "3", text: "Teens & adults (15–50 yrs)" },
					{
						id: "4",
						text: "Anyone seeking stress relief + body mobility",
					},
				]}
			/>
			<PricingCardsSection
				title="Simple, Transparent Pricing"
				pricingCards={[
					{
						title: "Single Session",
						price: "₹699",
						note: "Excl. GST",
						ctaText: "Book Now",
						ctaHref: "https://rzp.io/rzp/UX3HbMvu",
					},
					{
						title: "4 Sessions",
						price: "₹2,499",
						note: "Excl. GST",
						ctaText: "Get Pass",
						ctaHref: "https://rzp.io/rzp/q55F7v2",
						featured: true,
					},
					{
						title: "8 Sessions",
						price: "₹4,699",
						note: "Excl. GST",
						ctaText: "Get Pass",
						ctaHref: "https://rzp.io/rzp/0Abz1tpq",
						featured: true,
					},
				]}
				trustNote="✔ Secure payment | ✔ Limited slots | ✔ No overcrowding"
			/>
			<NumberedListSection
				title="What Happens in a Session?"
				subtitle="Your 60-minute aerial yoga experience"
				items={[
					{ id: "1", text: "Warm-up & breath awareness" },
					{ id: "2", text: "Guided aerial poses using hammock" },
					{ id: "3", text: "Strength & flexibility flow" },
					{ id: "4", text: "Cool-down & relaxation" },
				]}
				variant="minimal"
			/>
			<StudioLocationSection
				title="Visit Our Indiranagar Studio"
				features={[
					{
						id: "1",
						text: "Easily accessible from metro & main roads",
					},
					{
						id: "2",
						text: "Calm, premium yoga studio ambience",
					},
					{
						id: "3",
						text: "Clean equipment & safety-checked hammocks",
					},
				]}
			/>
			<FinalCTASection
				title="Ready to Experience Aerial Yoga?"
				primaryCTA={{
					text: "Book Single Session – ₹699",
					href: "https://rzp.io/rzp/UX3HbMvu",
				}}
				secondaryCTA={{
					text: "Choose 4 Sessions – ₹2,499",
					href: "https://rzp.io/rzp/q55F7v2",
				}}
				tertiaryCTA={{
					text: "Choose 8 Sessions – ₹4,699",
					href: "https://rzp.io/rzp/0Abz1tpq",
				}}
			/>
		</main>
	);
}
