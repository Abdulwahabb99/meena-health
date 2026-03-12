import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SectionCard from "./SectionCard";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <SectionCard
      sx={{
        cursor: "pointer",
        "&:hover": {
          borderColor: "rgba(140, 86, 255, 0.3)",
          boxShadow: "0 2px 8px rgba(140, 86, 255, 0.1)",
        },
      }}
      onClick={() => navigate("/departments")}
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="flex-start">
        <MDBox>
          <MDTypography variant="h6" fontWeight="medium" color="dark">
            {job.title}
          </MDTypography>
          <MDTypography variant="caption" color="text" display="block" mt={0.5}>
            {job.department} • {job.location}
          </MDTypography>
          <MDTypography variant="caption" color="text" display="block" mt={0.25}>
            {job.type} • {job.postedDate}
          </MDTypography>
        </MDBox>
        <Icon sx={{ color: "#831ED2", fontSize: 24 }}>arrow_forward</Icon>
      </MDBox>
    </SectionCard>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    postedDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;
