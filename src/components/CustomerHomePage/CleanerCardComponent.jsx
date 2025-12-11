import React from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react"; // Optional: Icon for visual flair

export default function CleanerCardComponent({
  index,
  name,
  loc,
  rate,
  img,
  count,
  cleanerCount, // <--- New Prop for the count
}) {
  const navigate = useNavigate();

  const handleBookingClick = () => {
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
        <span className="stat-rate">Rating ({count} Reviews)</span>
      </div>

      {/* --- HIDDEN OVERLAY (Hover State) --- */}
      <div className="chp-card-overlay">
        <h3>{name}</h3>

        {/* NEW: Cleaner Count Display */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Users size={32} style={{ color: "#aae858", marginBottom: "5px" }} />
          <h1
            style={{
              fontSize: "3.5rem",
              margin: 0,
              color: "#aae858",
              lineHeight: "1",
            }}
          >
            {cleanerCount || 0}
          </h1>
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            Cleaners Available
          </span>
        </div>

        <button onClick={handleBookingClick}>Book Now</button>
      </div>
    </div>
  );
}
