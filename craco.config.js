const path = require("path");
const webpack = require("webpack");

/**
 * Must match your `.env` (REACT_APP_API_BASE / REACT_APP_PAYMENT_API_BASE).
 * Used only when building on Vercel if those vars are not set in the project
 * Environment Variables (`.env` is not committed, so CI has no file to read).
 */
const DEFAULT_API_BASE = "https://payment.meena-health.com/api";

function isVercelBuildEnvironment() {
  return (
    process.env.VERCEL === "1" ||
    Boolean(process.env.VERCEL_URL && String(process.env.VERCEL_URL).trim())
  );
}

/** Values inlined into the client bundle (CRA’s DefinePlugin runs before this; we override with a second plugin). */
function resolveApiBasesForClientBundle() {
  const envApi = process.env.REACT_APP_API_BASE?.trim() || "";
  const envPayment = process.env.REACT_APP_PAYMENT_API_BASE?.trim() || "";

  if (isVercelBuildEnvironment() && !envApi && !envPayment) {
    const d = DEFAULT_API_BASE.replace(/\/+$/, "");
    return { api: d, payment: d };
  }

  let api = envApi;
  let payment = envPayment;
  if (!api) api = payment;
  if (!payment) payment = api;

  return { api, payment };
}

module.exports = {
  webpack: {
    configure(config) {
      const { api, payment } = resolveApiBasesForClientBundle();

      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.REACT_APP_API_BASE": JSON.stringify(api),
          "process.env.REACT_APP_PAYMENT_API_BASE": JSON.stringify(payment),
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
