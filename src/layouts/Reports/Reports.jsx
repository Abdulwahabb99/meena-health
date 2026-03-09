import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import ReportsAnalytics from "./components/ReportsAnalytics";

function Reports() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ReportsAnalytics />
    </DashboardLayout>
  );
}

export default Reports;
