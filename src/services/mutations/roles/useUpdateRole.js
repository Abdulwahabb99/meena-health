import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updateRole } from "services/api/roles";

const permissionsKey = [{ scope: QUERY_KEYS.ROLES }];

export const useUpdateRole = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ permissionId, payload }) =>
      updateRole(permissionId, payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: permissionsKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
