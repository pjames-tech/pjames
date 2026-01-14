# P. James — AI Brand Architect

Personal portfolio website built with **Astro v5** and **Islands Architecture** for optimal performance.

## Tech Stack

- **Framework**: Astro v5 (Static + Server-side)
- **Styling**: Tailwind CSS v4 (build-time)
- **Interactivity**: SolidJS for ChatBot island
- **Deployment**: Vercel (serverless functions)
- **Email**: Nodemailer (SMTP)
- **AI**: OpenAI GPT-4o-mini

## Features

- 🚀 Static-first with selective hydration
- 🤖 ARCHIBOT with dual modes (Lead Capture / AI Chat)
- 📧 Contact form + Newsletter signup
- 💼 Project showcase with detail modals
- 📱 Fully responsive, mobile-first
- ⚡ Fluid typography with `clamp()`

## Quick Start

```bash
cd astro-client
npm install
cp .env.example .env   # Configure your API keys
npm run dev            # http://localhost:4321
```

## Environment Variables

| Variable         | Description                         |
| ---------------- | ----------------------------------- |
| `OPENAI_API_KEY` | OpenAI API key for AI Chat          |
| `SMTP_HOST`      | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT`      | SMTP port (usually `587`)           |
| `SMTP_USER`      | SMTP username                       |
| `SMTP_PASS`      | SMTP password / App Password        |
| `LEAD_TO_EMAIL`  | Where to receive leads              |

## Deploy to Vercel

```bash
cd astro-client
npx vercel --prod
```

Or connect your GitHub repo in Vercel dashboard.

## Project Structure

```
astro-client/
├── src/
│   ├── components/     # Astro + SolidJS components
│   ├── layouts/        # BaseLayout.astro
│   ├── pages/          # index.astro + API routes
│   └── styles/         # global.css (design tokens)
├── public/             # Static assets
└── astro.config.mjs
```

## License

MIT
