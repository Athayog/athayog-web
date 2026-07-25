"use client";

import { useState, useCallback } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { zodField } from "@/lib/forms/validate";
import { strings, optional } from "@/lib/forms/schemas";
import styles from "@/components/EnquireModal.module.css";

const enquireSchema = z.object({
	fullName: strings.name,
	email: strings.email,
	phone: strings.phone,
	location: z.string().min(1, "Location is required"),
	serviceLookingFor: z.string().min(1, "Select a service"),
	source: z.string().min(1, "This field is required"),
	message: optional.message,
});

const SERVICE_OPTIONS = [
	{ value: "Group class", label: "Group class" },
	{ value: "Personal Training", label: "Personal Training" },
	{
		value: "Teachers Training course",
		label: "Teachers Training course",
	},
];

type EnquireModalProps = {
	children: React.ReactNode;
	service?: string;
	pageSource?: string;
};

export default function EnquireModal({
	children,
	service = "Group class",
	pageSource = "",
}: EnquireModalProps) {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			location: "",
			serviceLookingFor: service,
			source: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "enquiries",
						data: {
							...value,
							pageSource,
						},
						email: {
							to: "info@athayogliving.com",
							subject: `New Enquiry — ${value.fullName}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit");
				}
				setSubmitted(true);
			} catch (err) {
				setFormError(
					err instanceof Error
						? err.message
						: "Something went wrong. Please try again.",
				);
			}
		},
	});

	const close = useCallback(() => {
		setOpen(false);
		setSubmitted(false);
		setFormError(null);
		form.reset();
	}, [form]);

	if (!open) {
		return (
			<span
				onClick={() => setOpen(true)}
				style={{ cursor: "pointer", display: "inline-flex" }}
			>
				{children}
			</span>
		);
	}

	return (
		<div className={styles.overlay} onClick={close}>
			<div className={styles.card} onClick={(e) => e.stopPropagation()}>
				<button
					type="button"
					className={styles.close}
					onClick={close}
					aria-label="Close"
				>
					×
				</button>

				{submitted ? (
					<div className={styles.success}>
						<h3>Enquiry Sent</h3>
						<p
							style={{
								color: "var(--brand-deep)",
								fontSize: "0.95rem",
							}}
						>
							We&apos;ll get back to you within 24 hours.
						</p>
					</div>
				) : (
					<>
						<h2 className={styles.title}>Send an Enquiry</h2>
						<p className={styles.subtitle}>
							Tell us what you&apos;re looking for and we&apos;ll get in
							touch.
						</p>

						{formError && (
							<div className={styles.errorBanner}>{formError}</div>
						)}

						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<form.Field
								name="fullName"
								validators={{
									onChange: zodField(enquireSchema.shape.fullName),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											Full Name
										</label>
										<input
											className={styles.input}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="email"
								validators={{
									onChange: zodField(enquireSchema.shape.email),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>Email</label>
										<input
											className={styles.input}
											type="email"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="phone"
								validators={{
									onChange: zodField(enquireSchema.shape.phone),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											Phone Number
										</label>
										<input
											className={styles.input}
											type="tel"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="location"
								validators={{
									onChange: zodField(enquireSchema.shape.location),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											Location
										</label>
										<input
											className={styles.input}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="serviceLookingFor"
								validators={{
									onChange: zodField(
										enquireSchema.shape.serviceLookingFor,
									),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											Service You Are Looking For
										</label>
										<select
											className={styles.input}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										>
											<option value="" disabled>
												Select Service
											</option>
											{SERVICE_OPTIONS.map((opt) => (
												<option key={opt.value} value={opt.value}>
													{opt.label}
												</option>
											))}
										</select>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="source"
								validators={{
									onChange: zodField(enquireSchema.shape.source),
								}}
							>
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											How Did You Hear About Us?
										</label>
										<input
											className={styles.input}
											placeholder="Google, Instagram, friend…"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors?.length > 0 && (
											<span className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>

							<form.Field name="message">
								{(field) => (
									<div className={styles.field}>
										<label className={styles.fieldLabel}>
											Message (optional)
										</label>
										<textarea
											className={styles.textarea}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
											rows={3}
										/>
									</div>
								)}
							</form.Field>

							<div className={styles.submitRow}>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={form.state.isSubmitting}
								>
									{form.state.isSubmitting
										? "Sending…"
										: "Send Enquiry"}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
