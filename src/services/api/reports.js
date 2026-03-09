import API from "shared/functions/axios";

export const getUsersReports = async (period = "month") => {
  const res = await API.get(`/api/v1/dashboard/reports/users?period=${period}`);
  return res.data;
};

export const getProductsReports = async (period = "month") => {
  const res = await API.get(
    `/api/v1/dashboard/reports/products?period=${period}`
  );
  return res.data;
};

export const getOrdersReports = async (period = "month") => {
  const res = await API.get(
    `/api/v1/dashboard/reports/orders?period=${period}`
  );
  return res.data;
};
