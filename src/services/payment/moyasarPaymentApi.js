import axios from "axios";
import {
  PAYMENT_API_BASE,
  MOYASAR_ENDPOINT_PATH,
  assertPaymentApiConfigured,
} from "./paymentConfig";

const paymentClient = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * POST `{PAYMENT_API_BASE}/Moyasar` with Moyasar payment payload.
 * @param {object} payload — shape from `buildMoyasarPaymentPayload`
 */
export async function postMoyasarPayment(payload) {
  assertPaymentApiConfigured();
  const { data } = await paymentClient.post(
    `${PAYMENT_API_BASE}${MOYASAR_ENDPOINT_PATH}`,
    payload,
  );
  return data;
}
