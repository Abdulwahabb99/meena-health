import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updateOrders } from "services/api/orders";
import { orderDetailsKey } from "services/queries/Orders/useFetchOrderDetails";

const ordersKey = [{ scope: QUERY_KEYS.ORDERS }];

export const useUpdateOrder = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateOrders(id, payload),

    onSuccess: (data, variables, context) => {
      const { id } = variables;

      qc.invalidateQueries({
        queryKey: orderDetailsKey(id.toString()),
      });

      qc.invalidateQueries({ queryKey: ordersKey });

      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
