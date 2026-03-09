import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { deleteCategory } from "services/api/categories";
import { deleteProduct } from "services/api/products";

const productsKey = [{ scope: QUERY_KEYS.PRODUCTS }];

export const useDeleteProduct = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }) => deleteProduct(productId),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: productsKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
