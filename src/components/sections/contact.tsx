"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { siteConfig, socials } from "@/lib/data";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/brand-icons";
import { Moon } from "@/components/planet";

const socialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "github":
      return GithubIcon;
    case "linkedin":
      return LinkedinIcon;
    case "twitter":
      return TwitterIcon;
    default:
      return ArrowUpRight;
  }
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    toast.success("Email copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-[var(--color-border)] py-20 sm:py-40"
    >
      {/* Moonrise behind the closing section */}
      <Moon className="pointer-events-none absolute -bottom-[12%] -right-[38%] -z-10 w-[72vw] opacity-45 sm:-bottom-[30%] sm:-right-[8%] sm:w-[min(52vw,620px)] sm:opacity-80" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            <span className="h-px w-6 bg-[var(--color-border-strong)]" />
            Get in touch
          </div>

          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
            Let&apos;s build something, or fix what&apos;s broken.
          </h2>

          <p className="mt-5 max-w-2xl text-base text-[var(--color-fg-muted)] sm:text-lg">
            Hiring? Need a system built? Or have a Laravel app that keeps falling over? Send me a short email
            about it. I read every one and reply myself.
          </p>

          <div className="mt-10 sm:mt-12">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex flex-wrap items-center gap-x-3 gap-y-1 break-all font-mono text-xl tracking-[-0.02em] text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-orange-300 sm:gap-3 sm:text-4xl sm:underline-offset-[8px] md:text-5xl"
            >
              <Mail className="h-5 w-5 shrink-0 text-orange-300 sm:h-8 sm:w-8" />
              <span className="break-all">{siteConfig.email}</span>
              <ArrowUpRight className="hidden h-5 w-5 self-center opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:inline-block sm:h-7 sm:w-7" />
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? "copied" : "copy"}
              </button>
              <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
                {siteConfig.responsePromise}
              </span>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)] pt-8">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              Or find me at
            </span>
            <ul className="flex flex-wrap items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-1.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="font-mono text-xs">{s.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
