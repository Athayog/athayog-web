"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import FormStatus from "@/components/forms/FormStatus";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import styles from "@/app/group-classes-indiranagar/GroupClasses.module.css";

const magnetSchema = z.object({
	name: strings.name,
	phone: strings.phone,
	preferredTime: z.string().min(1, "Please enter your preferred time"),
});

export default function MagnetForm() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const { notifySuccess, notifyError } = useFormFeedback();

	const form = useForm({
		defaultValues: { name: "", phone: "", preferredTime: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "groupTrial",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Group Trial: ${value.name}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit");
				}
				setSubmitted(true);
				notifySuccess({
					title: "Request received",
					message:
						"We'll contact you within 24 hours to confirm your trial class at our Indiranagar studio.",
					source: "groupTrial",
				});
			} catch (err) {
				const message =
					err instanceof Error
						? err.message
						: "Something went wrong. Please try again.";
				setFormError(message);
				notifyError(message);
			}
		},
	});

	if (submitted) {
		return (
			<FormStatus
				submitted={submitted}
				title="Trial Class Requested"
				message="We'll contact you within 24 hours to confirm your trial class at our Indiranagar studio."
				tone="onDark"
			/>
		);
	}

	return (
		<form
			className={styles.lmForm}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			{formError && (
				<div
					style={{
						background: "rgba(176,115,74,0.3)",
						color: "#f5f3ea",
						padding: "10px 14px",
						borderRadius: 2,
						fontSize: "0.85rem",
					}}
				>
					{formError}
				</div>
			)}

			<form.Field
				name="name"
				validators={{ onChange: zodField(magnetSchema.shape.name) }}
			>
				{(field) => (
					<div>
						<input
							type="text"
							placeholder="Your name"
							aria-label="Your name"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="phone"
				validators={{ onChange: zodField(magnetSchema.shape.phone) }}
			>
				{(field) => (
					<div>
						<input
							type="tel"
							placeholder="WhatsApp / phone number"
							aria-label="Phone number"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="preferredTime"
				validators={{
					onChange: zodField(magnetSchema.shape.preferredTime),
				}}
			>
				{(field) => (
					<div>
						<input
							type="text"
							placeholder="Preferred time (e.g. 6 AM / evening)"
							aria-label="Preferred time"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Subscribe selector={(s) => s.isSubmitting}>
				{(isSubmitting) => (
					<button
						type="submit"
						className="btn btn-cream"
						disabled={isSubmitting}
						aria-busy={isSubmitting}
						style={{ justifyContent: "center" }}
					>
						{isSubmitting ? (
							<>
								<span className="btnSpinner" aria-hidden="true" />
								Submitting…
							</>
						) : (
							"Book My Trial Class"
						)}
					</button>
				)}
			</form.Subscribe>
			<span className={styles.lmMini}>
				We&apos;ll call or WhatsApp you to confirm. No obligation.
			</span>
		</form>
	);
}
