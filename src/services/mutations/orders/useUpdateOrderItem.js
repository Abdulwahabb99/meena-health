import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { orderDetailsKey } from "services/queries/Orders/useFetchOrderDetails";
import { updateOrderItem } from "services/api/orders";

const ordersKey = [{ scope: QUERY_KEYS.ORDERS }];

export const useUpdateOrderItem = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, orderItemId, payload }) =>
      updateOrderItem(id, orderItemId, payload),

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
