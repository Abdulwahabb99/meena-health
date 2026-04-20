import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { fetchItems } from "services/api/itemsApi";

export const itemsQueryKey = [{ scope: QUERY_KEYS.ITEMS }] as const;

export function useItemsQuery() {
  return useQuery({
    queryKey: itemsQueryKey,
    queryFn: fetchItems,
    throwOnError: false,
  });
}
