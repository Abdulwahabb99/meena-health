import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ActionIconButton({ icon, label, onClick }) {
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
          width: 48,
          height: 48,
          bgcolor: "#F3EEFF",
          color: "#831ED2",
          "&:hover": {
            bgcolor: "rgba(140, 86, 255, 0.12)",
            color: "#6B47F5",
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
