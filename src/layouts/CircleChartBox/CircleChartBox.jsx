import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadgeDot from "components/MDBadgeDot";
import PieChart from "examples/Charts/PieChart";

// Data
import channelChartData from "layouts/dashboards/sales/components/ChannelsChart/data";

import { useMaterialUIController } from "context";

function CircleChartBox({ data }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography variant="h6">الطلبات</MDTypography>
        <Tooltip title="الطلبات" placement="bottom" arrow>
          <MDButton
            variant="outlined"
            color="secondary"
            size="small"
            circular
            iconOnly
          >
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={data} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              <MDBox mb={1}>
                <MDBadgeDot
                  color="primary"
                  size="sm"
                  badgeContent="طلبات جديدة"
                />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot
                  color="secondary"
                  size="sm"
                  badgeContent="طلبات قيد المراجعة"
                />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot
                  color="dark"
                  size="sm"
                  badgeContent="طلبات مكتملة"
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default CircleChartBox;
