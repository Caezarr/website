# Wonka

Marketing site for Wonka.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Sanity CMS · bun

## Setup

1. `bun install`
2. Copy `.env.example` to `.env` and fill in the Sanity values
3. `bun dev`

## Commands

```
bun dev           # Start dev server (Turbopack)
bun run build     # Production build
bun start         # Start production server
bun lint          # Run ESLint
```

## Sanity Studio

Embedded at `/studio`. Content updates appear on the site live (no rebuild needed) thanks to Sanity's Live Content API.

## Environment variables

| Name | Required | Purpose |
|------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Usually `production` |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical site URL for sitemap / metadata. On Vercel, falls back to `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` if unset |
| `NEXT_PUBLIC_GTM_ID` | optional | Google Tag Manager container ID |
| `SANITY_API_WRITE_TOKEN` | optional | Only needed for seeding scripts |

## Deploy

Deploys on Vercel. Set the env vars above in the Vercel project settings.

## Conventions

See [`CLAUDE.md`](./CLAUDE.md) for the design system, button system, and architecture rules.
