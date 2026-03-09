import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getSubcategories } from "services/api/categories";
import { getCategoriesTypes } from "services/api/categories";
import { getCategories } from "services/api/categories";

export const categoriesKeyRoot = { scope: QUERY_KEYS.CATEGORIES };
export const categoriesTypesKeyRoot = { scope: QUERY_KEYS.CATEGORIES_TYPES };

export const useFetchCategories = (params = {}) => {
  return useQuery({
    queryKey: [categoriesKeyRoot, params],
    queryFn: () => getCategories(params),
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

export const useFetchSubcategories = () => {
  return useQuery({
    queryKey: [categoriesTypesKeyRoot],
    queryFn: () => getSubcategories(),
    keepPreviousData: true,
    staleTime: 30_000,
  });
};
