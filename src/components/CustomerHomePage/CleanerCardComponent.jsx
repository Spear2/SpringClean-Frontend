import React from "react";
import { useNavigate } from "react-router-dom";
// The CSS is imported in the parent, but you can import it here if needed
// import "../../CustomersStyles/CustomerHomePage.css";

export default function CleanerCardComponent({
  index,
  name,
  loc,
  rate,
  img,
  desc,
}) {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // Pass selected cleaner data via navigation state
    navigate("/customer/booking", {
      state: {
        companyCleanerId: index,
        cleanerName: name,
        cleanerLocation: loc,
      },
    });
  };

  return (
    <div className="chp-card-container">
      {/* --- VISIBLE CONTENT (Normal State) --- */}
      <img src={img} alt={name} className="cleaner-img" />

      <div className="chp-card-content">
        <h2>{name}</h2>
        <p>📍 {loc}</p>
        <p>⭐ {rate} / 5.0</p>
        {/* Decorative button for the normal view */}
      </div>

      {/* --- HIDDEN OVERLAY (Hover State) --- */}
      <div className="chp-card-overlay">
        <h3>{name}</h3>
        <p>{desc || "Trusted professionals ready to make your home shine."}</p>
        {/* The actual functional button is here now */}
        <button onClick={handleBookingClick}>Book Now</button>
      </div>
    </div>
  );
}
