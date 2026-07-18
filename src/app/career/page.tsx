"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { FormField } from "@/components/forms/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { strings, optional } from "@/lib/forms/schemas";
import { uploadFormFile } from "@/lib/forms/upload";
import styles from "./Career.module.css";

const careerSchema = z.object({
	fullName: strings.name,
	email: strings.email,
	phone: strings.phone,
	currentLocation: z.string().min(1, "Location is required"),
	designation: z.string().min(1, "Select a designation"),
	currentCompany: z.string().min(1, "Company is required"),
	experienceInYears: z.string().min(1, "Experience is required"),
	currentCTC: z.string().min(1, "Current CTC is required"),
	expectedCTC: z.string().min(1, "Expected CTC is required"),
	noticePeriod: z.string().min(1, "Notice period is required"),
	willingToRelocate: z.string().min(1, "Select an option"),
	offerInHand: z.string().min(1, "Select an option"),
	flexibleWithSplitShift: z.string().min(1, "Select an option"),
	questionsOrComments: optional.message,
});

const yesNoOptions = [
	{ value: "Yes", label: "Yes" },
	{ value: "No", label: "No" },
];

const designationOptions = [
	{ value: "Yoga Teacher", label: "Yoga Teacher" },
	{ value: "Center Manager", label: "Center Manager" },
	{ value: "Sales Executive", label: "Sales Executive" },
	{ value: "Graphic Designer", label: "Graphic Designer" },
];

