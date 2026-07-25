import { AudioLines, Brain, Sparkles, Heart, Moon, Smile, Flower2 } from "lucide-react";
import AerialHeroSection from "@/components/landing/AerialHeroSection";
import InfoBarSection from "@/components/landing/InfoBarSection";
import IconBenefitsSection from "@/components/landing/IconBenefitsSection";
import SplitContentSection from "@/components/landing/SplitContentSection";
import PricingCardsSection from "@/components/landing/PricingCardsSection";
import NumberedListSection from "@/components/landing/NumberedListSection";
import FinalCTASection from "@/components/landing/FinalCTASection";

export default function SoundMeditationIndiranagarPage() {
	return (
		<main>
			<AerialHeroSection
				h1="Sound Meditation in Indiranagar | Deep Relaxation & Mental Reset"
				subheadline="Disconnect from noise. Reconnect with calm through guided sound meditation."
				trustPoints={[
					"Suitable for all age groups",
					"No prior meditation experience required",
					"Safe, guided, and deeply restorative",
				]}
				backgroundImage="/images/Sound.jpg"
				primaryCTA={{ text: "Book Session – ₹899", href: "#" }}
				secondaryCTA={{ text: "4 Sessions – ₹3,299", href: "#" }}
			/>
			<InfoBarSection
				items={[
					{ label: "Location", value: "AthaYog Indiranagar" },
					{ label: "Time", value: "Every Thursday | 7:30 – 8:30 PM" },
					{ label: "Capacity", value: "20 participants" },
					{ label: "Format", value: "Guided Sound Meditation" },
				]}
			/>
			<IconBenefitsSection
				title="What Is Sound Meditation?"
				subtitle="How Sound Meditation Works"
				backgroundColor="#f5f5e8"
				benefits={[
					{
						id: "1",
						icon: <AudioLines />,
						title: "Sound Frequencies & Vibrations",
						description: "Uses therapeutic sound waves",
					},
					{
						id: "2",
						icon: <Brain />,
						title: "Slows Brain Waves",
						description: "Helps achieve meditative state",
					},
					{
						id: "3",
						icon: <Sparkles />,
						title: "Deep Relaxation Response",
						description: "Activates natural healing",
					},
				]}
			/>
			<IconBenefitsSection
				title="Benefits You'll Feel"
				backgroundColor="#ffffff"
				benefits={[
					{
						id: "4",
						icon: <Heart />,
						title: "Reduces Anxiety & Mental Fatigue",
						description: "Calm your racing mind",
					},
					{
						id: "5",
						icon: <Moon />,
						title: "Improves Sleep Quality",
						description: "Fall asleep easier and deeper",
					},
					{
						id: "6",
						icon: <Smile />,
						title: "Enhances Emotional Balance",
						description: "Better mood regulation",
					},
					{
						id: "7",
						icon: <Flower2 />,
						title: "Releases Stored Stress",
						description: "Let go of tension",
					},
				]}
			/>
			<SplitContentSection
				title="Perfect For"
				backgroundColor="#f5f5e8"
				items={[
					{
						id: "1",
						text: "Working professionals under constant stress",
					},
					{
						id: "2",
						text: "Individuals struggling with sleep or anxiety",
					},
					{
						id: "3",
						text: "Anyone seeking mental clarity & calm",
					},
					{ id: "4", text: "Beginners to meditation" },
				]}
			/>
			<PricingCardsSection
				title="Session Pricing"
				backgroundColor="#ffffff"
				pricingCards={[
					{
						title: "Single Session",
						price: "₹899",
						note: "Excl. GST",
						ctaText: "Book Now",
						ctaHref: "#",
					},
					{
						title: "4 Sessions",
						price: "₹3,299",
						note: "Excl. GST",
						ctaText: "Get Pass",
						ctaHref: "#",
						featured: true,
					},
				]}
				trustNote="Calm environment | Guided by experts | Limited seats"
			/>
			<NumberedListSection
				title="What to Expect in the Session"
				backgroundColor="#f5f5e8"
				items={[
					{ id: "1", text: "Settling & breath grounding" },
					{ id: "2", text: "Guided sound immersion" },
					{ id: "3", text: "Deep relaxation phase" },
					{ id: "4", text: "Gentle return to awareness" },
				]}
				variant="bold"
			/>
			<FinalCTASection
				title="Give Your Mind the Rest It Deserves"
				primaryCTA={{
					text: "Book One Session – ₹899",
					href: "#",
				}}
				secondaryCTA={{
					text: "Choose 4 Sessions – ₹3,299",
					href: "#",
				}}
			/>
		</main>
	);
}
