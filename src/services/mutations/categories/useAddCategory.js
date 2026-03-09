import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { addCategory } from "services/api/categories";

const categoriesKey = [{ scope: QUERY_KEYS.CATEGORIES }];

export const useAddCategory = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => addCategory(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: categoriesKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
