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
    "Senior Laravel & Systems Engineer in Kuwait City. I build and run 30+ production apps for GCC businesses: ERP and POS systems, WhatsApp platforms, clinics, e-commerce, AI-powered SaaS and real-time fleet tracking.",
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
  { value: "30+", label: "production apps I build & host" },
  { value: "14+", label: "businesses on one ERP core" },
  { value: "7K+", label: "vehicles tracked in real time" },
  { value: "2020", label: "shipping for the web since" },
];

export const industries: string[] = [
  "Restaurants & cafés",
  "Retail & warehouses",
  "Clinics & healthcare",
  "Fleet & logistics",
  "Automotive",
  "Education",
  "Luxury e-commerce",
  "Storage & rentals",
  "Marketing & brands",
];

export type CaseStudy = { challenge: string; built: string[]; outcome: string };

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
  caseStudy?: CaseStudy;
};

// Featured: the four biggest systems, with case studies.
export const projects: Project[] = [
  {
    slug: "erp-platform",
    name: "Business ERP & Restaurant Platform",
    pitch: "One ERP core running 14+ businesses: restaurants, retail, rentals and services.",
    description:
      "Ordering, tablet POS, delivery-platform integrations, accounting, HR and payroll, contracts and fixed assets in one Laravel platform. Modules switch on per business, so the same core runs a single café, a multi-brand restaurant group or a storage-rental company.",
    stack: ["Laravel 12", "Livewire 3", "Sanctum", "MySQL", "MyFatoorah", "Spatie Permissions"],
    role: "Lead engineer",
    status: "In production · client-private",
    accent: "#f97316",
    caseStudy: {
      challenge:
        "Four copies of the same restaurant system had drifted apart over three years. Every fix had to be made four times, and the copies disagreed about data.",
      built: [
        "Merged all four into one codebase with a 177-table schema and per-business module flags",
        "Accounting: chart of accounts, cost centres, vouchers and balance sheets",
        "HR & payroll: attendance, shifts, leave, loans, payslips and staff documents",
        "Contracts with full action trails, fixed assets, drivers and delivery",
        "Tablet POS tills that pair with a short code and authenticate as devices, not people",
        "Now adding: kitchen station printing and a partner API for outside ordering channels",
      ],
      outcome: "One codebase to fix, test and deploy, running 14+ businesses from the same release.",
    },
  },
  {
    slug: "social-hub",
    name: "Social Hub",
    pitch: "AI competitive intelligence and social-media management for GCC brands.",
    description:
      "Tracks competitors across the web and social platforms, manages publishing, and answers plain-language questions about the market using Anthropic models. Built multi-tenant from day one.",
    stack: ["Laravel", "Vue 3", "Inertia SSR", "Anthropic", "Apify", "Queues"],
    role: "Sole developer & product lead",
    href: "https://social-hub.net",
    status: "Live",
    accent: "#8b5cf6",
    caseStudy: {
      challenge:
        "Marketing teams in the Gulf were tracking competitors by hand across websites, Instagram and TikTok, with no way to ask questions of the data.",
      built: [
        "Scraping pipelines for competitor sites and social accounts",
        "Seven AI tools on Anthropic models, with batch processing to keep costs down",
        "Plain-language Q&A over each brand's market data",
        "Multi-tenant workspaces, server-side rendering and queue workers",
      ],
      outcome: "A live SaaS that turns scattered competitor activity into answers a marketing team can act on.",
    },
  },
  {
    slug: "gps-fleet",
    name: "Fleet Telematics",
    pitch: "Real-time GPS tracking for 7,000+ vehicles in Kuwait.",
    description:
      "Live maps, alerts and reporting for fleet operators, fed by thousands of GPS devices reporting around the clock.",
    stack: ["Laravel", "Python", "Node.js", "PM2", "WebSockets", "MariaDB", "MSSQL"],
    role: "Primary developer",
    href: "https://gps-majestic.com",
    status: "Live",
    accent: "#3b82f6",
    caseStudy: {
      challenge:
        "Device data lived in a legacy MSSQL system that the web platform could not query fast enough for live maps and reports.",
      built: [
        "A Python pipeline that keeps millions of rows in sync from MSSQL to MariaDB",
        "A Node.js GPS listener running under PM2, monitored from the admin panel",
        "A WebSocket bridge that pushes positions to the browser as they arrive",
        "Excel reports with status-coloured charts for fleet managers",
      ],
      outcome: "Operators watch 7,000+ vehicles move live and pull reports without touching the legacy system.",
    },
  },
  {
    slug: "whatsapp-platform",
    name: "WhatsApp Business Platform",
    pitch: "Ordering, bookings, clinics and campaigns, all run from WhatsApp.",
    description:
      "A multi-workspace platform that runs entire businesses over WhatsApp: a versioned flow builder, Meta Flows, payment links, promotions, campaigns and AI replies, with full restaurant and clinic modules behind it. 126 models, in Arabic and English.",
    stack: ["Laravel 12", "Filament", "Inertia", "WhatsApp Cloud API", "Meta Flows", "Horizon", "LLMs"],
    role: "Architect & lead developer",
    status: "In production · runs inside clients' WhatsApp",
    accent: "#10b981",
    caseStudy: {
      challenge:
        "Customers in the Gulf already live in WhatsApp, but paid templates and AI calls get expensive fast, providers fail, and spam can run the bill up overnight.",
      built: [
        "A flow builder with versions, templates and triggers, so flows change without a deploy",
        "Several messaging providers behind one adapter, with health checks, rate limits and webhook logs",
        "Bookings with holds, blackout dates and per-branch availability; orders with modifiers",
        "A promotions engine (conditions and actions), coupons and bulk invite campaigns",
        "Limits and abuse checks before any paid template or AI call; no silent failures",
      ],
      outcome: "Businesses sell, book and follow up where their customers already are, with costs under control.",
    },
  },
];

