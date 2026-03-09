import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { deletePermission } from "services/api/permissions";

const permissionsKey = [{ scope: QUERY_KEYS.PERMISSIONS }];

export const useDeletePermission = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ permissionId }) => deletePermission(permissionId),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: permissionsKey });
      onSuccess?.(data, variables, context);
    },

    onError: () => {
      if (onError) onError();
    },
  });
};
