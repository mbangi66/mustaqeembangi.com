export const siteConfig = {
  name: "Mustaqeem Bangi",
  fullName: "Mustaqeem Abdullah Bangi",
  initials: "MB",
  title: "Senior Laravel & Systems Engineer",
  location: "Kuwait City, Kuwait",
  coordinates: "29.37° N · 47.98° E",
  avatar: "https://avatars.githubusercontent.com/u/37992013?v=4",
  tagline: "I ship Laravel to production, and keep it running.",
  bio:
    "Senior Laravel & Systems Engineer in Kuwait City. I build and run production software for GCC businesses: restaurant and POS systems, e-commerce, WhatsApp commerce, AI-powered SaaS and real-time fleet tracking.",
  email: "mbangi66@gmail.com",
  phone: "+965 410 76750",
  cvPath: "/Mustaqeem_Bangi_CV.pdf",
  url: "https://mustaqeembangi.vercel.app",
  availability: "Open to senior Laravel roles and 6–12 week SaaS projects.",
  responsePromise: "I reply within 1 business day · GMT+3",
};

export type SocialLink = { name: string; href: string; handle: string };

export const socials: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/mbangi66", handle: "@mbangi66" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mustaqeembangi/", handle: "/in/mustaqeembangi" },
  { name: "Twitter", href: "https://twitter.com/Mustaqeembangi", handle: "@Mustaqeembangi" },
];

// Static facts, no animated counters.
export type Kpi = { value: string; label: string };
export const kpis: Kpi[] = [
  { value: "2020", label: "shipping for the web since" },
  { value: "6", label: "product areas live in production" },
  { value: "7K+", label: "vehicles tracked in real time" },
  { value: "AR·EN", label: "bilingual by default" },
];

export type Project = {
  slug: string;
  name: string;
  pitch: string;
  description: string;
  stack: string[];
  role: string;
  href?: string;
  status: string;
  accent: string; // planet colour on the card
};

export const projects: Project[] = [
  {
    slug: "social-hub",
    name: "Social Hub",
    pitch: "AI competitive intelligence and social-media management for GCC brands.",
    description:
      "Tracks competitors across the web and social platforms, manages publishing, and answers plain-language questions about the market using Anthropic models. Built multi-tenant from day one, with batch processing for large jobs.",
    stack: ["Laravel", "Vue 3", "Inertia", "Anthropic", "Apify"],
    role: "Sole developer & product lead",
    href: "https://social-hub.net",
    status: "Live",
    accent: "#8b5cf6",
  },
  {
    slug: "gps-fleet",
    name: "Fleet Telematics",
    pitch: "Real-time GPS tracking for 7,000+ vehicles in Kuwait.",
    description:
      "Live maps, alerts and reporting for fleet operators. A Python pipeline keeps millions of rows in sync between MSSQL and MariaDB, a Node.js listener ingests device data under PM2, and a WebSocket bridge pushes positions to the browser.",
    stack: ["Laravel", "Python", "Node.js", "PM2", "WebSockets", "MariaDB"],
    role: "Primary developer",
    href: "https://gps-majestic.com",
    status: "Live",
    accent: "#3b82f6",
  },
  {
    slug: "whatsapp-commerce",
    name: "WhatsApp Commerce",
    pitch: "Ordering, bookings and payments inside WhatsApp.",
    description:
      "One WhatsApp number routes customers through restaurant ordering, table reservations and bookings using Meta Flows, in Arabic or English, with MyFatoorah payment links. Rate limits and spam protection on every automated path.",
    stack: ["Laravel", "Meta Flows", "MyFatoorah", "Redis", "Google Maps"],
    role: "Architect & developer",
    status: "In production · runs inside clients' WhatsApp",
    accent: "#10b981",
  },
];

export type Capability = { icon: string; title: string; body: string };

export const capabilities: Capability[] = [
  {
    icon: "utensils",
    title: "Restaurant & POS systems",
    body: "Online ordering, admin back office, tablet POS, kitchen printing, delivery-platform integrations, accounting and HR. Multi-brand and multi-branch.",
  },
  {
    icon: "cart",
    title: "E-commerce & retail",
    body: "Storefronts with in-store POS, mobile app APIs, warehouse and stock management, and local payment gateways.",
  },
  {
    icon: "message",
    title: "WhatsApp commerce",
    body: "Ordering, bookings and payments over WhatsApp, with interactive flows, AI replies, and spam and cost controls built in.",
  },
  {
    icon: "brain",
    title: "AI-powered SaaS",
    body: "Multi-tenant products built on LLMs: competitive intelligence, social-media management and large batch processing.",
  },
  {
    icon: "stethoscope",
    title: "Clinic & booking platforms",
    body: "One codebase serving many clients, configured per install instead of forked: appointments, patient records, reminders.",
  },
  {
    icon: "satellite",
    title: "Real-time & data pipelines",
    body: "Live GPS tracking, WebSocket dashboards, and syncing large datasets between databases without downtime.",
  },
  {
    icon: "server",
    title: "DevOps & hosting",
    body: "Linux servers that host many Laravel apps side by side: zero-downtime deploys, queue workers, caching, monitoring and off-site backups.",
  },
];

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  {
    title: "Keep production working",
    body: "Routes, API responses and database columns stay backward compatible. Customers should never notice a deploy.",
  },
  {
    title: "Small steps over rewrites",
    body: "Feature flags, tests and incremental releases. A system that earns money today gets improved, not replaced.",
  },
  {
    title: "Built for the region",
    body: "Arabic and English, right-to-left layouts, KWD with three decimals, and local payment gateways from the start.",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Majestic Information Technology",
    role: "Senior Laravel & Systems Engineer",
    period: "Jul 2024 — Present",
    location: "Kuwait City",
    summary:
      "Lead engineer across a portfolio of production products: restaurant and POS systems, e-commerce, WhatsApp commerce, AI-powered SaaS and fleet telematics. I also run the servers they live on, from deploys to backups.",
    stack: ["Laravel", "Livewire", "Filament", "Vue/Inertia", "Anthropic", "MariaDB", "Linux"],
  },
  {
    company: "SerpElevator",
    role: "Web Developer",
    period: "Jun 2021 — Jul 2023",
    location: "Mumbai",
    summary:
      "Built 10+ MEAN-stack and Laravel applications. REST APIs with Passport and Sanctum, MySQL schema design, deploys on AWS and Azure. Cut page load times by 40% and bugs by 15%.",
    stack: ["Laravel", "MEAN", "MySQL", "AWS", "Azure"],
  },
  {
    company: "SerpClimber",
    role: "Web Designer",
    period: "Mar 2020 — Jun 2021",
    location: "Mumbai",
    summary:
      "Designed and maintained 10+ client websites with 99% uptime. WordPress, HTML/CSS/JS and on-page SEO.",
    stack: ["WordPress", "HTML/CSS/JS", "SEO"],
  },
];

export type NavItem = { label: string; href: string };
export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
