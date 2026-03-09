import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getRoleDetails } from "services/api/roles";

export const roleDetailsKey = (roleId) => [
  { scope: QUERY_KEYS.ROLE_DETAILS, roleId },
];

export const useGetRoleDetails = (roleId) => {
  return useQuery({
    queryKey: roleDetailsKey(roleId),
    queryFn: () => getRoleDetails(roleId),
    enabled: !!roleId,
  });
};
