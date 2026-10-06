import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | Mustaqeem Bangi",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6 text-center text-[var(--color-fg)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">404 · lost in space</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">This page drifted out of orbit.</h1>
          <p className="mt-4 text-[var(--color-fg-muted)]" dir="rtl" lang="ar">هذه الصفحة غير موجودة.</p>
          <div className="mt-8 flex justify-center gap-3">
            {/* Plain links on purpose: this page renders outside the app router. */}
            {/* eslint-disable @next/next/no-html-link-for-pages */}
            <a href="/" className="inline-flex h-11 items-center rounded-full bg-[var(--color-fg)] px-6 text-sm font-semibold text-[var(--color-bg)]">
              Back home
            </a>
            <a href="/ar" className="inline-flex h-11 items-center rounded-full border border-[var(--color-border-strong)] px-6 text-sm font-semibold" lang="ar">
              الرئيسية
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
