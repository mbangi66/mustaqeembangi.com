// Interface wording (buttons, headings, labels) in both languages.
// Content (projects, experience and so on) lives in data.ts and content-ar.ts.

export const uiEn = {
  langName: "English",
  switchTo: "عربي",
  switchHref: "/ar",
  switchLabel: "اقرأ الموقع بالعربية",

  // hero
  available: "Available for work",
  heroH1: (name: string, title: string) => `${name}, ${title} in Kuwait`,
  headline: { a: "From", b: "first idea", to: "to", c: "full orbit." },
  heroIntro: {
    lead: "I'm a Laravel engineer in Kuwait. I take business ideas from a sketch to a live system:",
    items: ["restaurants", "clinics", "online stores", "WhatsApp", "AI"],
    and: "and",
    tail: "Then I keep them flying.",
  },
  seeWork: "See the work",
  downloadCv: "Download CV",
  scroll: "scroll",
  industriesLabel: "Industries I build for",

  // work
  workEyebrow: "Selected work since 2024",
  workTitle: { a: "Products in", b: "orbit" },
  workIntro: (publicCount: string) =>
    `Here's what I've built and still look after. ${publicCount} have public links. The rest belong to clients, so I describe what they do without saying who they are.`,
  numberWords: ["No", "One", "Two", "Three", "Four", "Five", "Six"],
  filterLabel: "Filter projects",
  builtWith: "Built with",
  listAnd: "and",
  hoverPreview: "Hover for a look at the live site",
  homePageAlt: (name: string) => `${name} home page`,
  readCase: "Read the case study: the challenge, what I built and the result",
  hideCase: "Hide the case study",
  challenge: "The challenge",
  whatIBuilt: "What I built",
  result: "The result",
  alsoInProduction: "Also in production",

  // highlights
  highlightsEyebrow: "Engineering highlights",
  highlightsTitle: { a: "Hard problems,", b: "solved" },
  highlightsIntro:
    "The parts of the work that don't show up in a screenshot, but decide whether a system survives real customers.",

  // capabilities
  capabilitiesEyebrow: "Capabilities",
  capabilitiesTitle: { a: "What I build,", b: "end to end" },
  capabilitiesIntro:
    "The kinds of systems I build. Each one is in use today somewhere in Kuwait or the Gulf, and all of them work in both Arabic and English.",

  // toolbox
  toolboxEyebrow: "Toolbox",
  toolboxTitle: { a: "The whole", b: "stack", c: ", in production." },
  toolboxIntro: "Everything here runs in a live system I built or maintain today, not just a course I took.",

  // about
  aboutEyebrow: "About",
  aboutTitle: { a: "I build the systems Gulf businesses", b: "run on" },
  aboutP1: (title: string) =>
    [
      "I'm Mustaqeem, a ",
      title,
      " based in Kuwait City and originally from Maharashtra, India. I've been building for the web since 2020, and today I lead engineering on 30+ live apps for restaurants, shops, clinics, hospitals, car dealers, learning platforms and fleet operators.",
    ] as [string, string, string],
  aboutP2:
    "I don't just write the code and hand it over. I set up the payments and WhatsApp, run the servers, ship the updates and keep the backups. Most of what I work on is live and making money for someone, so I'm careful with it.",

  // process
  processEyebrow: "Flight plan",
  processTitle: { a: "How we'd", b: "work together" },

  // experience
  experienceEyebrow: "Mission log",
  experienceTitle: "Where I've worked.",
  fullResume: "full résumé",
  education: "Education",

  // contact
  contactEyebrow: "Get in touch",
  contactTitle: "Let's build something, or fix what's broken.",
  contactIntro:
    "Hiring? Need a system built? Or have a Laravel app that keeps falling over? Send me a short email about it. I read every one and reply myself.",
  copy: "copy",
  copied: "copied",
  emailCopied: "Email copied",
  whatsappCta: "Or message me on WhatsApp",
  findMe: "Or find me at",

  // nav and footer
  hireMe: "Hire me",
  whatsappLabel: "Message me on WhatsApp",
  whatsappShort: "Message on WhatsApp",
  toggleMenu: "Toggle menu",
  navigate: "Navigate",
  elsewhere: "Elsewhere",
  rights: (year: number) => `© ${year} Mustaqeem Abdullah Bangi. All rights reserved.`,
  builtWithFooter: "Built with Next.js + Tailwind. Designed in Kuwait.",
  credits: {
    a: "Planet maps by",
    b: "(CC BY 4.0). Moon from NASA's Lunar Reconnaissance Orbiter.",
  },

  // clock
  clock: { kuwait: "Kuwait", working: "Working hours", after: "After hours", asleep: "Asleep, probably" },

  // command palette
  palette: {
    placeholder: "Search projects, jump to section, copy email…",
    empty: "No results found.",
    projects: "Case studies",
    navigate: "Navigate",
    actions: "Actions",
    elsewhere: "Elsewhere",
    copyEmail: "Copy email",
    sendEmail: "Send me email",
    openCv: "Open résumé (PDF)",
    call: "Call",
    emailCopied: "Email copied to clipboard",
    keysNavigate: "↑↓ navigate",
    keysSelect: "↵ select",
  },
};

