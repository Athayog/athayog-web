"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@tanstack/react-form-nextjs";
import { FormField } from "@/components/forms/FormField";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import useAuthStore from "@/store/useAuthStore";
import { Check } from "lucide-react";
import styles from "@/components/landing/YogaProgramHeroSection.module.css";

interface YogaProgramHeroProps {
	title: string;
	description: string;
	features: string[];
	ctaButtonText: string;
	submitButtonText: string;
	submittingButtonText: string;
	formSubmitUrl: string;
	namePlaceholder: string;
	emailPlaceholder: string;
	phonePlaceholder: string;
	messagePlaceholder: string;
	successMessage: string;
	errorMessage: string;
	backgroundImage: string;
	ctaButtonHref: string;
	formKey: string;
}

export default function YogaProgramHeroSection({
	title,
	description,
	features,
	ctaButtonText,
	submitButtonText,
	submittingButtonText,
	formSubmitUrl,
	namePlaceholder,
	emailPlaceholder,
	phonePlaceholder,
	messagePlaceholder,
	successMessage,
	errorMessage,
	backgroundImage,
	ctaButtonHref,
	formKey,
}: YogaProgramHeroProps) {
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const userSnapshot = useAuthStore((s) => s.userSnapshot);

	const form = useForm({
		defaultValues: {
			name: userSnapshot?.displayName || "",
			email: userSnapshot?.email || "",
			phone: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			setStatus("idle");
			try {
				const res = await fetch(formSubmitUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ collection: formKey, data: value }),
				});
				if (!res.ok) throw new Error();
				setStatus("success");
			} catch {
				setStatus("error");
			}
		},
	});

	return (
		<section className={styles.hero}>
			<Image
				src={backgroundImage}
				alt=""
				fill
				style={{ objectFit: "cover" }}
				priority
			/>
			<div className={styles.overlay} />
			<div className={styles.inner}>
				<div className={styles.infoCard}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.description}>{description}</p>
					{features.length > 0 && (
						<ul className={styles.featureList}>
							{features.map((feat) => (
								<li key={feat} className={styles.featureItem}>
									<span className={styles.checkIcon}>
										<Check size={16} strokeWidth={3} />
									</span>
									{feat}
								</li>
							))}
						</ul>
					)}
					<Link href={ctaButtonHref} className={styles.btnPrimary}>
						{ctaButtonText}
					</Link>
				</div>

				<div className={styles.formCard}>
					{status === "success" ? (
						<div className={styles.statusMessage}>{successMessage}</div>
					) : (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className={styles.form}
						>
							<h2 className={styles.formTitle}>Enquire Now</h2>
							<FormField
								form={form}
								name="name"
								label="Name"
								placeholder={namePlaceholder}
								validators={{
									onBlur: zodField(strings.name),
								}}
							/>
							<FormField
								form={form}
								name="email"
								label="Email"
								type="email"
								placeholder={emailPlaceholder}
								validators={{
									onBlur: zodField(strings.email),
								}}
							/>
							<FormField
								form={form}
								name="phone"
								label="Phone"
								type="tel"
								placeholder={phonePlaceholder}
								validators={{
									onBlur: zodField(strings.phone),
								}}
							/>
							<FormField
								form={form}
								name="message"
								label="Message"
								as="textarea"
								placeholder={messagePlaceholder}
								validators={{
									onBlur: zodField(strings.message),
								}}
							/>
							{status === "error" && (
								<p className={styles.errorText}>{errorMessage}</p>
							)}
							<SubmitButton isSubmitting={form.state.isSubmitting}>
								{form.state.isSubmitting
									? submittingButtonText
									: submitButtonText}
							</SubmitButton>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
