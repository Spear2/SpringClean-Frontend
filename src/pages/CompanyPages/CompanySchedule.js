import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, format, startOfWeek, getDay } from "date-fns";
import "../../pages/CompanyPages/CompanyStyles/CompanySchedule.css";

export default function CleanersSchedule() {
  const cleaners = ["Cleaner 1", "Cleaner 2", "Cleaner 3", "Cleaner 4"];

  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: "Nov 3, 2025",
      startTime: "10:00",
      endTime: "12:00",
      task: "Office Cleaning",
      cleaner: "Cleaner 1",
    },
    {
      id: 2,
      date: "Nov 4, 2025",
      startTime: "13:00",
      endTime: "16:00",
      task: "Apartment Cleaning",
      cleaner: "Cleaner 2",
    },
    {
      id: 3,
      date: "Nov 5, 2025",
      startTime: "09:00",
      endTime: "10:00",
      task: "Carpet Cleaning",
      cleaner: "Cleaner 3",
    },
  ]);

  // Convert bookings to calendar events
  const events = bookings.map((b) => {
    const start = parse(
      `${b.date} ${b.startTime}`,
      "MMM d, yyyy HH:mm",
      new Date()
    );
    const end = parse(
      `${b.date} ${b.endTime}`,
      "MMM d, yyyy HH:mm",
      new Date()
    );
    return {
      id: b.id,
      title: `${b.task} (${b.cleaner}) ${b.startTime}-${b.endTime}`,
      start,
      end,
      cleaner: b.cleaner,
    };
  });

  const locales = {};
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const colorMap = {
    "Cleaner 1": "#28a745",
    "Cleaner 2": "#007bff",
    "Cleaner 3": "#ffc107",
    "Cleaner 4": "#dc3545",
  };

  // Controlled date state for navigation
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const minDate = new Date(new Date().getFullYear() - 1, 0, 1);
  const maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

  return (
    <div className="cleaner-schedule-page">
      <NavbarCleaner />
      <div className="schedule-container">
        <h1 className="schedule-title">Cleaner Calendar</h1>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView} // <-- controlled view
          onView={(view) => setCurrentView(view)} // <-- updates view
          style={{ height: 700 }}
          views={["month", "week", "day"]}
          min={minDate}
          max={maxDate}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: colorMap[event.cleaner] || "#16ad55ff",
              color: "white",
              borderRadius: "4px",
              border: "none",
              padding: "2px 4px",
            },
          })}
        />
      </div>
    </div>
  );
}
