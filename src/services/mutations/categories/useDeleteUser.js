import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { deleteCategory } from "services/api/categories";

const categoriesKey = [{ scope: QUERY_KEYS.CATEGORIES }];

export const useDeleteCategory = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId }) => deleteCategory(categoryId),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: categoriesKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