export type Ui = typeof uiEn;

export const uiAr: Ui = {
  langName: "العربية",
  switchTo: "English",
  switchHref: "/",
  switchLabel: "Read this site in English",

  available: "متاح للعمل",
  heroH1: () => "مستقيم بانجي، مهندس Laravel وأنظمة أول في الكويت",
  headline: { a: "من", b: "أول فكرة", to: "إلى", c: "مدار كامل." },
  heroIntro: {
    lead: "أنا مهندس Laravel في الكويت. أحوّل أفكار الأعمال من مسودة إلى نظام يعمل فعلًا:",
    items: ["المطاعم", "العيادات", "المتاجر الإلكترونية", "واتساب", "الذكاء الاصطناعي"],
    and: "و",
    tail: "ثم أبقيها تعمل بلا توقف.",
  },
  seeWork: "شاهد أعمالي",
  downloadCv: "تحميل السيرة الذاتية",
  scroll: "مرّر",
  industriesLabel: "القطاعات التي أعمل لها",

  workEyebrow: "أعمال مختارة منذ 2024",
  workTitle: { a: "منتجات في", b: "المدار" },
  workIntro: (publicCount: string) =>
    `هذا ما بنيته وما زلت أتابعه. ${publicCount} منها لها روابط عامة، والباقي ملك لعملاء، لذلك أصف ما تقوم به دون ذكر أسمائهم.`,
  numberWords: ["لا شيء", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة"],
  filterLabel: "تصفية المشاريع",
  builtWith: "مبني بـ",
  listAnd: "و",
  hoverPreview: "مرّر المؤشر لترى الموقع الحي",
  homePageAlt: (name: string) => `الصفحة الرئيسية لـ ${name}`,
  readCase: "اقرأ دراسة الحالة: التحدي، وما بنيته، والنتيجة",
  hideCase: "إخفاء دراسة الحالة",
  challenge: "التحدي",
  whatIBuilt: "ما بنيته",
  result: "النتيجة",
  alsoInProduction: "أنظمة أخرى تعمل حاليًا",

  highlightsEyebrow: "أبرز الحلول الهندسية",
  highlightsTitle: { a: "مشكلات صعبة،", b: "تم حلّها" },
  highlightsIntro: "أجزاء من العمل لا تظهر في لقطة شاشة، لكنها تحدد إن كان النظام سيصمد أمام العملاء الحقيقيين.",

  capabilitiesEyebrow: "القدرات",
  capabilitiesTitle: { a: "ما أبنيه،", b: "من البداية إلى النهاية" },
  capabilitiesIntro:
    "أنواع الأنظمة التي أبنيها. كل واحد منها مستخدم اليوم في مكان ما في الكويت أو الخليج، وكلها تعمل بالعربية والإنجليزية.",

  toolboxEyebrow: "الأدوات",
  toolboxTitle: { a: "كل", b: "التقنيات", c: "، في بيئة إنتاج." },
  toolboxIntro: "كل ما هنا يعمل في نظام حيّ بنيته أو أتابعه اليوم، وليس مجرد دورة حضرتها.",

  aboutEyebrow: "نبذة",
  aboutTitle: { a: "أبني الأنظمة التي تعتمد عليها", b: "أعمال الخليج" },
  aboutP1: (title: string) =>
    [
      "أنا مستقيم، ",
      title,
      " مقيم في مدينة الكويت وأصلي من ولاية ماهاراشترا في الهند. أعمل في تطوير الويب منذ 2020، واليوم أقود الهندسة لأكثر من 30 تطبيقًا حيًا لمطاعم ومتاجر وعيادات ومستشفيات ووكلاء سيارات ومنصات تعليمية وشركات أساطيل.",
    ] as [string, string, string],
  aboutP2:
    "لا أكتفي بكتابة الكود وتسليمه. أربط المدفوعات وواتساب، وأدير الخوادم، وأنشر التحديثات، وأحفظ النسخ الاحتياطية. معظم ما أعمل عليه أنظمة حية تدرّ دخلًا لأصحابها، لذلك أتعامل معها بحذر.",

  processEyebrow: "خطة الرحلة",
  processTitle: { a: "كيف", b: "سنعمل معًا" },

  experienceEyebrow: "سجل المهمات",
  experienceTitle: "أين عملت.",
  fullResume: "السيرة الكاملة",
  education: "التعليم",

  contactEyebrow: "تواصل معي",
  contactTitle: "لنبنِ شيئًا جديدًا، أو نصلح ما تعطّل.",
  contactIntro:
    "تبحث عن موظف؟ تحتاج نظامًا جديدًا؟ أو لديك تطبيق Laravel يتعطل باستمرار؟ أرسل لي رسالة قصيرة عنه. أقرأ كل رسالة وأرد بنفسي.",
  copy: "نسخ",
  copied: "تم النسخ",
  emailCopied: "تم نسخ البريد",
  whatsappCta: "أو راسلني على واتساب",
  findMe: "أو تجدني على",

  hireMe: "وظّفني",
  whatsappLabel: "راسلني على واتساب",
  whatsappShort: "راسلني على واتساب",
  toggleMenu: "فتح القائمة",
  navigate: "التنقل",
  elsewhere: "حساباتي",
  rights: (year: number) => `© ${year} مستقيم عبدالله بانجي. جميع الحقوق محفوظة.`,
  builtWithFooter: "مبني بـ Next.js و Tailwind. صُمم في الكويت.",
  credits: {
    a: "خرائط الكواكب من",
    b: "(CC BY 4.0). صورة القمر من مركبة Lunar Reconnaissance Orbiter التابعة لناسا.",
  },

  clock: { kuwait: "الكويت", working: "وقت العمل", after: "بعد الدوام", asleep: "نائم على الأغلب" },

  palette: {
    placeholder: "ابحث في المشاريع، انتقل إلى قسم، انسخ البريد…",
    empty: "لا توجد نتائج.",
    projects: "دراسات الحالة",
    navigate: "التنقل",
    actions: "إجراءات",
    elsewhere: "حساباتي",
    copyEmail: "نسخ البريد",
    sendEmail: "أرسل لي بريدًا",
    openCv: "فتح السيرة الذاتية (PDF)",
    call: "اتصال",
    emailCopied: "تم نسخ البريد",
    keysNavigate: "↑↓ للتنقل",
    keysSelect: "↵ للاختيار",
  },
};
