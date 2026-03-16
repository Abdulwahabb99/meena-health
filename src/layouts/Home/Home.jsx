import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Home() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <MDBox
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
          }}
        >
          <MDTypography variant="h4" fontWeight="bold" color="dark">
            Hala to Meena
          </MDTypography>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
