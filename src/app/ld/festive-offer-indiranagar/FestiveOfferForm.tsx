"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import FormStatus from "@/components/forms/FormStatus";
import { strings } from "@/lib/forms/schemas";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { zodField } from "@/lib/forms/validate";
import styles from "@/app/ld/festive-offer-indiranagar/FestiveOffer.module.css";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20to%20claim%20the%20Dussehra%20%26%20Diwali%20yoga%20offer%20at%20Athayog%20Living.";

const SUCCESS_MESSAGE =
	"Thank you. We have your details and will confirm your festive rate and batch timing shortly.";

const claimSchema = z.object({
	name: strings.name,
	phone: strings.phone,
	plan: z.string().min(1, "Please select a plan"),
});

const planOptions = [
	"3-Month, ₹9,449",
	"6-Month, ₹13,999",
	"12-Month, ₹21,999",
	"Not sure yet, please advise",
];

export default function FestiveOfferForm() {
	const { notifySuccess, notifyError } = useFormFeedback();
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", phone: "", plan: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "festiveOffer",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Festive Offer Claim: ${value.name}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit. Please try again.");
				}
				notifySuccess({
					title: "Offer claimed",
					message: SUCCESS_MESSAGE,
					source: "festiveOffer",
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
						title="Offer claimed!"
						message={SUCCESS_MESSAGE}
					/>

					{!submitted && (
						<>
							<div className={styles.claimFh}>Claim your festive offer</div>
							<div className={styles.claimFs}>
								Only 25 slots at this price. Share your details and we
								will confirm your festive rate and batch timing.
							</div>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<form.Field
									name="name"
									validators={{
										onChange: zodField(claimSchema.shape.name),
									}}
								>
									{(field) => (
										<div
											className={`${styles.formField} ${
												field.state.meta.errors?.length
													? styles.formFieldError
													: ""
											}`}
										>
											<label htmlFor="festive-name">Name</label>
											<input
												id="festive-name"
												type="text"
												placeholder="Your name"
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
									validators={{
										onChange: zodField(claimSchema.shape.phone),
									}}
								>
									{(field) => (
										<div
											className={`${styles.formField} ${
												field.state.meta.errors?.length
													? styles.formFieldError
													: ""
											}`}
										>
											<label htmlFor="festive-phone">
												Phone / WhatsApp
											</label>
											<input
												id="festive-phone"
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
									name="plan"
									validators={{
										onChange: zodField(claimSchema.shape.plan),
									}}
								>
									{(field) => (
										<div
											className={`${styles.formField} ${
												field.state.meta.errors?.length
													? styles.formFieldError
													: ""
											}`}
										>
											<label htmlFor="festive-plan">
												Plan you want
											</label>
											<select
												id="festive-plan"
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(e.target.value)
												}
												onBlur={field.handleBlur}
											>
												<option value="">Select a plan</option>
												{planOptions.map((option) => (
													<option key={option} value={option}>
														{option}
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
											className={`btn ${styles.goldBtn} ${styles.fullBtn}`}
											disabled={isSubmitting}
											aria-busy={isSubmitting}
										>
											{isSubmitting ? (
												<>
													<span
														className="btnSpinner"
														aria-hidden="true"
													/>
													Sending…
												</>
											) : (
												"Claim My Festive Price"
											)}
										</button>
									)}
								</form.Subscribe>

								{formError && (
									<div className={styles.formErrorText}>
										{formError}
									</div>
								)}
							</form>

							<div className={styles.formOr}>Prefer a quick chat?</div>
							<a
								className={`btn ${styles.waBtn} ${styles.fullBtn}`}
								href={WHATSAPP_HREF}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Claim the festive offer on WhatsApp"
							>
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									width="19"
									height="19"
									aria-hidden="true"
								>
									<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2 .8.5 1.2.6 1.4.5.2-.1.5-.6.7-.8.2-.3.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.2z" />
								</svg>
								Claim on WhatsApp
							</a>
							<p className={styles.waNote}>
								<span className={styles.dot} aria-hidden="true" /> We
								usually reply within a few minutes
							</p>
							<p className={styles.formFine}>
								By sending this you agree to be contacted about the offer
								and accept our{" "}
								<a
									href="/privacy-policy"
									target="_blank"
									rel="noopener noreferrer"
								>
									privacy policy
								</a>
								.
							</p>
						</>
					)}
				</>
			)}
		</form.Subscribe>
	);
}
