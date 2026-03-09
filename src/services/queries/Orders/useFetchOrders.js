import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOrders } from "services/api/orders";

export const ordersKeyRoot = { scope: QUERY_KEYS.ORDERS };

export const useFetchOrders = (params = {}) => {
  return useQuery({
    queryKey: [ordersKeyRoot, params],
    queryFn: () => getOrders(params),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};
