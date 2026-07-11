"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about-us" },
	{ label: "Classes", href: "/group-classes-indiranagar" },
	{ label: "Training", href: "/yoga-teacher-training" },
	{ label: "FAQ", href: "#faq" },
];

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className={styles.header}>
			<div className={`wrap ${styles.nav}`}>
				<Link href="/" className={styles.brand}>
					ATHAYOG
					<span className={styles.brandSub}>Living · Indiranagar</span>
				</Link>

				<nav
					className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}
					aria-label="Primary"
				>
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={styles.navLink}
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="https://athayogliving.com/trial-classes"
						className="btn btn-primary nav-cta"
					>
						Free Trial
					</Link>
				</nav>

				<button
					className={styles.burger}
					aria-label="Open menu"
					aria-expanded={open}
					onClick={() => setOpen(!open)}
				>
					<svg
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.6"
					>
						<line x1="3" y1="7" x2="21" y2="7" />
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="17" x2="21" y2="17" />
					</svg>
				</button>
			</div>
		</header>
	);
}
