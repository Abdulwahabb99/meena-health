import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updatePermission } from "services/api/permissions";

const permissionsKey = [{ scope: QUERY_KEYS.PERMISSIONS }];

export const useUpdatePermission = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ permissionId, payload }) =>
      updatePermission(permissionId, payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: permissionsKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
