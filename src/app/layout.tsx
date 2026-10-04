import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";

import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { Cursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { SpaceBackdrop } from "@/components/space-backdrop";
import { siteConfig } from "@/lib/data";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.bio,

  keywords: [
    "Laravel developer",
    "Filament",
    "Livewire",
    "PHP",
    "SaaS engineer",
    "Vue.js",
    "Next.js",
    "Kuwait developer",
    "restaurant POS",
    "WhatsApp commerce",
    "Laravel Kuwait",
    "Mustaqeem Bangi",
  ],

  authors: [
    {
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.fullName,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.bio,
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.bio,
    creator: "@Mustaqeembangi",
  },

  icons: {
    icon: [
      {
        url: siteConfig.avatar,
        sizes: "any",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#03040a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${jakarta.variable} ${jetbrains.variable} ${serif.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)] antialiased">
        <Providers>
          <SpaceBackdrop />
          <ScrollProgress />
          <Cursor />
          <Nav />

          <main className="relative">{children}</main>

          <Footer />
          <CommandPalette />
        </Providers>

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
