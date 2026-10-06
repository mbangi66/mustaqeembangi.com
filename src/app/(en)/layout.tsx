import type { Viewport } from "next";
import { SiteShell, buildMetadata } from "@/components/site-shell";
import "../globals.css";

export const metadata = buildMetadata("en");
export const viewport: Viewport = { themeColor: "#03040a", colorScheme: "dark" };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
