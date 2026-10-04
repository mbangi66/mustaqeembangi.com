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
import { capabilities } from "@/lib/data";
import { cn } from "@/lib/utils";

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
  return (
    <section id="capabilities" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            Capabilities
          </div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl">
            What I build, <span className="font-serif font-normal italic text-[var(--color-fg-muted)]">end to end</span>.
          </h2>
          <p className="mt-5 text-base text-[var(--color-fg-muted)] sm:text-lg">
            The kinds of systems I build. Each one is in use today somewhere in Kuwait or the Gulf, and all of them
            work in both Arabic and English.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = icons[c.icon] ?? Server;
            // The last card stretches to fill whatever is left of its row.
            const last = i === capabilities.length - 1;
            const smSpan = last ? 2 - (i % 2) : 1;
            const lgSpan = last ? 3 - (i % 3) : 1;
            const wide = last && lgSpan === 3;
            return (
              <motion.li
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/60 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/40 sm:p-7",
                  smSpan === 2 && "sm:col-span-2",
                  lgSpan === 2 && "lg:col-span-2",
                  lgSpan === 3 && "lg:col-span-3",
                  smSpan === 2 && lgSpan === 1 && "lg:col-span-1",
                )}
              >
                {/* Glow that follows the card on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.28),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className={cn("relative", wide && "lg:flex lg:items-center lg:gap-8")}>
                  <Icon className="h-6 w-6 shrink-0 text-orange-200/80" strokeWidth={1.5} />
                  <div className={cn("mt-5", wide && "lg:mt-0")}>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--color-fg)] sm:text-xl">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-[15px]">{c.body}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
