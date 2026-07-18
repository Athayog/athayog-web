"use client";

/**
 * We use `any` here instead of properly typing the form/field generics
 * because TanStack Form v1's type system has 20+ deeply nested type
 * parameters that all infer from each other at the `useForm` call site.
 * Passing them all through a reusable wrapper component would make the
 * type signature longer than the component logic with no practical benefit
 * — the consumer's `useForm` already provides full type safety at the call
 * site.
 */

type FormFieldProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any;
	name: string;
	label: string;
	hint?: string;
	type?: "text" | "email" | "tel" | "number" | "url";
	as?: "input" | "textarea" | "select" | "file";
	placeholder?: string;
	options?: { value: string; label: string }[];
	accept?: string;
	maxSizeMb?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	validators?: any;
};

export function FormField({
	form,
	name,
	label,
	hint,
	type = "text",
	as = "input",
	placeholder,
	options,
	accept,
	maxSizeMb,
	validators,
}: FormFieldProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Field = form.Field as any;

	return (
		<Field name={name} validators={validators}>
			{
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(field: any) => {
					const errors: string[] = field.state.meta.errors || [];
					const hasError = errors.length > 0;

					return (
						<div className="field">
							<label className="field-label" htmlFor={name}>
								{label}
							</label>
							{as === "textarea" ? (
								<textarea
									id={name}
									className={`textarea ${hasError ? "error" : ""}`}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder={placeholder}
									rows={4}
								/>
							) : as === "select" ? (
								<select
									id={name}
									className={`input ${hasError ? "error" : ""}`}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								>
									<option value="" disabled>
										{placeholder || "Select…"}
									</option>
									{options?.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							) : as === "file" ? (
								<>
									<label
										htmlFor={name}
										className="btn btn-ghost"
										style={{
											cursor: "pointer",
											alignSelf: "flex-start",
										}}
									>
										{field.state.value?.name
											? "Change File"
											: "Choose File"}
									</label>
									{field.state.value?.name && (
										<span
											style={{
												fontSize: "0.85rem",
												color: "var(--ink)",
												opacity: 0.7,
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "nowrap",
												maxWidth: "100%",
											}}
										>
											{field.state.value.name}
										</span>
									)}
									<input
										id={name}
										className={`input ${hasError ? "error" : ""}`}
										type="file"
										accept={accept}
										onChange={(e) => {
											const file = e.target.files?.[0] || null;
											const maxBytes =
												(maxSizeMb || 5) * 1024 * 1024;
											if (file && file.size > maxBytes) {
												return;
											}
											field.handleChange(file);
										}}
										onBlur={field.handleBlur}
										style={{ display: "none" }}
									/>
								</>
							) : (
								<input
									id={name}
									className={`input ${hasError ? "error" : ""}`}
									type={type}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									placeholder={placeholder}
								/>
							)}
							{hint && !hasError && (
								<span className="field-hint">{hint}</span>
							)}
							{hasError && (
								<span className="field-error">{errors.join(", ")}</span>
							)}
						</div>
					);
				}
			}
		</Field>
	);
}
