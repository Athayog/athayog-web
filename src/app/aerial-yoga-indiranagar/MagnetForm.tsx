"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";
import { zodField } from "@/lib/forms/validate";
import { strings } from "@/lib/forms/schemas";
import styles from "@/app/aerial-yoga-indiranagar/AerialYoga.module.css";

const magnetSchema = z.object({
	name: strings.name,
	phone: strings.phone,
	preferredTime: z.string().min(1, "Please enter your preferred slot"),
});

export default function MagnetForm() {
	const [submitted, setSubmitted] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { name: "", phone: "", preferredTime: "" },
		onSubmit: async ({ value }) => {
			setFormError(null);
			try {
				const res = await fetch("/api/submit-form", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						collection: "aerialTrial",
						data: value,
						email: {
							to: "info@athayogliving.com",
							subject: `New Aerial Yoga Booking: ${value.name}`,
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
					Slot Reserved
				</h3>
				<p style={{ color: "#f0f3e9", fontSize: "0.95rem" }}>
					We&apos;ll contact you within 24 hours to confirm your aerial yoga
					session at our Indiranagar studio.
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
				validators={{ onChange: zodField(magnetSchema.shape.name) }}
			>
				{(field) => (
					<div>
						<input
							type="text"
							placeholder="Your name"
							aria-label="Your name"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="phone"
				validators={{ onChange: zodField(magnetSchema.shape.phone) }}
			>
				{(field) => (
					<div>
						<input
							type="tel"
							placeholder="WhatsApp / phone number"
							aria-label="Phone number"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<form.Field
				name="preferredTime"
				validators={{
					onChange: zodField(magnetSchema.shape.preferredTime),
				}}
			>
				{(field) => (
					<div>
						<input
							type="text"
							placeholder="Preferred slot (Fri 7:30 PM / Sun 10:30 AM)"
							aria-label="Preferred slot"
							className={
								field.state.meta.errors?.length
									? styles.lmInputError
									: styles.lmInput
							}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						{field.state.meta.errors?.length > 0 && (
							<span
								style={{
									fontSize: "0.78rem",
									color: "#f5f3ea",
									marginTop: 2,
								}}
							>
								{field.state.meta.errors.join(", ")}
							</span>
						)}
					</div>
				)}
			</form.Field>

			<button
				type="submit"
				className="btn btn-cream"
				disabled={form.state.isSubmitting}
				style={{ justifyContent: "center" }}
			>
				{form.state.isSubmitting ? "Submitting…" : "Reserve My Slot"}
			</button>
			<span className={styles.lmMini}>
				Or call / WhatsApp <strong>96117 71434</strong>, and we&apos;ll confirm
				right away.
			</span>
		</form>
	);
}
