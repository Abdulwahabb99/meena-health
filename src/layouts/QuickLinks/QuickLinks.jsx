import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function QuickLinks() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Quick Links
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          HIS, Ticketing, Outlook, ERP, and other internal tools.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default QuickLinks;
