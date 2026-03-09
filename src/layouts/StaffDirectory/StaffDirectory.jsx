import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function StaffDirectory() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Staff Directory
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Names, titles, departments, extensions, locations.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default StaffDirectory;
