import Link from "next/link";
import styles from "@/app/not-found.module.css";

export default function NotFound() {
	return (
		<section className={styles.page}>
			<div className={`wrap ${styles.inner}`}>
				<div className={styles.code}>404</div>
				<span className="eyebrow">Oops</span>
				<h2>Page Not Found</h2>
				<div className={styles.divider} />
				<p className={`lead ${styles.description}`}>
					The page you&apos;re looking for might have been moved, renamed, or
					doesn&apos;t exist.
				</p>
				<div className={styles.actions}>
					<Link href="/" className="btn btn-primary">
						Go Home
					</Link>
					<Link href="/group-classes-indiranagar" className="btn btn-ghost">
						Explore Classes
					</Link>
				</div>
			</div>
		</section>
	);
}
