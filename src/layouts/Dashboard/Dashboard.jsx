import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import DashboardAnalytics from "./components/DashboardAnalytics/DashboardAnalytics";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DashboardAnalytics />
    </DashboardLayout>
  );
}

export default Dashboard;
