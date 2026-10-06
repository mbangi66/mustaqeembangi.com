"use client";

import { motion } from "motion/react";
import {
  BrainCircuit,
  Calculator,
  CarFront,
  GraduationCap,
  Monitor,
  MessageCircle,
  Satellite,
  Server,
  ShoppingCart,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = {
  utensils: UtensilsCrossed,
  cart: ShoppingCart,
  message: MessageCircle,
  brain: BrainCircuit,
  stethoscope: Stethoscope,
  satellite: Satellite,
  server: Server,
  ledger: Calculator,
  market: CarFront,
  education: GraduationCap,
  desktop: Monitor,
};

export function Capabilities() {
  const { c: content, t } = useLocale();
  const { capabilities } = content;
  return (
    <section id="capabilities" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-32">
      <div className="shell px-5 sm:px-6">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            {t.capabilitiesEyebrow}
          </div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl">
            {t.capabilitiesTitle.a} <span className="font-serif font-normal italic text-[var(--color-fg-muted)] rtl:not-italic">{t.capabilitiesTitle.b}</span>.
          </h2>
          <p className="mt-5 text-base text-[var(--color-fg-muted)] sm:text-lg">
            {t.capabilitiesIntro}
          </p>
        </div>

        {/* A compact list, not cards: the project cards above already show the detail. */}
        <ul className="grid gap-x-12 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = icons[c.icon] ?? Server;
            return (
              <motion.li
                key={c.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                className="flex gap-4 border-b border-[var(--color-border)] py-5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-200/80" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-[var(--color-fg)]">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">{c.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
