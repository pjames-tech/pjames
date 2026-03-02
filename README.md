# P. James — AI Brand Technologist

Personal portfolio website built with **Astro v5** and **Islands Architecture** for optimal performance.

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation / Hybrid)
- **Engine**: [Next.js](https://nextjs.org/) + [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Type-safe engineering)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.darkroom.engineering/) (Smooth scroll)
- **Infrastructure**: [Vercel Edge Network](https://vercel.com/) & [PostgreSQL](https://www.postgresql.org/) (Data)

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

```text
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
