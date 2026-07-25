"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import { SubmitButton } from "@/components/forms/SubmitButton";
import styles from "@/app/Home.module.css";

const newsletterSchema = z.object({
	name: strings.name,
	email: strings.email,
});

export default function NewsletterForm() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", email: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "newsletter",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Newsletter Signup — ${value.name}`,
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
			<div style={{ textAlign: "center" }}>
				<h3
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "1.8rem",
						color: "var(--cream)",
						marginBottom: 8,
					}}
				>
					You&apos;re In
				</h3>
				<p style={{ color: "#f0f3e9", fontSize: "0.95rem" }}>
					Welcome to the Athayog community. We&apos;ll send you yoga tips,
					wellness insights and special offers.
				</p>
			</div>
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
				validators={{ onChange: zodField(newsletterSchema.shape.name) }}
			>
				{(field) => (
					<div>
						<input
							type="text"
							placeholder="Your name"
							aria-label="Your name"
							className={styles.lmInput}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span style={{ fontSize: "0.78rem", color: "#f5f3ea" }}>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="email"
				validators={{ onChange: zodField(newsletterSchema.shape.email) }}
			>
				{(field) => (
					<div>
						<input
							type="email"
							placeholder="Email address"
							aria-label="Email address"
							className={styles.lmInput}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span style={{ fontSize: "0.78rem", color: "#f5f3ea" }}>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<SubmitButton
				isSubmitting={form.state.isSubmitting}
				className="btn btn-cream"
			>
				Begin Your Mindful Journey
			</SubmitButton>
			<span className={styles.lmMini}>No spam — just wellness, in your inbox.</span>
		</form>
	);
}
