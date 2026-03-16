import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function LearningPillButton({ label, icon = "school", onClick }) {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <MDBox
      component="button"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: "9999px",
        bgcolor: meena.primary || "#8C56FF",
        color: "white",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          bgcolor: meena.secondary || "#6B47F5",
        },
      }}
    >
      <Icon sx={{ fontSize: 20 }}>{icon}</Icon>
      <MDTypography variant="button" fontWeight="medium">
        {label}
      </MDTypography>
    </MDBox>
  );
}

LearningPillButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default LearningPillButton;