// Also in production: client systems, described without naming the client.
export const moreProjects: Project[] = [
  {
    slug: "clinic-platform",
    name: "Clinic Management",
    pitch: "Patients, doctors, visits and stock in one system.",
    description:
      "Patient files, visits and packages, doctors' shifts and compensation ledgers, labs, medication, insurance and inpatient care, plus clinic stock, purchasing and payroll. Every patient-file access is logged. A new clinic is a new config, never a fork.",
    stack: ["Laravel 12", "Filament", "Inertia", "WhatsApp Cloud API"],
    role: "Lead engineer",
    status: "In production · client-private",
    accent: "#14b8a6",
  },
  {
    slug: "retail-platform",
    name: "Retail & Warehouse",
    pitch: "Storefront, in-store POS and warehouse on one inventory.",
    description:
      "An online store, a shop-counter POS, a mobile app API, warehouse fulfilment tasks, inventory events and a full price-change history, sharing one stock ledger with local payment gateways.",
    stack: ["Laravel", "Filament", "Livewire", "MySQL", "REST API"],
    role: "Lead engineer",
    status: "In production · client-private",
    accent: "#eab308",
  },
  {
    slug: "car-marketplace",
    name: "Car Marketplace",
    pitch: "Buy, sell and rent cars, with dealers on board.",
    description:
      "Listings for sale and rent, dealer agencies and their teams, a deal pipeline with reconciliation, rental calendars, saved searches, price alerts and paid subscriptions.",
    stack: ["Laravel 13", "Inertia", "Vue", "MySQL"],
    role: "Developer",
    status: "Client project",
    accent: "#ef4444",
  },
  {
    slug: "automotive",
    name: "Smart Car Wash & Parking",
    pitch: "Connected car-wash machines, parking lots and service billing.",
    description:
      "Car-wash orders tied to the machines that run them, with water-pump and machine logs streamed in real time; parking-lot management; and invoicing with online payment for car services.",
    stack: ["Laravel", "Livewire", "Pusher", "MySQL"],
    role: "Developer",
    status: "Client project",
    accent: "#06b6d4",
  },
  {
    slug: "e-learning",
    name: "E-learning Platforms",
    pitch: "Course marketplaces with live classes.",
    description:
      "Courses, chapters and progress tracking, live classes over Agora, Jitsi and Google Meet, instructor plans and payouts, certificates, instalment payments, affiliates and forums. Customised, integrated and hosted.",
    stack: ["Laravel", "Inertia", "Passport", "Stripe", "Agora"],
    role: "Customisation & hosting",
    status: "Client projects",
    accent: "#a855f7",
  },
  {
    slug: "site-builder",
    name: "Website Builder SaaS",
    pitch: "Customers launch their own sites from themes.",
    description:
      "Theme catalogue and per-customer sites, points and credits, documentation, support email broadcasts, WhatsApp integration and Stripe billing, built on the Wave SaaS starter.",
    stack: ["Laravel", "Filament", "Livewire", "Stripe", "Horizon"],
    role: "Developer",
    status: "Client project",
    accent: "#38bdf8",
  },
  {
    slug: "luxury-store",
    name: "Luxury E-commerce",
    pitch: "An Arabic-first online store for a premium brand.",
    description:
      "A bilingual Bagisto storefront with right-to-left layouts, KWD pricing and MyFatoorah checkout, kept in step with upstream Bagisto releases.",
    stack: ["Bagisto", "Laravel 12", "Vue 3", "MyFatoorah"],
    role: "Developer",
    status: "In production · client-private",
    accent: "#ec4899",
  },
];

