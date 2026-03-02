import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeString(value: unknown, max = 4000): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);
}

function safeHeader(value: unknown, max = 200): string {
  return safeString(value, max).replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    if (char === '"') return "&quot;";
    return "&#39;";
  });
}

function safeHtml(value: unknown, max = 4000): string {
  return escapeHtml(safeString(value, max));
}

function readEnv(name: string): string {
  return String(import.meta.env[name] ?? "").trim();
}

function getClientIp(request: Request, clientAddress?: string): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return clientAddress || "unknown";
}

function rateLimit(
  key: string,
  max = 10,
  windowMs = 10 * 60 * 1000,
): boolean {
  const now = Date.now();
  const existing = RATE_LIMIT.get(key);

  if (!existing || now > existing.resetAt) {
    RATE_LIMIT.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= max) return false;

  existing.count += 1;
  return true;
}

async function getTransporter() {
  const host = readEnv("SMTP_HOST");
  const user = readEnv("SMTP_USER");
  const pass = readEnv("SMTP_PASS");

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(readEnv("SMTP_PORT") || 587),
    secure: readEnv("SMTP_SECURE") === "true",
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = getClientIp(request, clientAddress);
    if (!rateLimit(ip)) {
      return new Response("Rate limit: please try again soon.", {
        status: 429,
        headers: { "Retry-After": "600" },
      });
    }

    const toEmail = readEnv("LEAD_TO_EMAIL");
    if (!toEmail) {
      console.error("[Brief] LEAD_TO_EMAIL not set");
      return new Response("Server configuration error", { status: 500 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return new Response("Invalid payload", { status: 400 });
    }

    const bodyObj = body as Record<string, unknown>;
    const email = safeString(bodyObj.email, 254).toLowerCase();
    if (!isValidEmail(email)) {
      return new Response("Valid email is required", { status: 400 });
    }

    const name = safeString(bodyObj.name, 120);
    const business = safeString(bodyObj.business, 200);
    const pkg = safeString(bodyObj.package, 160);
    const details = safeString(bodyObj.details, 4000);
    const ts = safeString(bodyObj.ts || new Date().toISOString(), 120);
    const source = safeString(bodyObj.source || "website", 120);

    const transporter = await getTransporter();
    if (!transporter) {
      console.error("[Brief] SMTP not configured");
      return new Response("Email service not configured", { status: 500 });
    }

    const subject = `🔥 New Project Brief — ${safeHeader(
      business || "Website enquiry",
      120,
    )}`;
    const replyLink = `mailto:${email}?subject=${encodeURIComponent(
      "Re: Your Project Inquiry",
    )}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0b0e; color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td style="background: linear-gradient(135deg, #BF5700, #FF7B00); padding: 3px; border-radius: 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #11131a; border-radius: 14px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #BF5700;">🔥 New Project Brief</h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #a1a1aa;">From the website contact form</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #11131a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #BF5700; text-transform: uppercase; letter-spacing: 0.1em;">Project Details</h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Name</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeHtml(name || "Not provided", 120)}</span></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Email</span><br><a href="${replyLink}" style="color: #BF5700; font-size: 16px; font-weight: 500; text-decoration: none;">${safeHtml(email, 254)}</a></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Business / Niche</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeHtml(business || "Not provided", 200)}</span></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Requested Package</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeHtml(pkg || "Not specified", 160)}</span></td></tr>
                <tr><td style="padding: 12px 0;"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Details</span><br><span style="color: #f4f4f5; font-size: 16px; line-height: 1.5;">${safeHtml(details || "No details provided", 4000)}</span></td></tr>
              </table>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
          <tr>
            <td style="text-align: center;">
              <a href="${replyLink}" style="display: inline-block; background: linear-gradient(135deg, #BF5700, #FF7B00); color: #0a0b0e; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 999px; font-size: 16px;">Reply to ${safeHtml(name || "Lead", 120)}</a>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">Source: ${safeHtml(source, 120)} • ${safeHtml(ts, 120)}</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #71717a;">P. James | AI Brand Technologist</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `🔥 New Project Brief\n\nName: ${name || "Not provided"}\nEmail: ${email}\nBusiness: ${business || "Not provided"}\nPackage: ${pkg || "Not specified"}\n\nDetails:\n${details || "No details provided"}\n\nTimestamp: ${ts}\nSource: ${source}`;

    await transporter.sendMail({
      from: `"${safeHeader(readEnv("FROM_NAME") || "P. James Website", 120)}" <${readEnv("SMTP_USER")}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    console.log(`[Brief] Sent successfully to ${toEmail} from ${email}`);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("[Brief] Error:", error);
    return new Response("Server error", { status: 500 });
  }
};
