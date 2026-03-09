import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import Charts from "layouts/pages/charts";
import AllProjects from "layouts/pages/profile/all-projects";

function Profile() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <AllProjects />
    </DashboardLayout>
  );
}

export default Profile;
