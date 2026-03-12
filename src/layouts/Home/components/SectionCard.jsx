import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

function SectionCard({ children, sx = {}, noPadding, ...rest }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid rgba(140, 86, 255, 0.1)",
        overflow: "hidden",
        bgcolor: "white",
        ...sx,
      }}
      {...rest}
    >
      <MDBox p={noPadding ? 0 : 2} borderRadius={2}>
        {children}
      </MDBox>
    </Card>
  );
}

SectionCard.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
  noPadding: PropTypes.bool,
};

export default SectionCard;
