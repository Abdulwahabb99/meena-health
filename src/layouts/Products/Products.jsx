import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import ProductsTable from "./components/ProductsTable";

function Products() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ProductsTable />
    </DashboardLayout>
  );
}

export default Products;
