import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { bulkUpdateOrderItems } from "services/api/orders";
import { orderDetailsKey } from "services/queries/Orders/useFetchOrderDetails";

const ordersKey = [{ scope: QUERY_KEYS.ORDERS }];

export const useBulkUpdateOrderItems = ({ onSuccess, onError, orderId }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload) => bulkUpdateOrderItems(payload),

    onSuccess: (data, variables, context) => {
      // Invalidate order details for the specific order
      if (orderId) {
        qc.invalidateQueries({
          queryKey: orderDetailsKey(orderId.toString()),
        });
      }

      qc.invalidateQueries({ queryKey: ordersKey });

      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
