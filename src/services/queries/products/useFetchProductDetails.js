import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getProductDetails } from "services/api/products";

export const productsKeyRoot = (productId) => [
  { scope: QUERY_KEYS.PRODUCT_DETAILS, productId },
];

export const useFetchProductDetails = (productId) => {
  return useQuery({
    queryKey: productsKeyRoot(productId),
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
  });
};
