import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SectionCard from "./SectionCard";
import EventCard from "./EventCard";

function EventPanel({ featuredEvent, events }) {
  return (
    <MDBox>
      <MDTypography variant="h6" fontWeight="bold" color="dark" mb={2}>
        Event
      </MDTypography>

      <SectionCard sx={{ mb: 2 }} noPadding>
        <MDBox
          p={2}
          sx={{
            "& .fc": {
              "--fc-border-color": "rgba(140, 86, 255, 0.15)",
              "--fc-button-bg-color": "#8C56FF",
              "--fc-button-border-color": "#8C56FF",
              "--fc-button-hover-bg-color": "#6B47F5",
              "--fc-button-hover-border-color": "#6B47F5",
              "--fc-today-bg-color": "rgba(140, 86, 255, 0.08)",
              "--fc-neutral-bg-color": "#F3EEFF",
            },
            "& .fc .fc-button": {
              backgroundColor: "#8C56FF !important",
              borderColor: "#8C56FF !important",
            },
            "& .fc .fc-button:hover": {
              backgroundColor: "#6B47F5 !important",
              borderColor: "#6B47F5 !important",
            },
            "& .fc-toolbar-title": {
              fontSize: "0.95rem !important",
              fontWeight: 600,
              color: "#262626",
            },
            "& .fc-col-header-cell-cushion": {
              color: "#737373",
              fontSize: "0.75rem",
            },
            "& .fc-daygrid-day-number": {
              color: "#525252",
              fontSize: "0.8rem",
            },
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            height="auto"
            events={[]}
          />
        </MDBox>
      </SectionCard>

      {featuredEvent && (
        <MDBox mb={2}>
          <EventCard event={featuredEvent} isFeatured />
        </MDBox>
      )}

      <MDBox display="flex" flexDirection="column" gap={1}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} isFeatured={false} />
        ))}
      </MDBox>
    </MDBox>
  );
}

EventPanel.propTypes = {
  featuredEvent: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isFeatured: PropTypes.bool,
  }),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      isFeatured: PropTypes.bool,
    })
  ).isRequired,
};

export default EventPanel;
