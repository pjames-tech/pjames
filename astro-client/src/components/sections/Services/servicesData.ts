// Services Data — Modular Capabilities Framework
// Strictly typed pillar data for the Services section

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  subServices: string[];
  tags: string[];
  techStack: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Branding & Creative",
    description:
      "Build generative brand engines—identity systems that scale, adapt, and produce assets autonomously. Every visual decision is data-informed and engineered for cognitive recall.",
    subServices: [
      "Brand Identity Systems",
      "Motion Design & Animation",
      "Custom Illustrations",
      "Social Strategy & Content Architecture",
    ],
    tags: ["Generative Brand Engines", "AI LoRAs", "Visual Identity"],
    techStack: "Adobe Creative Suite • Figma • ComfyUI • Stable Diffusion",
  },
  {
    number: "02",
    title: "Product & Web Engineering",
    description:
      "High-velocity, developer-grade interfaces engineered with cognitive load theory. Every interaction is measured, every layout decision maps to conversion infrastructure.",
    subServices: [
      "UI/UX Research & Prototyping",
      "Next.js & Astro Web Development",
      "Cross-Platform App Development",
      "Design System Architecture",
    ],
    tags: ["Developer-Grade UI", "Performance-First", "Design Systems"],
    techStack: "React • Next.js • Astro • TypeScript • Figma",
  },
  {
    number: "03",
    title: "Autonomous Growth Systems",
    description:
      "Operationally persistent revenue pipelines; AI agents and automated workflows that nurture, convert, and retain 24/7 without manual intervention.",
    subServices: [
      "Instagram & Social media Automation",
      "AI Agent Development",
      "Marketing Workflow Orchestration",
      "Revenue Pipeline Engineering",
    ],
    tags: ["Operational Persistence", "AI Agents", "Revenue Pipelines"],
    techStack: "LangChain • Python • n8n • OpenAI • Vercel",
  },
];
