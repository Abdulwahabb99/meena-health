import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function SectionHeader({ title, action }) {
  return (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <MDTypography variant="h6" fontWeight="bold" color="dark">
        {title}
      </MDTypography>
      {action}
    </MDBox>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.node,
};

export default SectionHeader;
