import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Teacher } from "@/constants/teachers";
import styles from "@/components/FacultyGrid.module.css";

export default function FacultyGrid({ teachers }: { teachers: Teacher[] }) {
	return (
		<div className={styles.grid}>
			{teachers.map((teacher) => (
				<Reveal key={teacher.name}>
					<div className={styles.card}>
						<div className={styles.avatar}>
							<Image
								src={teacher.photo}
								alt={teacher.alt}
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
						<h3>{teacher.name}</h3>
						<div className={styles.role}>{teacher.role}</div>
						<p>{teacher.bio}</p>
					</div>
				</Reveal>
			))}
		</div>
	);
}
