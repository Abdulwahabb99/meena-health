import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { updateRolePermissions } from "services/api/roles";

export const roleDetailsKey = (roleId) => [
  { scope: QUERY_KEYS.ROLE_DETAILS, roleId },
];

export const useUpdateRolePermissions = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, permissions }) =>
      updateRolePermissions(roleId, permissions),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: roleDetailsKey(variables.roleId) });

      onSuccess?.(data, variables, context);
    },

    onError: (err, variables, context) => {
      console.error("Error updating role permissions", err);
      onError?.(err, variables, context);
    },
  });
};
