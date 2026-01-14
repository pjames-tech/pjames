import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderSlot, r as renderTemplate, m as maybeRenderHead, n as renderScript, o as renderComponent, u as unescapeHTML } from '../chunks/astro/server_C-PX_z3J.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { ssr, ssrHydrationKey, escape, createComponent as createComponent$1, ssrAttribute } from 'solid-js/web';
import { createSignal, createEffect, For, Show } from 'solid-js';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "P. James | AI Brand Architect",
    description = "AI Systems Architect & Brand Strategist based in Ibadan. Identity systems, landing pages, and revenue automation."
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon.png"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:image" content="/hero-ai.png"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}>${renderHead()}</head> <body class="bg-bg text-text selection:bg-[rgb(var(--accent))/0.35]"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/layouts/BaseLayout.astro", void 0);

const $$Astro$2 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];
  return renderTemplate`<!-- Fixed Navbar (ScrollNav) -->${maybeRenderHead()}<div id="nav-container" class="fixed left-1/2 top-[var(--space-2)] z-50 -translate-x-1/2 transition duration-300 opacity-0 -translate-y-3 pointer-events-none" aria-hidden="true" data-astro-cid-jp2pq5zm> <nav class="glass soft-border-strong shadow-glow rounded-pill px-2 py-2 flex items-center gap-2" data-astro-cid-jp2pq5zm> <a href="#top" class="flex-shrink-0 ml-3 outline-none" data-astro-cid-jp2pq5zm> <img src="/logo-new.png" alt="P. JAMES" class="h-10 w-auto object-contain" data-astro-cid-jp2pq5zm> </a> <span class="h-5 w-px bg-white/10 mx-1 hidden md:block" data-astro-cid-jp2pq5zm></span> <!-- Desktop Nav Links --> <ul class="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[min(60vw,40rem)] pr-1" data-astro-cid-jp2pq5zm> ${navLinks.map((link) => renderTemplate`<li data-astro-cid-jp2pq5zm> <a${addAttribute(link.href, "href")} class="nav-link relative rounded-pill px-3 py-2 text-[var(--step--1)] transition-all duration-300 text-muted hover:text-text hover:bg-white/5" data-astro-cid-jp2pq5zm> <span class="nav-bg absolute inset-0 -z-10 rounded-pill bg-[rgb(var(--accent))/0.18] soft-border hidden transition-all" data-astro-cid-jp2pq5zm></span> ${link.label} </a> </li>`)} </ul> <!-- Hamburger Button (Mobile) --> <button id="nav-toggle" class="md:hidden p-2 rounded-full hover:bg-white/10 transition ml-auto mr-1" aria-label="Open menu" data-astro-cid-jp2pq5zm> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-jp2pq5zm> <path d="M3 12h18M3 6h18M3 18h18" data-astro-cid-jp2pq5zm></path> </svg> </button> </nav> </div> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/Navbar.astro", void 0);

const $$MobileNavOverlay = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];
  return renderTemplate`<!-- Mobile Nav Overlay -->${maybeRenderHead()}<div id="mobile-nav" class="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-300 opacity-0 pointer-events-none"> <button id="mobile-nav-close" class="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition" aria-label="Close menu"> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M18 6L6 18M6 6l12 12"></path> </svg> </button> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link text-2xl font-semibold hover:text-[rgb(var(--accent))] transition"> ${link.label} </a>`)} </div> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/MobileNavOverlay.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/MobileNavOverlay.astro", void 0);

const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="back-to-top" class="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[rgb(var(--accent))] text-white shadow-lg hover:scale-110 transition-all duration-300 opacity-0 pointer-events-none" aria-label="Back to top"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> <path d="M18 15l-6-6-6 6"></path> </svg> </button> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/BackToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/BackToTop.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const features = [
    { title: "Identity Architecture", description: "Brand systems that build trust instantly." },
    { title: "Acquisition Engines", description: "Landing pages that actually convert traffic." },
    { title: "Full Stack Growth", description: "Automated pipelines that nurture leads 24/7." }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="top" class="relative h-screen flex items-center overflow-hidden"> <div class="absolute inset-0 z-0 select-none"> <img src="/hero-ai.png" alt="Future of AI" class="h-full w-full object-cover opacity-70 contrast-125"> <div class="absolute inset-0 bg-gradient-to-r from-[rgb(var(--bg))] via-[rgb(var(--bg))]/80 to-transparent"></div> <div class="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent"></div> </div> <div class="container-fluid relative z-10 grid gap-8 lg:grid-cols-[1.2fr,0.8fr] items-center"> <div class="max-w-2xl"> <!-- Status Badge --> <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md mb-4"> <span class="h-2 w-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgb(45_212_191/0.5)]"></span> <span class="text-xs uppercase tracking-widest text-white/80 font-medium font-sans">
AI Brand Architect • Available
</span> </div> <!-- Headline --> <h1 class="font-display font-semibold text-[clamp(2rem,3vw+1rem,3.5rem)] leading-[1.05] tracking-tight uppercase text-white drop-shadow-xl">
Stop Building
<span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Brochures.</span> <br>
Start Building
<span class="text-[rgb(var(--accent))]">Assets.</span> </h1> <!-- Description --> <p class="mt-6 text-[var(--step-0)] text-white/80 max-w-[50ch] font-light leading-relaxed">
I replace static websites with
<strong class="text-white font-semibold">high-performance revenue engines</strong>.
        Identity systems that build authority. Pipelines that capture leads. Automations that close deals. 24/7.
</p> <!-- CTAs --> <div class="mt-6 flex flex-wrap gap-4"> <a href="#services" class="rounded-full px-8 py-4 text-[var(--step-0)] font-bold btn-primary text-[rgb(var(--bg))] shadow-[0_0_40px_rgb(var(--accent)/0.4)] hover:shadow-[0_0_60px_rgb(var(--accent)/0.6)] hover:scale-105 transition duration-300">
Start Your Project
</a> <a href="#work" class="group flex items-center gap-2 rounded-full px-8 py-4 text-[var(--step-0)] font-medium text-white hover:bg-white/5 transition border border-white/10">
See Case Studies
<span class="translate-x-0 transition group-hover:translate-x-1">→</span> </a> </div> </div> <!-- Feature Cards (Desktop) --> <div class="hidden lg:grid gap-4"> ${features.map((feature) => renderTemplate`<div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[rgb(var(--accent))]/50 transition group"> <h3 class="font-display font-bold text-lg text-white group-hover:text-[rgb(var(--accent))] transition"> ${feature.title} </h3> <p class="text-sm text-white/60 mt-1">${feature.description}</p> </div>`)} </div> </div> </header>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/Hero.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const services = [
    { number: "01", title: "Brand Strategy", description: "Identity systems that position you as the authority." },
    { number: "02", title: "Conversion UI", description: "Interfaces designed psychologically to convert traffic." },
    { number: "03", title: "AI Automation", description: "Smart pipelines that nurture leads while you sleep." }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="services" class="py-[var(--space-5)] relative"> <!-- Background glow --> <div class="absolute inset-[-30%] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.24),transparent_70%),radial-gradient(closest-side,rgb(var(--ring)/0.10),transparent_70%)] blur-[40px] pointer-events-none"></div> <div class="container-fluid relative z-10"> <div class="mb-12"> <p class="text-[var(--step--1)] uppercase tracking-[0.18em] text-[rgb(var(--accent))] font-medium mb-3">
