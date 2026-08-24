import "server-only";
import { Resend } from "resend";

interface SendFormEmailParams {
	to: string;
	subject: string;
	data: Record<string, unknown>;
	collection: string;
}

let resend: Resend | null = null;

function getResend(): Resend | null {
	if (!process.env.RESEND_API_KEY) return null;
	if (!resend) {
		resend = new Resend(process.env.RESEND_API_KEY);
	}
	return resend;
}

export async function sendFormEmail({
	to,
	subject,
	data,
	collection,
}: SendFormEmailParams) {
	const client = getResend();
	if (!client) return;

	const rows = Object.entries(data)
		.filter(([, v]) => v !== undefined && v !== null && v !== "")
		.map(
			([key, value]) =>
				`<tr><td style="padding:8px 12px;border-bottom:1px solid #e8e3d3;font-weight:500;color:#566b3f;white-space:nowrap;vertical-align:top">${escapeHtml(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #e8e3d3;color:#2b2e24">${escapeHtml(String(value))}</td></tr>`,
		)
		.join("");

	const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#fcfaf3;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e8e3d3">
    <div style="background:#566b3f;padding:20px 24px">
      <h2 style="margin:0;color:#f5f3ea;font-size:1.2rem">${escapeHtml(subject)}</h2>
      <p style="margin:4px 0 0;color:#aec28e;font-size:0.85rem">Collection: ${escapeHtml(collection)}</p>
    </div>
    <div style="padding:16px 0">
      <table style="width:100%;border-collapse:collapse;font-size:0.9rem">${rows}</table>
    </div>
  </div>
</body>
</html>`;

	try {
		await client.emails.send({
			from: "Athayog Living <noreply@athayogliving.com>",
			to,
			subject,
			html,
		});
	} catch (err) {
		// Email delivery failure should not break form submission,
		// but it must be visible in logs (otherwise leads go silent).
		console.error(`[email] failed to send "${subject}" to ${to}:`, err);
	}
}

function escapeHtml(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
