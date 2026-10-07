# Mustaqeem Bangi: Portfolio

Personal portfolio for **Mustaqeem Abdullah Bangi**, Senior Laravel & Systems Engineer.
Live at **https://mustaqeem.is-a.dev** (English) and **/ar** (Arabic, right to left).

Space-themed: a real-time WebGL black hole in the hero, a NASA moon behind the contact section, a
starfield behind every page, and a real planet for each project.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, three.js
(React Three Fiber + drei), Motion, Lenis and cmdk.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000. No environment variables are needed.

## Two languages

English lives at `/` and Arabic at `/ar`. Each has its own root layout
(`src/app/(en)` and `src/app/(ar)/ar`), both built from
`src/components/site-shell.tsx`, so `<html lang dir>` is right for each.

- Content: English in `src/lib/data.ts`, Arabic in `src/lib/content-ar.ts`.
  The Arabic file only holds words; links, tech names and planets come from
  the English one, and the build fails if a translation is missing.
- Interface wording (buttons, headings): `src/lib/ui.ts`.
- Components read both through `useLocale()` from `src/lib/i18n.tsx`.
- Use logical classes (`ms-`, `ps-`, `start-`, `end-`, `border-s`) rather than
  left/right ones, so layouts mirror in Arabic. `<BdiList>` keeps English tech
  names in the right order inside Arabic text.

## Editing content

English text lives in [`src/lib/data.ts`](src/lib/data.ts) and Arabic in
[`src/lib/content-ar.ts`](src/lib/content-ar.ts): bio, facts, projects, highlights,
capabilities, experience and navigation. Change it there, not in the components.

## Project structure

```
src/
├── app/
│   ├── (en)/layout.tsx, page.tsx      # English site at /
│   ├── (ar)/ar/layout.tsx, page.tsx   # Arabic site at /ar (right to left)
│   ├── global-not-found.tsx           # Bilingual 404 page
│   ├── opengraph-image.jpg            # Share card (LinkedIn, WhatsApp, X)
│   ├── icon.png, apple-icon.png, favicon.ico
│   ├── robots.ts, sitemap.ts
│   └── globals.css                    # Theme tokens, Arabic and RTL rules
├── components/
│   ├── site-shell.tsx                 # <html>, fonts, metadata, structured data
│   ├── home.tsx                       # The single page, shared by both languages
│   ├── black-hole-scene.tsx           # WebGL black hole with bloom
│   ├── space-backdrop.tsx             # Starfield and shooting stars
│   ├── planet.tsx                     # Planet and moon images, CSS black hole fallback
│   ├── bidi-list.tsx                  # Lists that read right in both directions
│   ├── nav.tsx, footer.tsx, command-palette.tsx (⌘K)
│   └── sections/                      # hero, industries, projects, highlights,
│                                      # capabilities, toolbox, about, process,
│                                      # work (experience), contact
└── lib/
    ├── data.ts                        # English content
    ├── content-ar.ts                  # Arabic content
    ├── ui.ts                          # Interface wording, both languages
    ├── i18n.tsx                       # useLocale()
    └── utils.ts
```

Images: `public/planets/` and `public/moon.webp` are rendered from Solar System Scope
(CC BY 4.0) and NASA maps; `public/work/` holds real product screenshots.

## Performance and accessibility

- The 3D scene loads after the page, stops rendering once the hero scrolls out
  of view, and uses fewer particles on phones.
- Visitors with "reduce motion" turned on, or without WebGL, get a static CSS
  black hole instead.

## Deploy

Push to `main`. If the repo is connected to Vercel, it builds and deploys automatically.
