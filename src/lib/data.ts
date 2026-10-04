export const siteConfig = {
  name: "Mustaqeem Bangi",
  fullName: "Mustaqeem Abdullah Bangi",
  initials: "MB",
  title: "Senior Laravel & Systems Engineer",
  location: "Kuwait City, Kuwait",
  coordinates: "29.37° N · 47.98° E",
  avatar: "https://avatars.githubusercontent.com/u/37992013?v=4",
  tagline: "From first idea to full orbit, and I keep it flying.",
  bio:
    "Senior Laravel & Systems Engineer in Kuwait City. I build and run 30+ production apps for GCC businesses: ERP and POS systems, WhatsApp platforms, clinics, online stores, AI products and live fleet tracking.",
  email: "mbangi66@gmail.com",
  phone: "+965 410 76750",
  cvPath: "/Mustaqeem_Bangi_CV.pdf",
  url: "https://mustaqeembangi.vercel.app",
  availability: "Open to full time roles and freelance projects.",
  responsePromise: "I usually reply within a day · Kuwait time, GMT+3",
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
  { value: "30+", label: "live apps I built and run" },
  { value: "14+", label: "businesses on one system" },
  { value: "7K+", label: "vehicles tracked live" },
  { value: "2020", label: "building for the web since" },
];

export const industries: string[] = [
  "Restaurants & cafés",
  "Retail & warehouses",
  "Clinics & healthcare",
  "Fleet & logistics",
  "Automotive",
  "Education",
  "Luxury online retail",
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
  accent: string; // glow colour on the card
  planet: import("@/components/planet").PlanetName;
  image?: string; // real screenshot; replaces the planet when present
  caseStudy?: CaseStudy;
};

// Featured: the four biggest systems, with case studies.
export const projects: Project[] = [
  {
    slug: "erp-platform",
    planet: "jupiter",
    name: "Business ERP & Restaurant Platform",
    pitch: "One system running 14+ businesses: restaurants, shops, rentals and services.",
    description:
      "Everything a business needs to run day to day, in one Laravel system: ordering, tablet tills, delivery apps, accounting, HR and payroll, contracts and assets. Each business switches on only the parts it needs, so the same system runs a single café, a group of restaurants or a storage rental company.",
    stack: ["Laravel 12", "Livewire 3", "Sanctum", "MySQL", "MyFatoorah", "Spatie Permissions"],
    role: "Lead engineer",
    status: "Live, private client system",
    accent: "#f97316",
    caseStudy: {
      challenge:
        "Four copies of the same restaurant system had drifted apart over three years. Every fix had to be made four times, and the copies disagreed about data.",
      built: [
        "Merged all four into one system (177 database tables), where each business turns on only the parts it uses",
        "Accounting: chart of accounts, cost centres, vouchers and balance sheets",
        "HR & payroll: attendance, shifts, leave, loans, payslips and staff documents",
        "Contracts with a full history of every change, plus fixed assets, drivers and delivery",
        "Tablet tills that connect with a single use code, and a log showing whether a person or a till made each change",
        "Coming next: orders printed straight to each kitchen station, and an API so other apps can send orders in",
      ],
      outcome: "Fix something once and every business gets it. 14+ businesses now run on the same system.",
    },
  },
  {
    slug: "social-hub",
    planet: "neptune",
    name: "Social Hub",
    pitch: "AI competitor tracking and social media management for Gulf brands.",
    description:
      "Tracks competitors across the web and social platforms, manages publishing, and answers questions about the market in plain words using Anthropic models. Built for many client accounts from day one.",
    stack: ["Laravel", "Vue 3", "Inertia SSR", "Anthropic", "Apify", "Queues"],
    role: "Sole developer & product lead",
    href: "https://social-hub.net",
    status: "Live",
    accent: "#8b5cf6",
    image: "/work/social-hub.webp",
    caseStudy: {
      challenge:
        "Marketing teams in the Gulf were tracking competitors by hand across websites, Instagram and TikTok, with no way to ask questions of the data.",
      built: [
        "Automatic collection of competitors' websites and social posts",
        "Seven AI tools on Anthropic models, with batch processing to keep costs down",
        "Ask questions about your market in plain words, and get answers from the data",
        "A separate workspace for every client, built to stay fast as the data grows",
      ],
      outcome: "A live SaaS that turns scattered competitor activity into answers a marketing team can act on.",
    },
  },
  {
    slug: "gps-fleet",
    planet: "earth",
    name: "Fleet Telematics",
    pitch: "Live GPS tracking for 7,000+ vehicles in Kuwait, plus transport bookings and fuel control.",
    description:
      "Live maps, alerts and reports for fleet operators, a transport booking system, and fuel tracking tied to real GPS mileage.",
    stack: ["Laravel", "Python", "Node.js", "PM2", "WebSockets", "MariaDB", "MSSQL"],
    role: "Primary developer",
    href: "https://fleet.majestic-kw.com",
    status: "Live",
    accent: "#3b82f6",
    caseStudy: {
      challenge:
        "The tracking data sat in an old MSSQL system that was far too slow for live maps and reports.",
      built: [
        "A Python pipeline that keeps millions of rows in sync from MSSQL to MariaDB",
        "A Node.js GPS listener running under PM2, monitored from the admin panel",
        "A WebSocket bridge that pushes positions to the browser as they arrive",
        "Excel reports with charts coloured by status, for fleet managers",
        "Transport bookings: single trips, multiple pick ups and drops, monthly contracts that roll over holidays, and billing that adjusts for missed rides",
        "Fuel tracking against GPS mileage, where drivers' helpers scan a QR code to request fuel within approved limits",
      ],
      outcome: "Operators watch 7,000+ vehicles move live and pull reports without touching the legacy system.",
    },
  },
  {
    slug: "whatsapp-platform",
    planet: "uranus",
    name: "WhatsApp Business Platform",
    pitch: "Ordering, bookings, clinics and campaigns, all run from WhatsApp.",
    description:
      "Lets a business run almost everything through WhatsApp: taking orders, booking tables and appointments, sending payment links, running offers and campaigns, and answering with AI. Full restaurant and clinic systems sit behind it, in Arabic and English.",
    stack: ["Laravel 12", "Filament", "Inertia", "WhatsApp Cloud API", "Meta Flows", "Horizon", "LLMs"],
    role: "Architect & lead developer",
    status: "Live inside clients' WhatsApp",
    accent: "#10b981",
    caseStudy: {
      challenge:
        "Customers in the Gulf already live in WhatsApp, but paid templates and AI calls get expensive fast, providers fail, and spam can run the bill up overnight.",
      built: [
        "A visual flow builder, so businesses change their WhatsApp journeys without waiting for a developer",
        "Backup messaging providers that take over if one goes down",
        "Bookings that respect each branch's hours, holidays and capacity; orders with extras and options",
        "Offers, coupons and campaigns that businesses set up themselves",
        "Spam and cost checks before any paid message or AI reply, and every customer always gets an answer",
      ],
      outcome: "Businesses sell, book and follow up where their customers already are, with costs under control.",
    },
  },
];

