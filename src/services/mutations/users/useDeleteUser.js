import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { deleteUser } from "services/api/user";

const usersKey = [{ scope: QUERY_KEYS.USERS }];

export const useDeleteUser = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }) => deleteUser(userId),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: usersKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