AI Brand Architect
</p> <h2 class="font-display font-bold text-[var(--step-3)] leading-[1.1] max-w-[20ch]">
Architecture, NOT Aesthetics.
</h2> </div> <div class="rounded-[2rem] bg-[rgb(var(--panel))] soft-border p-8 lg:p-12 shadow-glow relative overflow-hidden group"> <div class="relative z-10 max-w-4xl mx-auto text-center"> <h3 class="font-display font-bold text-[var(--step-3)] leading-tight mb-8">
As an AI Brand Architect, <br>
I build <span class="text-[rgb(var(--accent))]">revenue ecosystems</span>.
</h3> <div class="text-left grid gap-4 mb-10 max-w-2xl mx-auto"> ${services.map((service) => renderTemplate`<div class="flex items-center gap-4 rounded-xl bg-white/5 border border-white/5 p-4 hover:border-white/10 transition"> <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--accent))]/20 text-[rgb(var(--accent))] font-bold text-sm"> ${service.number} </span> <div> <h4 class="font-display font-bold text-white text-lg leading-none"> ${service.title} </h4> <p class="text-sm text-muted mt-1">${service.description}</p> </div> </div>`)} </div> <button id="pricing-btn" class="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[var(--step-0)] font-bold btn-primary text-[rgb(var(--bg))] shadow-[0_0_20px_rgb(var(--accent)/0.3)] hover:scale-105 transition">
View Pricing & Packages
</button> </div> </div> </div> </section>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/Services.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { title, category, year, image, description, tools, details, gallery, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="project-card group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[rgb(var(--panel))] soft-border hover:border-white/20 transition duration-500 cursor-pointer"${addAttribute(title, "data-title")}${addAttribute(`${year} \u2022 ${category}`, "data-category")}${addAttribute(image, "data-image")}${addAttribute(link, "data-link")}${addAttribute(tools.join(","), "data-tools")}${addAttribute(gallery.join(","), "data-gallery")}${addAttribute(details, "data-details")}> <div class="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent opacity-80 z-10"></div> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy"> <div class="absolute bottom-0 left-0 p-6 z-20"> <p class="text-xs uppercase tracking-widest text-[rgb(var(--accent))] font-bold mb-2"> ${year} </p> <h3 class="font-display font-bold text-2xl text-white mb-2"> ${title} </h3> <p class="text-sm text-muted">${description}</p> </div> </div>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/ui/ProjectCard.astro", void 0);

