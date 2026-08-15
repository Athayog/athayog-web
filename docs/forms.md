# Forms (lead capture & contact)

All forms on the site (trial classes, contact, career, newsletter, picnic,
landing pages, account-deletion request) share one pipeline:

**Client**: TanStack Form v1 (`@tanstack/react-form-nextjs`) + Zod validators →
**Server**: `POST /api/submit-form` (Zod re-validation → Firestore write →
optional Resend email).

## Source files

| File                                    | Role                                                   |
| --------------------------------------- | ------------------------------------------------------ |
| `src/lib/forms/schemas.ts`              | Reusable Zod fragments (`strings.*`, `optional.*`)     |
| `src/lib/forms/validate.ts`             | `zodField(schema)` → TanStack validator                |
| `src/components/forms/FormField.tsx`    | Label + input/textarea/select + hint + error           |
| `src/components/forms/SubmitButton.tsx` | Submit button with loading state                       |
| `src/lib/forms/upload.ts`               | Client file upload to Firebase Storage                 |
| `src/lib/forms/email.ts`                | Server: HTML email via Resend (lazy, non-blocking)     |
| `src/app/api/submit-form/route.ts`      | Server endpoint: rate limit → validate → write → email |

## Client side

Every form uses the same pattern:

```tsx
const form = useForm({
	defaultValues: { name: "", email: "", phone: "" },
	validators: { onChange: { name: zodField(strings.name) /* ... */ } },
	onSubmit: async ({ value }) => {
		await fetch("/api/submit-form", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ collection: "trialClasses", data: value }),
		});
	},
});
// <FormField form={form} name="name" label="Name" />
// <SubmitButton isSubmitting={form.state.isSubmitting}>Send</SubmitButton>
```

- `useForm` **must** be imported from `@tanstack/react-form-nextjs` (not the
  plain `@tanstack/react-form` package).
- File inputs (`as="file"` on FormField) upload via `uploadFormFile(file)` from
  `lib/forms/upload.ts` → returns a download URL stored in the submitted data
  (e.g. resume URL in the career form).

## Server side (`POST /api/submit-form`)

1. **Rate limit** (best-effort): in-memory `Map` keyed by client IP
   (`x-forwarded-for`), max 5 requests per 60s → `429`.
   ⚠️ In-memory means it resets per serverless instance and can be bypassed;
   acceptable for a lead form, not a security boundary.
2. **Validate**: `bodySchema` — `collection` must be one of the 16 allowed
   names (Zod enum), `data` is a record. Returns `400` with Zod issues on
   failure.
3. **Write**: `db.collection(collection).add({ ...data, createdAt })`.
4. **Email**: if the collection has a configured subject (`formConfigs`), sends
   a formatted HTML table of the fields to `info@athayogliving.com` via Resend.
   Email failures are swallowed (form submission must not fail because of
   email). `sendFormEmail` no-ops when `RESEND_API_KEY` is missing.
5. Returns `201 { success: true }`.

### Collection registry (keep in sync!)

| Collection (`collection` value) | Email subject                   | Used by                                                 |
| ------------------------------- | ------------------------------- | ------------------------------------------------------- |
| `aerialTrial`                   | New Aerial Yoga Booking         | `/aerial-yoga-indiranagar` MagnetForm                   |
| `contactMessages`               | New Contact Message             | `/contact-us`                                           |
| `enquiries`                     | New Enquiry                     | EnquireModal (TTC pages)                                |
| `groupTrial`                    | New Group Trial                 | `/group-classes-indiranagar` MagnetForm                 |
| `newsletter`                    | New Newsletter Signup           | NewsletterForm (homepage footer area)                   |
| `personalAdsLead`               | New Personal Yoga Training Lead | `/ld/personal-yoga-training-indiranagar-ads` PYTAdsForm |
| `picnicForm`                    | New Picnic Sign Up              | `/picnics`                                              |
| `resume`                        | New Career Application          | `/career` (includes resume file URL)                    |
| `trialClasses`                  | New Trial Class                 | `/trial-classes`                                        |
| `deleteAccount`                 | _(no email)_                    | `/account/delete-request`                               |
| `group_classes_indiranagar`     | _(no email)_                    | legacy landing form                                     |
| `personal_training_indiranagar` | _(no email)_                    | legacy landing form                                     |
| `ryt200_non_residential`        | _(no email)_                    | legacy landing form                                     |
| `ryt_residential`               | _(no email)_                    | legacy landing form                                     |
| `ttc_online`                    | _(no email)_                    | legacy landing form                                     |

**Both** the Zod `collectionSchema` enum and the `formConfigs` map live in
`src/app/api/submit-form/route.ts`. If you add a form, add it to both.

## How to add a new form

1. Add Zod fields to `src/lib/forms/schemas.ts` (or reuse `strings.*` /
   `optional.*`).
2. Build the page form with `useForm` + `FormField` + `SubmitButton` (see any
   existing page, e.g. `src/app/contact-us/page.tsx`).
3. Register the collection in `src/app/api/submit-form/route.ts`:
    - add the name to `collectionSchema` (z.enum),
    - add `{ subject: "..." }` to `formConfigs` if it should email.
4. Add a test under `src/app/api/submit-form/__tests__/` (existing tests cover
   validation, rate limit, email).
5. Update this table. Run `npm run format` + `npm run build`.

## Notes & caveats

- The rate limiter is per-instance memory — fine for abuse damping, not a
  real protection against distributed spam. Consider Firestore/Upstash-based
  limiting if it becomes a problem.
- Form data is stored **unencrypted** in Firestore and emailed. Do not collect
  sensitive data (payment details, government IDs) through forms.
- The career form uploads files to Firebase Storage under `uploads/`; rules
  should restrict uploads (size/type).
