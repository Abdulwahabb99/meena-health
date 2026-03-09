import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOrdersReports } from "services/api/reports";
import { getProductsReports } from "services/api/reports";
import { getUsersReports } from "services/api/reports";

export const usersReportsKey = (period) => [
  { scope: QUERY_KEYS.USERS_REPORTS, period },
];

export const productsReportsKey = (period) => [
  { scope: QUERY_KEYS.PRODUCTS_REPORTS, period },
];

export const ordersReportsKey = (period) => [
  { scope: QUERY_KEYS.ORDERS_REPORTS, period },
];

export const useFetchUsersReports = (period = "month") => {
  return useQuery({
    queryKey: usersReportsKey(period),
    queryFn: () => getUsersReports(period),
  });
};

export const useFetchProductsReports = (period = "month") => {
  return useQuery({
    queryKey: productsReportsKey(period),
    queryFn: () => getProductsReports(period),
  });
};

export const useFetchOrdersReports = (period = "month") => {
  return useQuery({
    queryKey: ordersReportsKey(period),
    queryFn: () => getOrdersReports(period),
  });
};
