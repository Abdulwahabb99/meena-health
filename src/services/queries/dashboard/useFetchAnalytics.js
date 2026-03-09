import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { getOverviewAnalytics } from "services/api/dashboards";

export const dashboardOverviewKey = (period) => [{ scope: QUERY_KEYS.DASHBOARD_OVERVIEW, period }];

export const useFetchAnalyticsOverview = (period = "month") => {
  return useQuery({
    queryKey: dashboardOverviewKey(period),
    queryFn: () => getOverviewAnalytics(period),
  });
};
