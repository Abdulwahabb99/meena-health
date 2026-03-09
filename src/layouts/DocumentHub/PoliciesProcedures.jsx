import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PoliciesProcedures() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Policies & Procedures
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Company policies and procedures.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default PoliciesProcedures;
