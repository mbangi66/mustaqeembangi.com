import type { Viewport } from "next";
import { SiteShell, buildMetadata } from "@/components/site-shell";
import "../../globals.css";

export const metadata = buildMetadata("ar");
export const viewport: Viewport = { themeColor: "#03040a", colorScheme: "dark" };

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="ar">{children}</SiteShell>;
}
