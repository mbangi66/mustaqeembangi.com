# Mustaqeem Bangi — Portfolio

Personal portfolio for **Mustaqeem Abdullah Bangi**, Senior Laravel & Systems Engineer.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, Motion, Lenis, cmdk, and Resend.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and set:

| Var                  | Required | Purpose                                                    |
| -------------------- | -------- | ---------------------------------------------------------- |
| `RESEND_API_KEY`     | yes\*    | Sends contact-form submissions via Resend.                 |
| `CONTACT_TO_EMAIL`   | no       | Inbox to deliver to. Defaults to `mbangi66@gmail.com`.     |
| `CONTACT_FROM_EMAIL` | no       | Verified sender in Resend. Defaults to the Resend sandbox. |

\*If unset, `/api/contact` logs the message and returns 200 — useful for local dev.

## Project structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Resend-backed contact endpoint
│   ├── layout.tsx             # Root layout, fonts, providers
│   ├── page.tsx               # Single-page home composing all sections
│   └── globals.css            # Tailwind v4 theme tokens + utilities
├── components/
│   ├── nav.tsx, footer.tsx, command-palette.tsx, theme-toggle.tsx
│   ├── providers.tsx          # next-themes + Lenis + Sonner
│   └── sections/
│       ├── hero.tsx, about.tsx, work.tsx, projects.tsx,
│       └── services.tsx, skills.tsx, contact.tsx
└── lib/
    ├── data.ts                # All portfolio content as typed constants
    └── utils.ts               # cn() class-merging helper
```

## Deploy

Push to GitHub → import the repo on [Vercel](https://vercel.com/new) → set `RESEND_API_KEY`. That's it.

## Legacy

The previous Angular 17 portfolio is preserved on the `legacy-angular` branch.
