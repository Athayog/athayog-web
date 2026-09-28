"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import FormStatus from "@/components/forms/FormStatus";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import styles from "@/app/ld/personal-yoga-training-indiranagar-ads/PYTAds.module.css";

const adsSchema = z.object({
	name: strings.name,
	phone: strings.phone,
	goal: z.string().min(1, "Please select your goal"),
	mode: z.string().min(1, "Please select your preferred mode"),
});

const goalOptions = [
	"Weight loss and toning",
	"Back and neck pain relief",
	"Flexibility and mobility",
	"Stress and anxiety",
	"Prenatal or postnatal",
	"Beginner foundation",
	"Seniors gentle yoga",
	"General fitness",
];

const modeOptions = ["At the studio, Indiranagar", "At my home in Indiranagar", "Online"];

const SUCCESS_MESSAGE =
	"We will call you within 24 hours to confirm your free trial session.";

export default function PYTAdsForm() {
	const { notifySuccess, notifyError } = useFormFeedback();
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", phone: "", goal: "", mode: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "personalAdsLead",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Personal Yoga Training Lead: ${value.name}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit. Please try again.");
				}
				notifySuccess({
					title: "Slot booked",
					message: SUCCESS_MESSAGE,
					source: "personalAdsLead",
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

	return (
		<form.Subscribe selector={(s) => s.isSubmitSuccessful}>
			{(submitted) => (
				<>
					<FormStatus
						submitted={submitted}
						title="Slot Booked!"
						message={SUCCESS_MESSAGE}
						compact
					/>
					{!submitted && (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<form.Field
								name="name"
								validators={{ onChange: zodField(adsSchema.shape.name) }}
							>
								{(field) => (
									<div
										className={`${styles.formField} ${field.state.meta.errors?.length ? styles.formFieldError : ""}`}
									>
										<label htmlFor="ads-name">Your name</label>
										<input
											id="ads-name"
											type="text"
											placeholder="e.g. Priya"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
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
								validators={{ onChange: zodField(adsSchema.shape.phone) }}
							>
								{(field) => (
									<div
										className={`${styles.formField} ${field.state.meta.errors?.length ? styles.formFieldError : ""}`}
									>
										<label htmlFor="ads-phone">
											Phone or WhatsApp
										</label>
										<input
											id="ads-phone"
											type="tel"
											placeholder="10-digit mobile number"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
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
								name="goal"
								validators={{ onChange: zodField(adsSchema.shape.goal) }}
							>
								{(field) => (
									<div
										className={`${styles.formField} ${field.state.meta.errors?.length ? styles.formFieldError : ""}`}
									>
										<label htmlFor="ads-goal">Your goal</label>
										<select
											id="ads-goal"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										>
											<option value="">
												Select your main goal
											</option>
											{goalOptions.map((g) => (
												<option key={g} value={g}>
													{g}
												</option>
											))}
										</select>
										{field.state.meta.errors?.length > 0 && (
											<div className={styles.fieldError}>
												{field.state.meta.errors.join(", ")}
											</div>
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="mode"
								validators={{ onChange: zodField(adsSchema.shape.mode) }}
							>
								{(field) => (
									<div
										className={`${styles.formField} ${field.state.meta.errors?.length ? styles.formFieldError : ""}`}
									>
										<label htmlFor="ads-mode">Preferred mode</label>
										<select
											id="ads-mode"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
											onBlur={field.handleBlur}
										>
											<option value="">Select mode</option>
											{modeOptions.map((m) => (
												<option key={m} value={m}>
													{m}
												</option>
											))}
										</select>
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
										className="btn btn-primary"
										disabled={isSubmitting}
										aria-busy={isSubmitting}
										style={{
											width: "100%",
											justifyContent: "center",
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
											"Get My Free Trial"
										)}
									</button>
								)}
							</form.Subscribe>

							{formError && (
								<div
									style={{
										color: "var(--clay)",
										fontSize: "0.85rem",
										textAlign: "center",
										marginTop: 10,
									}}
								>
									{formError}
								</div>
							)}
						</form>
					)}
				</>
			)}
		</form.Subscribe>
	);
}
