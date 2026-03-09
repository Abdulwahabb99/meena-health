import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function News() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          News & Announcements
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Company news, updates, and announcements.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default News;
