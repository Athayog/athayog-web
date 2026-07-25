"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { FormField } from "@/components/forms/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import Reveal from "@/components/Reveal";
import styles from "@/app/picnics/Picnics.module.css";

const picnicSchema = z.object({
	fullName: strings.name,
	email: strings.email,
	phoneNumber: strings.phone,
	currentLocation: z.string().min(1, "Location is required"),
	gender: z.string().min(1, "Please select a gender"),
	weight: z.string().min(1, "Weight is required"),
	emergencyContactName: z.string().min(2, "Emergency contact name is required"),
	emergencyContactNumber: z
		.string()
		.regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
	healthConditions: z
		.string()
		.min(5, "Please mention any health conditions or write 'None'"),
	dietaryPreferences: z.string().min(1, "Please select a preference"),
});

const features = [
	{
		title: "Community Building",
		body: "Meet like-minded individuals and share the joy of yoga and nature in a supportive group environment.",
	},
	{
		title: "Nature & Yoga",
		body: "Experience the harmony of yoga in natural settings, from tranquil forests and serene mountains to peaceful lakesides.",
	},
	{
		title: "Balanced Itinerary",
		body: "Enjoy a mix of yoga practice, meditation, lakeside yoga and leisure activities that allow you to unwind and explore.",
	},
];

export default function PicnicsPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			phoneNumber: "",
			currentLocation: "",
			gender: "",
			weight: "",
			emergencyContactName: "",
			emergencyContactNumber: "",
			healthConditions: "",
			dietaryPreferences: "",
		},
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "picnicForm",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `Picnic Sign Up — ${value.fullName}`,
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

	return (
		<main>
			<section className={styles.hero}>
				<div className="wrap">
					<Reveal>
						<span className="eyebrow">Explore</span>
						<h1>Excursions &amp; Picnics with Athayog</h1>
						<p className="lead">
							Reconnect with nature and rejuvenate your spirit with
							Athayog&apos;s Excursions &amp; Picnics. These carefully
							planned outings combine the best of outdoor adventure with the
							calming practice of yoga, offering you a unique opportunity to
							escape the hustle and bustle of daily life.
						</p>
					</Reveal>
				</div>
			</section>

			<section className={styles.features}>
				<div className="wrap">
					<div className="grid-3">
						{features.map((f) => (
							<Reveal key={f.title}>
								<div className="card">
									<h3>{f.title}</h3>
									<p>{f.body}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section className={styles.closing}>
				<div className="wrap">
					<Reveal>
						<p>
							Whether it&apos;s a weekend getaway or a day-long picnic, our
							excursions are designed to refresh your mind, body and soul.
							Explore our upcoming excursions and book your spot for an
							unforgettable experience.
						</p>
					</Reveal>
				</div>
			</section>

			<section className={styles.formSection} id="sign-up">
				<div className="wrap">
					<div className={styles.form}>
						<Reveal>
							<div className="section-head">
								<span className="eyebrow">Sign Up</span>
								<h2>Join Our Next Excursion</h2>
								<p className="lead">
									Fill in your details below and we&apos;ll get in touch
									with upcoming excursion plans.
								</p>
							</div>
						</Reveal>

						{formError && (
							<div className={styles.errorBanner}>{formError}</div>
						)}

						{submitted ? (
							<div className={styles.success}>
								<h3>Thank You!</h3>
								<p>
									We&apos;ve received your sign-up. We&apos;ll reach out
									soon with details about upcoming excursions.
								</p>
							</div>
						) : (
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
												picnicSchema.shape.fullName,
											),
										}}
									/>
									<FormField
										form={form}
										name="email"
										label="Email"
										type="email"
										validators={{
											onChange: zodField(picnicSchema.shape.email),
										}}
									/>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="phoneNumber"
										label="Phone Number"
										type="tel"
										placeholder="10-digit number"
										validators={{
											onChange: zodField(
												picnicSchema.shape.phoneNumber,
											),
										}}
									/>
									<FormField
										form={form}
										name="currentLocation"
										label="Current Location"
										validators={{
											onChange: zodField(
												picnicSchema.shape.currentLocation,
											),
										}}
									/>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="gender"
										label="Gender"
										as="select"
										placeholder="Select"
										options={[
											{ value: "Male", label: "Male" },
											{ value: "Female", label: "Female" },
											{ value: "Other", label: "Other" },
										]}
										validators={{
											onChange: zodField(picnicSchema.shape.gender),
										}}
									/>
									<FormField
										form={form}
										name="weight"
										label="Weight"
										placeholder="e.g. 65 kg"
										validators={{
											onChange: zodField(picnicSchema.shape.weight),
										}}
									/>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="emergencyContactName"
										label="Emergency Contact Name & Relation"
										placeholder="e.g. Amrutha / Wife"
										validators={{
											onChange: zodField(
												picnicSchema.shape.emergencyContactName,
											),
										}}
									/>
									<FormField
										form={form}
										name="emergencyContactNumber"
										label="Emergency Contact Number"
										type="tel"
										placeholder="10-digit number"
										validators={{
											onChange: zodField(
												picnicSchema.shape.emergencyContactNumber,
											),
										}}
									/>
								</div>

								<div className={styles.row}>
									<div className={styles.full}>
										<FormField
											form={form}
											name="healthConditions"
											label="Health Conditions"
											as="textarea"
											placeholder="Mention any health conditions or write 'None'"
											validators={{
												onChange: zodField(
													picnicSchema.shape.healthConditions,
												),
											}}
										/>
									</div>
								</div>

								<div className={styles.row}>
									<FormField
										form={form}
										name="dietaryPreferences"
										label="Preferred Dietary Preferences"
										as="select"
										placeholder="Select"
										options={[
											{ value: "Vegetarian", label: "Vegetarian" },
											{
												value: "Non Vegetarian",
												label: "Non Vegetarian",
											},
											{ value: "Eggetarian", label: "Eggetarian" },
										]}
										validators={{
											onChange: zodField(
												picnicSchema.shape.dietaryPreferences,
											),
										}}
									/>
								</div>

								<div className={styles.submitRow}>
									<SubmitButton isSubmitting={form.state.isSubmitting}>
										Sign Up for Excursion
									</SubmitButton>
								</div>
							</form>
						)}
					</div>
				</div>
			</section>

			<section className="band">
				<div
					className="wrap"
					style={{ textAlign: "center", padding: "48px 20px" }}
				>
					<Reveal>
						<span className="eyebrow">Join Us</span>
						<h2>Ready for an Unforgettable Experience?</h2>
						<p className="lead" style={{ color: "#dce2ce" }}>
							Join us for our next excursion and discover the joy of
							combining yoga with outdoor adventure.
						</p>
						<div className="final-cta">
							<a href="#sign-up" className="btn btn-light">
								Sign Up Now
							</a>
						</div>
					</Reveal>
				</div>
			</section>
		</main>
	);
}
