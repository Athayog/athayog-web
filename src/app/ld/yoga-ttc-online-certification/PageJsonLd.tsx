const PAGE_URL = "https://athayogliving.com/ld/yoga-ttc-online-certification";

export default function PageJsonLd() {
	const schema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${PAGE_URL}#webpage`,
				url: PAGE_URL,
				name: "Online Yoga Teacher Training Course & Certification | Athayog Living",
				description:
					"Live, faculty-guided online yoga teacher training for serious practitioners and future teachers, with a structured curriculum and credible certification.",
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
				description:
					"Yoga and wellness academy in Indiranagar, Bengaluru offering group classes, personal training, teacher training and workshops, with Yoga Alliance, SVYASA and AYUSH recognition.",
				telephone: "+91-9611771434",
				address: {
					"@type": "PostalAddress",
					streetAddress:
						"No. 3293, 1st Floor, 12th Main, HAL 2nd Stage, Indiranagar",
					addressLocality: "Bengaluru",
					addressRegion: "Karnataka",
					postalCode: "560038",
					addressCountry: "IN",
				},
				sameAs: [
					"https://www.facebook.com/athayogliving/",
					"https://www.instagram.com/athayogliving/",
					"https://in.linkedin.com/company/athayog-living",
					"https://www.youtube.com/@athayogliving",
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
						name: "Online Yoga Teacher Training",
						item: PAGE_URL,
					},
				],
			},
			{
				"@type": "Course",
				"@id": `${PAGE_URL}#course`,
				name: "Online Yoga Teacher Training Course",
				description:
					"A live, faculty-guided online yoga teacher training covering asana practice and alignment, pranayama, meditation, yoga philosophy and ethics, applied anatomy, teaching methodology and practice teaching with feedback. Small cohort, structured curriculum and assessments, leading to a yoga teacher training certification.",
				provider: { "@id": "https://athayogliving.com/#org" },
				educationalCredentialAwarded: "Yoga Teacher Training Certification",
				inLanguage: "en-IN",
				teaches: [
					"Asana practice and alignment",
					"Pranayama and breath awareness",
					"Meditation and inner practices",
					"Yoga philosophy and ethics",
					"Applied anatomy",
					"Teaching methodology",
					"Practice teaching and feedback",
				],
				hasCourseInstance: {
					"@type": "CourseInstance",
					courseMode: "Online",
					courseWorkload: "P12W",
				},
			},
			{
				"@type": "FAQPage",
				"@id": `${PAGE_URL}#faq`,
				mainEntity: [
					{
						"@type": "Question",
						name: "Is this yoga teacher training fully online?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. All sessions are conducted online through live, interactive classes.",
						},
					},
					{
						"@type": "Question",
						name: "Is prior yoga experience required?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Some prior practice is helpful. Suitability is assessed before enrollment.",
						},
					},
					{
						"@type": "Question",
						name: "Is this program live or recorded?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The training is primarily live-guided. Recordings may be provided for review, not as a replacement for live participation.",
						},
					},
					{
						"@type": "Question",
						name: "How rigorous is the program?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The program requires consistent attendance, practice and sincere engagement.",
						},
					},
					{
						"@type": "Question",
						name: "Will I be confident to teach after completion?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "The curriculum is designed to progressively build teaching understanding, clarity and confidence.",
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
