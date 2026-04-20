import axios from "axios";
import { toast } from "react-toastify";
import { getAppApiBaseUrl } from "constants/appApiBase";

const appApiBase = getAppApiBaseUrl();

if (process.env.NODE_ENV === "development" && !appApiBase) {
  // eslint-disable-next-line no-console
  console.error(
    "Meena: Set REACT_APP_API_BASE (and/or REACT_APP_PAYMENT_API_BASE) in your .env file, then restart `npm start`.",
  );
}

let onUnauthorized;
export const setOnUnauthorized = (fn) => {
  onUnauthorized = fn;
};

const API = axios.create({
  baseURL: appApiBase || undefined,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function handleUnauthorized() {
  try {
    if (typeof onUnauthorized === "function") onUnauthorized();
  } catch {}
  localStorage.removeItem("user");
  localStorage.removeItem("auth_token");
  console.log("Unauthorized access - redirecting to sign-in");

  window.location.href = "/sign-in";
}

function handlePermissionError() {
  toast.error("ليس لديك صلاحية للوصول إلى هذه الصفحة");
  window.location.href = "/no-permission";
}

// Response success path: أحياناً السيرفر يرجّع 200 بس success=false
API.interceptors.response.use(
  (res) => {
    const msg = res?.data?.message;
    const success = res?.data?.success;
    
    // Check for permission errors in successful responses
    if (success === false && /permission required/i.test(String(msg))) {
      handlePermissionError();
      throw new axios.Cancel("Permission required");
    }
    
    if (success === false && /token expired/i.test(String(msg))) {
      handleUnauthorized();
      // نرمي cancel علشان نوقف بقية السلسلة
      throw new axios.Cancel("Token expired");
    }
    return res;
  },
  (err) => {
    const msg = err?.response?.data?.message;
    const isExpiredMsg = /token expired/i.test(String(msg));
    const isPermissionMsg = /permission required/i.test(String(msg));
    
    if (err?.response?.status === 401 || isExpiredMsg) {
      handleUnauthorized();
    } else if (isPermissionMsg) {
      handlePermissionError();
    }
    
    return Promise.reject(err);
  }
);

export default API;
