import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function HelpSupport() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Help & Support
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          FAQs, contact IT/HR.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default HelpSupport;
