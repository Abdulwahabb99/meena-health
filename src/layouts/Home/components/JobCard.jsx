import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import SectionCard from "./SectionCard";

function JobCard({ job }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <SectionCard
      sx={{
        "&:hover": {
          borderColor: meena.border || "rgba(140, 86, 255, 0.3)",
          boxShadow: "0 2px 8px rgba(140, 86, 255, 0.1)",
        },
      }}
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
        <MDTypography variant="h6" fontWeight="medium" color="dark">
          {job.title}
        </MDTypography>
        <MDTypography variant="body2" fontWeight="medium" color="dark">
          {job.location}
        </MDTypography>
      </MDBox>

      <MDBox
        component="span"
        sx={{
          display: "inline-block",
          px: 1.5,
          py: 0.5,
          borderRadius: "9999px",
          bgcolor: meena.primary || "#8C56FF",
          color: "white",
          fontSize: "0.75rem",
          fontWeight: 500,
          mb: 1.5,
        }}
      >
        • internal
      </MDBox>

      <MDBox component="ul" sx={{ m: 0, pl: 2.5, mb: 2 }}>
        {job.responsibilities.map((item, idx) => (
          <MDBox
            key={idx}
            component="li"
            sx={{ mb: 0.5, fontSize: "0.875rem", color: "text.main", lineHeight: 1.5 }}
          >
            {item}
          </MDBox>
        ))}
      </MDBox>

      <MDBox display="flex" justifyContent="flex-end">
        <MDButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate("/departments")}
          sx={{
            bgcolor: meena.primary || "#8C56FF",
            "&:hover": { bgcolor: meena.secondary || "#6B47F5" },
          }}
        >
          Apply
        </MDButton>
      </MDBox>
    </SectionCard>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default JobCard;
