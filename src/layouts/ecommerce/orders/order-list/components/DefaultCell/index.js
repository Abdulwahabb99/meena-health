

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 3 PRO React components
import MDTypography from "components/MDTypography";

function DefaultCell({ value, suffix = "" }) {
  return (
    <MDTypography variant="caption" fontWeight="medium" color="text-stone-600">
      {value}
      {suffix && (
        <MDTypography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </MDTypography>
      )}
    </MDTypography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  value: PropTypes.string,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DefaultCell;
