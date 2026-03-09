import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getPermissions } from "services/api/permissions";

export const permissionsKey = [{ scope: QUERY_KEYS.PERMISSIONS }];

export const useGetPermissions = () => {
  return useQuery({
    queryKey: permissionsKey,
    queryFn: getPermissions,
  });
};
