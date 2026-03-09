import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getAnalyticsProducts } from "services/api/dashboards";

export const analyticsProductsKey = () => [
  { scope: QUERY_KEYS.ANALYTICS_PRODUCTS },
];

export const useGetAnalyticsProducts = () => {
  return useQuery({
    queryKey: analyticsProductsKey(),
    queryFn: () => getAnalyticsProducts(),
  });
};
