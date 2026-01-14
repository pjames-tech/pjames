import 'nodemailer';
export { renderers } from '../../renderers.mjs';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function safeString(x) {
  return String(x ?? "").trim().slice(0, 4e3);
}
async function getTransporter() {
  return null;
}
function asTextBlock(obj) {
  return Object.entries(obj || {}).map(([k, v]) => `- ${k}: ${safeString(v)}`).join("\n");
}
const POST = async ({ request }) => {
  try {
    const toEmail = undefined                             ;
    const body = await request.json();
    const { source, answers, meta } = body;
    if (!answers || !answers.email || !isValidEmail(answers.email)) {
      return new Response("Valid email is required", { status: 400 });
    }
    const transporter = await getTransporter();
    if (!transporter) {
      console.error("[Lead] SMTP not configured");
      return new Response("Email service not configured", { status: 500 });
    }
    const subject = `🔥 New Lead — ${safeString(
      answers.business || "Website enquiry"
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
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #BF5700;">🔥 New Lead from ARCHIBOT</h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #a1a1aa;">Captured via Lead Capture Mode</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #11131a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 24px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #BF5700; text-transform: uppercase; letter-spacing: 0.1em;">Contact Details</h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Name</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeString(
      answers.name || "Not provided"
    )}</span></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Email</span><br><a href="mailto:${safeString(
      answers.email
    )}" style="color: #BF5700; font-size: 16px; font-weight: 500; text-decoration: none;">${safeString(
      answers.email
    )}</a></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Business / Niche</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeString(
      answers.business || "Not provided"
    )}</span></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Goal (30-60 days)</span><br><span style="color: #f4f4f5; font-size: 16px;">${safeString(
      answers.goal || "Not provided"
    )}</span></td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Budget Range</span><br><span style="color: #f4f4f5; font-size: 16px; font-weight: 500;">${safeString(
      answers.budget || "Not provided"
    )}</span></td></tr>
                <tr><td style="padding: 12px 0;"><span style="color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Timeline</span><br><span style="color: #f4f4f5; font-size: 16px;">${safeString(
      answers.timeline || "Not provided"
    )}</span></td></tr>
              </table>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
          <tr>
            <td style="text-align: center;">
              <a href="mailto:${safeString(
      answers.email
    )}?subject=Re: Your Project Inquiry" style="display: inline-block; background: linear-gradient(135deg, #BF5700, #FF7B00); color: #0a0b0e; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 999px; font-size: 16px;">Reply to ${safeString(
      answers.name || "Lead"
    )}</a>
            </td>
          </tr>
        </table>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">Source: ${safeString(
      source
    )} • ${safeString(meta?.ts || (/* @__PURE__ */ new Date()).toISOString())}</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #71717a;">P. James | AI Brand Architect</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    const text = [
      "🔥 New Lead from ARCHIBOT",
      "",
      "Answers:",
      asTextBlock(answers),
      "",
      "Meta:",
      asTextBlock(meta),
      "",
      `Source: ${safeString(source)}`
    ].join("\n");
    if (toEmail) ;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[Lead] Error:", error);
    return new Response(error?.message || "Server error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
