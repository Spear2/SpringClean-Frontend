import { useState } from "react";
import NavbarCleaner from "../../components/Navbar/NavBarCleaner";
import "../../CleanersStyles/cleanerBookings.css";

export default function CleanerBookings() {
  // Sample booking data (this will be replaced by backend later)
  const [bookings, setBookings] = useState([
    { id: 1, customer: "John Doe", date: "Nov 3, 2025", time: "10:00 AM", duration: "2 hrs", status: "Pending" },
    { id: 2, customer: "Jane Smith", date: "Nov 4, 2025", time: "1:00 PM", duration: "3 hrs", status: "Pending" },
    { id: 3, customer: "Carlos Reyes", date: "Nov 5, 2025", time: "9:00 AM", duration: "1 hr", status: "Pending" },
  ]);

  // Function to handle Accept or Reject
  const handleAction = (id, action) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: action === "accept" ? "Accepted" : "Rejected" } : b
      )
    );
  };


  const handleStatus = (booking)=>{
    if(booking.status === "Accepted"){
      return <em>Johanne Gwapo</em>
    }else{
      return <em>Denn Gwapo</em>
    }
  }

  return (
    <div>
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
                <td>{booking.duration}</td>
                <td>
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === "Pending" ? (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() => handleAction(booking.id, "accept")}
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
                    handleStatus(booking)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
