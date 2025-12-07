import React, { useState, useEffect } from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, format, startOfWeek, getDay } from "date-fns";
import "../../pages/CompanyPages/CompanyStyles/CompanySchedule.css";
import useCompany from "../../Hooks/useCompany";

export default function CompanySchedule() {
  const company = useCompany();
  const [bookings, setBookings] = useState([]);

  // 1. SETUP LOCALIZER
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // 2. FETCH REAL BOOKINGS
  useEffect(() => {
    if (!company?.companyCleanerId) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/bookings/company/${company.companyCleanerId}/bookings`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error loading schedule:", error);
      }
    };

    fetchBookings();
  }, [company]);

  // 3. CONVERT BOOKINGS TO EVENTS
  const events = bookings.map((b) => {
    // Combine Date + Time strings into a Date Object
    // Assumption: b.date is "YYYY-MM-DD" and b.time is "HH:mm"
    // If your API returns differently, adjust the parsing logic below.
    const start = new Date(`${b.date}T${b.time}`);
    const end = new Date(
      start.getTime() + parseInt(b.hours || 2) * 60 * 60 * 1000
    );

    return {
      id: b.bookingId,
      title: `${b.serviceType} - ${b.customerFirstName} ${b.customerLastName}`,
      start,
      end,
      status: b.status, // We will use this for coloring
      cleaners: b.assignedCleanerNames || [], // Optional: Show who is assigned
    };
  });

  // 4. COLOR CODING LOGIC
  const eventStyleGetter = (event) => {
    let backgroundColor = "#1c4274"; // Default Blue (Pending)

    if (event.status === "Accepted") backgroundColor = "#2e7d32"; // Green
    if (event.status === "Completed") backgroundColor = "#aae858"; // Light Green
    if (event.status === "Rejected") backgroundColor = "#c62828"; // Red

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: 0.9,
        color: event.status === "Completed" ? "#1c4274" : "white", // Text contrast
        border: "0px",
        display: "block",
        fontSize: "12px",
        padding: "4px",
      },
    };
  };

  return (
    <div className="company-schedule-page">
      <NavbarCleaner />

      {/* HEADER (Matches Dashboard Style) */}
      <div className="dashboard-header">
        <div>
          <h1>Schedule</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>View all upcoming jobs.</p>
        </div>
        <div>
          <h1 style={{ fontSize: "1rem", opacity: 0.8 }}>
            {events.length} Events Found
          </h1>
        </div>
      </div>

      <div className="schedule-body">
        <div className="calendar-card">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            views={["month", "week", "day"]}
            defaultView="month"
            eventPropGetter={eventStyleGetter}
            components={{
              event: ({ event }) => (
                <div title={event.title}>
                  <strong>{event.title}</strong>
                  {event.cleaners.length > 0 && (
                    <div
                      style={{
                        fontSize: "10px",
                        marginTop: "2px",
                        opacity: 0.9,
                      }}
                    >
                      {event.cleaners.length} Cleaner(s)
                    </div>
                  )}
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
