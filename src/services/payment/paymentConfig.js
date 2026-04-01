const DEFAULT_DEV_BASE = "https://payment.meena-health.com/api";

function resolvePaymentBase() {
  const fromEnv = process.env.REACT_APP_PAYMENT_API_BASE?.trim() ?? "";
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return DEFAULT_DEV_BASE.replace(/\/+$/, "");
  }
  return "";
}

export const PAYMENT_API_BASE = resolvePaymentBase();

export const MOYASAR_ENDPOINT_PATH = "/Moyasar";

export function getMoyasarPaymentUrl() {
  if (!PAYMENT_API_BASE) return "";
  return `${PAYMENT_API_BASE}${MOYASAR_ENDPOINT_PATH}`;
}

export function assertPaymentApiConfigured() {
  if (!PAYMENT_API_BASE) {
    throw new Error(
      "REACT_APP_PAYMENT_API_BASE is missing. Set it in .env (see .env.example) and rebuild.",
    );
  }
}