const $$Work = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      title: "Real Estate LeadBot",
      category: "AI Booking System",
      year: "2024",
      image: "/project-1.png",
      description: "AI qualification & booking system.",
      tools: ["OpenAI", "Node.js", "Twilio", "React"],
      details: "A 24/7 AI sales agent that engages website visitors naturally. It qualifies leads based on budget and timeline, answers frequent questions, and directly books appointments into the team's calendar. Built with OpenAI and Node.js, this system increased lead conversion by 40% in the first month.",
      gallery: ["/project-1.png", "/project-2.png", "/project-3.png", "/hero-ai.png"],
      link: "#"
    },
    {
      title: "School Brand Sprint",
      category: "Brand Identity",
      year: "2023",
      image: "/project-2.png",
      description: "Identity system + social output.",
      tools: ["Adobe CC", "Figma", "Canva"],
      details: "A complete identity overhaul for a private educational institution. We delivered a cohesive visual system, 50+ ready-to-use Canva social media templates, and a comprehensive brand voice guide. The entire project was executed in just 5 days, establishing immediate trust with prospective parents.",
      gallery: ["/project-2.png", "/project-1.png", "/project-3.png", "/hero-ai.png"],
      link: "#"
    },
    {
      title: "CRM Automation",
      category: "Automation Pipeline",
      year: "2025",
      image: "/project-3.png",
      description: "Follow-up systems & dashboards.",
      tools: ["Zapier", "Make", "HubSpot", "Python"],
      details: "An end-to-end automated pipeline connecting Facebook Ads to WhatsApp and Email sequencers. This solution includes a custom dashboard for tracking lead status in real-time, ensuring zero lead leakage and providing automated follow-ups for 12 months.",
      gallery: ["/project-3.png", "/project-1.png", "/project-2.png", "/hero-ai.png"],
      link: "#"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="work" class="py-[var(--space-5)] container-fluid"> <div class="mb-12"> <p class="text-[var(--step--1)] uppercase tracking-[0.18em] text-[rgb(var(--accent))] font-medium mb-3">
Selected work
</p> <h2 class="font-display font-bold text-[var(--step-3)] leading-[1.1] max-w-[20ch]">
Proof beats promises.
</h2> </div> <div class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(19rem,100%),1fr))]"> ${projects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { ...project })}`)} </div> </section>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/Work.astro", void 0);