// Also in production: client systems, described without naming the client.
export const moreProjects: Project[] = [
  {
    slug: "clinic-platform",
    planet: "eris",
    name: "Clinic Management",
    pitch: "Patients, doctors, visits and stock in one system.",
    description:
      "Patient files, visits and packages, doctors' shifts and pay, labs, medication, insurance and inpatient care, plus clinic stock, purchasing and payroll. Every time someone opens a patient file, it's logged. Adding a new clinic is a settings change, not a new copy of the code.",
    stack: ["Laravel 12", "Filament", "Inertia", "WhatsApp Cloud API"],
    role: "Lead engineer",
    status: "Live, private client system",
    accent: "#14b8a6",
  },
  {
    slug: "hospital-service",
    planet: "moon-far",
    name: "Hospital Food & Room Service",
    pitch: "Patients order meals and call for help from their bed.",
    description:
      "Patients scan a QR code to order meals by type (VIP, special diet or standard), with kitchen approval and orders for companions too. Tablets in each room call a waiter, ask for food or send an alert. Cash or payment link, a daily meal closing report, and full Arabic and English.",
    stack: ["Laravel", "Livewire", "QR codes", "MyFatoorah"],
    role: "Developer",
    status: "Live, private client system",
    accent: "#cbd5e1",
  },
  {
    slug: "retail-platform",
    planet: "venus",
    name: "Retail & Warehouse",
    pitch: "Storefront, shop POS and warehouse on one inventory.",
    description:
      "An online store, a POS at the counter, a mobile app and the warehouse, all on one stock count. Barcode scanning for purchases, exports, returns and stock transfers, items assigned to contracts, and automatic finance reports: cash flow, net profit and break even.",
    stack: ["Laravel", "Filament", "Livewire", "MySQL", "REST API"],
    role: "Lead engineer",
    status: "Live, private client system",
    accent: "#eab308",
  },
  {
    slug: "desktop-pos",
    planet: "haumea",
    name: "Desktop POS",
    pitch: "A till app that keeps selling when the internet drops.",
    description:
      "A Windows desktop POS built with Electron and React. Orders are stored locally in SQLite and sync when the connection comes back. It updates itself, and works in Arabic and English.",
    stack: ["Electron", "React", "TypeScript", "SQLite", "Tailwind"],
    role: "Developer",
    href: "https://github.com/kdafar/pos-app",
    status: "Code on GitHub",
    accent: "#94a3b8",
  },
  {
    slug: "print-agents",
    planet: "venus-surface",
    name: "Print & Backup Agents",
    pitch: "Two Windows apps that run quietly on the shop and office PCs.",
    description:
      "A .NET print agent that pairs with a six digit code, collects kitchen tickets over HTTPS and prints each station on USB, shared or network printers, switching to a backup printer if one fails. A crash safe journal means a ticket never prints twice, even after a restart. Plus BackupTray, a tray app that shows the nightly NAS backup at a glance, alerts on problems and helps restore a site.",
    stack: ["C#", ".NET 10", ".NET 8", "Windows Forms", "ESC/POS", "DPAPI"],
    role: "Developer",
    status: "Live, private client system",
    accent: "#f59e0b",
  },
  {
    slug: "car-marketplace",
    planet: "mars",
    name: "Car Marketplace",
    pitch: "Buy, sell and rent cars, with dealers on board.",
    description:
      "Cars for sale and for rent, dealers and their teams, deals tracked from first enquiry to payment, rental calendars, saved searches, alerts when prices drop, and paid plans.",
    stack: ["Laravel 13", "Inertia", "Vue", "MySQL"],
    role: "Developer",
    status: "Client project",
    accent: "#ef4444",
  },
  {
    slug: "automotive",
    planet: "mercury",
    name: "Smart Car Wash & Parking",
    pitch: "Connected car wash machines, parking lots and service billing.",
    description:
      "Car wash orders linked to the machines doing the washing, with live readings from the pumps and machines. Plus parking lot management, and invoices customers can pay online.",
    stack: ["Laravel", "Livewire", "Pusher", "MySQL"],
    role: "Developer",
    status: "Client project",
    accent: "#06b6d4",
  },
  {
    slug: "e-learning",
    planet: "saturn",
    name: "Najeh & Online Learning",
    pitch: "Course platforms with live classes, built for Gulf students.",
    description:
      "Najeh, which I built: subject packages and bundles that unlock the right lessons for each student, live classes, ratings and reviews, a cart and MyFatoorah payments, in Arabic and English. I also customise and host other course platforms with instructor payouts, certificates and instalments.",
    stack: ["Laravel", "Livewire", "Inertia", "MyFatoorah", "Agora"],
    role: "Developer",
    status: "Live, client projects",
    accent: "#a855f7",
  },
  {
    slug: "site-builder",
    planet: "ceres",
    name: "Website Builder SaaS",
    pitch: "Customers launch their own sites from themes.",
    description:
      "Customers pick a theme and get their own site, with credits, help docs, support emails, WhatsApp and Stripe billing. Built on the Wave SaaS starter.",
    stack: ["Laravel", "Filament", "Livewire", "Stripe", "Horizon"],
    role: "Developer",
    status: "Client project",
    accent: "#38bdf8",
  },
  {
    slug: "luxury-store",
    planet: "makemake",
    name: "Luxury Online Store",
    pitch: "An online store for a premium brand, built Arabic first.",
    description:
      "A bilingual Bagisto storefront with right to left layouts, KWD pricing and MyFatoorah checkout, kept in step with upstream Bagisto releases.",
    stack: ["Bagisto", "Laravel 12", "Vue 3", "MyFatoorah"],
    role: "Developer",
    status: "Live, private client system",
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
    tag: "Offline",
    title: "Tills that keep selling offline",
    body: "The desktop POS saves every order locally and syncs when the connection comes back, so a dropped line never stops a sale.",
  },
  {
    tag: "POS",
    title: "Tablets that pair in seconds",
    body: "Till tablets connect with a single use code and get their own login. The history shows whether a cashier or the till itself made each change.",
  },
  {
    tag: "Reliability",
    title: "Messaging that survives outages",
    body: "If one WhatsApp provider goes down, another takes over. Each one is watched, rate limited and logged, so the business never goes quiet.",
  },
  {
    tag: "No code",
    title: "Flows change without a deploy",
    body: "Businesses edit their own WhatsApp journeys in a visual builder. Every version is saved, so any change can be rolled back.",
  },
  {
    tag: "Privacy",
    title: "Every patient file access logged",
    body: "Clinic systems record who opened which patient file and when, with permissions set by role for every screen.",
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
    tag: "Printing",
    title: "Tickets never print twice",
    body: "The kitchen print agent records every ticket in a crash safe journal before it reports back, so a restart or a dropped connection never sends the same order to the kitchen twice.",
  },
  {
    tag: "Payments",
    title: "Money to the fils",
    body: "The Kuwaiti dinar has three decimals, and most software rounds to two. Mine keeps every fils, and test payments can never touch real money.",
  },
  {
    tag: "DevOps",
    title: "Deploys nobody notices",
    body: "Every live update follows the same careful order (caches, queues, workers), so customers keep using the app while it changes underneath them.",
  },
  {
    tag: "Ops",
    title: "Backups that can't be deleted",
    body: "Every night an office NAS pulls a copy of the apps and databases that the server can't reach. A tray app on the office PC shows how it went and can restore a site.",
  },
];

