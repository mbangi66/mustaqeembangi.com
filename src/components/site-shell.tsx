import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic, Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { SpaceBackdrop } from "@/components/space-backdrop";
import { LocaleProvider, type Locale } from "@/lib/i18n";
import { en } from "@/lib/data";
import { ar } from "@/lib/content-ar";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
// Arabic letters. Latin text keeps the fonts above; the browser picks per glyph.
const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const content = { en, ar };
const base = en.siteConfig.url;

/** Page metadata for one language, with links to the other version for search engines. */
export function buildMetadata(locale: Locale): Metadata {
  const s = content[locale].siteConfig;
  const path = locale === "ar" ? "/ar" : "/";
  const title = `${s.name} | ${s.title}`;
  return {
    metadataBase: new URL(base),
    alternates: {
      canonical: path,
      languages: { en: "/", ar: "/ar", "x-default": "/" },
    },
    title: { default: title, template: `%s | ${s.name}` },
    description: s.bio,
    keywords: [
      "Laravel developer",
      "Livewire",
      "PHP",
      "Kuwait developer",
      "Laravel Kuwait",
      "restaurant POS",
      "WhatsApp commerce",
      "مطور Laravel",
      "مبرمج في الكويت",
      "Mustaqeem Bangi",
    ],
    authors: [{ name: en.siteConfig.fullName, url: base }],
    creator: en.siteConfig.fullName,
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_KW" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_KW"],
      url: `${base}${locale === "ar" ? "/ar" : ""}`,
      siteName: s.name,
      title,
      description: s.bio,
    },
    twitter: { card: "summary_large_image", title, description: s.bio, creator: "@Mustaqeembangi" },
    robots: { index: true, follow: true },
  };
}

function personJsonLd(locale: Locale) {
  const s = content[locale].siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: en.siteConfig.fullName,
    alternateName: [en.siteConfig.name, ar.siteConfig.fullName],
    jobTitle: s.title,
    description: s.bio,
    url: base,
    image: en.siteConfig.avatar,
    email: `mailto:${en.siteConfig.email}`,
    worksFor: { "@type": "Organization", name: "Majestic Company for Communications" },
    address: { "@type": "PostalAddress", addressLocality: "Kuwait City", addressCountry: "KW" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
    knowsAbout: ["Laravel", "PHP", "Livewire", "React", "Next.js", "ASP.NET", "POS systems", "ERP", "WhatsApp Business API", "AI products"],
    knowsLanguage: ["en", "ar"],
    sameAs: en.socials.map((x) => x.href),
  };
}

/** The whole document for one language: <html>, fonts, chrome around the page. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`dark ${jakarta.variable} ${jetbrains.variable} ${serif.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
        <LocaleProvider locale={locale}>
          <Providers>
            <SpaceBackdrop />
            <ScrollProgress />
            <Nav />
            <main className="relative">{children}</main>
            <Footer />
            <CommandPalette />
          </Providers>
        </LocaleProvider>

        <Script
          id="majestic-analytics"
          src="https://stats.majestic-kw.com/script.js"
          data-website-id="46523cf4-0e7b-48f6-b102-b0a73996e46a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
