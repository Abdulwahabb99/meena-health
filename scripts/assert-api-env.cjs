/**
 * Fails the Vercel build if no API base is configured, so we never ship a bundle
 * that POSTs to the static host (405 on /Auth/*).
 */
const hasBase = Boolean(
  process.env.REACT_APP_API_BASE?.trim() ||
    process.env.REACT_APP_BASE_URL?.trim() ||
    process.env.REACT_APP_PAYMENT_API_BASE?.trim(),
);

if (!hasBase && process.env.VERCEL === "1") {
  console.error(
    "\n[!] Missing API base URL for this Vercel build.\n" +
      "    In Vercel → Project → Settings → Environment Variables, add (Production + Preview):\n" +
      "      REACT_APP_API_BASE = https://payment.meena-health.com/api\n" +
      "    (or your real API origin, no trailing slash).\n" +
      "    Redeploy after saving.\n",
  );
  process.exit(1);
}
