import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SectionCard from "./SectionCard";

function EventPanel({ featuredEvent, eventDateItems }) {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};

  return (
    <MDBox>
      <SectionCard sx={{ mb: 2 }} noPadding>
        <MDBox
          p={2}
          sx={{
            "& .fc": {
              "--fc-border-color": meena.border || "rgba(140, 86, 255, 0.15)",
              "--fc-button-bg-color": meena.primary || "#8C56FF",
              "--fc-button-border-color": meena.primary || "#8C56FF",
              "--fc-button-hover-bg-color": meena.secondary || "#6B47F5",
              "--fc-button-hover-border-color": meena.secondary || "#6B47F5",
              "--fc-today-bg-color": meena.hoverBg || "rgba(140, 86, 255, 0.06)",
            },
            "& .fc .fc-day-today .fc-daygrid-day-number": {
              backgroundColor: `${meena.primary || "#8C56FF"} !important`,
              color: "white !important",
              borderRadius: "50% !important",
              width: 28,
              height: 28,
              display: "flex !important",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            },
            "& .fc .fc-button": {
              backgroundColor: `${meena.primary || "#8C56FF"} !important`,
              borderColor: `${meena.primary || "#8C56FF"} !important`,
            },
            "& .fc .fc-button:hover": {
              backgroundColor: `${meena.secondary || "#6B47F5"} !important`,
              borderColor: `${meena.secondary || "#6B47F5"} !important`,
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
        <MDBox
          mb={2}
          sx={{
            p: 1.5,
            borderRadius: 1.5,
            border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.2)"}`,
            bgcolor: "white",
            cursor: "pointer",
          }}
        >
          <MDTypography variant="button" fontWeight="medium" color="dark">
            {featuredEvent.title}
          </MDTypography>
        </MDBox>
      )}

      <MDTypography variant="h6" fontWeight="bold" color="dark" mb={2}>
        Event Date
      </MDTypography>

      <MDBox display="flex" flexDirection="column" gap={1.5}>
        {eventDateItems.map((item) => (
          <SectionCard key={item.id} sx={{ py: 1.5 }}>
            <MDBox display="flex" alignItems="center" gap={1.5}>
              <MDBox
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  minWidth: 32,
                  textAlign: "center",
                }}
              >
                {item.emoji}
              </MDBox>
              <MDTypography variant="body2" color="dark" fontWeight="medium">
                {item.title}
              </MDTypography>
            </MDBox>
          </SectionCard>
        ))}
      </MDBox>
    </MDBox>
  );
}

EventPanel.propTypes = {
  featuredEvent: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    isFeatured: PropTypes.bool,
  }),
  eventDateItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      emoji: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventPanel;
