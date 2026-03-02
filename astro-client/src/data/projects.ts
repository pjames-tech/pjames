export interface Project {
  title: string;
  category: string;
  year: string;
  badge: string;
  image: string;
  description: string;
  tools: string[];
  details: string;
  gallery: string[];
  link: string;
  slug: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const projects: Project[] = [
  {
    title: "RealtyOS: Auto-Qualifier",
    category: "Automation Logic",
    year: "2024",
    badge: "FRAMEWORK",
    image: "/projects/realty-os-main.png",
    description:
      "Zero-latency lead engagement system. Qualifies, tags, and books appointments without human intervention.",
    tools: ["OpenAI", "Node.js", "Twilio", "React"],
    details:
      "A 24/7 AI sales agent that engages website visitors naturally. It qualifies leads based on budget and timeline, answers frequent questions, and directly books appointments into the team's calendar. Built with OpenAI and Node.js, this system increased lead conversion by 40% in the first month.",
    gallery: [
      "/projects/realty-os-main.png",
      "/projects/realty-os-gal-1.png",
      "/projects/realty-os-gal-2.png",
    ],
    link: "https://github.com/pjames-architect/realty-os",
    slug: "realty-os",
    challenge:
      "Real estate agents were losing leads due to slow response times. Prospects would visit, leave their info, and not hear back for hours—by then, they'd already moved on to competitors.",
    solution:
      "I deployed an AI-powered instant response system that engages within 3 seconds of form submission. The bot qualifies leads based on budget, timeline, and property preferences, then books directly into the agent's calendar.",
    results: [
      "40% increase in lead conversion",
      "Average response time: 3 seconds",
      "24/7 availability without staff costs",
      "Qualified leads only reach agents",
    ],
  },
  {
    title: "Authority Protocol: Education",
    category: "Identity System",
    year: "2023",
    badge: "CONCEPT",
    image: "/projects/authority-protocol-main.png",
    description:
      "Institutional rebranding framework designed to maximize perceived value and enrollment conversion.",
    tools: ["Adobe CC", "Figma", "Canva"],
    details:
      "A complete identity overhaul for a private educational institution. I delivered a cohesive visual system, 50+ ready-to-use Canva social media templates, and a comprehensive brand voice guide. The entire project was executed in just 5 days, establishing immediate trust with prospective parents.",
    gallery: [
      "/projects/authority-protocol-main.png",
      "/projects/authority-protocol-gal-1.png",
      "/projects/authority-protocol-gal-2.png",
    ],
    link: "https://behance.net/pjames-design/authority-protocol",
    slug: "authority-protocol",
    challenge:
      "The institution looked dated and unprofessional compared to newer competitors. Parents weren't taking them seriously despite excellent academic results.",
    solution:
      "I architected a complete brand transformation: new visual identity, premium marketing collateral, and a social media kit that positions them as the authority in their market.",
    results: [
      "5-day turnaround",
      "50+ social templates delivered",
      "Perceived value increased significantly",
      "Enrollment inquiries up 60%",
    ],
  },
  {
    title: "Center-Onyx",
    category: "Web Foundation",
    year: "2025",
    badge: "DEPLOYED",
    image: "/projects/pipeline-command-main.png",
    description:
      "Static marketing infrastructure engineered for premium positioning, low latency, and deployment simplicity.",
    tools: ["HTML5", "CSS3", "Static Hosting"],
    details:
      "Center-Onyx is a lightweight, production-ready marketing site architecture built for fast launch cycles and clear brand communication. The stack prioritizes clean semantic markup, minimal runtime overhead, and frictionless deployment across modern static hosting providers.",
    gallery: [
      "/projects/pipeline-command-main.png",
      "/projects/pipeline-command-gal-1.png",
      "/projects/pipeline-command-gal-2.png",
    ],
    link: "https://github.com/pjames-tech/Center-Onyx",
    slug: "center-onyx",
    challenge:
      "The objective was to establish a premium digital presence without introducing framework complexity or deployment friction.",
    solution:
      "I structured the project as a pure static architecture with semantic sections, clean asset organization, and hosting-agnostic deployment so updates remain fast and low risk.",
    results: [
      "Fast cold-load performance",
      "No build-pipeline dependency",
      "Simple cross-platform deployment",
      "Clean, maintainable project structure",
    ],
  },
  {
    title: "AI-Driven Executive Authority System",
    category: "Authority System",
    year: "2025",
    badge: "CASE STUDY",
    image:
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/e44e49241805803.695ffdb0d4a89.png",
    description:
      "Automated content system engineered for mobile-first consumption where 90% of executives engage.",
    tools: ["Brand Strategy", "Visual Identity", "System Design"],
    details:
      "Behance case study showcasing an executive authority system that combines strategic positioning with a premium visual language for stronger market credibility.",
    gallery: [
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/070a4b241805803.695fe1f9ead67.png",
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/150acc241805803.6960066530b0e.png",
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/9bcdef241805803.695ffdb0d55ce.png",
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/0ccfd8241805803.695ffdb0d5e4e.png",
      "https://mir-cdn.behance.net/v1/rendition/project_modules/source/f6223a241805803.695fe1f9e9ddb.jpg",
    ],
    link: "https://www.behance.net/gallery/241805803/AI-Driven-Executive-Authority-System",
    slug: "ai-driven-executive-authority-system",
    challenge:
      "High-level experts have great ideas but no time to design them.",
    solution:
      "An AI-powered design system that turns speech into high-status visual assets in minutes.",
    results: [
      "Automated content generation",
      "High-fidelity content",
      "Compelling headlines",
      "Pre-designed layouts",
    ],
  },
  {
    title: "Pipeline Command Center",
    category: "Operations Architecture",
    year: "2025",
    badge: "FRAMEWORK",
    image: "/projects/pipeline-command-main.png",
    description:
      "Full-visibility revenue dashboards and automated client retention loops.",
    tools: ["Zapier", "Make", "HubSpot", "Python"],
    details:
      "An end-to-end automated pipeline connecting Facebook Ads to WhatsApp and Email sequencers. This solution includes a custom dashboard for tracking lead status in real-time, ensuring zero lead leakage and providing automated follow-ups for 12 months.",
    gallery: [
      "/projects/pipeline-command-main.png",
      "/projects/pipeline-command-gal-1.png",
      "/projects/pipeline-command-gal-2.png",
    ],
    link: "https://github.com/pjames-architect/pipeline-command",
    slug: "pipeline-command",
    challenge:
      "Leads were slipping through the cracks. No visibility into the pipeline meant the team didn't know who to follow up with or when.",
    solution:
      "I built a centralized command center that tracks every lead from first touch to closed deal, with automated follow-up sequences and real-time dashboards.",
    results: [
      "Zero lead leakage",
      "12-month automated follow-up",
      "Real-time pipeline visibility",
      "30% increase in close rate",
    ],
  },
  // --- Quick Wins & Essentials ---
  {
    title: "Apex Logistics: Identity",
    category: "Visual Identity",
    year: "2024",
    badge: "ESSENTIAL",
    image: "/projects/apex-logistics-main.png",
    description:
      "Minimalist logo design suite delivered in 48 hours for a high-volume freight startup.",
    tools: ["Illustrator", "Photoshop"],
    details:
      "A rapid-turnaround identity package including logo, favicon, and invoice templates. Designed to convey stability and speed, helping the client secure their first 3 corporate contracts immediately after launch.",
    gallery: [
      "/projects/apex-logistics-main.png",
      "/projects/apex-logistics-gal-1.png",
      "/projects/apex-logistics-gal-2.png",
    ],
    link: "https://behance.net/pjames-design/apex-logistics",
    slug: "apex-logistics",
    challenge:
      "New logistics firm needed instant credibility to bid on corporate contracts, but had zero brand assets.",
    solution:
      "Designed a clean, industrial logo and identity system that conveys trust and speed, delivered in under 48 hours.",
    results: [
      "Secured 3 contracts in Week 1",
      "Professional invoice templates",
      "Consistent fleet branding",
    ],
  },
  {
    title: "Salon Aura: Site Rescue",
    category: "Platform Repair",
    year: "2024",
    badge: "FIX",
    image: "/projects/salon-aura-main.png",
    description:
      "Emergency Wix troubleshooting to restore booking functionality and mobile responsiveness.",
    tools: ["Wix", "Velo", "CSS"],
    details:
      "Diagnosed and resolved a critical mobile overflow issue that was preventing customers from accessing the 'Book Now' button. Functionality was restored within 2 hours of the request.",
    gallery: [
      "/projects/salon-aura-main.png",
      "/projects/salon-aura-gal-1.png",
      "/projects/salon-aura-gal-2.png",
    ],
    link: "https://github.com/pjames-architect/salon-aura-fix",
    slug: "salon-aura",
    challenge:
      "Mobile users couldn't book appointments due to a layout bug blocking the CTA.",
    solution:
      "Debugged the CSS overflow issue and restored full booking functionality within 2 hours.",
    results: [
      "Booking revenue restored",
      "Zero downtime during peak hours",
      "Mobile UX optimized",
    ],
  },
  {
    title: "Urban Bites: Menu Digitization",
    category: "Digital Asset",
    year: "2023",
    badge: "ESSENTIAL",
    image: "/projects/urban-bites-main.png",
    description:
      "QR-code accessible menu design for a fast-casual dining chain.",
    tools: ["Canva", "QR Code Gen"],
    details:
      "Converted a cluttered PDF menu into a streamlined, mobile-first digital asset accessible via QR code, improving table turnover speed by 15%.",
    gallery: [
      "/projects/urban-bites-main.png",
      "/projects/urban-bites-gal-1.png",
      "/projects/urban-bites-gal-2.png",
    ],
    link: "https://behance.net/pjames-design/urban-bites",
    slug: "urban-bites",
    challenge:
      "Physical menus were slowing down turnover and were costly to update.",
    solution:
      "Created a mobile-optimized digital menu accessed via QR code, allowing instant updates and faster ordering.",
    results: [
      "15% faster table turnover",
      "Printing costs elimination",
      "Instant price updates",
    ],
  },
];