export type Highlight = { tag: string; title: string; body: string };

// Hard problems solved, described without client details.
export const highlights: Highlight[] = [
  {
    tag: "Architecture",
    title: "Four codebases into one",
    body: "Merged four drifted copies of a restaurant system into a single Laravel 12 app, with module flags so each business turns on only what it uses.",
  },
  {
    tag: "Migrations",
    title: "Clean installs, every time",
    body: "A migration generator that builds the schema with optional modules on or off, verified on fresh databases before any new business goes live.",
  },
  {
    tag: "POS",
    title: "Tablets that pair in seconds",
    body: "Till tablets pair with a short-lived code and get their own device tokens. The audit log tells a cashier's action apart from the device's.",
  },
  {
    tag: "Reliability",
    title: "Messaging that survives outages",
    body: "Several WhatsApp providers sit behind one adapter, each with health checks, rate limits and webhook logs, so one provider failing doesn't stop the business.",
  },
  {
    tag: "No-code",
    title: "Flows change without a deploy",
    body: "A versioned flow builder with templates and triggers. Businesses update their WhatsApp journeys, and every version stays on record.",
  },
  {
    tag: "Privacy",
    title: "Every patient file access logged",
    body: "Clinic systems record who opened which patient file and when, alongside role-based permissions for every screen.",
  },
  {
    tag: "AI cost",
    title: "AI that can't run up the bill",
    body: "WhatsApp automations check rate limits and abuse rules before any paid template or AI call, so spam never turns into an invoice.",
  },
  {
    tag: "Data",
    title: "Millions of rows, kept in sync",
    body: "A Python pipeline moves fleet data from legacy MSSQL into MariaDB continuously, so live maps and reports never query the old system.",
  },
  {
    tag: "Real time",
    title: "Thousands of devices, live",
    body: "A Node.js listener under PM2 ingests GPS traffic around the clock and streams positions to the browser over WebSockets.",
  },
  {
    tag: "Payments",
    title: "Money to the fils",
    body: "KWD carries three decimals. Pricing, tax and MyFatoorah payments are built to keep every fils, with test and live modes kept strictly apart.",
  },
  {
    tag: "DevOps",
    title: "Deploys nobody notices",
    body: "Route and config caching, queue restarts and SSR workers handled in order, so live products update without an outage.",
  },
  {
    tag: "Ops",
    title: "Backups that can't be deleted",
    body: "Every night an office NAS pulls a read-only copy of the apps and databases, so even a compromised server can't wipe the backups.",
  },
];

