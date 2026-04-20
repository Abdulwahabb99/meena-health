const path = require("path");
const webpack = require("webpack");

/**
 * Default API host when deploying to Vercel without REACT_APP_* in the dashboard.
 * CRA freezes env in DefinePlugin before our hook runs; mutating process.env alone is not enough.
 */
const VERCEL_DEFAULT_API_BASE = "https://payment.meena-health.com/api";

function isVercelBuildEnvironment() {
  return (
    process.env.VERCEL === "1" ||
    Boolean(process.env.VERCEL_URL && String(process.env.VERCEL_URL).trim())
  );
}

/** Value baked into the client bundle for axios baseURL (must run at webpack compile time). */
function resolveApiBaseForClientBundle() {
  const fromEnv =
    process.env.REACT_APP_API_BASE?.trim() ||
    process.env.REACT_APP_BASE_URL?.trim() ||
    process.env.REACT_APP_PAYMENT_API_BASE?.trim() ||
    "";
  if (fromEnv) return fromEnv;
  if (isVercelBuildEnvironment()) return VERCEL_DEFAULT_API_BASE;
  return "";
}

/** Ensure absolute imports (`services/...`, `components/...`) and .ts/.tsx resolve reliably. */
module.exports = {
  webpack: {
    configure(config) {
      const resolvedApiBase = resolveApiBaseForClientBundle();

      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.REACT_APP_API_BASE": JSON.stringify(resolvedApiBase),
        }),
      );

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
