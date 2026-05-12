export const siteConfig = {
  name: "Mustaqeem Bangi",
  fullName: "Mustaqeem Abdullah Bangi",
  initials: "MB",
  title: "Senior Laravel & Systems Engineer",
  location: "Kuwait City, Kuwait",
  avatar: "https://avatars.githubusercontent.com/u/37992013?v=4",
  tagline: "I ship Laravel to production.",
  bio:
    "Senior Laravel & Systems Engineer based in Kuwait City. I architect and ship production SaaS — competitive intelligence, fleet telematics, WhatsApp commerce — for the GCC market.",
  email: "mbangi66@gmail.com",
  phone: "+965 410 76750",
  cvPath: "/Mustaqeem_Bangi_CV.pdf",
  url: "https://mustaqeembangi.com",
  ogImage: "/og.png",
  capacity: "Available for 2–3 Laravel/Filament builds per year. Typical engagement: 6–12 weeks.",
  responsePromise: "I reply within 1 business day · GMT+3",
};

export type SocialLink = { name: string; href: string; handle: string };

export const socials: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/mbangi66", handle: "@mbangi66" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mustaqeembangi/", handle: "/in/mustaqeembangi" },
  { name: "Twitter", href: "https://twitter.com/Mustaqeembangi", handle: "@Mustaqeembangi" },
];

// Real production numbers, static (no animated counters).
export type Kpi = { value: string; label: string };
export const kpis: Kpi[] = [
  { value: "7K+", label: "vehicles tracked in real time" },
  { value: "2.4M", label: "rows synced · MSSQL → MariaDB" },
  { value: "56+", label: "features shipped this year" },
  { value: "3+", label: "years production Laravel" },
];

// Cycling deploy log shown in hero terminal.
export type DeployStep = { kind: "cmd" | "ok" | "info" | "warn" | "comment"; text: string };
export type DeployRun = { title: string; steps: DeployStep[] };

export const deployRuns: DeployRun[] = [
  {
    title: "social-hub",
    steps: [
      { kind: "comment", text: "~/social-hub on  main" },
      { kind: "cmd", text: "deploy --env=prod" },
      { kind: "ok", text: "migrations ............... ok" },
      { kind: "ok", text: "queue workers (8) ........ ok" },
      { kind: "ok", text: "filament panel ........... ok" },
      { kind: "ok", text: "apify scrapers ........... ok" },
      { kind: "info", text: "deployed in 41s · 0 downtime" },
    ],
  },
  {
    title: "gps-fleet",
    steps: [
      { kind: "comment", text: "~/gps-fleet on  main" },
      { kind: "cmd", text: "sync fleet --window=24h" },
      { kind: "ok", text: "mssql → mariadb .......... 2.4M rows" },
      { kind: "ok", text: "node listener (pm2) ...... up · 7124 vehicles" },
      { kind: "ok", text: "websocket bridge ......... 18ms p95" },
      { kind: "info", text: "sync complete · 11.2s" },
    ],
  },
  {
    title: "whatsapp-commerce",
    steps: [
      { kind: "comment", text: "~/whatsapp-flow on  main" },
      { kind: "cmd", text: "deploy flow --providers=4" },
      { kind: "ok", text: "meta flow v7.2 ........... validated" },
      { kind: "ok", text: "myfatoorah webhook ....... healthy" },
      { kind: "ok", text: "session cache (redis) .... 0% miss" },
      { kind: "info", text: "shipped · 8 restaurants live" },
    ],
  },
];

// Featured case studies — 3 distinct projects after merging Intelligence Hub into Social Hub.
export type Project = {
  slug: string;
  name: string;
  pitch: string;
  description: string;
  stack: string[];
  role: string;
  href?: string;
  metric?: string;
  accent?: string; // hex for card glow
};

export const projects: Project[] = [
  {
    slug: "social-hub",
    name: "Social Hub",
    pitch: "AI competitive intelligence + social media SaaS for the GCC.",
    description:
      "Unified competitor crawling, social media management, Instagram intelligence pipeline, and an Anthropic-powered natural-language layer for querying market data. 7 specialized AI tools, batch processing, multi-tier image cache. 116 API routes, multi-tenant from day one.",
    stack: ["Laravel", "Vue 3", "Inertia", "Anthropic", "Apify", "Rival IQ"],
    role: "Sole developer + product lead",
    href: "https://social-hub.net",
    metric: "56+ features · 7 AI tools · 116 routes",
    accent: "#6366f1",
  },
  {
    slug: "gps-fleet",
    name: "Fleet Telematics",
    pitch: "Real-time GPS tracking for 7,000+ vehicles in Kuwait.",
    description:
      "Python sync pipeline moves 2.4M rows from MSSQL to MariaDB. Node.js GPS listener under PM2, monitored from a custom admin panel. PhpSpreadsheet reports with status-color charts. WebSocket bridge at 18ms p95.",
    stack: ["Laravel", "Python", "Node.js", "PM2", "WebSockets", "MariaDB"],
    role: "Primary developer",
    href: "https://gps-majestic.com",
    metric: "2.4M rows · 7K vehicles · 18ms p95",
    accent: "#3b82f6",
  },
  {
    slug: "whatsapp-commerce",
    name: "WhatsApp Commerce",
    pitch: "Single-number, multi-provider WhatsApp commerce platform.",
    description:
      "Generic flow engine routes users through restaurant ordering, reservations, and bookings under one phone number. Arabic/English locale detection, payment links, MyFatoorah, Meta Flow v7.2. 8 live restaurants on day one.",
    stack: ["Laravel", "Meta Flow v7.2", "MyFatoorah", "Redis", "Google Maps"],
    role: "Architect & developer",
    metric: "4 providers · bilingual · 0% session miss",
    accent: "#06b6d4",
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
    company: "Kuwait-based SaaS group",
    role: "Senior Laravel & Systems Engineer",
    period: "Jul 2024 — Present",
    location: "Kuwait City",
    summary:
      "Lead engineer across a multi-product SaaS stack — competitive intelligence, fleet telematics, WhatsApp commerce. Production Laravel + Filament, Anthropic-powered BI, Node-based telematics. Backward compatible from day one.",
    stack: ["Laravel", "Filament", "Vue/Inertia", "Anthropic", "MariaDB"],
  },
  {
    company: "SerpElevator",
    role: "Web Developer",
    period: "Jun 2021 — Jul 2023",
    location: "Mumbai",
    summary:
      "Shipped 10+ MEAN/Laravel apps. RESTful APIs with Passport/Sanctum, MySQL schema work, AWS + Azure deploys. −40% load times, −15% bugs, +30% test reliability.",
    stack: ["MEAN", "Laravel", "MySQL", "AWS", "Azure"],
  },
  {
    company: "SerpClimber",
    role: "Web Designer",
    period: "Mar 2020 — Jun 2021",
    location: "Mumbai",
    summary:
      "Designed and maintained 10+ user-friendly websites. +20% client retention, 99% uptime, +35% UX scores. WordPress, HTML/CSS/JS, on-page SEO.",
    stack: ["WordPress", "HTML/CSS/JS", "SEO"],
  },
];

export type NavItem = { label: string; href: string };
export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
