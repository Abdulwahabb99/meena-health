const path = require("path");

/** When building on Vercel with no API env vars, CRA would bundle an empty baseURL → POSTs hit vercel.app (405). */
const VERCEL_DEFAULT_API_BASE = "https://payment.meena-health.com/api";

function ensureApiBaseForVercelBuild() {
  const has =
    process.env.REACT_APP_API_BASE?.trim() ||
    process.env.REACT_APP_BASE_URL?.trim() ||
    process.env.REACT_APP_PAYMENT_API_BASE?.trim();
  if (!has && process.env.VERCEL === "1") {
    process.env.REACT_APP_API_BASE = VERCEL_DEFAULT_API_BASE;
  }
}

/** Ensure absolute imports (`services/...`, `components/...`) and .ts/.tsx resolve reliably. */
module.exports = {
  webpack: {
    configure(config) {
      ensureApiBaseForVercelBuild();
      const srcPath = path.resolve(__dirname, "src");
      const modules = config.resolve.modules || [];
      const normalized = modules.map((m) => path.resolve(m));
      if (!normalized.includes(srcPath)) {
        config.resolve.modules = [...modules, srcPath];
      }
      const exts = config.resolve.extensions || [];
      for (const e of [".tsx", ".ts"]) {
        if (!exts.includes(e)) {
          config.resolve.extensions = [e, ...exts];
        }
      }
      return config;
    },
  },
};
