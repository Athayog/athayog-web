"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, X } from "lucide-react";
import { onConsentChange, readConsent } from "@/lib/consent";
import styles from "@/components/ContactFab.module.css";

const PHONE_DISPLAY = "+91 96117 71434";
const TEL_HREF = "tel:+919611771434";
const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%20Athayog%2C%20I%20have%20a%20question.";
const HIDDEN_PATHS = new Set(["/login", "/payment-success", "/thank-you"]);

function isHiddenPath(pathname: string): boolean {
	if (HIDDEN_PATHS.has(pathname)) return true;
	return pathname.startsWith("/athayog-app/");
}

function WhatsAppIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="18"
			height="18"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
		</svg>
	);
}

export default function ContactFab() {
	const pathname = usePathname();
	// Server render assumes no consent yet so the FAB never flashes in and out
	// while the cookie banner appears after hydration. See CookieBanner.
	const consent = useSyncExternalStore(onConsentChange, readConsent, () => null);

	// Keep the cookie banner unobstructed: show the FAB only once consent is
	// set (the banner is dismissed), and skip auth/confirmation/app-doc routes.
	if ((pathname && isHiddenPath(pathname)) || consent === null) return null;

	// key={pathname} remounts on navigation so the panel starts closed on the
	// new page without an effect.
	return <FabMenu key={pathname} />;
}

function FabMenu() {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	// Close on Escape or when clicking/tapping outside the widget.
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [open]);

	return (
		<div className={styles.wrap} ref={rootRef}>
			<div
				id="contact-fab-panel"
				role="group"
				aria-label="Contact Athayog Living"
				className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
			>
				<p className={styles.panelTitle}>Get in touch</p>
				<a
					href={WHATSAPP_HREF}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.option}
					onClick={() => setOpen(false)}
				>
					<span className={`${styles.optionIcon} ${styles.waIcon}`}>
						<WhatsAppIcon />
					</span>
					<span>
						<span className={styles.optionLabel}>Chat on WhatsApp</span>
						<span className={styles.optionMeta}>{PHONE_DISPLAY}</span>
					</span>
				</a>
				<a
					href={TEL_HREF}
					className={styles.option}
					onClick={() => setOpen(false)}
				>
					<span className={`${styles.optionIcon} ${styles.callIcon}`}>
						<Phone size={18} />
					</span>
					<span>
						<span className={styles.optionLabel}>Call us</span>
						<span className={styles.optionMeta}>{PHONE_DISPLAY}</span>
					</span>
				</a>
			</div>
			<button
				type="button"
				className={styles.fab}
				aria-expanded={open}
				aria-controls="contact-fab-panel"
				aria-label={open ? "Close contact options" : "Contact us"}
				onClick={() => setOpen((v) => !v)}
			>
				{open ? <X size={24} /> : <MessageCircle size={26} />}
			</button>
		</div>
	);
}
