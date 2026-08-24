"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import { FormField } from "@/components/forms/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import styles from "@/app/contact-us/ContactUs.module.css";

const contactSchema = z.object({
	name: strings.name,
	email: strings.email,
	phone: strings.phone,
	message: strings.message,
});

export default function ContactUsPage() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", email: "", phone: "", message: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "contactMessages",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Contact Message: ${value.name}`,
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
			<main className={styles.page}>
				<div className="wrap">
					<div className={styles.success}>
						<span className="eyebrow">Thank You</span>
						<h2>Message Sent</h2>
						<p className="lead">
							We&apos;ve received your message and will get back to you
							within 24 hours.
						</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.page}>
			<div className="wrap">
				<div className={styles.grid}>
					<div className={styles.left}>
						<div>
							<span className="eyebrow">Get In Touch</span>
							<h1>Let&apos;s talk with us</h1>
							<p className="lead">
								Join AthaYog&apos;s exclusive contact sessions tailored,
								one-on-one guidance to deepen your practice and achieve
								personalised yoga goals. Connect with our experts today!
							</p>
						</div>

						<div className={styles.contactList}>
							<div className={styles.contactItem}>
								<MapPin className={styles.icon} />
								<span>
									No.3293, 1st floor, 12th main, HAL 2nd stage,
									Indiranagar, Bengaluru, Karnataka - 560038
								</span>
							</div>

							<div className={styles.contactItem}>
								<Phone className={styles.icon} />
								<a href="tel:+919611771434">+91 9611771434</a>
							</div>

							<div className={styles.contactItem}>
								<Mail className={styles.icon} />
								<a href="mailto:info@athayogliving.com">
									info@athayogliving.com
								</a>
							</div>
						</div>
					</div>

					<div className={styles.formCard}>
						<h3>Send a Message</h3>

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
							<FormField
								form={form}
								name="name"
								label="Name"
								validators={{
									onChange: zodField(contactSchema.shape.name),
								}}
							/>

							<FormField
								form={form}
								name="email"
								label="Email"
								type="email"
								validators={{
									onChange: zodField(contactSchema.shape.email),
								}}
							/>

							<FormField
								form={form}
								name="phone"
								label="Phone Number"
								type="tel"
								hint="We will not spam you"
								validators={{
									onChange: zodField(contactSchema.shape.phone),
								}}
							/>

							<FormField
								form={form}
								name="message"
								label="Message"
								as="textarea"
								validators={{
									onChange: zodField(contactSchema.shape.message),
								}}
							/>

							<div className={styles.submitRow}>
								<form.Subscribe selector={(s) => s.isSubmitting}>
									{(isSubmitting) => (
										<SubmitButton isSubmitting={isSubmitting}>
											Send Details
										</SubmitButton>
									)}
								</form.Subscribe>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
