import { useState } from "react";
import HomeBar from "../../components/Homebar/HomeBar";
import BookingCard from "../../components/CustomerBookingSummary/BookingCard";
import "./CustomerBookingSummary.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function CustomerBookingSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingBooking = location.state?.newBooking;


  const backHome = () => navigate("/customer/home");

  const [summary, setSummary] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("bookings")) || [];
  return incomingBooking ? [...saved, incomingBooking] : saved;
});


  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const sortBookings = (bookings) => {
    const order = { Pending: 1, Confirmed: 2, Completed: 3 };
    return [...bookings].sort((a, b) => (order[a.status] || 99) - (order[b.status] || 99));
  };

  const filteredBookings = sortBookings(
    summary.filter((item) => (filterStatus === "All" ? true : item.status === filterStatus))
  );

  const getBookingById = (id) => summary.find((b) => b.id === id);

  const parseDateTime = (dateTimeStr) => {
    const [datePart, timePart] = dateTimeStr.split(" - ");
    const dateObj = new Date(datePart);
    return { dateISO: dateObj.toISOString().split("T")[0], timeStr: timePart };
  };

  const formatDateTimeForSave = (dateISO, timeStr) => {
    const dateObj = new Date(dateISO);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateFormatted = dateObj.toLocaleDateString("en-US", options);

    let [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${dateFormatted} - ${hour}:${minuteStr} ${ampm}`;
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = parseInt(hours, 10) + 12;
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleEdit = (id) => {
    const booking = getBookingById(id);
    if (booking) {
      const { dateISO, timeStr } = parseDateTime(booking.date);
      setNewDate(dateISO);
      setNewTime(convertTo24Hour(timeStr));
      setSelectedBookingId(id);
      setShowEditModal(true);
    }
  };

  const saveEdit = () => {
  const newDateTime = formatDateTimeForSave(newDate, newTime);

  setSummary((prev) => {
    const updated = prev.map((b) =>
      b.id === selectedBookingId ? { ...b, date: newDateTime } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updated));
    return updated;
  });

  // Close the modal and reset selected booking
  setShowEditModal(false);
  setSelectedBookingId(null);
};

  const handleViewHistory = (id) => {
    setSelectedBookingId(id);
    setShowHistoryModal(true);
  };

  const handleCancel = (id) => {
    setSelectedBookingId(id);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
  setSummary((prev) => {
    const updated = prev.filter((b) => b.id !== selectedBookingId);
    localStorage.setItem("bookings", JSON.stringify(updated));
    return updated;
  });
};

  const selectedBooking = selectedBookingId ? getBookingById(selectedBookingId) : null;

  return (
    <>
      <HomeBar />
      <div className="main-wrapper">
        <header className="settings-header" style={{ textAlign: "left" }}>
          <button className="btn-back-arrow" onClick={backHome}>←</button>
          <h1>Booking History</h1>
          <p>View and manage all your past and upcoming cleaning bookings in one place.</p>
        </header>

        <div className="booking-summary-container">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="filter">Filter by Status:</label>
              <select
                id="filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="summary-list">
            {filteredBookings.length === 0 ? (
              <p className="no-bookings">No bookings available.</p>
            ) : (
              filteredBookings.map((item) => (
                <BookingCard
                  key={item.id}
                  status={item.status}
                  date={item.date}
                  cleaner={item.cleaner}
                  location={item.address}
                  onEdit={() => handleEdit(item.id)}
                  onCancel={() => handleCancel(item.id)}
                  onViewHistory={() => handleViewHistory(item.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Booking</h2>
            <label>Date:</label>
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <label>Time:</label>
            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            <div className="modal-actions">
              <button className="btn-save" onClick={saveEdit}>Save</button>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Booking Details</h2>
            <p><strong>Cleaner:</strong> {selectedBooking.cleaner}</p>
            <p><strong>Date:</strong> {selectedBooking.date}</p>
            <p><strong>Location:</strong> {selectedBooking.location}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <div className="modal-actions">
              <button className="btn-close" onClick={() => setShowHistoryModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cancel Booking</h2>
            <p>
              Are you sure you want to cancel your booking with{" "}
              <strong>{selectedBooking.cleaner}</strong> on{" "}
              <strong>{selectedBooking.date}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-save" onClick={confirmCancel}>Yes, Cancel</button>
              <button className="btn-close" onClick={() => setShowCancelModal(false)}>No, Go Back</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
