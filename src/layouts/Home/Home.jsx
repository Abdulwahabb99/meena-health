import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
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
  EVENTS,
  HIGHLIGHTED_CATEGORY,
} from "./data/homeMockData";

function Home() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={3}
        sx={{
          bgcolor: "#F8F7FC",
          minHeight: "100vh",
        }}
      >
        {/* Quick action icons */}
        <MDBox
          display="flex"
          gap={3}
          flexWrap="wrap"
          mb={3}
          sx={{ justifyContent: { xs: "flex-start", md: "flex-start" } }}
        >
          {QUICK_ACTIONS.map((action) => (
            <ActionIconButton
              key={action.id}
              icon={action.icon}
              label={action.label}
              onClick={() => {
                if (action.label === "Jobs") navigate("/departments");
                else if (action.label === "Events") return;
                else if (action.label === "Learning") return;
                else if (action.label === "Documents") navigate("/documents");
                else if (action.label === "Directory") navigate("/staff");
              }}
            />
          ))}
        </MDBox>

        {/* Learning & Development pill button */}
        <MDBox mb={3}>
          <LearningPillButton
            label={HIGHLIGHTED_CATEGORY.label}
            icon={HIGHLIGHTED_CATEGORY.icon}
          />
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
                  View all
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
            <EventPanel featuredEvent={FEATURED_EVENT} events={EVENTS} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
