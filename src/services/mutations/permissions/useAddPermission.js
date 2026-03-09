import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { addPermission } from "services/api/permissions";

const permissionsKey = [{ scope: QUERY_KEYS.PERMISSIONS }];

export const useAddPermission = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => addPermission(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: permissionsKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
