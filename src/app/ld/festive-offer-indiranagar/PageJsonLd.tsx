const PAGE_URL = "https://athayogliving.com/ld/festive-offer-indiranagar";

export default function PageJsonLd() {
	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${PAGE_URL}#webpage`,
				url: PAGE_URL,
				name: "Dussehra & Diwali Yoga Offer in Indiranagar | Up to 19% Off",
				description:
					"Festive Dussehra and Diwali offer on 3, 6 and 12-month yoga subscriptions at Athayog Living, Indiranagar. Limited-time offer, 25 slots.",
				inLanguage: "en-IN",
				isPartOf: { "@id": "https://athayogliving.com/#website" },
				about: { "@id": "https://athayogliving.com/#org" },
			},
			{
				"@type": "WebSite",
				"@id": "https://athayogliving.com/#website",
				url: "https://athayogliving.com/",
				name: "Athayog Living",
				inLanguage: "en-IN",
				publisher: { "@id": "https://athayogliving.com/#org" },
			},
			{
				"@type": "Organization",
				"@id": "https://athayogliving.com/#org",
				name: "Athayog Living",
				url: "https://athayogliving.com/",
				logo: "https://athayogliving.com/Logo.png",
				email: "info@athayogliving.com",
				slogan: "A Sanctum For The Spirit",
				sameAs: [
					"https://www.facebook.com/athayogliving/",
					"https://www.instagram.com/athayogliving/",
					"https://in.linkedin.com/company/athayog-living",
					"https://www.youtube.com/@athayogliving",
				],
			},
			{
				"@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
				"@id": "https://athayogliving.com/#location",
				name: "Athayog Living, Indiranagar",
				parentOrganization: { "@id": "https://athayogliving.com/#org" },
				url: PAGE_URL,
				telephone: "+91-9611771434",
				email: "info@athayogliving.com",
				priceRange: "\u20B9\u20B9",
				hasMap: "https://maps.app.goo.gl/JpW1wbeDugHRp3ZKA",
				address: {
					"@type": "PostalAddress",
					streetAddress:
						"No. 3293, 1st Floor, 12th Main, HAL 2nd Stage, Indiranagar",
					addressLocality: "Bengaluru",
					addressRegion: "Karnataka",
					postalCode: "560038",
					addressCountry: "IN",
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: 12.9784,
					longitude: 77.6408,
				},
				areaServed: [
					{ "@type": "Place", name: "Indiranagar, Bengaluru" },
					{ "@type": "Place", name: "Domlur, Bengaluru" },
					{ "@type": "Place", name: "CV Raman Nagar, Bengaluru" },
					{ "@type": "Place", name: "Koramangala, Bengaluru" },
				],
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${PAGE_URL}#breadcrumb`,
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Home",
						item: "https://athayogliving.com/",
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Dussehra & Diwali Yoga Offer, Indiranagar",
						item: PAGE_URL,
					},
				],
			},
			{
				"@type": "FAQPage",
				"@id": `${PAGE_URL}#faq`,
				mainEntity: [
					{
						"@type": "Question",
						name: "How long is the festive offer valid?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "It is a limited-time festive offer, with only 25 slots available at this price. Once all 25 slots are taken, prices return to regular rates.",
						},
					},
					{
						"@type": "Question",
						name: "What does the subscription include?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The subscription covers yoga classes at Athayog Living, Indiranagar, with morning and evening batch options. The team shares full inclusions when you reach out.",
						},
					},
					{
						"@type": "Question",
						name: "Can I gift this subscription to someone?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. You can claim the festive price as a gift for a family member or friend.",
						},
					},
					{
						"@type": "Question",
						name: "How do I pay?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Payments are accepted via UPI, cards, net banking, EMI and PayPal. A payment link is shared once you confirm your plan.",
						},
					},
					{
						"@type": "Question",
						name: "Where is the studio?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Athayog Living is in Indiranagar, HAL 2nd Stage, Bengaluru 560038, easily reached from Domlur, CV Raman Nagar and Koramangala.",
						},
					},
				],
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
