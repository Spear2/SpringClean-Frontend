import { useState } from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerBookings.css";

export default function CleanerBookings() {
  const serviceTypes = {
    Basic: { cleaners: 1, rate: 300 },
    Standard: { cleaners: 2, rate: 400 },
    Premium: { cleaners: 3, rate: 500 },
  };

  // Cleaners WITH employment status
  const loggedInCompany = { id: 10, companyName: "SpringClean" };

  const cleaners = [
    { id: 1, name: "Cleaner 1", employed: true, companyId: 10 },
    { id: 2, name: "Cleaner 2", employed: true, companyId: 10 },
    { id: 3, name: "Cleaner 3", employed: true, companyId: 10 },
    { id: 4, name: "Cleaner 4", employed: true, companyId: 99 }, // works for another company
  ];

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "John Doe",
      date: "Nov 3, 2025",
      time: "10:00 AM",
      duration: "2",
      serviceType: "Basic",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "Nov 4, 2025",
      time: "1:00 PM",
      duration: "3",
      serviceType: "Standard",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Carlos Reyes",
      date: "Nov 5, 2025",
      time: "9:00 AM",
      duration: "1",
      serviceType: "Premium",
      status: "Pending",
    },
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedCleaners, setAssignedCleaners] = useState([]);

  // Convert date + time to a Date object
  const toDateTime = (date, time) => {
    return new Date(`${date} ${time}`);
  };

  // Detect if two time ranges overlap
  const isOverlapping = (startA, endA, startB, endB) => {
    return startA < endB && endA > startB;
  };

  // Check if booking can be accepted based on available cleaners
  const canBook = (serviceType, date, time) => {
    const required = serviceTypes[serviceType].cleaners;

    const bookedCount = bookings.reduce((count, b) => {
      if (b.status !== "Accepted") return count;

      const start = toDateTime(date, time);
      const end = new Date(start.getTime() + required * 60 * 60 * 1000);

      const bStart = toDateTime(b.date, b.time);
      const bEnd = new Date(
        bStart.getTime() + parseInt(b.duration) * 60 * 60 * 1000
      );

      if (isOverlapping(start, end, bStart, bEnd)) {
        return count + (b.cleanersAssigned?.length || 0);
      }

      return count;
    }, 0);

    return bookedCount + required <= cleaners.filter(c => c.employed).length;
  };

  const handleAction = (id, action) => {
    if (action === "reject") {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "Rejected" } : b))
      );
    }
  };

  const handleStatus = (booking) => {
    if (booking.status === "Accepted") {
      return (
        <em>
          Assigned Cleaners: {booking.cleanersAssigned?.join(", ") || "None"}
        </em>
      );
    } else {
      return <em>Denn Gwapo</em>;
    }
  };

  // Check if a cleaner is booked for overlapping time
  const isCleanerBooked = (cleanerId, date, time, duration) => {
    const start = toDateTime(date, time);
    const end = new Date(start.getTime() + parseInt(duration) * 60 * 60 * 1000);

    return bookings.some((b) => {
      if (b.status !== "Accepted") return false;
      if (!b.cleanersAssigned?.includes(cleanerId)) return false;

      const bStart = toDateTime(b.date, b.time);
      const bEnd = new Date(
        bStart.getTime() + parseInt(b.duration) * 60 * 60 * 1000
      );

      return isOverlapping(start, end, bStart, bEnd);
    });
  };

  return (
    <div className="cleaner-bookings-page">
      <NavbarCleaner />
      <div className="bookings-container">
        <h1 className="bookings-title">Booking Requests</h1>

        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => {
                const available = canBook(
                  booking.serviceType,
                  booking.date,
                  booking.time
                );

                return (
                  <tr key={booking.id}>
                    <td>#{booking.id.toString().padStart(3, "0")}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.duration} hrs</td>
                    <td>{booking.serviceType}</td>

                    <td>
                      <span className={`status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      {booking.status === "Pending" ? (
                        available ? (
                          <>
                            <button
                              className="accept-btn"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setAssignedCleaners([]);
                                setShowAssignModal(true);
                              }}
                            >
                              Accept
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() => handleAction(booking.id, "reject")}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <em>No available cleaners</em>
                        )
                      ) : (
                        handleStatus(booking)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLEANER ASSIGNMENT MODAL */}
      {showAssignModal && selectedBooking && (
        <div className="bookings-modal-overlay">
          <div className="bookings-modal">
            <h2>Assign Cleaners</h2>

            <p>
              Service Type: <strong>{selectedBooking.serviceType}</strong>
              <br />
              Required Cleaners:{" "}
              <strong>
                {serviceTypes[selectedBooking.serviceType].cleaners}
              </strong>
            </p>

            <div className="bookings-cleaner-list">
              {cleaners.map((cleaner) => {
                const booked = isCleanerBooked(
                  cleaner.id,
                  selectedBooking.date,
                  selectedBooking.time,
                  selectedBooking.duration
                );

                return (
                  <label key={cleaner.id} className="bookings-cleaner-item">
                    <input
                      type="checkbox"
                      disabled={
                        booked ||
                        !cleaner.employed ||
                        cleaner.companyId !== loggedInCompany.id
                      }
                      checked={assignedCleaners.includes(cleaner.id)}
                      onChange={() => {
                        if (assignedCleaners.includes(cleaner.id)) {
                          setAssignedCleaners(
                            assignedCleaners.filter((id) => id !== cleaner.id)
                          );
                        } else {
                          setAssignedCleaners([...assignedCleaners, cleaner.id]);
                        }
                      }}
                    />

                    {cleaner.name}{" "}
                    {!cleaner.employed
                      ? "(Not Employed)"
                      : cleaner.companyId !== loggedInCompany.id
                      ? "(Not Your Employee)"
                      : booked
                      ? "(Booked)"
                      : ""}
                  </label>
                );
              })}
            </div>

            <div className="bookings-modal-buttons">
              <button
                className="accept-btn"
                disabled={
                  assignedCleaners.length !==
                  serviceTypes[selectedBooking.serviceType].cleaners
                }
                onClick={() => {
                  const required =
                    serviceTypes[selectedBooking.serviceType].cleaners;

                  if (assignedCleaners.length !== required) {
                    return alert(
                      "You must assign the exact number of required cleaners."
                    );
                  }

                  setBookings((prev) =>
                    prev.map((b) =>
                      b.id === selectedBooking.id
                        ? {
                            ...b,
                            status: "Accepted",
                            cleanersAssigned: assignedCleaners,
                          }
                        : b
                    )
                  );

                  setShowAssignModal(false);
                  alert("Booking accepted and cleaners assigned!");
                }}
              >
                Confirm Assignment
              </button>

              <button
                className="reject-btn"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
