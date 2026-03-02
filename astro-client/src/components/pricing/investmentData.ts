export interface InvestmentDetail {
  businessImpact: string;
  implementation: string;
  deployment: string;
  deliverables: string[];
}

export interface InvestmentItem {
  id: string;
  title: string;
  investmentFrom: number;
  valueProp: string;
  techBadge: string;
  details: InvestmentDetail;
}

export interface InvestmentCategory {
  id: string;
  title: string;
  summary: string;
  services: InvestmentItem[];
}

export const investmentCategories: InvestmentCategory[] = [
  {
    id: "visual-systems",
    title: "Visual Systems",
    summary: "Authority architecture for instant trust and market distinction.",
    services: [
      {
        id: "core-identity-architecture",
        title: "Core Identity Architecture",
        investmentFrom: 1500,
        valueProp:
          "Engineering a scalable DNA for your brand across every channel.",
        techBadge: "Figma + Tokens",
        details: {
          businessImpact:
            "Repositions your brand from aesthetic output to strategic infrastructure. Clarity converts, confusion costs.",
          implementation:
            "Identity logic mapped into reusable rules for typography, color, and hierarchy.",
          deployment:
            "A production-grade identity system ready for internal teams and vendors.",
          deliverables: [
            "Brand strategy matrix and positioning architecture",
            "Logo suite, color system, and type framework",
            "Visual governance guide with implementation rules",
          ],
        },
      },
      {
        id: "motion-signature-stack",
        title: "Motion Signature Stack",
        investmentFrom: 1200,
        valueProp: "Turning static touchpoints into kinetic authority signals.",
        techBadge: "After Effects + Lottie",
        details: {
          businessImpact:
            "Increases perceived sophistication and message retention across digital touchpoints.",
          implementation:
            "Reusable animation principles aligned with your conversion and attention goals.",
          deployment:
            "Optimized motion assets integrated for web, social, and pitch environments.",
          deliverables: [
            "Brand intro/outro animation package",
            "UI motion behaviors for web and app interactions",
            "Lottie-ready exports and usage guidelines",
          ],
        },
      },
      {
        id: "illustration-narrative-suite",
        title: "Illustration Narrative Suite",
        investmentFrom: 1100,
        valueProp:
          "Owning your visual narrative with proprietary brand illustration.",
        techBadge: "Illustrator + Procreate",
        details: {
          businessImpact:
            "Transforms generic marketing into ownable visual equity that compounds over time.",
          implementation:
            "A narrative illustration language aligned to audience psychology and product story.",
          deployment:
            "Asset suite prepared for product screens, campaigns, and social distribution.",
          deliverables: [
            "Custom illustration styleboard and visual lexicon",
            "Campaign illustration set for key brand moments",
            "Template assets for repeatable future execution",
          ],
        },
      },
    ],
  },
  {
    id: "digital-engineering",
    title: "Digital Engineering",
    summary:
      "Performance-grade implementation for conversion-focused digital assets.",
    services: [
      {
        id: "conversion-web-infrastructure",
        title: "Conversion Web Infrastructure",
        investmentFrom: 2400,
        valueProp: "Building a revenue interface, not a brochure website.",
        techBadge: "Astro + TypeScript",
        details: {
          businessImpact:
            "I architect digital ecosystems engineered for high-velocity growth. Where others see pages, I see revenue pipelines.",
          implementation:
            "Content, UX, and technical layers aligned to reduce friction and increase qualified actions.",
          deployment:
            "Fast, secure, and analytics-ready site shipped with conversion events wired in.",
          deliverables: [
            "Information architecture and conversion flow mapping",
            "Responsive website implementation with CMS integration",
            "Analytics and event tracking baseline",
          ],
        },
      },
      {
        id: "product-interface-implementation",
        title: "Product Interface Implementation",
        investmentFrom: 2500,
        valueProp:
          "Shipping interfaces that support speed, trust, and adoption.",
        techBadge: "React + Next.js",
        details: {
          businessImpact:
            "Compresses time-to-value by delivering product experiences users understand instantly.",
          implementation:
            "UX architecture translated into performant component-driven application interfaces.",
          deployment:
            "Production build configured for reliability, scalability, and iterative delivery.",
          deliverables: [
            "Interactive product screens and state flows",
            "Frontend implementation with API integration hooks",
            "QA pass and release-ready build handoff",
          ],
        },
      },
      {
        id: "design-system-deployment",
        title: "Design System Deployment",
        investmentFrom: 1800,
        valueProp:
          "Standardizing your UI language for scale and operational speed.",
        techBadge: "Figma MCP + GitHub Actions",
        details: {
          businessImpact:
            "Reduces design/dev drag and keeps every future release visually and behaviorally coherent.",
          implementation:
            "Tokenized foundations, component standards, and interaction rules codified for teams.",
          deployment:
            "Versioned system assets integrated into your product workflow.",
          deliverables: [
            "Design token matrix and style primitives",
            "Core component library with interaction specs",
            "Usage documentation for design and engineering teams",
          ],
        },
      },
    ],
  },
  {
    id: "autonomous-systems",
    title: "Autonomous Systems",
    summary:
      "Automated growth architecture for persistent lead and revenue flow.",
    services: [
      {
        id: "ig-authority-automation",
        title: "IG Automation",
        investmentFrom: 300,
        valueProp: "Deploying Instagram as an always-on acquisition engine.",
        techBadge: "ManyChat + Meta APIs",
        details: {
          businessImpact:
            "Moves your social presence from manual & slow replies to measurable lead generation infrastructure.",
          implementation:
            "We connect ManyChat to your Instagram API to create a seamless funnel.",
          deployment:
            "Automated keyword triggers that convert Instagram comments into DMs and capture leads instantly.",
          deliverables: [
            "Keyword Comment Trigger",
            "Email/Lead Capture Logic",
            "Instant DM Auto-Reply",
          ],
        },
      },
      {
        id: "ai-brand-gems-deployment",
        title: "AI Brand Gems Deployment",
        investmentFrom: 2600,
        valueProp:
          "Building proprietary AI assets that multiply authority and output.",
        techBadge: "OpenAI + Prompt Ops",
        details: {
          businessImpact:
            "Converts brand expertise into repeatable AI systems that accelerate production quality and consistency.",
          implementation:
            "Knowledge pipelines, prompt systems, and guardrails tuned to your positioning.",
          deployment:
            "Operational AI modules integrated with your existing workflows and team cadence.",
          deliverables: [
            "Custom prompt architecture and operating playbook",
            "Brand voice safety rails and response templates",
            "Workflow integrations for daily team usage",
          ],
        },
      },
      {
        id: "revenue-pipeline-orchestration",
        title: "Revenue Pipeline Orchestration",
        investmentFrom: 2900,
        valueProp:
          "Engineering autonomous nurture and booking pipelines end-to-end.",
        techBadge: "CRM + AI Agents",
        details: {
          businessImpact:
            "Creates perpetual motion in your pipeline so growth does not depend on founder availability.",
          implementation:
            "Lead capture, qualification, and follow-up logic mapped into autonomous workflows.",
          deployment:
            "Agent-assisted pipeline orchestration connected to CRM and calendar systems.",
          deliverables: [
            "Automated lead triage and routing architecture",
            "Nurture sequences with intelligent branching",
            "Calendar booking and CRM sync implementation",
          ],
        },
      },
    ],
  },
];
