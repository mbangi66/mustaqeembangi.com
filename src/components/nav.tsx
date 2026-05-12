"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Command, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { TimeWidget } from "./time-widget";
import { cn } from "@/lib/utils";

export function Nav() {
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
  }, []);

  const triggerPalette = () => {
    window.dispatchEvent(new CustomEvent("open-cmdk"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)]/60 bg-[var(--color-bg)]/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
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
              data-cursor="link"
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

        <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-1 lg:flex">
          <TimeWidget />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerPalette}
            className="hidden h-9 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-2.5 text-xs text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] sm:inline-flex"
          >
            <span className="hidden lg:inline">Search</span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1 py-px font-mono text-[10px] text-[var(--color-fg-subtle)]">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-9 items-center rounded-md bg-[var(--color-fg)] px-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-md bg-[var(--color-fg)] text-sm font-medium text-[var(--color-bg)]"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
