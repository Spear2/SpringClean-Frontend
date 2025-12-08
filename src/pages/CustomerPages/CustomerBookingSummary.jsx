import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeBar from "../../components/Navbar/NavBarCustomer";
import BookingCard from "../../components/CustomerBookingSummary/BookingCard";
import "../../CustomersStyles/CustomerBookingSummary.css";
import useCustomer from "../../Hooks/useCustomer";

export default function CustomerBookingSummary() {
  const navigate = useNavigate();
  const location = useLocation();

  const customer = useCustomer();
  

  const newBooking = location.state?.newBooking || null;

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

    

  // Fetch bookings from backend
  const fetchBookings = async () => {
    if (!customer || !customer.customerId) return;

    try {
      const res = await fetch(`http://localhost:8080/api/bookings/customers/${customer.customerId}/bookings`);
      if (!res.ok) {
        throw new Error("Network error while fetching bookings");
      }
      const data = await res.json();
      setSummary(data);
      console.log("Status: ", data);


    } catch (error) {
      console.error("Failed to fetch bookings:", error);

    } finally {
      setLoading(false);
    }
  };

  // ---- UPDATE BOOKING ----
  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:8080/api/bookings/${selectedBookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingDate: newDate,
          bookingTime: newTime,
        }),
      });

      fetchBookings();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };


  // ---- CANCEL BOOKING ----
  const confirmCancel = async () => {
    if(!customer || !customer.customerId){
      console.log("Customer ID: ", customer.customerId)
      return;
    }
    try {
      await fetch(`http://localhost:8080/api/bookings/${selectedBookingId}/${customer.customerId}`, {
        method: "DELETE",
      });

      fetchBookings();
      setShowCancelModal(false);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };





  useEffect(() => {
    if (customer && customer.customerId) {
      fetchBookings();
    }
  }, [customer]);

  // If coming from "booking page", refresh list
  // If coming from "booking page", refresh list
  useEffect(() => {
    if (newBooking && customer?.customerId) {
      fetchBookings();
    }
  }, [newBooking, customer]);

  

  
  // UI state
  const [companyCleaner, setCompanyCleaner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const getBookingById = (id) => summary.find((b) => b.bookingId === id);
  if (!customer) return null;

  const formatCleanerName = (cleaner) =>
  cleaner ? `${cleaner.firstName} ${cleaner.lastName}` : "Not Assigned";
  

  // Filter
  const filteredBookings = summary.filter((b) =>
    filterStatus === "All" ? true : b.status === filterStatus
  );
  if (!customer) return <p>Loading customer...</p>;


  if (loading) return <p>Loading bookings...</p>;

  return (
    <>
      <HomeBar />

      <div className="main-wrapper">
        <header className="settings-header" style={{ textAlign: "left" }}>
          <button className="cbc-btn-back-arrow" onClick={() => navigate("/customer")}>←</button>
          <h1>Booking History</h1>
          <p>View and manage all your past and upcoming bookings.</p>
        </header>

        <div className="cbc-booking-summary-container">
          <div className="cbc-filter-container">
            <label>Filter by Status:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Assigned">Assigned</option>
              <option value="In-progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="cbc-summary-list">
            {filteredBookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              filteredBookings.map((item) => (
                <BookingCard
                  key={item.bookingId}
                  status={item.status}
                  date={`${item.date} - ${item.time}`}
                  companyCleaner={item.companyName}
                  cleaner={item.assignedCleanerNames}
                  location={item.address}
                  onEdit={() => {
                    setNewDate(item.bookingDate);
                    setNewTime(item.bookingTime);
                    setSelectedBookingId(item.bookingId);
                    setShowEditModal(true);
                  }}
                  onCancel={() => {
                    setSelectedBookingId(item.bookingId);
                    setShowCancelModal(true);
                  }}

                  onPay={() => navigate("/customer/payments", { state: { newBooking: item } })}
                  onViewHistory={() => {
                    setSelectedBookingId(item.bookingId);
                    setShowHistoryModal(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="cbc-modal-overlay">
          <div className="cbc-modal-content">
            <h2>Edit Booking</h2>

            <label>Date:</label>
            <input 
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)} 
            />

            <label>Time:</label>
            <input 
              type="time" 
              value={newTime} 
              onChange={(e) => setNewTime(e.target.value)} 
            />

            <div className="cbc-modal-actions">
              <button className="cbc-btn-save" onClick={saveEdit}>Save</button>
              <button className="cbc-btn-close" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="cbc-modal-overlay">
          <div className="cbc-modal-content">
            <h2>Cancel Booking?</h2>

            <div className="cbc-modal-actions">
              <button className="cbc-btn-danger" onClick={confirmCancel}>Yes</button>
              <button className="cbc-btn-close" onClick={() => setShowCancelModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
