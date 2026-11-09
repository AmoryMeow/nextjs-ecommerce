# Cartly

[![CI](https://github.com/AmoryMeow/nextjs-ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/AmoryMeow/nextjs-ecommerce/actions/workflows/ci.yml)

A small online store built with the Next.js App Router: a product catalog, a cookie-based cart, Stripe Checkout and a password-protected admin panel.

## Features

- **Catalog** with search and category filters kept in the URL
- **Product pages**, prerendered and cached, with Open Graph and JSON-LD metadata
- **Cart** stored in a cookie, updated with Server Actions and optimistic UI
- **Checkout** through Stripe Checkout (test mode); paid orders are saved by a signed webhook
- **Admin panel** behind a login: edit products, browse orders
- **SEO**: `robots.txt`, `sitemap.xml`, canonical URLs

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Cache Components, Server Actions, Proxy)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [PostgreSQL](https://www.postgresql.org) 17 with [Drizzle ORM](https://orm.drizzle.team)
- [Stripe](https://stripe.com) Checkout and webhooks
- [Zod](https://zod.dev) for form validation
- [jose](https://github.com/panva/jose) for signed session cookies (JWT)
- [CSS Modules](https://nextjs.org/docs/app/getting-started/css#css-modules)
- [Vitest](https://vitest.dev) for unit tests, [Playwright](https://playwright.dev) for end-to-end tests
- [ESLint](https://eslint.org), [Prettier](https://prettier.io) with sorted imports
- GitHub Actions for CI

## Getting started

### Prerequisites

- Node.js 22.12 or later, npm 10 or later
- [Docker](https://www.docker.com) for the local database
- A free [Stripe](https://dashboard.stripe.com/register) account (sandbox) and the [Stripe CLI](https://docs.stripe.com/stripe-cli) — only needed for checkout

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from the template and fill in the values (see [Environment variables](#environment-variables)):

   ```bash
   cp .env.example .env.local
   ```

3. Start Postgres, create the tables and add the demo products:

   ```bash
   npm run db:up
   npm run db:migrate
   npm run db:seed
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The admin panel is at [/admin](http://localhost:3000/admin), the password is `ADMIN_PASSWORD`.

### Checkout locally

Stripe can't reach `localhost`, so the Stripe CLI forwards webhook events to the app. Keep it running in a second terminal:

```bash
stripe login
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

Copy the printed `whsec_…` secret into `STRIPE_WEBHOOK_SECRET` and restart `npm run dev`. Pay with the test card `4242 4242 4242 4242`, any future date and any CVC.

### Environment variables

| Variable                | Description                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Postgres connection string. The default matches `compose.yaml`                          |
| `ADMIN_PASSWORD`        | Password for the admin panel                                                            |
| `SESSION_SECRET`        | Random string that signs the session cookie                                             |
| `STRIPE_SECRET_KEY`     | Stripe secret key (`sk_test_…` in the sandbox)                                          |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_…`), printed by `stripe listen` locally                  |
| `SITE_URL`              | Public base URL of the site, used for Stripe redirects, the sitemap and canonical links |

`.env.local` is ignored by git. Never commit real keys.

## Scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the development server                        |
| `npm run build`        | Create a production build (needs the database)      |
| `npm start`            | Serve the production build                          |
| `npm run lint`         | Run ESLint                                          |
| `npm run typecheck`    | Run the TypeScript compiler (no emit)               |
| `npm run format`       | Format all files with Prettier                      |
| `npm run format:check` | Check formatting without writing                    |
| `npm test`             | Run unit tests once                                 |
| `npm run test:watch`   | Run unit tests in watch mode                        |
| `npm run test:e2e`     | Build the app and run Playwright tests on port 3100 |
| `npm run test:e2e:ui`  | Run Playwright tests in the UI mode                 |
| `npm run db:up`        | Start the local Postgres container                  |
| `npm run db:generate`  | Generate a migration from changes in `db/schema.ts` |
| `npm run db:migrate`   | Apply pending migrations                            |
| `npm run db:seed`      | Replace the products with the demo data             |
| `npm run db:studio`    | Open Drizzle Studio to browse the database          |

Before the first `npm run test:e2e`, install the browser once with `npx playwright install chromium`.

## Project structure

```
src/
  app/
    (shop)/          # Storefront: catalog, product pages, cart, checkout
    admin/           # Admin panel: products and orders
    login/           # Admin login
    api/stripe/      # Stripe webhook (Route Handler)
    robots.ts, sitemap.ts
  components/        # UI components, each with its CSS Module
  db/                # Drizzle schema, client and seed data
  lib/               # Server Actions, data access and pure helpers
    auth/            # Session cookie and admin login
    cart/            # Cart cookie and cart actions
    checkout/        # Stripe Checkout session
    orders/          # Order queries and webhook fulfillment
    products/        # Product queries, validation and actions
  proxy.ts           # Redirects guests away from /admin
drizzle/             # SQL migrations (committed)
e2e/                 # Playwright tests
```

Unit tests live next to the code they test (`*.test.ts`). Imports from `src/` use the `@/*` alias, e.g. `import { db } from "@/db"`.