const $$Astro = createAstro();
const $$TestimonialCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TestimonialCard;
  const { quote, name, role, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<figure class="rounded-[1.5rem] bg-[rgb(var(--panel))] soft-border p-[var(--space-3)]"> <blockquote class="text-[var(--step-0)] text-muted leading-[1.7]">
"${quote}"
</blockquote> <figcaption class="mt-4 flex items-center gap-4"> <div class="h-12 w-12 rounded-full overflow-hidden soft-border shrink-0"> <img${addAttribute(image, "src")}${addAttribute(name, "alt")} class="h-full w-full object-cover" loading="lazy"> </div> <div> <p class="font-medium">${name}</p> <p class="text-sm text-muted">${role}</p> </div> </figcaption> </figure>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/ui/TestimonialCard.astro", void 0);

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      quote: "We finally stopped guessing. The landing page was clear, fast, and the AI bot qualified leads better than our old form ever did.",
      name: "O. Adeyemi",
      role: "Founder, Service Business",
      image: "/testimonial_adeyemi.png"
    },
    {
      quote: "The automation setup changed everything \u2014 clients now get instant replies and our team can track the pipeline without stress.",
      name: "T. Afolabi",
      role: "Operations Lead",
      image: "/testimonial_afolabi.png"
    },
    {
      quote: "The templates are clean and easy. Our social media looks consistent and professional without needing a full design team.",
      name: "M. Ibrahim",
      role: "School Admin",
      image: "/testimonial_ibrahim.png"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="testimonials" class="py-[var(--space-5)] container-fluid"> <div class="mb-12"> <p class="text-[var(--step--1)] uppercase tracking-[0.18em] text-[rgb(var(--accent))] font-medium mb-3">
Testimonials
</p> <h2 class="font-display font-bold text-[var(--step-3)] leading-[1.1]">
What clients say.
</h2> </div> <div class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(19rem,100%),1fr))]"> ${testimonials.map((testimonial) => renderTemplate`${renderComponent($$result, "TestimonialCard", $$TestimonialCard, { ...testimonial })}`)} </div> </section>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/Testimonials.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const processSteps = [
    { title: "Diagnose", description: "We define the offer, audience, and the one next action." },
    { title: "Design & Build", description: "Clean typography, consistent assets, fast structure." },
    { title: "Automate", description: "Bots + routing + follow-ups so leads don't leak." }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="about" class="py-[var(--space-5)] container-fluid"> <div class="mb-12"> <p class="text-[var(--step--1)] uppercase tracking-[0.18em] text-[rgb(var(--accent))] font-medium mb-3">
About
</p> <h2 class="font-display font-bold text-[var(--step-3)] leading-[1.1]">
Meet P. James.
</h2> </div> <div class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(19rem,100%),1fr))]"> <!-- Profile Card --> <div class="rounded-[1.5rem] bg-[rgb(var(--panel))] soft-border p-[var(--space-3)]"> <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6"> <div class="h-32 w-32 rounded-full soft-border grid place-items-center overflow-hidden shrink-0 shadow-glow"> <img src="/profile.jpg" alt="P. James" class="h-full w-full object-cover"> </div> <div class="text-center sm:text-left"> <p class="text-[var(--step-2)] font-display font-bold">P. James</p> <p class="text-[var(--step-0)] text-muted font-medium">
AI Systems Architect<br> <span class="text-sm opacity-60">Based in Nigeria • Active Globally</span> </p> </div> </div> <p class="mt-4 text-[var(--step-0)] text-muted leading-[1.75]">
I architect digital ecosystems engineered for growth. Where others see "pages", I see pipelines. 
        My systems are built on a simple premise:
