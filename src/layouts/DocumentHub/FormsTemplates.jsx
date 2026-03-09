import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function FormsTemplates() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Forms & Templates
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Downloadable forms and document templates.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default FormsTemplates;
