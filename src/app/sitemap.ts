import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: siteConfig.url, ar: `${siteConfig.url}/ar` };
  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteConfig.url}/ar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: `${siteConfig.url}${siteConfig.cvPath}`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}