<span class="text-white font-medium">clarity converts, confusion costs.</span> </p> </div> <!-- Process Card --> <div class="rounded-[1.5rem] bg-[rgb(var(--panel))] soft-border p-[var(--space-3)]"> <h3 class="text-[var(--step-2)] font-semibold mb-4">How I work</h3> <ul class="space-y-3"> ${processSteps.map((step) => renderTemplate`<li class="rounded-2xl bg-[rgb(var(--bg))]/40 soft-border p-4"> <p class="font-medium">${step.title}</p> <p class="text-sm text-muted">${step.description}</p> </li>`)} </ul> </div> </div> </section>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/About.astro", void 0);

const $$BriefForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="rounded-[1.25rem] bg-[rgb(var(--panel))]/50 soft-border p-[var(--space-3)] backdrop-blur-sm"> <h3 class="font-display font-bold text-[var(--step-1)] mb-4">
Start a Project
</h3> <div id="brief-notice" class="hidden mb-4 p-4 rounded-xl text-sm"></div> <form id="brief-form" class="space-y-4"> <div class="grid grid-cols-2 gap-3"> <label class="block"> <span class="text-xs uppercase tracking-widest text-muted">Your name</span> <input name="name" class="mt-2 w-full rounded-pill bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow" required> </label> <label class="block"> <span class="text-xs uppercase tracking-widest text-muted">Email</span> <input name="email" type="email" class="mt-2 w-full rounded-pill bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow" required> </label> </div> <label class="block"> <span class="text-xs uppercase tracking-widest text-muted">Business / Niche</span> <input name="business" placeholder="e.g. Real Estate, Coaching, SaaS" class="mt-2 w-full rounded-pill bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow"> </label> <label class="block"> <span class="text-xs uppercase tracking-widest text-muted">What do you need?</span> <input name="package" placeholder="Brand / Web / Bot" class="mt-2 w-full rounded-pill bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow"> </label> <label class="block"> <span class="text-xs uppercase tracking-widest text-muted">Details</span> <textarea name="details"${addAttribute(3, "rows")} placeholder="Brief overview of your project..." class="mt-2 w-full rounded-2xl bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow resize-none"></textarea> </label> <button type="submit" class="w-full rounded-pill px-6 py-4 font-bold btn-primary text-[rgb(var(--bg))] hover:scale-[1.02] transition">
Send Brief
</button> </form> </div> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/BriefForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/BriefForm.astro", void 0);

const $$NewsletterForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="text-center"> <h3 class="font-display font-bold text-[var(--step-1)]">
The AI-Growth Newsletter
</h3> <p class="mt-2 text-sm text-muted">Weekly notes on what's working.</p> <form id="newsletter-form" class="mt-4 space-y-3"> <input name="email" type="email" placeholder="you@company.com" class="w-full rounded-pill bg-[rgb(var(--bg))]/35 soft-border px-4 py-3 outline-none focus:shadow-glow text-center" required> <button type="submit" class="w-full rounded-pill px-5 py-3 font-medium btn-ghost soft-border hover:bg-white/5">
Subscribe
</button> <p id="newsletter-status" class="text-sm text-[rgb(var(--accent))] hidden"></p> </form> </div> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/NewsletterForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/NewsletterForm.astro", void 0);

