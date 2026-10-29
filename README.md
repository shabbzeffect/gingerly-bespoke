# Gingerly Designs and Fabrics — Bespoke Bridal Atelier

A production-ready Next.js website for Gingerly Designs and Fabrics, a Nairobi-based bespoke bridal and fashion atelier.

## What this is

A digital atelier experience serving Kenyan and diaspora clients (UK, Australia, USA):

- **Homepage** — cinematic hero, collections by ceremony, craftsmanship, commission process, virtual fittings
- **Lookbook** — filtered gallery with lightbox; dedicated ceremony pages (Ruracio, Nyombo, Koito, Bukhwi, white weddings, bridesmaids, prom, menswear)
- **Bespoke Services** — service fabric & detail breakdown; commission explained as individual (nothing sold off the rack)
- **Consultation Booking** — multi-step wizard (occasion → date → location/timezone → vision → details), persisted server-side, timezone-aware
- **Virtual Fittings** — human-led process explanation, measurement guide, private measurement/photo submission
- **Rentals** — enquiry-only flow (no live-inventory claims)
- **Supporting pages** — About, Process, FAQ, Contact, Journal, 404
- **Admin atelier dashboard** — role-protected (NextAuth), consultation pipeline (Kanban-style table + status updates), clients, lookbook manager, settings
- **Database** — Drizzle ORM + PostgreSQL, with an in-memory demo store when no `DATABASE_URL` is configured

## Tech stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Framer Motion (motion primitives), Lucide React (icons)
- Drizzle ORM + PostgreSQL (demo fallback: in-memory store)
- NextAuth.js v4 (admin authentication, JWT sessions)
- React Hook Form + Zod (form validation)

## Prerequisites

- Node.js 20+
- PostgreSQL (optional for local demo; required for production)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.example .env.local
# Edit .env.local — supply your own NEXTAUTH_SECRET and any integrations

# 3. Database (optional for demo)
# If you have PostgreSQL:
npx drizzle-kit migrate   # creates tables from src/lib/schema.ts
# Then set DATABASE_URL in .env.local

# 4. Run dev server
npm run dev

# Open http://localhost:3000
```

### Without a database

The app runs immediately with an in-memory demo store. Data resets on server restart. Consultation bookings, lookbook items, and settings are held in memory. This is for demonstration only — not for production client data.

## Admin access

- Route: `/admin` (protected by NextAuth; `middleware.ts` requires `role === "admin"`)
- Sign in: `/admin/sign-in`
- Dev credentials (no `DATABASE_URL`): `admin@gingerly.local` / `admin123`
- With a real database: create a `users` row with `role = "admin"` and a `password`, then sign in with those credentials.

Roles supported: `client`, `admin`, `atelier`.

## Sample vs verified content

All imagery, prices, turnaround times, contact details, rental inventory, and physical addresses in this starter are **sample/placeholder** and clearly marked:

- Lookbook images are coloured placeholders labelled "Sample imagery — replace with brand photography."
- FAQs, pricing, and timelines include `verified: false` / "to be confirmed by the atelier" flags.
- The `.env.example` contains no real secrets.

The atelier owner must:
1. Replace placeholder imagery with authentic, licensed brand photography.
2. Supply real contact details (WhatsApp, email, Instagram) in Admin → Settings or `.env`.
3. Confirm prices, deposits, turnaround times, rental terms, and shipping policies.
4. Review privacy policy and terms templates before launch.

## Image replacement

Swap any `PlaceholderImage` `src` for a real Cloudinary/S3 URL. For sensitive uploads (measurements, reference photos), configure private storage (`AWS_*` or `CLOUDINARY_*`) and serve via signed URLs — never expose private file URLs publicly.

## Integrations (configure only with credentials)

Do not enable these until the atelier has confirmed the service and supplied credentials:

| Integration | Purpose | Env vars |
|---|---|---|
| M-Pesa (Daraja) | STK Push deposits (Kenya) | `MPESA_*` |
| Stripe | Diaspora deposits | `STRIPE_*` |
| PayPal | Diaspora deposits | `PAYPAL_*` |
| Resend | Booking confirmations / admin notifications | `RESEND_API_KEY` |
| WhatsApp Business | Client channel | — (deep links) |
| Zoom / Whereby | Virtual fitting video calls | `ZOOM_*` / `WHEREBY_*` |
| DHL / FedEx | International shipping tracker | `DHL_API_KEY` / `FEDEX_API_KEY` |
| GA4 / Meta / TikTok Pixel | Analytics | `NEXT_PUBLIC_*_ID` |

No nonfunctional payment button is displayed unless credentials are supplied.

## Timezones

Consultation booking stores the visitor's `timeZone` and displays preferred slots in both the visitor's zone and Nairobi time (`Africa/Nairobi`). UK and Australian daylight saving differences are handled by `Intl.DateTimeFormat`.

## Privacy

Body measurements, event details, and personal photos are sensitive:

- Collected only with clear consent.
- Stored privately; access restricted to the design team (authorization-gated routes).
- Retention/deletion per the atelier's approved process.
- Privacy policy and terms templates are included as starting points — **must be reviewed by the business and legal counsel before launch**. Kenyan (Data Protection Act, 2019) and international obligations apply.

Do not claim legal compliance without verification.

## Testing

```bash
# Typecheck
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Start production server
npm start
```

Manual test checklist:
1. Homepage loads; hero, collections, and CTAs render.
2. Booking wizard submits successfully (checks console / demo store).
3. Timezone selector shows visitor's detected zone + Nairobi.
4. Virtual fittings measurement form accepts input and submits.
5. Admin sign-in works; `/admin` routes redirect non-admins.
6. Lookbook gallery filters and lightbox open/close.
7. Mobile navigation opens/closes.
8. `prefers-reduced-motion` disables animations.

## Deployment

Deploy on Vercel:

```bash
vercel
```

Set all production env vars in the Vercel dashboard. Connect PostgreSQL (e.g., Neon, Supabase, or Railway) via `DATABASE_URL`, then run `npx drizzle-kit migrate` as part of your build or deployment step.

## Final checklist — launch readiness

| Area | Fully functional | Needs credentials / assets | Owner must confirm |
|---|---|---|---|
| Homepage | ✅ | Brand photography | ✅ |
| Lookbook + ceremony pages | ✅ | Brand imagery | ✅ (cultural context) |
| Bespoke Services | ✅ | — | Prices not published (by design) |
| Consultation booking | ✅ (demo store) | Email provider for confirmations | Fees, urgency logic |
| Virtual fittings | ✅ (form only) | Private storage, video-call links | Measurement guide text |
| Rentals | ✅ (enquiry only) | — | Availability, deposit, terms |
| Admin dashboard | ✅ (demo store) | Real DB for persistence | RBAC review |
| Payments | — | M-Pesa / Stripe / PayPal credentials | All payment flows |
| Shipping tracker | — | DHL / FedEx credentials | Shipping policy |
| Privacy/legal | Templates | — | Legal review |
| SEO (sitemap, robots, metadata) | ✅ | Real domain | Verified schema data |

## Folder overview

```
src/
  app/              # App Router pages & route handlers
  components/ui/    # Accessible UI primitives
  components/layout/# Header, footer
  lib/              # schema.ts (Drizzle), db.ts (db + mock), auth.ts, config.ts, utils.ts
  middleware.ts     # Admin route protection
drizzle.config.ts   # Drizzle configuration
.env.example        # Environment variables (no secrets)
```

## License

Proprietary — Gingerly Designs and Fabrics.
