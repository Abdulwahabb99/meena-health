import API from "shared/functions/axios";

export const getOverviewAnalytics = async (period = "month") => {
  const res = await API.get(`/api/v1/dashboard/reports/overview?period=${period}`);
  return res.data;
};

export const getAnalyticsProducts = async () => {
  const res = await API.get(`/api/v1/dashboard/reports/products`);
  return res.data;
};

