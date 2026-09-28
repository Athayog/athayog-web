const PAGE_URL = "https://athayogliving.com/ld/group-classes-indiranagar";

export default function PageJsonLd() {
	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${PAGE_URL}#webpage`,
				url: PAGE_URL,
				name: "Group Yoga Classes in Indiranagar, Bangalore | Athayog Living",
				description:
					"Instructor-led group yoga classes in Indiranagar, Bangalore. Small batches, morning and evening timings, beginner-friendly.",
				inLanguage: "en-IN",
				isPartOf: { "@id": "https://athayogliving.com/#website" },
				about: { "@id": "https://athayogliving.com/#org" },
				speakable: {
					"@type": "SpeakableSpecification",
					cssSelector: ["#aeo-answer", "#faq"],
				},
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
				image: "https://athayogliving.com/images/landing/landing-page-hero-11.jpg",
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
				"@type": "Service",
				"@id": `${PAGE_URL}#service`,
				serviceType: "Group Yoga Classes",
				name: "Group Yoga Classes in Indiranagar",
				description:
					"Instructor-led, small-batch group yoga classes in Indiranagar, Bengaluru with morning and evening timings. Beginner-friendly, with a trial class available.",
				provider: { "@id": "https://athayogliving.com/#location" },
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
						name: "Group Yoga Classes in Indiranagar",
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
						name: "Are these group yoga classes suitable for beginners?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. Beginners are guided carefully with clear instructions and proper demonstrations.",
						},
					},
					{
						"@type": "Question",
						name: "Can I attend a trial class?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. A trial class is available for a nominal fee. If you purchase a subscription within 48 hours, the trial fee is adjusted against your subscription.",
						},
					},
					{
						"@type": "Question",
						name: "How big are the batches?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Batch sizes are kept limited to ensure adequate instructor attention for each participant.",
						},
					},
					{
						"@type": "Question",
						name: "What if I miss a class?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The team will guide you on how to maintain continuity wherever possible.",
						},
					},
					{
						"@type": "Question",
						name: "Is the studio close to Indiranagar's main areas?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. The studio is centrally located in Indiranagar, HAL 2nd Stage, and is easily accessible.",
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
