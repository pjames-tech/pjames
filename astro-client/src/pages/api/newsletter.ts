import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeString(x: any): string {
  return String(x ?? "")
    .trim()
    .slice(0, 4000);
}

async function getTransporter() {
  const host = import.meta.env.SMTP_HOST;
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(import.meta.env.SMTP_PORT || 587),
    secure: import.meta.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

// Simple in-memory subscriber store (for serverless, use a database in production)
const subscribers = new Set<string>();

export const POST: APIRoute = async ({ request }) => {
  try {
    const toEmail = import.meta.env.LEAD_TO_EMAIL;

    const body = await request.json();
    const { email, ts } = body;

    if (!email || !isValidEmail(email)) {
      return new Response("Valid email is required", { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates (in-memory check - for production use database)
    if (subscribers.has(normalizedEmail)) {
      return new Response(
        JSON.stringify({
          ok: true,
          isNew: false,
          message: "You're already subscribed! 🎉",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add to subscribers
    subscribers.add(normalizedEmail);

    const transporter = await getTransporter();

    if (transporter) {
      // Welcome email to subscriber
      const welcomeHtml = `
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
            <td style="text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #BF5700;">Welcome to The AI-Growth Newsletter 🚀</h1>
              <p style="margin: 12px 0 0 0; font-size: 16px; color: #a1a1aa;">You're in. Here's what to expect.</p>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #11131a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #f4f4f5; line-height: 1.6;">Hey there! 👋</p>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #d4d4d8; line-height: 1.6;">
                I'm P. James, and I build <strong style="color: #BF5700;">revenue engines</strong> — not just pretty websites. 
                Thanks for joining the newsletter. Every week, I'll send you insights on:
              </p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr><td style="padding: 12px 16px; background: rgba(191,87,0,0.1); border-left: 3px solid #BF5700; border-radius: 0 8px 8px 0; margin-bottom: 12px;"><span style="font-weight: 600; color: #f4f4f5;">🤖 AI Automation</span><span style="color: #a1a1aa; display: block; font-size: 14px; margin-top: 4px;">Bots, workflows, and tools that save time and capture leads.</span></td></tr>
                <tr><td style="height: 12px;"></td></tr>
                <tr><td style="padding: 12px 16px; background: rgba(191,87,0,0.1); border-left: 3px solid #BF5700; border-radius: 0 8px 8px 0;"><span style="font-weight: 600; color: #f4f4f5;">🎨 Brand Strategy</span><span style="color: #a1a1aa; display: block; font-size: 14px; margin-top: 4px;">Identity systems that make your business memorable and trustworthy.</span></td></tr>
                <tr><td style="height: 12px;"></td></tr>
                <tr><td style="padding: 12px 16px; background: rgba(191,87,0,0.1); border-left: 3px solid #BF5700; border-radius: 0 8px 8px 0;"><span style="font-weight: 600; color: #f4f4f5;">📈 Growth Tactics</span><span style="color: #a1a1aa; display: block; font-size: 14px; margin-top: 4px;">What's actually working for solopreneurs and small teams right now.</span></td></tr>
              </table>
              
              <p style="margin: 24px 0 0 0; font-size: 16px; color: #d4d4d8; line-height: 1.6;">
                No fluff. No spam. Just actionable insights you can implement right away.
              </p>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="text-align: center;">
              <a href="https://pjames.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #BF5700, #FF7B00); color: #0a0b0e; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 999px; font-size: 16px;">Visit My Website</a>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 14px; color: #f4f4f5; font-weight: 500;">P. James</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #a1a1aa;">AI Brand Architect</p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #71717a;">
                You're receiving this because you subscribed at pjames.dev.<br>
                Reply to this email anytime — I read every message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      try {
        await transporter.sendMail({
          from: `"P. James" <${import.meta.env.SMTP_USER}>`,
          to: safeString(email),
          subject: "Welcome to The AI-Growth Newsletter 🚀",
          text: `Welcome to The AI-Growth Newsletter!\n\nHey there! I'm P. James, and I build revenue engines — not just pretty websites.\n\nEvery week, I'll send you insights on:\n• AI Automation - Bots, workflows, and tools that save time\n• Brand Strategy - Identity systems that make your business memorable\n• Growth Tactics - What's actually working right now\n• Tool Breakdowns - Honest reviews and tutorials\n\nNo fluff. No spam. Just actionable insights.\n\nTalk soon,\nP. James\nAI Brand Architect`,
          html: welcomeHtml,
        });
      } catch (err: any) {
        console.error("Failed to send welcome email:", err.message);
      }

      // Notification to P. James
      if (toEmail) {
        try {
          await transporter.sendMail({
            from: `"${safeString(import.meta.env.FROM_NAME || "Website")}" <${
              import.meta.env.SMTP_USER
            }>`,
            to: toEmail,
            subject: "🎉 New Newsletter Subscriber!",
            text: `New newsletter signup!\n\nEmail: ${safeString(
              email
            )}\nTimestamp: ${safeString(ts)}`,
          });
        } catch (err: any) {
          console.error("Failed to send notification email:", err.message);
        }
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        isNew: true,
        message: "Welcome aboard! 🚀 Check your inbox for a welcome email.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("[Newsletter] Error:", error);
    return new Response(error?.message || "Server error", { status: 500 });
  }
};
