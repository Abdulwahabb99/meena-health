import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { addRole } from "services/api/roles";

const rolesKey = [{ scope: QUERY_KEYS.ROLES }];

export const useAddRole = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => addRole(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: rolesKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
