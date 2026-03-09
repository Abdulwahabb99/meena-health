import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import RolesTable from "./components/RolesTable";

function Permissions() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <RolesTable />
    </DashboardLayout>
  );
}

export default Permissions;
