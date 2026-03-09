import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import UsersTable from "./components/UsersTable";

function Users() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UsersTable />
    </DashboardLayout>
  );
}

export default Users;