export type StackGroup = { title: string; items: string[] };

export const stackGroups: StackGroup[] = [
  { title: "Backend", items: ["PHP 8.3", "Laravel 8 to 13", "Livewire", "Filament", "Sanctum & Passport", "Queues & schedulers", "Python", "Node.js"] },
  { title: "Frontend", items: ["Vue 3", "Inertia", "React", "Next.js", "TypeScript", "Tailwind", "three.js"] },
  { title: "Desktop", items: ["Electron", "C# / .NET", "Windows Forms", "SQLite", "ESC/POS printing", "Auto updates"] },
  { title: "Data", items: ["MySQL 8", "MariaDB", "MSSQL", "Redis", "MongoDB", "SQLite"] },
  { title: "AI", items: ["Anthropic Claude", "OpenAI", "Batch processing", "Prompt & cost control"] },
  { title: "Integrations", items: ["WhatsApp Cloud API", "Meta Flows", "MyFatoorah", "Delivery platforms", "Google Maps", "Apify"] },
  { title: "Infrastructure", items: ["Linux", "Nginx", "Varnish", "Hetzner", "CloudPanel", "WHM / cPanel", "PM2", "AWS", "Azure", "Docker"] },
];

export type Step = { title: string; body: string };

export const workSteps: Step[] = [
  { title: "Look first", body: "I go through your code, data and servers, then tell you honestly what's fine and what's a risk." },
  { title: "Agree a plan", body: "A short plan in plain words: what changes, in what order, and how we undo it if something goes wrong." },
  { title: "Ship in small steps", body: "Small updates, each tested on a copy of your real data before your customers ever see it." },
  { title: "Stay with it", body: "After launch I keep watching it: updates, backups and fixes. You're not left on your own." },
];

