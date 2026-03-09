import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOrderDetails } from "services/api/orders";

export const orderDetailsKey = (orderId) => [
  { scope: QUERY_KEYS.ORDER_DETAILS, orderId },
];

export const useFetchOrderDetails = (orderId) => {
  return useQuery({
    queryKey: orderDetailsKey(orderId),
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId,
  });
};
