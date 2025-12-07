import React, { useState, useEffect } from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../pages/CompanyPages/CompanyStyles/CompanyBookings.css";
import { useAuth } from "../../auth/useAuth";

export default function CompanyBookings() {
  const serviceTypes = {
    Basic: { cleaners: 1, rate: 300 },
    Standard: { cleaners: 2, rate: 400 },
    Premium: { cleaners: 3, rate: 500 },
  };

  const { user } = useAuth();
  // Ensure we handle the user object correctly depending on how your auth returns it
  const loggedInCompany = user?.type === "company" ? user : user;

  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedCleaners, setAssignedCleaners] = useState([]);

  /* ==========================
      FETCH BOOKINGS
  ========================== */
  useEffect(() => {
    if (!loggedInCompany?.id) return;

    fetch(`http://localhost:8080/api/bookings/company/${loggedInCompany.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(
          data.map((b) => ({
            id: b.bookingId,
            customer: `${b.customerFirstName || ""} ${
              b.customerLastName || ""
            }`,
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
    if (!loggedInCompany?.id) return;

    fetch(
      `http://localhost:8080/api/company-cleaners/${loggedInCompany.id}/cleaners`
    )
      .then((res) => res.json())
      .then(setCleaners)
      .catch((err) => console.error("Error loading cleaners:", err));
  }, [loggedInCompany]);

  const toDateTime = (date, time) => new Date(`${date} ${time}`);

  const isOverlapping = (startA, endA, startB, endB) =>
    startA < endB && endA > startB;

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

  /* ==========================
      ACTIONS
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

  return (
    <div className="company-bookings-page">
      <NavbarCleaner />

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Booking Management</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>
            Manage requests and assign cleaners.
          </p>
        </div>
        <div>
          <h1 style={{ fontSize: "1rem", opacity: 0.8 }}>
            {bookings.length} Total Requests
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bookings-body">
        <div className="table-card">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={{ fontWeight: "bold" }}>#{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>
                      <div>{booking.date}</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {booking.time}
                      </div>
                    </td>
                    <td>{booking.duration} hrs</td>
                    <td>{booking.serviceType}</td>
                    <td>
                      <span
                        className={`status-badge ${booking.status?.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {/* PENDING ACTIONS */}
                      {booking.status?.trim().toLowerCase() === "pending" && (
                        <div className="action-buttons">
                          <button
                            className="btn-accept"
                            onClick={() => acceptBooking(booking.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleReject(booking.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* ACCEPTED ACTIONS (Assign) */}
                      {booking.status?.trim().toLowerCase() === "accepted" &&
                        (booking.cleanersAssigned?.length === 0 ? (
                          <button
                            className="btn-assign"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setAssignedCleaners([]);
                              setShowAssignModal(true);
                            }}
                          >
                            Assign Cleaners
                          </button>
                        ) : (
                          <span className="assigned-label">
                            Cleaners Assigned
                          </span>
                        ))}

                      {/* REJECTED LABEL */}
                      {booking.status?.trim().toLowerCase() === "rejected" && (
                        <span className="rejected-label">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", padding: "30px" }}
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================
           ASSIGN MODAL
      ========================== */}
      {showAssignModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Assign Cleaners</h2>
              <p>
                Service: <strong>{selectedBooking.serviceType}</strong> <br />
                Required:{" "}
                <strong>
                  {serviceTypes[selectedBooking.serviceType]?.cleaners || 1}
                </strong>{" "}
                cleaner(s)
              </p>
            </div>

            <div className="cleaner-selection-list">
              {cleaners.map((cleaner) => {
                const booked = isCleanerBooked(
                  cleaner.cleanerId,
                  selectedBooking.date,
                  selectedBooking.time,
                  selectedBooking.duration
                );

                const requiredCount =
                  serviceTypes[selectedBooking.serviceType]?.cleaners || 1;
                const isSelected = assignedCleaners.includes(cleaner.cleanerId);
                const isFull = assignedCleaners.length >= requiredCount;

                return (
                  <label
                    key={cleaner.cleanerId}
                    className={`cleaner-option ${
                      isSelected ? "selected" : ""
                    } ${booked ? "disabled" : ""}`}
                  >
                    <input
                      type="checkbox"
                      disabled={booked || (!isSelected && isFull)}
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
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
                    <div className="cleaner-info">
                      <span className="cleaner-name">
                        {cleaner.cleanerName}
                      </span>
                      {booked && <span className="cleaner-status">Booked</span>}
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignedCleaners([]);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={handleAssign}
                disabled={
                  assignedCleaners.length !==
                  (serviceTypes[selectedBooking.serviceType]?.cleaners || 1)
                }
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
