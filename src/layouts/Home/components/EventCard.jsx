import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function EventCard({ event, isFeatured }) {
  return (
    <MDBox
      sx={{
        p: 1.5,
        borderRadius: 1.5,
        bgcolor: isFeatured ? "rgba(140, 86, 255, 0.12)" : "transparent",
        border: isFeatured ? "1px solid rgba(140, 86, 255, 0.3)" : "1px solid rgba(140, 86, 255, 0.1)",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(140, 86, 255, 0.06)",
        },
      }}
    >
      <MDTypography
        variant="button"
        fontWeight={isFeatured ? "bold" : "medium"}
        color="dark"
      >
        {event.title}
      </MDTypography>
      <MDTypography variant="caption" color="text" display="block" mt={0.25}>
        {event.date}
      </MDTypography>
    </MDBox>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isFeatured: PropTypes.bool,
  }).isRequired,
  isFeatured: PropTypes.bool,
};

export default EventCard;
