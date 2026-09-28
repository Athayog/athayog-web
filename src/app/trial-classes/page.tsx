"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { FormField } from "@/components/forms/FormField";
import FormStatus from "@/components/forms/FormStatus";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { useFormFeedback } from "@/lib/forms/useFormFeedback";
import { strings, optional } from "@/lib/forms/schemas";
import styles from "@/app/trial-classes/TrialClasses.module.css";

const trialSchema = z.object({
	fullName: strings.name,
	location: z.string().min(1, "Location is required"),
	email: strings.email,
	phoneNumber: strings.phone,
	serviceLookingFor: z.string().min(1, "Please select a service"),
	source: z.string().min(1, "This field is required"),
	message: optional.message,
});

export default function TrialClassesPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const { notifySuccess, notifyError } = useFormFeedback();

	const form = useForm({
		defaultValues: {
			fullName: "",
			location: "",
			email: "",
			phoneNumber: "",
			serviceLookingFor: "",
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
						collection: "trialClasses",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Trial Class: ${value.fullName}`,
						},
					}),
				});
				if (!res.ok) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.error || "Failed to submit");
				}

				setSubmitted(true);
				notifySuccess({
					title: "Trial class requested",
					source: "trialClasses",
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
		<main className={styles.page}>
			<div className="wrap">
				<FormStatus
					submitted={submitted}
					titleAs="h1"
					title="We've received your request"
					message="We'll get back to you within 24 hours to discuss your trial class."
				/>
				{!submitted && (
					<>
						<div className={styles.form}>
							<div className="section-head">
								<span className="eyebrow">Get Started</span>
								<h1>Book Your Trial Class</h1>
							</div>

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
								<div className={styles.row}>
									<FormField
										form={form}
										name="fullName"
										label="Full Name"
										validators={{
											onChange: zodField(
												trialSchema.shape.fullName,
											),
										}}
									/>
									<FormField
										form={form}
										name="location"
										label="Location"
										validators={{
											onChange: zodField(
												trialSchema.shape.location,
											),
										}}
									/>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="email"
										label="Email"
										type="email"
										validators={{
											onChange: zodField(trialSchema.shape.email),
										}}
									/>
									<FormField
										form={form}
										name="phoneNumber"
										label="Phone Number"
										type="tel"
										placeholder="10-digit number"
										hint="We will not spam you"
										validators={{
											onChange: zodField(
												trialSchema.shape.phoneNumber,
											),
										}}
									/>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="serviceLookingFor"
										label="Service You Are Looking For"
										as="select"
										placeholder="Select Service"
										options={[
											{
												value: "Group class",
												label: "Group class",
											},
											{
												value: "Personal Training",
												label: "Personal Training",
											},
											{
												value: "Teachers Training course",
												label: "Teachers Training course",
											},
										]}
										validators={{
											onChange: zodField(
												trialSchema.shape.serviceLookingFor,
											),
										}}
									/>
									<FormField
										form={form}
										name="source"
										label="How Did You Hear About Us?"
										placeholder="Google, Instagram, friend…"
										validators={{
											onChange: zodField(trialSchema.shape.source),
										}}
									/>
								</div>

								<div className={styles.row}>
									<div className={styles.full}>
										<FormField
											form={form}
											name="message"
											label="Message"
											as="textarea"
											placeholder="Any specific goals or questions? (optional)"
											hint="Optional. Tell us about your yoga experience or goals"
										/>
									</div>
								</div>

								<div className={styles.submitRow}>
									<form.Subscribe selector={(s) => s.isSubmitting}>
										{(isSubmitting) => (
											<SubmitButton isSubmitting={isSubmitting}>
												Book Trial Class
											</SubmitButton>
										)}
									</form.Subscribe>
								</div>
							</form>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
