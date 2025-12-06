import { useState, useEffect } from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerBookings.css";
import { useAuth } from "../../auth/useAuth";

export default function CompanyBookings() {
  const serviceTypes = {
    Basic: { cleaners: 1, rate: 300 },
    Standard: { cleaners: 2, rate: 400 },
    Premium: { cleaners: 3, rate: 500 },
  };

  const { user } = useAuth();
  const loggedInCompany = user?.type === "company" ? user : null;

  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedCleaners, setAssignedCleaners] = useState([]);

  /* ==========================
     FETCH BOOKINGS
  ========================== */
  useEffect(() => {
    if (!loggedInCompany) return;

    fetch(`http://localhost:8080/api/bookings/company/${loggedInCompany.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(
          data.map((b) => ({
            id: b.bookingId,
            customer: `${b.customerFirstName || ""} ${b.customerLastName || ""}`,
            date: b.date,
            time: b.time,
            duration: b.hours,
            serviceType: b.serviceType,
            status: b.status,
            cleanersAssigned: b.assignedCleanerIds || [],
          }))
        );
      })
      .catch((err) => console.error("Error loading bookings:", err));
  }, [loggedInCompany]);

  /* ==========================
     FETCH COMPANY CLEANERS
  ========================== */
  useEffect(() => {
    if (!loggedInCompany) return;

    fetch(`http://localhost:8080/api/company-cleaners/${loggedInCompany.id}/cleaners`)
      .then((res) => res.json())
      .then(setCleaners)
      .catch((err) => console.error("Error loading cleaners:", err));
  }, [loggedInCompany]);

  const toDateTime = (date, time) => new Date(`${date} ${time}`);
  const isOverlapping = (startA, endA, startB, endB) =>
    startA < endB && endA > startB;

  /* ==========================
     AVAILABILITY CHECK
  ========================== */
  const canBook = (serviceType, date, time) => {
    if (!cleaners.length) return false;

    const required = serviceTypes[serviceType].cleaners;

    const bookedCount = bookings.reduce((count, b) => {
      if (b.status !== "Accepted") return count;

      const start = toDateTime(date, time);
      const end = new Date(start.getTime() + parseInt(b.duration) * 60 * 60 * 1000);

      const bStart = toDateTime(b.date, b.time);
      const bEnd = new Date(bStart.getTime() + parseInt(b.duration) * 60 * 60 * 1000);

      if (isOverlapping(start, end, bStart, bEnd)) {
        return count + (b.cleanersAssigned?.length || 0);
      }
      return count;
    }, 0);

    return bookedCount + required <= cleaners.filter((c) => c.available).length;
  };

  /* ==========================
     ACCEPT BOOKING
  ========================== */
  const acceptBooking = (bookingId) => {
    fetch(`http://localhost:8080/api/bookings/${bookingId}/accept`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updated) => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: updated.status } : b
          )
        );
        alert("Booking accepted! You may now assign cleaners.");
      })
      .catch((err) => console.error("Error accepting booking:", err));
  };

  /* ==========================
     REJECT BOOKING
  ========================== */
  const handleReject = (bookingId) => {
    fetch(`http://localhost:8080/api/bookings/${bookingId}/reject`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updatedBooking) => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: updatedBooking.status } : b
          )
        );
      })
      .catch((err) => console.error("Error rejecting booking:", err));
  };

  /* ==========================
     ASSIGN CLEANERS
  ========================== */
  const handleAssign = () => {
    fetch(
      `http://localhost:8080/api/bookings/${selectedBooking.id}/assign-cleaners`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanerIds: assignedCleaners }),
      }
    )
      .then((res) => res.json())
      .then((updated) => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking.id
              ? { ...b, cleanersAssigned: updated.assignedCleanerIds }
              : b
          )
        );
        setShowAssignModal(false);
        setAssignedCleaners([]);
        alert("Cleaners assigned successfully!");
      })
      .catch((err) => console.error("Error assigning cleaners:", err));
  };

  const isCleanerBooked = (cleanerId, date, time, duration) => {
    const start = toDateTime(date, time);
    const end = new Date(start.getTime() + parseInt(duration) * 60 * 60 * 1000);

    return bookings.some((b) => {
      if (b.status !== "Accepted") return false;
      if (!b.cleanersAssigned?.includes(cleanerId)) return false;

      const bStart = toDateTime(b.date, b.time);
      const bEnd = new Date(bStart.getTime() + parseInt(b.duration) * 60 * 60 * 1000);

      return isOverlapping(start, end, bStart, bEnd);
    });
  };

  return (
    <div className="cleaner-bookings-page">
      <NavbarCleaner />

      <div className="bookings-container">
        <h1 className="bookings-title">Booking Requests</h1>

        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Service</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id.toString().padStart(3, "0")}</td>
                <td>{booking.customer}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.duration} hrs</td>
                <td>{booking.serviceType}</td>
                <td>{booking.status}</td>

                <td>
                  {booking.status?.trim().toLowerCase() === "pending" && (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() => acceptBooking(booking.id)}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => handleReject(booking.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status?.trim().toLowerCase() === "accepted" &&
                    (booking.cleanersAssigned?.length === 0 ? (
                      <button
                        className="assign-btn"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setAssignedCleaners([]);
                          setShowAssignModal(true);
                        }}
                      >
                        Assign
                      </button>
                    ) : (
                      <em className="assigned">Assigned</em>
                    ))}

                  {booking.status?.trim().toLowerCase() === "rejected" && (
                    <em className="rejected">Rejected</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================
         ASSIGN MODAL
      ========================== */}
      {showAssignModal && selectedBooking && (
        <div className="bookings-modal-overlay">
          <div className="bookings-modal">
            <h2>Assign Cleaners</h2>
            <p>
              Select exactly {serviceTypes[selectedBooking.serviceType].cleaners} cleaner(s)
            </p>

            <div className="bookings-cleaner-list">
              {cleaners.map((cleaner) => {
                const booked = isCleanerBooked(
                  cleaner.cleanerId,
                  selectedBooking.date,
                  selectedBooking.time,
                  selectedBooking.duration
                );

                const maxSelected =
                  assignedCleaners.length >=
                  serviceTypes[selectedBooking.serviceType].cleaners;

                return (
                  <div className="bookings-cleaner-item" key={cleaner.cleanerId}>
                    <label>
                      <input
                        type="checkbox"
                        disabled={
                          booked ||
                          !cleaner.available ||
                          (!assignedCleaners.includes(cleaner.cleanerId) &&
                            maxSelected)
                        }
                        checked={assignedCleaners.includes(cleaner.cleanerId)}
                        onChange={() => {
                          if (assignedCleaners.includes(cleaner.cleanerId)) {
                            setAssignedCleaners(
                              assignedCleaners.filter(
                                (id) => id !== cleaner.cleanerId
                              )
                            );
                          } else {
                            setAssignedCleaners([
                              ...assignedCleaners,
                              cleaner.cleanerId,
                            ]);
                          }
                        }}
                      />
                      <span>
                        {cleaner.cleanerName} {booked ? "(Booked)" : ""}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="bookings-modal-buttons">
              <button
                className="accept-btn"
                onClick={handleAssign}
                disabled={
                  assignedCleaners.length !==
                  serviceTypes[selectedBooking.serviceType].cleaners
                }
              >
                Confirm Assignment
              </button>

              <button
                className="reject-btn"
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignedCleaners([]);
                }}
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
