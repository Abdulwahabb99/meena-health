import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getRoles } from "services/api/roles";

export const rolesKey = [{ scope: QUERY_KEYS.ROLES }];

export const useFetchRoles = () => {
  return useQuery({
    queryKey: rolesKey,
    queryFn: getRoles,
  });
};
