

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IdCell({ id, checked = false }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
