"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { WhatsappIcon } from "./brand-icons";
import { useLocale } from "@/lib/i18n";
import { TimeWidget } from "./time-widget";
import { cn } from "@/lib/utils";

export function Nav() {
  const { c, t, locale } = useLocale();
  const { navItems, siteConfig } = c;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)]/60 bg-[var(--color-bg)]/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="relative inline-block h-8 w-8 overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] shadow-[0_0_0_2px_var(--color-bg),0_0_18px_-2px_rgba(99,102,241,0.45)] transition-shadow group-hover:shadow-[0_0_0_2px_var(--color-bg),0_0_24px_-1px_rgba(99,102,241,0.7)]">
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.fullName}
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden sm:inline">
            {siteConfig.name.split(" ")[0]}.
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-active={active === item.href}
              className={cn(
                "nav-link rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                active === item.href
                  ? "text-[var(--color-fg)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Kuwait clock lives in the bar itself so it never floats over content */}
          <span className="hidden xl:inline-flex">
            <TimeWidget />
          </span>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsappLabel}
            title={t.whatsappLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-fg-muted)] transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <WhatsappIcon className="h-4.5 w-4.5" />
          </a>
          {/* Language switch: a full page load, since each language has its own document */}
          <a
            href={t.switchHref}
            hrefLang={locale === "en" ? "ar" : "en"}
            lang={locale === "en" ? "ar" : "en"}
            title={t.switchLabel}
            className="inline-flex h-10 items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
          >
            {t.switchTo}
          </a>
          <a
            href="#contact"
            className="hidden h-10 items-center rounded-md bg-[var(--color-fg)] px-3.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.hireMe}
          </a>
          <button
            type="button"
            aria-label={t.toggleMenu}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden">
          <div className="shell flex flex-col gap-1 px-5 py-3 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-fg)] text-sm font-semibold text-[var(--color-bg)]"
            >
              {t.hireMe}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[var(--color-border-strong)] text-sm font-semibold text-[var(--color-fg)]"
            >
              <WhatsappIcon className="h-4 w-4" />
              {t.whatsappShort}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
