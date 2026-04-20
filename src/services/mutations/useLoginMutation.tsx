import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { loginUserApi } from "services/api/authApi";

export const logInKey = [{ scope: QUERY_KEYS.LOG_IN }] as const;

export function useLoginMutation() {
  return useMutation({
    mutationKey: [...logInKey],
    mutationFn: loginUserApi,
  });
}
