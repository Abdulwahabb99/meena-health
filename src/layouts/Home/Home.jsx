import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <Grid container spacing={3}>
          {/* Container 1: Main content (left) - first image */}
          <Grid item xs={12} lg={8}>
            <MDBox
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
                height: "100%",
              }}
            >
              <MDTypography variant="h4" fontWeight="bold" color="dark" mb={3}>
                Hala to Meena
              </MDTypography>

              {/* Quick actions + Learning & Development pill */}
              <MDBox
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {" "}
                <MDBox
                  display="flex"
                  alignItems="center"
                  gap={3}
                  flexWrap="wrap"
                  mb={3}
                >
                  {QUICK_ACTIONS.map((action) => (
                    <ActionIconButton
                      key={action.id}
                      icon={action.icon}
                      label={action.label}
                      onClick={() => {
                        if (action.label === "Documents")
                          navigate("/documents");
                      }}
                    />
                  ))}
                </MDBox>
                <MDBox ml={{ xs: 0, md: 2 }}>
                  <LearningPillButton
                    label={HIGHLIGHTED_CATEGORY.label}
                    icon={HIGHLIGHTED_CATEGORY.icon}
                  />
                </MDBox>
              </MDBox>

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
                      color: meena.icon || "#831ED2",
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
            </MDBox>
          </Grid>

          {/* Container 2: Event panel (right) - second image */}
          <Grid item xs={12} lg={4}>
            <MDBox
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
                height: "100%",
              }}
            >
              <MDBox display="flex" alignItems="center" gap={1} mb={2}>
                <Icon sx={{ color: meena.primary || "#8C56FF", fontSize: 24 }}>event</Icon>
                <MDTypography variant="h6" fontWeight="bold" color="dark">
                  Event
                </MDTypography>
              </MDBox>
              <EventPanel
                featuredEvent={FEATURED_EVENT}
                eventDateItems={EVENT_DATE_ITEMS}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
