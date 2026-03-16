import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ActionIconButton({ icon, label, onClick }) {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <MDBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <IconButton
        sx={{
          width: 56,
          height: 56,
          bgcolor: meena.primary || "#8C56FF",
          color: "white",
          "&:hover": {
            bgcolor: meena.secondary || "#6B47F5",
            color: "white",
          },
        }}
      >
        <Icon>{icon}</Icon>
      </IconButton>
      <MDTypography variant="caption" color="text" fontWeight="medium" mt={0.5}>
        {label}
      </MDTypography>
    </MDBox>
  );
}

ActionIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ActionIconButton;
