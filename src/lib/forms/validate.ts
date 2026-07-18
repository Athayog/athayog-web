import type { z } from "zod";

export function zodField<T extends z.ZodTypeAny>(schema: T) {
	return ({ value }: { value: unknown }) => {
		const result = schema.safeParse(value);
		if (!result.success) {
			return result.error.issues.map((i) => i.message);
		}
		return undefined;
	};
}
