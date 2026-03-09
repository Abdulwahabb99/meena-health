import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Departments() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Departments
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          IT, HR, Nursing, Doctors, Pharmacy, Radiology, Laboratory, and more.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default Departments;
