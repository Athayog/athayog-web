"use client";

import { useSyncExternalStore } from "react";
import { readConsent, writeConsent, onConsentChange } from "@/lib/consent";
import styles from "@/components/CookieBanner.module.css";

export default function CookieBanner() {
	const consent = useSyncExternalStore(onConsentChange, readConsent, () => "essential");

	if (consent !== null) return null;

	return (
		<div className={styles.banner} role="dialog" aria-label="Cookie preferences">
			<div className={styles.inner}>
				<div className={styles.text}>
					<p className={styles.heading}>Cookie Preferences</p>
					<p className={styles.body}>
						We use essential cookies for authentication and payments.
						Functional cookies load Google Maps embeds and may be used for
						analytics in the future. You can choose which categories to allow.
					</p>
				</div>

				<div className={styles.toggles}>
					<label className={styles.toggleRow}>
						<span className={styles.toggleLabel}>Essential</span>
						<span className={styles.toggleBadge}>Always on</span>
					</label>
					<label className={styles.toggleRow}>
						<span className={styles.toggleLabel}>Functional</span>
						<button
							type="button"
							className={styles.toggle}
							onClick={() => {}}
							role="switch"
							aria-checked={false}
							disabled
						>
							<span className={styles.toggleKnob} />
						</button>
					</label>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={`${styles.btn} ${styles.btnReject}`}
						onClick={() => writeConsent("essential")}
					>
						Reject All
					</button>
					<button
						type="button"
						className={`${styles.btn} ${styles.btnAccept}`}
						onClick={() => writeConsent("functional")}
					>
						Accept All
					</button>
				</div>
			</div>
		</div>
	);
}