export type Capability = { icon: string; title: string; body: string };

export const capabilities: Capability[] = [
  {
    icon: "utensils",
    title: "Restaurant & POS systems",
    body: "Online ordering, tablet POS, kitchen printing, tables and floors, delivery app integrations, loyalty and offers. One branch or fifty.",
  },
  {
    icon: "ledger",
    title: "ERP: accounting, HR & payroll",
    body: "Chart of accounts, cost centres, vouchers and balance sheets; employees, attendance, leave, loans and payslips; contracts and fixed assets.",
  },
  {
    icon: "cart",
    title: "Online stores & retail",
    body: "Storefronts, POS for the shop floor, mobile app APIs, warehouse fulfilment and stock, price history and local payment gateways.",
  },
  {
    icon: "message",
    title: "WhatsApp platforms",
    body: "Ordering and booking chats, campaigns, offers, payment links and AI replies, with spam and cost controls built in.",
  },
  {
    icon: "brain",
    title: "AI products",
    body: "Products built on AI models: tracking competitors, writing content, answering questions about your data, and running big jobs cheaply.",
  },
  {
    icon: "stethoscope",
    title: "Clinics & healthcare",
    body: "Patients, visits, doctors' shifts and pay, labs, medication, insurance and inpatient care, with a log of who opened each patient file.",
  },
  {
    icon: "market",
    title: "Marketplaces & bookings",
    body: "Car sales and rentals, dealer agencies, deal pipelines, reservations with holds and blackouts, subscriptions and price alerts.",
  },
  {
    icon: "education",
    title: "Online learning",
    body: "Course marketplaces with live classes, instructor payouts, certificates, instalments, affiliates and forums.",
  },
  {
    icon: "desktop",
    title: "Desktop & Windows apps",
    body: "Electron POS apps that keep working offline, and .NET agents on shop PCs that drive thermal and office printers and keep backups running.",
  },
  {
    icon: "satellite",
    title: "Live tracking, IoT & data",
    body: "Live GPS for thousands of vehicles, connected car wash machines, WebSocket dashboards and syncing millions of rows between databases.",
  },
  {
    icon: "server",
    title: "DevOps & hosting",
    body: "30+ Laravel apps on servers I run: deploys with no downtime, queue workers, caching, DNS and mail, and nightly backups kept off the server.",
  },
];

