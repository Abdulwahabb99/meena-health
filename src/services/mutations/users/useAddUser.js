import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { addUser } from "services/api/user";

const usersKey = [{ scope: QUERY_KEYS.USERS }];

export const useAddUser = ({ onSuccess, onError }) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => addUser(payload),

    onSuccess: (data, variables, context) => {
      qc.invalidateQueries({ queryKey: usersKey });
      onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      onError?.(error, variables, context);
    },
  });
};
