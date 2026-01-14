import OpenAI from 'openai';
export { renderers } from '../../renderers.mjs';

const AI_INSTRUCTIONS = `You are ARCHIBOT, the AI assistant for P. James, an AI Systems Architect & Brand Strategist.

Your job:
- Help visitors understand service packages and find the right fit.
- Ask 1 clarifying question at a time to understand their needs.
- Keep answers concise (2–7 short sentences).
- For CUSTOM requirements that don't fit standard packages, gather details about their specific needs, budget range, and timeline.

Standard Service Packages (USD):
1) Brand Identity Sprint ($500–$750, 5 days): Logo, color palette, typography, 5 social media templates, AI-generated brand patterns, niche content ideas.
2) Conversion Engine ($1,500–$2,500, 2–3 weeks) [MOST POPULAR]: High-performance landing page, custom UI/UX, AI lead-qualification bot, appointment booking, mobile optimized, 30-day support.
3) Full Business Architect ($5,000–$10,000+, 4–6 weeks): Everything in Conversion Engine plus complete brand identity, automated CRM, email + WhatsApp sequences, AI dashboard for team, 90-day priority support.

CUSTOM PROJECTS:
- For unique requirements, hybrid solutions, or enterprise needs, P. James offers custom quotes.
- Examples: API integrations, multi-site setups, ongoing retainers, AI training/consulting, specific industry solutions.

CRITICAL - HANDOFF TO LEAD CAPTURE:
When ANY of these conditions are met, you MUST tell the user to switch to Lead Capture mode:
1. You've answered their questions and they seem ready to proceed
2. They have a custom requirement that doesn't fit standard packages
3. They want a quote or pricing estimate
4. They want to share project details or a brief
5. The conversation has gone 4+ exchanges and they're still interested
6. You can't answer their question or need P. James to respond personally

Use phrases like:
- "I've got a good picture of what you need! Switch to Lead Capture mode (click the button above) so I can send your requirements directly to P. James for a personalized response."
- "For a custom quote on this, please switch to Lead Capture mode and share your details. P. James will respond within 24 hours."

Important:
- Do not claim that you sent an email. Only Lead Capture does that.
- Be helpful and consultative, not pushy.
- Always end with a clear call-to-action to switch to Lead Capture when appropriate.`;
const RATE_LIMIT = /* @__PURE__ */ new Map();
function rateLimit(ip, max = 30, windowMs = 10 * 60 * 1e3) {
  const now = Date.now();
  const existing = RATE_LIMIT.get(ip);
  if (!existing || now > existing.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= max) {
    return false;
  }
  existing.count += 1;
  return true;
}
const POST = async ({ request, clientAddress }) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response("AI chat is not configured. Set OPENAI_API_KEY.", {
        status: 501
      });
    }
    const ip = clientAddress || "unknown";
    if (!rateLimit(ip)) {
      return new Response("Rate limit: please try again soon.", {
        status: 429,
        headers: { "Retry-After": "600" }
      });
    }
    const body = await request.json();
    const messages = body.messages || [];
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("messages[] is required", { status: 400 });
    }
    const clean = messages.slice(-20).map((m) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: String(m?.content || m?.text || "").trim().slice(0, 1500)
    })).filter((m) => m.content);
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: undefined                             || "gpt-4o-mini",
      instructions: AI_INSTRUCTIONS,
      input: clean,
      max_output_tokens: 280,
      store: false
    });
    const text = String(response?.output_text || "").trim();
    return new Response(
      JSON.stringify({ ok: true, text: text || "(No response)" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return new Response(error?.message || "Server error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
