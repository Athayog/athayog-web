"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import FormStatus from "@/components/forms/FormStatus";
import { optional, strings } from "@/lib/forms/schemas";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { zodField } from "@/lib/forms/validate";
import styles from "@/app/ld/yoga-ttc-online-certification/TtcOnlineLd.module.css";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20details%20on%20the%20Online%20Yoga%20Teacher%20Training%20-%20cohort%20dates%2C%20eligibility%20and%20fees.";

const SUCCESS_MESSAGE =
	"Thank you. We have your details and will guide you on eligibility, schedule fit and the application for the next cohort.";

const enquirySchema = z.object({
	name: strings.name,
	phone: strings.phone,
	email: optional.email,
	message: optional.message,
});

type TtcOnlineLdFormProps = {
	badge: string;
	title: string;
	intro: string;
};

export default function TtcOnlineLdForm({ badge, title, intro }: TtcOnlineLdFormProps) {
	const { notifySuccess, notifyError } = useFormFeedback();
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", phone: "", email: "", message: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "ttc_online",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Online TTC Lead: ${value.name}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit. Please try again.");
				}
				notifySuccess({
					title: "Enquiry sent",
					message: SUCCESS_MESSAGE,
					source: "ttc_online",
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
					<FormStatus submitted={submitted} message={SUCCESS_MESSAGE} />

					{!submitted && (
						<>
							<span className={styles.badge}>{badge}</span>
							<div className={styles.fh}>{title}</div>
							<div className={styles.fs}>{intro}</div>

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
										onChange: zodField(enquirySchema.shape.name),
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
											<label htmlFor="ttc-name">Name</label>
											<input
												id="ttc-name"
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
										onChange: zodField(enquirySchema.shape.phone),
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
											<label htmlFor="ttc-phone">Phone</label>
											<input
												id="ttc-phone"
												type="tel"
												placeholder="Phone or WhatsApp number"
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
									name="email"
									validators={{
										onChange: zodField(enquirySchema.shape.email),
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
											<label htmlFor="ttc-email">Email</label>
											<input
												id="ttc-email"
												type="email"
												placeholder="you@email.com"
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
									name="message"
									validators={{
										onChange: zodField(enquirySchema.shape.message),
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
											<label htmlFor="ttc-message">Message</label>
											<textarea
												id="ttc-message"
												placeholder="Tell us about your yoga background and goal"
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
													<span
														className="btnSpinner"
														aria-hidden="true"
													/>
													Sending…
												</>
											) : (
												"Send Enquiry"
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
								aria-label="Chat with Athayog Living on WhatsApp"
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
								Chat with us on WhatsApp
							</a>
							<p className={styles.waNote}>
								<span className={styles.dot} aria-hidden="true" /> We
								usually reply within a few minutes
							</p>
							<p className={styles.formFine}>
								By sending this enquiry you agree to be contacted about
								the course and accept our{" "}
								<a
									href="/privacy-policy"
									target="_blank"
									rel="noopener noreferrer"
								>
									privacy policy
								</a>
								. No obligation.
							</p>
						</>
					)}
				</>
			)}
		</form.Subscribe>
	);
}