export type StackGroup = { title: string; items: string[] };

export const stackGroups: StackGroup[] = [
  { title: "Backend", items: ["PHP 8.3", "Laravel 8–13", "Livewire", "Filament", "Sanctum & Passport", "Queues & schedulers", "Python", "Node.js"] },
  { title: "Frontend", items: ["Vue 3", "Inertia", "React", "Next.js", "TypeScript", "Tailwind", "three.js"] },
  { title: "Data", items: ["MySQL 8", "MariaDB", "MSSQL", "Redis", "MongoDB", "SQLite"] },
  { title: "AI", items: ["Anthropic Claude", "OpenAI", "Batch processing", "Prompt & cost control"] },
  { title: "Integrations", items: ["WhatsApp Cloud API", "Meta Flows", "MyFatoorah", "Delivery platforms", "Google Maps", "Apify"] },
  { title: "Infrastructure", items: ["Linux", "Nginx", "Varnish", "Hetzner", "CloudPanel", "WHM / cPanel", "PM2", "AWS", "Azure", "Docker"] },
];

export type Step = { title: string; body: string };

export const workSteps: Step[] = [
  { title: "Audit", body: "I read the code, the data and the servers first, and tell you plainly what's risky and what's fine." },
  { title: "Plan", body: "A short written plan: what we change, in what order, and how each step can be rolled back." },
  { title: "Ship in slices", body: "Small releases behind feature flags, tested on a copy of real data before they reach customers." },
  { title: "Run it", body: "Deploys, monitoring, backups and fixes after launch. I stay on the system, not just the project." },
];

export type Capability = { icon: string; title: string; body: string };

export const capabilities: Capability[] = [
  {
    icon: "utensils",
    title: "Restaurant & POS systems",
    body: "Online ordering, tablet POS, kitchen printing, tables and floors, delivery-platform integrations, loyalty and offers. Multi-brand and multi-branch.",
  },
  {
    icon: "ledger",
    title: "ERP: accounting, HR & payroll",
    body: "Chart of accounts, cost centres, vouchers and balance sheets; employees, attendance, leave, loans and payslips; contracts and fixed assets.",
  },
  {
    icon: "cart",
    title: "E-commerce & retail",
    body: "Storefronts, in-store POS, mobile app APIs, warehouse fulfilment and stock, price history and local payment gateways.",
  },
  {
    icon: "message",
    title: "WhatsApp platforms",
    body: "Flow builders, Meta Flows, campaigns, promotions, payment links and AI replies, across several providers with spam and cost controls.",
  },
  {
    icon: "brain",
    title: "AI-powered SaaS",
    body: "Multi-tenant products built on LLMs: competitive intelligence, content generation, plain-language Q&A and large batch processing.",
  },
  {
    icon: "stethoscope",
    title: "Clinics & healthcare",
    body: "Patients, visits, doctors' shifts and pay, labs, medication, insurance and inpatient care, with access logging on patient files.",
  },
  {
    icon: "market",
    title: "Marketplaces & bookings",
    body: "Car sales and rentals, dealer agencies, deal pipelines, reservations with holds and blackouts, subscriptions and price alerts.",
  },
  {
    icon: "education",
    title: "E-learning",
    body: "Course marketplaces with live classes, instructor payouts, certificates, instalments, affiliates and forums.",
  },
  {
    icon: "satellite",
    title: "Real-time, IoT & data",
    body: "Live GPS for thousands of vehicles, connected car-wash machines, WebSocket dashboards and syncing millions of rows between databases.",
  },
  {
    icon: "server",
    title: "DevOps & hosting",
    body: "30+ Laravel apps on servers I run: zero-outage deploys, queue workers, caching, DNS and mail, and nightly off-site backups.",
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
      "Lead engineer across 30+ production apps: an ERP core running 14+ businesses, a WhatsApp business platform, clinic, retail and e-commerce systems, AI-powered SaaS and fleet telematics. I also run the servers they live on, from deploys to backups.",
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
  { label: "Highlights", href: "#highlights" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
