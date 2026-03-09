import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Home() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Home
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Welcome to Meena Intranet. Quick access to key info and announcements.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
