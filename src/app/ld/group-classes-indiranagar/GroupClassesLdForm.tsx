"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { optional, strings } from "@/lib/forms/schemas";
import { zodField } from "@/lib/forms/validate";
import styles from "@/app/ld/group-classes-indiranagar/GroupClassesLd.module.css";

const enquirySchema = z.object({
	name: strings.name,
	phone: strings.phone,
	email: optional.email,
	message: optional.message,
});

export default function GroupClassesLdForm() {
	const form = useForm({
		defaultValues: { name: "", phone: "", email: "", message: "" },
		onSubmit: async ({ value }) => {
			const res = await fetch("/api/submit-form", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					collection: "group_classes_indiranagar",
					data: value,
					email: {
						to: "info@athayogliving.com",
						subject: `New Group Classes Lead (Landing Page): ${value.name}`,
					},
				}),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.error || "Failed to submit. Please try again.");
			}
		},
	});

	if (form.state.isSubmitSuccessful) {
		return (
			<div className={styles.formSuccess}>
				<div className={styles.formSuccessTitle}>Enquiry received</div>
				<p className={styles.formSuccessText}>
					Thank you. We will share today&apos;s available morning and evening
					batches, along with trial and fee details.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="name"
				validators={{ onChange: zodField(enquirySchema.shape.name) }}
			>
				{(field) => (
					<div
						className={`${styles.formField} ${
							field.state.meta.errors?.length ? styles.formFieldError : ""
						}`}
					>
						<label htmlFor="gcl-name">Name</label>
						<input
							id="gcl-name"
							type="text"
							placeholder="Your name"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<div className={styles.fieldError}>
								{field.state.meta.errors.join(", ")}
							</div>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="phone"
				validators={{ onChange: zodField(enquirySchema.shape.phone) }}
			>
				{(field) => (
					<div
						className={`${styles.formField} ${
							field.state.meta.errors?.length ? styles.formFieldError : ""
						}`}
					>
						<label htmlFor="gcl-phone">Phone</label>
						<input
							id="gcl-phone"
							type="tel"
							placeholder="Phone or WhatsApp number"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<div className={styles.fieldError}>
								{field.state.meta.errors.join(", ")}
							</div>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="email"
				validators={{ onChange: zodField(enquirySchema.shape.email) }}
			>
				{(field) => (
					<div
						className={`${styles.formField} ${
							field.state.meta.errors?.length ? styles.formFieldError : ""
						}`}
					>
						<label htmlFor="gcl-email">Email</label>
						<input
							id="gcl-email"
							type="email"
							placeholder="you@email.com"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<div className={styles.fieldError}>
								{field.state.meta.errors.join(", ")}
							</div>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="message"
				validators={{ onChange: zodField(enquirySchema.shape.message) }}
			>
				{(field) => (
					<div
						className={`${styles.formField} ${
							field.state.meta.errors?.length ? styles.formFieldError : ""
						}`}
					>
						<label htmlFor="gcl-message">Message</label>
						<textarea
							id="gcl-message"
							placeholder="Preferred timing (morning or evening) and your yoga level"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<div className={styles.fieldError}>
								{field.state.meta.errors.join(", ")}
							</div>
						)}
					</div>
				)}
			</form.Field>

			<form.Subscribe selector={(s) => s.isSubmitting}>
				{(isSubmitting) => (
					<button
						type="submit"
						className={`btn btn-primary ${styles.fullBtn}`}
						disabled={isSubmitting}
						aria-busy={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<span className="btnSpinner" aria-hidden="true" />
								Sending…
							</>
						) : (
							"Send Enquiry"
						)}
					</button>
				)}
			</form.Subscribe>

			{form.state.errorMap.onSubmit && (
				<div className={styles.formErrorText}>{form.state.errorMap.onSubmit}</div>
			)}
		</form>
	);
}
