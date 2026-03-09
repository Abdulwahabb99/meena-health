import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import PermissionsTable from "./components/PermissionsTable";

function Permissions() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PermissionsTable />
    </DashboardLayout>
  );
}

export default Permissions;
