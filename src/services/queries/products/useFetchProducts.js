import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getCategoriesTypes } from "services/api/categories";
import { getCategories } from "services/api/categories";
import { getProducts } from "services/api/products";

export const productsKeyRoot = { scope: QUERY_KEYS.PRODUCTS };
export const categoriesTypesKeyRoot = { scope: QUERY_KEYS.CATEGORIES_TYPES };

export const useFetchProducts = (params = {}) => {
  return useQuery({
    queryKey: [productsKeyRoot, params],
    queryFn: () => getProducts(params),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};

export const useFetchCategoriesTypes = () => {
  return useQuery({
    queryKey: [categoriesTypesKeyRoot],
    queryFn: () => getCategoriesTypes(),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};
