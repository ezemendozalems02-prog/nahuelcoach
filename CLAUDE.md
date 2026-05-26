@AGENTS.md

# Nahuel Coach — Premium Fitness Website

Next.js 16 App Router · TypeScript · Tailwind v4 · Framer Motion · lucide-react v1.16.0

## Key notes
- lucide-react v1.16.0: NO `Instagram` or `Youtube` icons. Use `InstagramIcon` / `YoutubeIcon` from `@/components/SocialIcons`.
- `ease: "easeOut"` causes TS errors in Framer Motion transition objects — omit `ease` or cast properly.
- Google Fonts `@import url(...)` must come **before** `@import "tailwindcss"` in globals.css.
- WhatsApp number placeholder: +5491100000000 — replace with real number.
- Cart checkout always goes to WhatsApp with a pre-filled message.

## Structure
- `data/programs.ts` — all 8 programs
- `context/CartContext.tsx` — cart state
- `components/` — Header, Hero, AboutSection, FeaturedPrograms, ImpactoSection, FAQSection, Footer, CartDrawer, SocialIcons
- `app/` — / (home), /rutinas, /rutinas/[slug], /impacto-1a1

## Design tokens
Black: #000 / #0a0a0f · Electric blue: #0066FF · Cyan: #00CCFF · Violet: #7B2FFF
