import { useNavigate } from "react-router-dom";

export default function CleanerCardComponent({ name, loc, rate, img }) {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // Pass selected cleaner data via navigation state
    navigate("/customer/booking", {
      state: { cleanerName: name, cleanerLocation: loc },
    });
  };

  return (
    <div className="card-container">
      <img src={img} alt={name} className="cleaner-img" />
      <div className="card-content">
        <h2>Company: {name}</h2>
        <p>Location: {loc}</p>
        <p>Ratings: {rate}</p>
        <button className="card-btn" onClick={handleBookingClick}>
          Book Now
        </button>
      </div>
    </div>
  );
}
