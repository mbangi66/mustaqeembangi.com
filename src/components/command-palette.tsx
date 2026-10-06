"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  Download,
  Home,
  Layers,
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Terminal as TerminalIcon,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/lib/i18n";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./brand-icons";

const navIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "about":
      return User;
    case "experience":
      return Briefcase;
    case "work":
      return Sparkles;
    case "capabilities":
      return Layers;
    case "highlights":
      return Zap;
    case "contact":
      return MessageSquare;
    default:
      return Home;
  }
};

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

export function CommandPalette() {
  const { c, t } = useLocale();
  const { navItems, projects, siteConfig, socials } = c;
  const pt = t.palette;
  const [open, setOpen] = useState(false);
  const [easter, setEaster] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setEaster(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  const close = () => setOpen(false);

  const go = (href: string) => {
    close();
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
      window.open(href, href.startsWith("http") ? "_blank" : "_self");
    } else {
      window.location.href = href;
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    toast.success(pt.emailCopied);
    close();
  };

  if (!open && !easter) return null;

  if (easter) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={() => setEaster(false)}
      >
        <div
          dir="ltr"
          className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] font-mono text-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
            <span className="ml-2">ssh mustaqeem@bangi.dev</span>
          </div>
          <div className="space-y-1 p-5 text-[var(--color-fg-muted)]">
            <p><span className="text-brand-400">$</span> ssh mustaqeem@bangi.dev</p>
            <p className="text-[var(--color-fg-subtle)]">The authenticity of host can&apos;t be established.</p>
            <p className="text-[var(--color-fg-subtle)]">ECDSA key fingerprint is SHA256:nice-try-friend.</p>
            <p>Are you sure you want to continue connecting (yes/no)? <span className="text-[var(--color-fg)]">yes</span></p>
            <p className="text-emerald-400">Permission denied (publickey).</p>
            <p className="mt-3 text-[var(--color-fg-subtle)]">
              Nice try. Email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-300 underline decoration-[var(--color-border-strong)] underline-offset-4">
                {siteConfig.email}
              </a>{" "}
              instead.
            </p>
            <p className="mt-4 text-[var(--color-fg-subtle)]">$ <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-brand-400 align-middle motion-safe:animate-pulse" /></p>
          </div>
          <button
            type="button"
            onClick={() => setEaster(false)}
            className="block w-full border-t border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-center text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
          >
            press esc to close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-2xl shadow-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command Menu" className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3">
            <Command.Input
              autoFocus
              placeholder={pt.placeholder}
              className="h-12 flex-1 bg-transparent text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none"
            />
            <kbd className="hidden rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-fg-subtle)] sm:inline">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--color-fg-subtle)]">
              {pt.empty}
            </Command.Empty>

            <Command.Group
              heading={pt.projects}
              className="mb-1 px-1 text-xs font-medium text-[var(--color-fg-subtle)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`open ${p.name} project ${p.pitch}`}
                  onSelect={() => p.href && go(p.href)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
                >
                  <Sparkles className="h-4 w-4 text-brand-400" />
                  <span>{p.name}</span>
                  <span className="ml-auto truncate font-mono text-xs text-[var(--color-fg-subtle)]">
                    {p.href?.replace(/^https?:\/\//, "")}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={pt.navigate}
              className="mb-1 px-1 text-xs font-medium text-[var(--color-fg-subtle)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {navItems.map((item) => {
                const Icon = navIcon(item.label);
                return (
                  <Command.Item
                    key={item.href}
                    value={`navigate ${item.label}`}
                    onSelect={() => go(item.href)}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group
              heading={pt.actions}
              className="mb-1 px-1 text-xs font-medium text-[var(--color-fg-subtle)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              <Command.Item
                onSelect={copyEmail}
                value="copy email"
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
              >
                <Copy className="h-4 w-4" />
                {pt.copyEmail}
                <span className="ms-auto font-mono text-xs text-[var(--color-fg-subtle)]">{siteConfig.email}</span>
              </Command.Item>
              <Command.Item
                onSelect={() => go(`mailto:${siteConfig.email}`)}
                value="send email mail"
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
              >
                <Mail className="h-4 w-4" />
                {pt.sendEmail}
              </Command.Item>
              <Command.Item
                onSelect={() => go(siteConfig.cvPath)}
                value="download cv resume pdf"
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
              >
                <Download className="h-4 w-4" />
                {pt.openCv}
              </Command.Item>
              <Command.Item
                onSelect={() => go(`tel:${siteConfig.phone.replace(/\s/g, "")}`)}
                value="call phone"
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
              >
                <Phone className="h-4 w-4" />
                {pt.call}
                <span className="ms-auto font-mono text-xs text-[var(--color-fg-subtle)]">{siteConfig.phone}</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  setEaster(true);
                }}
                value="ssh demo terminal"
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
              >
                <TerminalIcon className="h-4 w-4" />
                SSH to demo box
                <span className="ms-auto font-mono text-xs text-[var(--color-fg-subtle)]">just kidding</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading={pt.elsewhere}
              className="px-1 text-xs font-medium text-[var(--color-fg-subtle)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {socials.map((s) => {
                const Icon = socialIcon(s.name);
                return (
                  <Command.Item
                    key={s.name}
                    onSelect={() => go(s.href)}
                    value={`open ${s.name} ${s.handle}`}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--color-fg-muted)] aria-selected:bg-[var(--color-bg-muted)] aria-selected:text-[var(--color-fg)]"
                  >
                    <Icon className="h-4 w-4" />
                    {s.name}
                    <span className="ms-auto font-mono text-xs text-[var(--color-fg-subtle)]"><bdi dir="ltr">{s.handle}</bdi></span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-fg-subtle)]">
            <span className="font-mono">cmdk</span>
            <div className="flex items-center gap-3">
              <span>{pt.keysNavigate}</span>
              <span>{pt.keysSelect}</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}
