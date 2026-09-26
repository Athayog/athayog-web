"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useToastStore, type Toast } from "@/store/useToastStore";
import styles from "@/components/ToastRegion.module.css";

const AUTO_DISMISS_MS = 6000;

function ToastItem({
	toast,
	onDismiss,
}: {
	toast: Toast;
	onDismiss: (id: number) => void;
}) {
	useEffect(() => {
		const timer = setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS);
		return () => clearTimeout(timer);
	}, [toast.id, onDismiss]);

	const isError = toast.variant === "error";

	return (
		<div className={`${styles.toast} ${isError ? styles.error : ""}`}>
			<span className={styles.icon} aria-hidden="true">
				{isError ? <AlertCircle size={19} /> : <CheckCircle2 size={19} />}
			</span>
			<div className={styles.body}>
				<p className={styles.title}>{toast.title}</p>
				{toast.message && <p className={styles.message}>{toast.message}</p>}
			</div>
			<button
				type="button"
				className={styles.close}
				onClick={() => onDismiss(toast.id)}
				aria-label="Dismiss notification"
			>
				<X size={16} />
			</button>
		</div>
	);
}

/**
 * The single, always-mounted notification region for the whole site.
 *
 * It renders (empty) on the server so the live region exists in the initial
 * HTML before any toast is appended; inserting a live region together with its
 * content is announced unreliably by VoiceOver.
 */
export default function ToastRegion() {
	const toasts = useToastStore((s) => s.toasts);
	const dismiss = useToastStore((s) => s.dismiss);

	return (
		<div
			className={styles.region}
			role="status"
			aria-live="polite"
			aria-atomic="false"
		>
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
			))}
		</div>
	);
}
