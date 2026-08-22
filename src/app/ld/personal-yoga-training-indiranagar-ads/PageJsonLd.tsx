export default function PageJsonLd() {
	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": "https://athayogliving.com/personal-yoga-training-indiranagar#webpage",
				url: "https://athayogliving.com/personal-yoga-training-indiranagar",
				name: "Personal Yoga Trainer in Indiranagar, Bangalore | Athayog Living",
				description:
					"Certified one-on-one personal yoga training in Indiranagar, Bengaluru for weight loss, back pain, flexibility and stress, at studio, home or online.",
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
				"@type": "BreadcrumbList",
				"@id": "https://athayogliving.com/personal-yoga-training-indiranagar#breadcrumb",
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
						name: "Personal Yoga Training in Indiranagar",
						item: "https://athayogliving.com/personal-yoga-training-indiranagar",
					},
				],
			},
			{
				"@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
				"@id": "https://athayogliving.com/#org",
				name: "Athayog Living",
				alternateName: "Athayog Living Yoga Studio Indiranagar",
				slogan: "A Sanctum For The Spirit",
				description:
					"Certified yoga studio in Indiranagar, Bengaluru offering personal yoga training, group classes and RYT-200 teacher training.",
				url: "https://athayogliving.com/",
				telephone: "+91-8690333111",
				email: "info@athayogliving.com",
				priceRange: "\u20B9\u20B9",
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
					{ "@type": "Place", name: "HAL 2nd Stage, Bengaluru" },
					{ "@type": "Place", name: "Domlur, Bengaluru" },
					{ "@type": "Place", name: "CV Raman Nagar, Bengaluru" },
					{ "@type": "Place", name: "Koramangala, Bengaluru" },
				],
				sameAs: [
					"https://www.facebook.com/athayogliving/",
					"https://in.linkedin.com/company/athayog-living",
					"https://www.instagram.com/athayogliving/",
				],
			},
			{
				"@type": "Service",
				"@id": "https://athayogliving.com/personal-yoga-training-indiranagar#service",
				serviceType: "Personal Yoga Training",
				name: "Personal Yoga Training in Indiranagar",
				description:
					"Certified one-on-one personal yoga training in Indiranagar, Bengaluru for weight loss, back and neck pain, flexibility, stress, prenatal and beginners. Available at the HAL 2nd Stage studio, at home, or online.",
				provider: { "@id": "https://athayogliving.com/#org" },
				areaServed: [
					{ "@type": "Place", name: "Indiranagar, Bengaluru" },
					{ "@type": "Place", name: "Domlur, Bengaluru" },
					{ "@type": "Place", name: "CV Raman Nagar, Bengaluru" },
					{ "@type": "Place", name: "Koramangala, Bengaluru" },
				],
				offers: {
					"@type": "AggregateOffer",
					priceCurrency: "INR",
					lowPrice: "14999",
					highPrice: "44599",
					offerCount: 9,
				},
			},
			{
				"@type": "FAQPage",
				"@id": "https://athayogliving.com/personal-yoga-training-indiranagar#faq",
				mainEntity: [
					{
						"@type": "Question",
						name: "Where is your personal yoga training in Indiranagar?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The studio is in Indiranagar, HAL 2nd Stage, 12th Main, Bengaluru 560038. At-home sessions are available across Indiranagar, Domlur, CV Raman Nagar and Koramangala, and online sessions are available too.",
						},
					},
					{
						"@type": "Question",
						name: "How much does personal yoga training cost in Indiranagar?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "12-session packages start at 14,999 INR online, 18,999 INR at the studio and 27,999 INR at home. 24-session and couple packages are also available. Prices exclude 5% GST, and the first trial session is free.",
						},
					},
					{
						"@type": "Question",
						name: "Can you train me at home in Indiranagar?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. At-home one-on-one yoga is available across Indiranagar and nearby areas including Domlur, CV Raman Nagar and Koramangala, alongside studio and online options.",
						},
					},
					{
						"@type": "Question",
						name: "Is the trial session really free?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. The first trial session and goal assessment are free, with no obligation to continue.",
						},
					},
					{
						"@type": "Question",
						name: "Is personal yoga training in Indiranagar suitable for beginners?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. Beginners benefit most from personal training because they learn correct technique from day one, at their own pace, with no pressure.",
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
