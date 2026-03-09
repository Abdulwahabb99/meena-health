import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updateCategory } from "services/api/categories";

const categoriesKey = [{ scope: QUERY_KEYS.CATEGORIES }];

export const useUpdateCategory = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: categoriesKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
