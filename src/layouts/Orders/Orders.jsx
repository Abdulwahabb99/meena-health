import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import OrderTable from "./components/OrderTable";

function Orders() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OrderTable />
    </DashboardLayout>
  );
}

export default Orders;
