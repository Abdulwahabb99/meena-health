/**
 * Main app API root (Auth, Items, etc.). Values come only from `.env` (CRA inlines at build/start).
 * Resolution order: REACT_APP_API_BASE → REACT_APP_BASE_URL → REACT_APP_PAYMENT_API_BASE.
 */
export function getAppApiBaseUrl(): string {
  const raw =
    process.env.REACT_APP_API_BASE?.trim() ||
    process.env.REACT_APP_BASE_URL?.trim() ||
    process.env.REACT_APP_PAYMENT_API_BASE?.trim() ||
    "";
  return raw.replace(/\/+$/, "");
}
