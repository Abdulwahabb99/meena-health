import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DocumentHub() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Document Hub
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Policies & Procedures, Forms & Templates.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default DocumentHub;
