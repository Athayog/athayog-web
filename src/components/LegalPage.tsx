import { ReactNode } from "react";
import styles from "./LegalPage.module.css";

interface LegalPageProps {
	title: string;
	children: ReactNode;
}

export default function LegalPage({ title, children }: LegalPageProps) {
	return (
		<main className={styles.main}>
			<div className={`wrap ${styles.hero}`}>
				<h1>{title}</h1>
			</div>
			<div className="wrap">
				<div className={styles.body}>{children}</div>
			</div>
		</main>
	);
}
