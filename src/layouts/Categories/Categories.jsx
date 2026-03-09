import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import CategoriesTable from "./components/CategoriesTable";

function Categories() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CategoriesTable />
    </DashboardLayout>
  );
}

export default Categories;