export default function CareerPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			currentLocation: "",
			designation: "",
			currentCompany: "",
			experienceInYears: "",
			currentCTC: "",
			expectedCTC: "",
			noticePeriod: "",
			willingToRelocate: "",
			offerInHand: "",
			flexibleWithSplitShift: "",
			questionsOrComments: "",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			resumeFile: null as any,
		},
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				let resumeUrl = "";

				if (value.resumeFile instanceof File) {
					resumeUrl = await uploadFormFile(value.resumeFile);
				} else {
					throw new Error("Please upload your resume");
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { resumeFile, ...data } = value;

				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "resume",
						data: { ...data, resumeUrl },
						email: {
							to: "info@athayogliving.com",
							subject: `New Career Application — ${value.fullName}`,
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

	if (submitted) {
		return (
			<section className={styles.page}>
				<div className="wrap">
					<div className={styles.success}>
						<span className="eyebrow">Thank You</span>
						<h2>Application Submitted</h2>
						<p className="lead">
							We&apos;ve received your application and will review it
							shortly. If your profile matches, our team will reach out.
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.page}>
			<div className="wrap">
				<div className={styles.container}>
					<div className={styles.head}>
						<span className="eyebrow">Join Our Team</span>
						<h2>Athayog Career</h2>
						<p className="lead">Shape Your Career in Wellness with Us</p>
					</div>

					<div className={styles.content}>
						<div className={styles.contentSection}>
							<h3 className={styles.contentTitle}>
								Spreading the Yogic way of life in the modern world
							</h3>
							<p className={styles.contentText}>
								AthaYog Living Academy is committed to transform
								people&apos;s lives through the traditional teachings of
								Yoga. We educate everyone in our space, online, onsite and
								even in the corporate world to seek their true potential
								through the tools of the ancient wisdom.
							</p>
						</div>

						<div className={styles.contentSection}>
							<h3 className={styles.contentTitle}>
								Life At Athayog Living / Working At Athayog Living
							</h3>
							<p className={styles.contentText}>
								We are a dynamic team of young, energetic and diverse
								individuals united by our shared love for Yoga. We strive
								hard to guide people who join our academy with
								transformative tools of Yoga.
							</p>
							<p className={styles.contentText}>
								Our day starts early as we educate different groups of
								people across Bangalore providing them with time, space
								and guidance to embody the practice of Yoga in the modern
								lifestyle. When we are not teaching, we practice, learn,
								share our knowledge and stay updated to be our best selves
								as educators for our members who show up on their mats
								every single day.
							</p>
						</div>

						<div className={styles.contentSection}>
							<h3 className={styles.contentTitle}>
								Why Choose To Work At Athayog?
							</h3>
							<p className={styles.contentText}>
								As an organisation that provides wellness and education,
								we evolve everyday being around people and learning from
								them in return as we guide them through their personal
								journey. When you work at AthaYog Living, you receive as
								much as you share, you learn as much as you guide people
								and an abundance of transformation happens within
								yourself. That&apos;s what the power of Yoga does when you
								spread the teachings to people who truly seek. And as you
								help people get closer to their true selves, you discover
								more about yourself whether you are inside the class or
								outside guiding people.
							</p>
						</div>
					</div>

					{formError && <div className={styles.errorBanner}>{formError}</div>}

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div className={styles.section}>
							<h3 className={styles.sectionTitle}>Personal Information</h3>

							<div className={styles.row}>
								<div className={styles.full}>
									<FormField
										form={form}
										name="fullName"
										label="Full Name"
										validators={{
											onChange: zodField(
												careerSchema.shape.fullName,
											),
										}}
									/>
								</div>
							</div>

							<div className={styles.row}>
								<FormField
									form={form}
									name="email"
									label="Email"
									type="email"
									validators={{
										onChange: zodField(careerSchema.shape.email),
									}}
								/>
								<FormField
									form={form}
									name="phone"
									label="Phone Number"
									type="tel"
									validators={{
										onChange: zodField(careerSchema.shape.phone),
									}}
								/>
							</div>

							<div className={styles.row}>
								<div className={styles.full}>
									<FormField
										form={form}
										name="currentLocation"
										label="Current Location"
										validators={{
											onChange: zodField(
												careerSchema.shape.currentLocation,
											),
										}}
									/>
								</div>
							</div>
						</div>

						<hr className={styles.divider} />

						<div className={styles.section}>
							<h3 className={styles.sectionTitle}>Work Information</h3>

							<div className={styles.row}>
								<div className={styles.full}>
									<FormField
										form={form}
										name="designation"
										label="Designation Applying For"
										as="select"
										placeholder="Select Designation"
										options={designationOptions}
										validators={{
											onChange: zodField(
												careerSchema.shape.designation,
											),
										}}
									/>
								</div>
							</div>

							<div className={styles.row}>
								<FormField
									form={form}
									name="currentCompany"
									label="Current Company"
									validators={{
										onChange: zodField(
											careerSchema.shape.currentCompany,
										),
									}}
								/>
								<FormField
									form={form}
									name="experienceInYears"
									label="Experience (Years)"
									validators={{
										onChange: zodField(
											careerSchema.shape.experienceInYears,
										),
									}}
								/>
							</div>

							<div className={styles.row}>
								<FormField
									form={form}
									name="currentCTC"
									label="Current CTC"
									validators={{
										onChange: zodField(careerSchema.shape.currentCTC),
									}}
								/>
								<FormField
									form={form}
									name="expectedCTC"
									label="Expected CTC"
									validators={{
										onChange: zodField(
											careerSchema.shape.expectedCTC,
										),
									}}
								/>
							</div>

							<div className={styles.row}>
								<FormField
									form={form}
									name="noticePeriod"
									label="Notice Period"
									validators={{
										onChange: zodField(
											careerSchema.shape.noticePeriod,
										),
									}}
								/>
								<FormField
									form={form}
									name="willingToRelocate"
									label="Willing to Relocate"
									as="select"
									placeholder="Select"
									options={yesNoOptions}
									validators={{
										onChange: zodField(
											careerSchema.shape.willingToRelocate,
										),
									}}
								/>
							</div>

							<div className={styles.row}>
								<FormField
									form={form}
									name="offerInHand"
									label="Any Offer in Hand?"
									as="select"
									placeholder="Select"
									options={yesNoOptions}
									validators={{
										onChange: zodField(
											careerSchema.shape.offerInHand,
										),
									}}
								/>
								<FormField
									form={form}
									name="flexibleWithSplitShift"
									label="Flexible with Split Shift?"
									as="select"
									placeholder="Select"
									options={yesNoOptions}
									validators={{
										onChange: zodField(
											careerSchema.shape.flexibleWithSplitShift,
										),
									}}
								/>
							</div>

							<div className={styles.row}>
								<div className={styles.full}>
									<FormField
										form={form}
										name="questionsOrComments"
										label="Questions or Comments"
										as="textarea"
										hint="Optional"
									/>
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.full}>
									<FormField
										form={form}
										name="resumeFile"
										label="Upload Resume"
										as="file"
										accept=".pdf"
										maxSizeMb={5}
										hint="PDF only, max 5MB"
									/>
								</div>
							</div>
						</div>

						<div className={styles.submitRow}>
							<SubmitButton isSubmitting={form.state.isSubmitting}>
								Submit Application
							</SubmitButton>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
