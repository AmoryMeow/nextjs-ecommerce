# Cartly

A modern e-commerce storefront, built as a pet project with the Next.js App Router.

The project is at the initial setup stage: it has the base tooling and a minimal homepage. Store functionality has not been built yet.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [CSS Modules](https://nextjs.org/docs/app/getting-started/css#css-modules)
- [ESLint](https://eslint.org) with `eslint-config-next`
- [Prettier](https://prettier.io) with sorted imports
- [npm](https://www.npmjs.com)

## Getting started

### Prerequisites

- Node.js 20.9 or later
- npm 10 or later

### Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the development server          |
| `npm run build`        | Create a production build             |
| `npm start`            | Serve the production build            |
| `npm run lint`         | Run ESLint                            |
| `npm run typecheck`    | Run the TypeScript compiler (no emit) |
| `npm run format`       | Format all files with Prettier        |
| `npm run format:check` | Check formatting without writing      |

## Project structure

```
src/
  app/
    layout.tsx       # Root layout and app metadata
    page.tsx         # Homepage
    page.module.css  # Homepage styles (CSS Module)
    globals.css      # Global styles and theme variables
```

Imports from `src/` can use the `@/*` alias, e.g. `import { x } from "@/lib/x"`.

## Planned features

- Product catalog
- Product details
- Filters
- Shopping cart
- Checkout
