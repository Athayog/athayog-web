import { z } from "zod";

export const strings = {
	/** Required name: 2-80 chars */
	name: z.string().min(2, "Name must be at least 2 characters").max(80),
	/** Required email */
	email: z.string().email("Please enter a valid email address"),
	/** 10-digit Indian phone number */
	phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
	/** Required message: 10-2000 chars */
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message is too long"),
};

export const optional = {
	email: z
		.string()
		.email("Please enter a valid email address")
		.optional()
		.or(z.literal("")),
	phone: z
		.string()
		.regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
		.optional()
		.or(z.literal("")),
	message: z.string().max(2000, "Message is too long").optional().or(z.literal("")),
};
