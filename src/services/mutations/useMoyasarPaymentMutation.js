import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { postMoyasarPayment } from "services/payment/moyasarPaymentApi";

export const moyasarPaymentMutationKey = [{ scope: QUERY_KEYS.MOYASAR_PAYMENT }];

/**
 * Moyasar checkout: POST to `REACT_APP_PAYMENT_API_BASE` + `/Moyasar`.
 */
export function useMoyasarPaymentMutation(options = {}) {
  return useMutation({
    mutationKey: moyasarPaymentMutationKey,
    mutationFn: postMoyasarPayment,
    ...options,
  });
}
