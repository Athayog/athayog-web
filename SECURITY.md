# Security Policy

## Supported Versions

This project is actively maintained on the current production version deployed by Athayog Living.

| Version                    | Supported |
| -------------------------- | --------- |
| Current production version | ✅        |
| Older versions             | ❌        |

## Security Measures

The application includes:

- Firebase Authentication with Google sign-in and Phone OTP support.
- HTTP-only, secure session cookies for authenticated users.
- Server-side protection for account routes.
- Server-side Razorpay payment verification using HMAC signatures.
- Firestore server-side validation for payment plans and amounts.
- Firebase Admin SDK access restricted to server-side code.
- Zod validation for submitted forms.
- Rate limiting for public form submissions.
- Restricted Firestore access through Firebase Security Rules.
- Automated linting, testing, and production build checks.

## Reporting a Vulnerability

Please report security vulnerabilities privately by emailing:

**harsimransinghbarki@gmail.com**

Please include:

- A clear description of the issue.
- Steps to reproduce it.
- The affected page, API route, or feature.
- Any relevant screenshots, logs, or proof of concept.
- The potential impact of the vulnerability.

Please do not publicly disclose the issue until it has been reviewed and addressed.

We will acknowledge valid reports as soon as possible and provide updates during the investigation. Reports that are unrelated to security, require access to private credentials, or are already publicly documented may be closed without a fix.

## Sensitive Information

Do not include passwords, Firebase private keys, Razorpay secrets, API keys, or other confidential credentials in public issues or pull requests.
