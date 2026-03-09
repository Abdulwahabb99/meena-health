import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getUsers } from "services/api/user";

export const usersKeyRoot = { scope: QUERY_KEYS.USERS };

export const useFetchUsers = (params = {}) => {
  return useQuery({
    queryKey: [usersKeyRoot, params],
    queryFn: () => getUsers(params),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};