export type Principle = { title: string; body: string };

export const principles: Principle[] = [
  {
    title: "Don't break what works",
    body: "If people are using it, it keeps working. Updates go out quietly, and nobody should notice a deploy.",
  },
  {
    title: "Improve, don't rewrite",
    body: "I'd rather ship ten small, safe changes than one big risky rewrite. A system that makes money gets better, not replaced.",
  },
  {
    title: "Made for the Gulf",
    body: "Arabic and English from day one, right to left screens, prices in KWD to the fils, and the payment gateways people here actually use.",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights?: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Majestic Company for Communications",
    role: "Full Stack Laravel Developer",
    period: "Jul 2024 to now",
    location: "Kuwait City",
    summary:
      "I design, build and run the company's products, and look after the servers all of them live on.",
    highlights: [
      "Merged four restaurant codebases into one system that now runs 14+ businesses, with branches, menus, add ons and orders printed automatically in each kitchen",
      "Built a WhatsApp ordering bot on the Cloud API: cuisine, restaurant, item and checkout, with carousels, a remembered cart and delivery by location",
      "Built a hospital meal and room service system: QR ordering by meal type, kitchen approvals, and tablets that call a waiter",
      "Built store and inventory management with barcode scanning, stock transfers and automatic cash flow, profit and break even reports",
      "Built Najeh, an online learning platform with subject packages, live classes and MyFatoorah payments",
      "Built fleet transport bookings with monthly contracts and missed ride billing, plus fuel tracking from GPS data",
      "Run 30+ live apps: deploys with no downtime, queues, DNS and mail, and nightly backups to an office NAS",
    ],
    stack: ["Laravel", "Livewire", "Filament", "Vue/Inertia", "MySQL", "WhatsApp Cloud API", "Linux"],
  },
  {
    company: "Freelance",
    role: "ASP.NET MVC Developer",
    period: "Dec 2023 to Nov 2024",
    location: "Kuwait, remote",
    summary:
      "Led three ASP.NET MVC projects deployed on Azure with Docker: role based login and permissions, an admin dashboard with advanced search, staff records with leave and role management, and Azure SQL database migrations.",
    stack: ["ASP.NET MVC", "ASP.NET Core", "C#", "Azure", "Docker", "Azure SQL"],
  },
  {
    company: "SerpElevator",
    role: "Web Developer",
    period: "Jun 2021 to Jul 2023",
    location: "Mumbai, India",
    summary:
      "Built and maintained 10+ web apps on the MEAN stack in a team of five. Responsive layouts, third party API integrations and code reviews; cut page load times by 40% and bugs by 15%.",
    stack: ["MongoDB", "Express", "Angular", "Node.js", "Laravel"],
  },
  {
    company: "SerpClimber",
    role: "Web Designer",
    period: "Mar 2020 to May 2021",
    location: "Mumbai, India",
    summary:
      "Designed and looked after 10+ client websites with 99% uptime. WordPress, HTML, CSS and JavaScript, plus SEO content that grew site visits by 30%.",
    stack: ["WordPress", "HTML", "CSS", "JavaScript", "SEO"],
  },
];

export type EducationItem = { school: string; course: string; period: string };

export const education: EducationItem[] = [
  { school: "SevenMentor", course: "Web Development and MEAN Stack", period: "Sep 2019 to Feb 2020" },
  { school: "University of Mumbai", course: "Bachelor of Commerce", period: "2015 to 2018" },
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
