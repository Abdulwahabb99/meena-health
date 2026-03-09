import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updateProduct } from "services/api/products";

const productsKey = [{ scope: QUERY_KEYS.PRODUCTS }];

export const useUpdateProduct = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: productsKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
