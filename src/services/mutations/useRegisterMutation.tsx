import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { registerUserApi } from "services/api/authApi";

export const registerKey = [{ scope: QUERY_KEYS.REGISTER }] as const;

export function useRegisterMutation() {
  return useMutation({
    mutationKey: [...registerKey],
    mutationFn: registerUserApi,
  });
}
