// Faculty shown across the site's teacher sections (group classes, personal
// training, weight loss, TTC pages). Central data so bios/photos stay in sync.
// Photos live in public/images/teachers/.

export interface Teacher {
	name: string;
	photo: string;
	alt: string;
	role: string;
	bio: string;
}

export const TEACHERS: Teacher[] = [
	{
		name: "Sharath Basavaraju",
		photo: "/sharath-basavaraju.png",
		alt: "Sharath Basavaraju, Founder and Principal Teacher of Athayog Living",
		role: "Founder & Principal Teacher · MSc Yoga, PhD candidate (SVYASA)",
		bio: "Yoga educator and researcher with 10+ years and 10,000+ teaching hours, leading Athayog's classes and teacher training.",
	},
	{
		name: "Esha Reddy",
		photo: "/images/teachers/esha-reddy.jpg",
		alt: "Esha Reddy, yoga teacher at Athayog Living",
		role: "Yoga Teacher · RYT 500 · RPYT",
		bio: "8+ years of engaging, results-driven classes with advanced certifications (RYT 500, RPYT) and experience in prenatal and personalized programs.",
	},
	{
		name: "Ishita Kulkarni",
		photo: "/images/teachers/ishita-kulkarni.jpg",
		alt: "Ishita Kulkarni, senior yoga trainer at Athayog Living",
		role: "Senior Yoga Trainer · PhD Research Scholar, S-VYASA",
		bio: "Yoga instructor and PhD research scholar at S-VYASA with a Master's in Yoga, specializing in pranayama, relaxation, and therapeutic and adaptive yoga.",
	},
	{
		name: "Manoj Kumar",
		photo: "/images/teachers/manoj-kumar.jpg",
		alt: "Manoj Kumar, senior yoga trainer at Athayog Living",
		role: "Senior Yoga Trainer · S-VYASA Certified · REPS (Dubai)",
		bio: "7+ years teaching Hatha, Ashtanga, Vinyasa, Power, Yin & Yang and Restorative yoga, pranayama, meditation and trataka across classes, corporate programs and TTC.",
	},
];
