import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  ActionIconButton,
  SectionHeader,
  LearningPillButton,
  HomeCarousel,
  JobCard,
  EventPanel,
} from "./components";
import {
  QUICK_ACTIONS,
  CAROUSEL_SLIDES,
  JOBS,
  FEATURED_EVENT,
  EVENT_DATE_ITEMS,
  HIGHLIGHTED_CATEGORY,
} from "./data/homeMockData";

function Home() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Page header: Hala to Meena | Event */}
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        p={3}
      >
        <MDTypography variant="h4" fontWeight="bold" color="dark">
          Hala to Meena
        </MDTypography>
        <MDBox display="flex" alignItems="center" gap={1}>
          <Icon sx={{ color: "#8C56FF", fontSize: 24 }}>event</Icon>
          <MDTypography variant="h6" fontWeight="medium" color="dark">
            Event
          </MDTypography>
        </MDBox>
      </MDBox>

      {/* Quick actions + Learning & Development pill (same row) */}
      <MDBox display="flex" alignItems="center" gap={3} flexWrap="wrap" mb={3}>
        {QUICK_ACTIONS.map((action) => (
          <ActionIconButton
            key={action.id}
            icon={action.icon}
            label={action.label}
            onClick={() => {
              if (action.label === "Documents") navigate("/documents");
            }}
          />
        ))}
        <MDBox ml={{ xs: 0, md: 2 }}>
          <LearningPillButton
            label={HIGHLIGHTED_CATEGORY.label}
            icon={HIGHLIGHTED_CATEGORY.icon}
          />
        </MDBox>
      </MDBox>

      <Grid container spacing={3}>
        {/* Left + Center: Carousel and Jobs */}
        <Grid item xs={12} lg={8}>
          {/* Carousel */}
          <MDBox mb={3}>
            <HomeCarousel slides={CAROUSEL_SLIDES} />
          </MDBox>

          {/* Jobs section */}
          <SectionHeader
            title="New Job"
            action={
              <MDBox
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  color: "#831ED2",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                onClick={() => navigate("/departments")}
              >
                Show more
              </MDBox>
            }
          />
          <Grid container spacing={2}>
            {JOBS.map((job) => (
              <Grid item xs={12} sm={6} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right: Event panel */}
        <Grid item xs={12} lg={4}>
          <EventPanel
            featuredEvent={FEATURED_EVENT}
            eventDateItems={EVENT_DATE_ITEMS}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Home;
