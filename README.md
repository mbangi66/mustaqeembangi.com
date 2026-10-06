# Mustaqeem Bangi: Portfolio

Personal portfolio for **Mustaqeem Abdullah Bangi**, Senior Laravel & Systems Engineer.
Live at **https://mustaqeembangi.vercel.app**.

Space-themed: a real-time WebGL black hole in the hero, a rising moon behind the contact section, a
starfield behind every page, and CSS planets for each project.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, three.js
(React Three Fiber + drei), Motion, Lenis and cmdk.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000. No environment variables are needed.

## Editing content

All text lives in [`src/lib/data.ts`](src/lib/data.ts): bio, headline facts,
projects, capabilities, principles, experience and navigation. Change it there,
not in the components.

## Project structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout, fonts, metadata, starfield
│   ├── page.tsx               # Single page composing all sections
│   ├── opengraph-image.tsx    # Generated share image (LinkedIn, WhatsApp, X)
│   └── globals.css            # Tailwind v4 theme tokens
├── components/
│   ├── black-hole-scene.tsx   # WebGL black hole + accretion disk
│   ├── space-backdrop.tsx     # Fixed canvas starfield + shooting stars
│   ├── planet.tsx             # CSS planet, CSS moon, CSS black hole fallback
│   ├── nav.tsx, footer.tsx, command-palette.tsx (⌘K)
│   └── sections/
│       ├── hero.tsx, projects.tsx, capabilities.tsx,
│       └── about.tsx, work.tsx (experience), contact.tsx
└── lib/
    ├── data.ts                # All portfolio content
    └── utils.ts               # cn() class-merging helper
```

## Performance and accessibility

- The 3D scene loads after the page, stops rendering once the hero scrolls out
  of view, and uses fewer particles on phones.
- Visitors with "reduce motion" turned on, or without WebGL, get a static CSS
  black hole instead.

## Deploy

Push to `main`. If the repo is connected to Vercel, it builds and deploys automatically.
