import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useParams } from "react-router-dom";

function DepartmentPage() {
  const { slug } = useParams();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" fontWeight="medium">
          Department: {slug || "Unknown"}
        </MDTypography>
        <MDTypography variant="body2" color="text" mt={1}>
          Department-specific information and resources.
        </MDTypography>
      </MDBox>
    </DashboardLayout>
  );
}

export default DepartmentPage;
