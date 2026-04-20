const path = require("path");
const webpack = require("webpack");

/**
 * Same-origin proxy on Vercel (see vercel.json) avoids browser CORS when the API
 * does not allow https://*.vercel.app in Access-Control-Allow-Origin.
 */
const VERCEL_API_PROXY_PATH = "/api-proxy";

function isVercelBuildEnvironment() {
  return (
    process.env.VERCEL === "1" ||
    Boolean(process.env.VERCEL_URL && String(process.env.VERCEL_URL).trim())
  );
}

/**
 * Baked into the client bundle via DefinePlugin (CRA reads env before craco runs).
 * On Vercel without env: use relative proxy path. Locally: full URL from .env.
 */
function resolveApiBasesForClientBundle() {
  const envApi = process.env.REACT_APP_API_BASE?.trim() || "";
  const envPayment = process.env.REACT_APP_PAYMENT_API_BASE?.trim() || "";

  if (isVercelBuildEnvironment() && !envApi && !envPayment) {
    return {
      api: VERCEL_API_PROXY_PATH,
      payment: VERCEL_API_PROXY_PATH,
    };
  }

  let api = envApi;
  let payment = envPayment;
  if (!api) api = payment;
  if (!payment) payment = api;

  return { api, payment };
}

/** Ensure absolute imports (`services/...`, `components/...`) and .ts/.tsx resolve reliably. */
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
