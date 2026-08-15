# Athayog Living — Web Platform

Yoga and wellness platform for Athayog Living, built with Next.js 16.

## Documentation

The full technical documentation lives in [`docs/`](docs/README.md): architecture,
auth & security, payments, forms, content/SEO, deployment, and a workflow guide
for AI agents. **Read the docs before changing any flow, and update them when
you do.**

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)  |
| Language      | TypeScript                          |
| Styling       | CSS custom properties + CSS Modules |
| Auth          | Firebase Auth (Google + Phone OTP)  |
| Database      | Firestore                           |
| CMS           | Prismic                             |
| Payments      | Razorpay                            |
| Email         | Resend                              |
| Testing       | Vitest + Testing Library            |
| UI Primitives | Radix UI                            |

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start dev server (port 3000)          |
| `npm run build`        | Lint + test + build (production)      |
| `npm run check`        | Format check + lint + test (no build) |
| `npm run lint`         | ESLint                                |
| `npm run format`       | Prettier format                       |
| `npm run format:check` | Prettier check only                   |
| `npm test`             | Run tests once                        |
| `npm run test:watch`   | Run tests in watch mode               |
| `npm run plans:seed`   | Seed Razorpay plans to Firestore      |
| `npm run plans:check`  | Verify plans in Firestore             |

## Project Structure

```
src/
├── app/                    # Pages and API routes
│   ├── (protected)/        # Auth-gated routes (account)
│   ├── api/                # API routes (auth, payments, forms)
│   ├── blogs/              # Prismic blog integration
│   └── athayog-app/        # Mobile app legal pages
├── components/             # Shared UI components
│   ├── forms/              # FormField, SubmitButton
│   └── payments/           # PaymentModal (Razorpay)
├── constants/              # Navigation, config
├── hooks/                  # Custom hooks (useReveal, useGoogleOneTap)
├── lib/                    # Firebase, auth, forms, Razorpay
├── slices/                 # Prismic slice components
├── store/                  # Zustand stores (auth)
└── proxy.ts                # Route protection (Next.js proxy)
```

## Environment Variables

See `.env.example` for all required variables. Key groups:

- **Firebase Client**: `NEXT_PUBLIC_FIREBASE_*`
- **Firebase Admin**: `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- **Prismic**: `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME`
- **Razorpay**: `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- **Email**: `RESEND_API_KEY`

## Deployment

Deployed on Vercel. Production: [athayogliving.com](https://athayogliving.com)

Firestore indexes must be deployed separately:

```bash
npx firebase deploy --only firestore:indexes
```

Razorpay webhook must be configured in Razorpay Dashboard (Settings → Webhooks).

## License

Proprietary — All Rights Reserved. See [LICENSE](LICENSE).
