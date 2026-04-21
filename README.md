# Meena Health — Intranet (Medication Insurance)

Internal web application for **Meena Health** teams who manage **medication insurance** workflows: browsing covered items, capturing patient details, and completing checkout with integrated payment. The app is bilingual (English / Arabic), RTL-aware, and secured with sign-in, OTP verification, and role-aware access patterns.

**Stack:** React 18, **TypeScript**, Material UI 5, React Query, Formik, i18next, Axios.

> The repository uses TypeScript for maintainability and IDE safety. Domain behavior and UX are unchanged from the product requirements.

## Main user flows

1. **Authentication** — Sign in with a `@meena-health.com` style username (local part + fixed domain), then OTP (placeholder until backend wiring).
2. **Home / catalog** — Search and add medications to the cart.
3. **Order** — Customer details, then checkout summary and payment (Moyasar payload via configured API).

## Project structure (`src/`)

High-level layout; `examples/` and large `assets/` trees come from the Material Dashboard template and back the UI shell (sidenav, navbars, themes).

```
src/
├── App.tsx                 # Routes, layout shell, theme
├── index.tsx               # Root render (providers, router)
├── routes.tsx              # Sidenav / main menu route config
├── page.routes.tsx         # Extra protected routes (order, checkout)
├── assets/                 # Themes (light/dark/RTL), images
├── components/             # App UI: cart, stepper, Meena email field, MD* design system
├── constants/              # App constants (API keys paths, branding, OTP placeholder, email domain)
├── context/                # MUI controller (theme / layout)
├── examples/               # Dashboard template: Sidenav, Navbars, charts, tables, …
├── i18n/                   # i18next setup
├── icons/                  # Custom SVG icons
├── layouts/                # Feature screens
│   ├── Home/               # Catalog + cart
│   ├── CustomerDetails/    # Patient / customer step
│   ├── Checkout/           # Review + pay
│   └── authentication/     # Sign-in, register, verify-otp (+ legacy template auth pages)
├── locales/                # en.json, ar.json
├── services/               # API clients, React Query mutations/queries, payment helpers
├── shared/
│   ├── components/         # ProtectedRoutes, auth shell, TableComponent (react-table, for upcoming features)
│   ├── context/            # Auth, cart providers
│   ├── functions/          # Shared axios instance
│   ├── hooks/              # useAuth, useTranslate, permissions, …
│   ├── utils/              # getApiErrorMessage, …
│   └── validation/         # Shared Yup helpers (e.g. Meena email local part)
└── utils/                  # General helpers (e.g. price formatting)
```

## Environment

Copy `.env` from your team vault. Typical variables:

- `REACT_APP_API_BASE` — main backend API
- `REACT_APP_PAYMENT_API_BASE` — payment service base (when used)

Restart the dev server after changing env vars.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm start`    | Development server       |
| `npm run build`| Production build         |
| `npm test`     | Run tests (if configured)|

## License / attribution

Derived from **Material Dashboard 3 PRO React** (Creative Tim). See package metadata and Creative Tim license for template terms.
