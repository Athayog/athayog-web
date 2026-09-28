"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import FormStatus from "@/components/forms/FormStatus";
import { optional, strings } from "@/lib/forms/schemas";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { zodField } from "@/lib/forms/validate";
import styles from "@/app/ld/group-classes-indiranagar/GroupClassesLd.module.css";

const WHATSAPP_HREF =
	"https://wa.me/919611771434?text=Hi%2C%20I%27d%20like%20details%20on%20your%20group%20yoga%20classes%20in%20Indiranagar%20-%20batch%20timings%2C%20trial%20and%20fees.";

const SUCCESS_MESSAGE =
	"Thank you. We have your details and will share today's available batches, trial and fee details shortly.";

const enquirySchema = z.object({
	name: strings.name,
	phone: strings.phone,
	email: optional.email,
	message: optional.message,
});

type GroupClassesLdFormProps = {
	badge: string;
	title: string;
	intro: string;
};

export default function GroupClassesLdForm({
	badge,
	title,
	intro,
}: GroupClassesLdFormProps) {
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
				notifySuccess({
					title: "Enquiry sent",
					message: SUCCESS_MESSAGE,
					source: "group_classes_indiranagar",
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
											<label htmlFor="gcl-name">Name</label>
											<input
												id="gcl-name"
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
											<label htmlFor="gcl-phone">Phone</label>
											<input
												id="gcl-phone"
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
											<label htmlFor="gcl-email">Email</label>
											<input
												id="gcl-email"
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
											<label htmlFor="gcl-message">Message</label>
											<textarea
												id="gcl-message"
												placeholder="Preferred timing (morning or evening) and your yoga level"
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
								classes and accept our{" "}
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
