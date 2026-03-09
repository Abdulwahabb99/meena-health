import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import MDBox from "components/MDBox";
import React, { useState } from "react";
// import { useFetchAnalyticsOverview } from "services/queries/dashboard/useFetchAnalytics";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import { useFetchProductsReports } from "services/queries/reports/fetchReports";
// import { useFetchOrdersReports } from "services/queries/reports/fetchReports";

function ReportsAnalytics() {
  const [period, setPeriod] = useState("month");

  // const { data: overviewAnalytics, isLoading: isLoadingOverviewAnalytics } =
  //   useFetchAnalyticsOverview(period);
  // const { data: productsReports, isLoading: isLoadingProductsReports } =
  //   useFetchProductsReports(period);
  // const { data: ordersReports, isLoading: isLoadingOrdersReports } =
  //   useFetchOrdersReports(period);
  const isLoadingOverviewAnalytics = false;
  const isLoadingProductsReports = false;
  const isLoadingOrdersReports = false;

  const overViewData = {
    totalUsers: 1250,
    recentUsers: 48,
    totalProducts: 340,
    totalCategories: 25,
    totalOrders: 870,
    pendingOrders: 32,
    completedOrders: 790,
    totalRevenue: 125000,
  };
  const products = { activeProductsCount: 310, featuredProductsCount: 45 };
  const orders = {};


  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const periodOptions = [
    { value: "today", label: "اليوم" },
    { value: "week", label: "اسبوع" },
    { value: "month", label: "شهر" },
    { value: "quarter", label: "ربع سنوي" },
    { value: "year", label: "عام" },
  ];


  return (
    <MDBox py={3}>
      <MDBox mb={3}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="period-select-label">فترة التقرير</InputLabel>

            <Select
              labelId="period-select-label"
              id="period-select"
              value={period}
              label="فترة التقرير"
              onChange={handlePeriodChange}
              sx={{
                py: "10px !important",
              }}
            >
              {periodOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي المستخدمين"
              count={overViewData?.totalUsers}
              icon="group"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المستخدمين الجدد"
              count={overViewData?.recentUsers}
              icon="person_add"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الفئات"
              count={overViewData?.totalCategories}
              icon="category"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي المنتجات"
              count={overViewData?.totalProducts}
              icon="shopping_bag"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الفئات"
              count={overViewData?.totalCategories}
              icon="category"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الطلبات"
              count={overViewData?.totalOrders}
              icon="shopping_cart"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المنتجات النشطة"
              count={products?.activeProductsCount}
              icon="check_circle"
              isLoading={isLoadingProductsReports}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="المنتجات المميزة"
              count={products?.featuredProductsCount}
              icon="star"
              isLoading={isLoadingProductsReports}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="الطلبات المعلقة"
              count={overViewData?.pendingOrders}
              icon="pending_actions"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="الطلبات المكتملة"
              count={overViewData?.completedOrders}
              icon="done_all"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <ComplexStatisticsCard
              title="إجمالي الإيرادات"
              count={`${overViewData?.totalRevenue}`}
              icon="attach_money"
              isLoading={isLoadingOverviewAnalytics}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ReportsAnalytics;