const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const socialLinks = [
    {
      href: "https://twitter.com/pjames",
      title: "Twitter / X",
      icon: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />`
    },
    {
      href: "https://linkedin.com/in/pjames",
      title: "LinkedIn",
      icon: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />`
    },
    {
      href: "https://instagram.com/pjames",
      title: "Instagram",
      icon: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />`
    },
    {
      href: "https://github.com/pjames",
      title: "GitHub",
      icon: `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />`
    },
    {
      href: "https://behance.net/pjames",
      title: "Behance",
      icon: `<path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-6"> ${socialLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener" class="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"${addAttribute(link.title, "title")}> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">${unescapeHTML(link.icon)}</svg> </a>`)} </div>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/ui/SocialLinks.astro", void 0);

var _tmpl$ = ["<div", ' class="bg-white/10 text-[rgb(161_161_170)] max-w-[85%] rounded-2xl px-4 py-2 text-sm"><span class="animate-pulse">Thinking...</span></div>'], _tmpl$2 = ["<div", ' class="rounded-[1.25rem] bg-[rgb(17_19_24/0.72)] backdrop-blur-md border border-white/10 p-[var(--space-3)] flex flex-col h-[400px]"><div class="flex items-center justify-between mb-4"><div><h3 class="font-display font-bold text-lg">ARCHIBOT</h3><p class="text-xs text-[rgb(161_161_170)]">Assistant</p></div><div class="flex gap-1"><button class="', '">Lead Capture</button><button class="', '">AI Chat</button><span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Ready</span></div></div><p class="text-xs text-[rgb(161_161_170)] mb-3">', '</p><div class="flex-1 overflow-y-auto space-y-3 mb-4 pr-2"><!--$-->', "<!--/--><!--$-->", '<!--/--></div><form class="flex gap-2"><input type="text"', "", ' class="flex-1 rounded-full bg-[rgb(10_11_14/0.5)] border border-white/10 px-4 py-2 text-sm outline-none focus:border-[rgb(191_87_0/0.5)] disabled:opacity-50"><button type="submit"', ' class="px-4 py-2 rounded-full bg-[rgb(191_87_0)] text-[rgb(10_11_14)] font-medium text-sm hover:brightness-110 transition disabled:opacity-50">Send</button></form></div>'], _tmpl$3 = ["<div", ' class="', '">', "</div>"];
const LEAD_QUESTIONS = [{
  key: "name",
  text: "What's your name?",
  placeholder: "Your name"
}, {
  key: "email",
  text: "Great! What's your email so I can send you info?",
  placeholder: "you@company.com"
}, {
  key: "business",
  text: "What's your business or niche?",
  placeholder: "e.g. Real Estate, Coaching"
}, {
  key: "goal",
  text: "What's the #1 thing you want to achieve in the next 30-60 days?",
  placeholder: "e.g. Get more leads"
}, {
  key: "budget",
  text: "Do you have a budget range in mind?",
  placeholder: "e.g. $1,500-$2,500"
}, {
  key: "timeline",
  text: "When do you need this done?",
  placeholder: "e.g. ASAP, Next month"
}];
function ChatBot() {
  const [mode, setMode] = createSignal("lead");
  const [messages, setMessages] = createSignal([{
    role: "assistant",
    text: "Hey! 👋 I'm ARCHIBOT. Click 'AI Chat' to ask me about services, or answer a few quick questions in Lead Capture mode so P. James can review your project."
  }]);
  const [input, setInput] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [leadStep, setLeadStep] = createSignal(0);
  const [leadAnswers, setLeadAnswers] = createSignal({});
  const [isReady, setIsReady] = createSignal(false);
  createEffect(() => {
    messages();
  });
  const currentPlaceholder = () => {
    if (mode() === "lead" && leadStep() < LEAD_QUESTIONS.length) {
      return LEAD_QUESTIONS[leadStep()].placeholder;
    }
    return "Type...";
  };
  return ssr(_tmpl$2, ssrHydrationKey(), `px-3 py-1 text-xs rounded-full transition ${mode() === "lead" ? "bg-[rgb(191_87_0/0.2)] text-[rgb(191_87_0)] border border-[rgb(191_87_0/0.3)]" : "bg-white/5 text-[rgb(161_161_170)] hover:bg-white/10"}`, `px-3 py-1 text-xs rounded-full transition ${mode() === "ai" ? "bg-[rgb(191_87_0/0.2)] text-[rgb(191_87_0)] border border-[rgb(191_87_0/0.3)]" : "bg-white/5 text-[rgb(161_161_170)] hover:bg-white/10"}`, mode() === "ai" ? "AI Mode. Ask me about branding or automation." : "Lead Capture. Answer a few quick questions.", escape(createComponent$1(For, {
    get each() {
      return messages();
    },
    children: (msg) => ssr(_tmpl$3, ssrHydrationKey(), `max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "ml-auto bg-[rgb(191_87_0)] text-white" : "bg-white/10 text-[rgb(244_244_245)]"}`, escape(msg.text))
  })), escape(createComponent$1(Show, {
    get when() {
      return isLoading();
    },
    get children() {
      return ssr(_tmpl$, ssrHydrationKey());
    }
  })), ssrAttribute("value", escape(input(), true), false) + ssrAttribute("placeholder", escape(currentPlaceholder(), true), false), ssrAttribute("disabled", isLoading() || isReady(), true), ssrAttribute("disabled", isLoading() || !input().trim() || isReady(), true));
}

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer id="contact" class="border-t border-white/10 bg-[rgb(var(--panel2))]/40 py-[var(--space-5)]"> <div class="container-fluid grid gap-8 lg:grid-cols-2 items-end"> <!-- Col 1: Form (LEFT) --> ${renderComponent($$result, "BriefForm", $$BriefForm, {})} <!-- Col 2: Chatbot (RIGHT) --> ${renderComponent($$result, "ChatBot", ChatBot, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/chat/ChatBot.tsx", "client:component-export": "default" })} </div> <!-- Newsletter Section --> <div class="container-fluid mt-12 pt-8 border-t border-white/10"> <div class="max-w-md mx-auto"> ${renderComponent($$result, "NewsletterForm", $$NewsletterForm, {})} </div> </div> <!-- Social Links & Copyright --> <div class="container-fluid mt-12 pt-8 border-t border-white/10"> <div class="flex flex-col items-center gap-6"> ${renderComponent($$result, "SocialLinks", $$SocialLinks, {})} <p class="text-xs text-muted opacity-50">
© 2026 P. James. All rights reserved.
</p> </div> </div> </footer>`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/sections/Footer.astro", void 0);

const $$PricingModal = createComponent(($$result, $$props, $$slots) => {
  const tiers = [
    {
      name: "Brand Identity Sprint",
      price: "$500\u2013$750",
      timeline: "5 days",
      features: [
        "Logo Design",
        "Color Palette + Typography",
        "5 Social Media Templates",
        "AI-Generated Patterns",
        "Niche Content Ideas"
      ]
    },
    {
      name: "Conversion Engine",
      price: "$1,500\u2013$2,500",
      timeline: "2\u20133 weeks",
      popular: true,
      features: [
        "High-Performance Landing Page",
        "Custom UI/UX Design",
        "AI Lead-Qualification Bot",
        "Automated Lead Routing",
        "Mobile Optimized",
        "30-Day Support"
      ]
    },
    {
      name: "Full Business Architect",
      price: "$5,000\u2013$10,000+",
      timeline: "4\u20136 weeks",
      features: [
        "Everything in Conversion Engine",
        "Complete Brand Identity",
        "CRM + Automated Sequences",
        "Email + WhatsApp Flows",
        "AI Dashboard for Team",
        "90-Day Priority Support"
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<dialog id="pricing-modal" class="w-[min(95vw,64rem)] rounded-[2rem] bg-[rgb(var(--panel))] soft-border p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"> <div class="relative max-h-[90vh] overflow-y-auto p-8 lg:p-12"> <!-- Close Button --> <button id="pricing-modal-close" class="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition" aria-label="Close pricing"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M18 6L6 18M6 6l12 12"></path> </svg> </button> <!-- Header --> <div class="text-center mb-10"> <p class="text-[var(--step--1)] uppercase tracking-[0.18em] text-[rgb(var(--accent))] font-medium mb-3">
Pricing
</p> <h2 class="font-display font-bold text-[var(--step-3)] leading-[1.1]">
Choose Your Growth Package
</h2> </div> <!-- Pricing Grid --> <div class="grid gap-4 md:grid-cols-3"> ${tiers.map((tier) => renderTemplate`<div${addAttribute(`rounded-[1.5rem] soft-border p-6 flex flex-col ${tier.popular ? "bg-gradient-to-b from-[rgb(var(--accent))]/20 to-transparent border-[rgb(var(--accent))]/30" : "bg-[rgb(var(--bg))]/40"}`, "class")}> ${tier.popular && renderTemplate`<span class="text-xs uppercase tracking-widest text-[rgb(var(--accent))] font-bold mb-2">
Most Popular
</span>`} <h3 class="font-display font-bold text-xl">${tier.name}</h3> <p class="text-[var(--step-2)] font-bold text-[rgb(var(--accent))] mt-2">${tier.price}</p> <p class="text-sm text-muted mb-4">${tier.timeline}</p> <ul class="space-y-2 flex-1 mb-6"> ${tier.features.map((feature) => renderTemplate`<li class="flex gap-2 text-sm"> <span class="text-[rgb(var(--accent))]">✓</span> ${feature} </li>`)} </ul> <a href="#contact" class="w-full text-center rounded-full px-5 py-3 font-medium btn-ghost soft-border hover:bg-white/10 transition" onclick="document.getElementById('pricing-modal').close()">
Get Started
</a> </div>`)} </div> <!-- Custom Requirements --> <div class="mt-8 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-dashed border-white/20 p-6 text-center"> <h4 class="font-display font-bold text-xl mb-2">Need Something Different?</h4> <p class="text-muted text-sm mb-4 max-w-lg mx-auto">
Have unique requirements? API integrations, multi-site setups, enterprise solutions, 
        or ongoing retainers? Chat with ARCHIBOT in AI mode or submit your brief for a custom quote.
</p> <a href="#contact" class="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium btn-ghost soft-border hover:bg-white/10 transition" onclick="document.getElementById('pricing-modal').close()"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> </svg>
Discuss Custom Requirements
</a> </div> <p class="mt-8 text-center text-sm text-muted">
All prices in USD. Custom quotes available for unique requirements.
</p> </div> </dialog> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/PricingModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/PricingModal.astro", void 0);

const $$ProjectModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<dialog id="project-modal" class="w-[min(95vw,56rem)] rounded-[2rem] bg-[rgb(var(--panel))] soft-border p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"> <div class="relative max-h-[90vh] overflow-y-auto p-8 lg:p-12"> <!-- Close Button --> <button id="project-modal-close" class="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition z-10" aria-label="Close project"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M18 6L6 18M6 6l12 12"></path> </svg> </button> <!-- Main Image --> <div class="aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-[rgb(var(--bg))]"> <img id="project-modal-image" src="" alt="" class="h-full w-full object-cover"> </div> <!-- Category Badge --> <p id="project-modal-category" class="text-xs uppercase tracking-widest text-[rgb(var(--accent))] font-bold mb-2"></p> <!-- Title --> <h3 id="project-modal-title" class="font-display font-bold text-[var(--step-2)] mb-4"></h3> <!-- Details --> <p id="project-modal-details" class="text-muted leading-relaxed mb-6"></p> <!-- Tools --> <div class="mb-6"> <h4 class="text-sm uppercase tracking-widest text-muted font-medium mb-3">Built With</h4> <div id="project-modal-tools" class="flex flex-wrap gap-2"></div> </div> <!-- Gallery --> <div class="mb-6"> <h4 class="text-sm uppercase tracking-widest text-muted font-medium mb-3">Gallery</h4> <div id="project-modal-gallery" class="grid grid-cols-4 gap-2"></div> </div> <!-- CTA --> <a id="project-modal-link" href="#" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium btn-primary text-[rgb(var(--bg))]">
View Live Project
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path> </svg> </a> </div> </dialog> ${renderScript($$result, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/ProjectModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/ProjectModal.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${renderComponent($$result2, "MobileNavOverlay", $$MobileNavOverlay, {})}  ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Services", $$Services, {})} ${renderComponent($$result2, "Work", $$Work, {})} ${renderComponent($$result2, "Testimonials", $$Testimonials, {})} ${renderComponent($$result2, "About", $$About, {})} </main>  ${renderComponent($$result2, "Footer", $$Footer, {})}  ${renderComponent($$result2, "PricingModal", $$PricingModal, {})} ${renderComponent($$result2, "ProjectModal", $$ProjectModal, {})}  ${renderComponent($$result2, "BackToTop", $$BackToTop, {})} ` })}`;
}, "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/pages/index.astro", void 0);

const $$file = "C:/Users/Victor/Documents/Coding/pjames/astro-client/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
