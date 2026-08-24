"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { FormField } from "@/components/forms/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/app/(protected)/account/delete-request/DeleteRequest.module.css";

export default function DeleteRequestPage() {
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirmText, setConfirmText] = useState("");
	const userSnapshot = useAuthStore((s) => s.userSnapshot);

	const form = useForm({
		defaultValues: {
			name: userSnapshot?.displayName || "",
			email: userSnapshot?.email || "",
			phone: "",
			reason: "",
		},
		onSubmit: async ({ value }) => {
			setStatus("idle");
			setShowConfirm(false);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ collection: "deleteAccount", data: value }),
				});
				if (!res.ok) throw new Error();
				setStatus("success");
			} catch {
				setStatus("error");
			}
		},
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		e.stopPropagation();
		setShowConfirm(true);
		setConfirmText("");
	}

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.title}>Request Account Deletion</h1>
				<p className={styles.disclaimer}>
					Submitting this form will initiate a request to delete your account
					and associated data. Your account will be deleted within 30 business
					days. This action cannot be undone.
				</p>

				{status === "success" ? (
					<div className={styles.success}>
						<h2 className={styles.successTitle}>Request Received</h2>
						<p className={styles.successText}>
							Your deletion request has been received. We will process it
							within 30 business days.
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className={styles.form}>
						<FormField
							form={form}
							name="name"
							label="Name"
							placeholder="Your full name"
							validators={{ onBlur: zodField(strings.name) }}
						/>
						<FormField
							form={form}
							name="email"
							label="Email"
							type="email"
							placeholder="you@example.com"
							validators={{ onBlur: zodField(strings.email) }}
						/>
						<FormField
							form={form}
							name="phone"
							label="Phone"
							type="tel"
							placeholder="Phone number"
							validators={{ onBlur: zodField(strings.phone) }}
						/>
						<FormField
							form={form}
							name="reason"
							label="Reason for deletion"
							as="textarea"
							placeholder="Optional: let us know why you're leaving"
						/>
						{status === "error" && (
							<p style={{ color: "var(--clay)", fontSize: "0.85rem" }}>
								Something went wrong. Please try again.
							</p>
						)}
						<form.Subscribe selector={(s) => s.isSubmitting}>
							{(isSubmitting) => (
								<SubmitButton isSubmitting={isSubmitting}>
									{isSubmitting
										? "Submitting…"
										: "Submit Deletion Request"}
								</SubmitButton>
							)}
						</form.Subscribe>
					</form>
				)}
			</div>

			{showConfirm && (
				<div className={styles.overlay}>
					<div className={styles.modal}>
						<h2 className={styles.modalTitle}>Confirm Account Deletion</h2>
						<p className={styles.modalText}>
							This action is permanent. Your account and all associated data
							will be deleted within 30 business days. This cannot be
							undone.
						</p>
						<p className={styles.modalText}>
							Type <strong>DELETE</strong> to confirm:
						</p>
						<input
							type="text"
							value={confirmText}
							onChange={(e) => setConfirmText(e.target.value)}
							placeholder='Type "DELETE"'
							className={styles.modalInput}
							autoFocus
						/>
						<div className={styles.modalActions}>
							<button
								type="button"
								onClick={() => setShowConfirm(false)}
								className="btn btn-ghost"
							>
								Cancel
							</button>
							<form.Subscribe selector={(s) => s.isSubmitting}>
								{(isSubmitting) => (
									<button
										type="button"
										disabled={
											confirmText !== "DELETE" || isSubmitting
										}
										onClick={() => form.handleSubmit()}
										className="btn"
										style={{
											background:
												confirmText === "DELETE"
													? "#b33a3a"
													: undefined,
											color:
												confirmText === "DELETE"
													? "#fff"
													: undefined,
											opacity: confirmText === "DELETE" ? 1 : 0.4,
											cursor:
												confirmText === "DELETE"
													? "pointer"
													: "not-allowed",
										}}
									>
										{isSubmitting ? (
											<>
												<span
													className="btnSpinner"
													aria-hidden="true"
												/>
												Submitting…
											</>
										) : (
											"Yes, Delete My Account"
										)}
									</button>
								)}
							</form.Subscribe>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
