import Link from "next/link";
import styles from "@/app/forbidden.module.css";

export default function Forbidden() {
	return (
		<section className={styles.page}>
			<div className={`wrap ${styles.inner}`}>
				<div className={styles.icon}>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						width="44"
						height="44"
						aria-hidden="true"
					>
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
				</div>
				<span className="eyebrow">Restricted</span>
				<h2>Access Denied</h2>
				<p className={`lead ${styles.description}`}>
					You don&apos;t have permission to view this page.
				</p>
				<div className={styles.actions}>
					<Link href="/" className="btn btn-primary">
						Go Home
					</Link>
					<Link href="/login" className="btn btn-ghost">
						Log In
					</Link>
				</div>
			</div>
		</section>
	);
}
