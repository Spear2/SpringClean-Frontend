import { useNavigate } from "react-router-dom";
import useCleaner from "../../Hooks/useCleaner";
export default function CleanerCardComponent({ index, name, loc, rate, img }) {
  const navigate = useNavigate();
 

  const handleBookingClick = () => {
    // Pass selected cleaner data via navigation state
    navigate("/customer/booking", {
      state: { companyCleanerId:index, cleanerName: name, cleanerLocation: loc },
    });
  };

  return (
    <div className="chp-card-container">
      <img src={img} alt={name} className="cleaner-img" />
      <div className="chp-card-content">
        <h2>Company: {name}</h2>
        <p>Location: {loc}</p>
        <p>Ratings: {rate}</p>
        <button className="chp-card-btn" onClick={handleBookingClick}>
          Book Now
        </button>
      </div>
    </div>
  );
}
