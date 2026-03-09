import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { deleteRole } from "services/api/roles";

const rolesKey = [{ scope: QUERY_KEYS.ROLES }];

export const useDeleteRole = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId }) => deleteRole(roleId),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: rolesKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
