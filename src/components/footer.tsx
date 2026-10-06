"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./brand-icons";

const socialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "github":
      return GithubIcon;
    case "linkedin":
      return LinkedinIcon;
    case "twitter":
      return TwitterIcon;
    case "instagram":
      return InstagramIcon;
    default:
      return Mail;
  }
};

export function Footer() {
  const { c, t } = useLocale();
  const { navItems, siteConfig, socials } = c;
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-black/40 backdrop-blur-sm">
      <div className="shell px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div>
            <div className="flex items-center gap-2.5 text-base font-semibold">
              <span className="relative inline-block h-8 w-8 overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)]">
                <Image
                  src={siteConfig.avatar}
                  alt={siteConfig.fullName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              {siteConfig.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-[var(--color-fg-muted)]">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:decoration-current"
            >
              <Mail className="h-3.5 w-3.5" />
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
              {t.navigate}
            </h3>
            <ul className="mt-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
              {t.elsewhere}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-[var(--color-fg-subtle)]">
              {siteConfig.location}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-fg-subtle)] sm:flex-row sm:items-center">
          <p>{t.rights(year)}</p>
          <p>
            {t.builtWithFooter}
            <br />
            {t.credits.a}{" "}
            <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--color-border-strong)] underline-offset-2 hover:text-[var(--color-fg-muted)]">
              Solar System Scope
            </a>{" "}
            {t.credits.b}
          </p>
        </div>
      </div>
    </footer>
  );
}
