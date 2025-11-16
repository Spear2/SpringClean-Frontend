import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cleanerName, cleanerLocation } = location.state || {};

  // ✅ formData initialized safely
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    hours: "",
    minutes: "",
    cleaner: cleanerName || "",
    cleanerLocation: cleanerLocation || "",
    address: "", // this is the user's address
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.time) newErrors.time = "Please select a time.";
    if (!formData.hours) newErrors.hours = "Please enter duration in hours.";
    if (!formData.minutes) newErrors.minutes = "Please enter duration in minutes.";
    if (!formData.address) newErrors.address = "Please enter your address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit booking
  const submitBooking = () => {
    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      status: "Pending",
      id: Date.now(),
      date: `${formData.date} - ${formData.time}`, // store as single string
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingData]));

    // Navigate to payment page
    navigate("/customer/payment", { state: { newBooking: bookingData } });
  };

  return (
    <div className="main-wrapper">
      <header className="settings-header">
        <h1>Booking Form</h1>
        <span>Book your cleaning in just a few clicks — we’ll handle the rest!</span>
      </header>

      <div className="form-container">
        <label>
          Selected Cleaner:
          <input type="text" value={formData.cleaner} readOnly />
        </label>

        <label>
          Cleaner’s Location:
          <input type="text" value={formData.cleanerLocation} readOnly />
        </label>

        <label>
          Your Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full home address"
          />
          {errors.address && <p className="error-text">{errors.address}</p>}
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <p className="error-text">{errors.time}</p>}
        </label>

        <label>
          Duration (hrs):
          <input
            type="number"
            name="hours"
            min="1"
            max="12"
            step="1"
            value={formData.hours}
            onChange={handleChange}
            placeholder="Enter hours"
          />
          {errors.hours && <p className="error-text">{errors.hours}</p>}
        </label>

        <label>
          Duration (mins):
          <input
            type="number"
            name="minutes"
            min="0"
            max="59"
            step="5"
            value={formData.minutes}
            onChange={handleChange}
            placeholder="Enter minutes"
          />
          {errors.minutes && <p className="error-text">{errors.minutes}</p>}
        </label>

        <button className="btn-submit" onClick={submitBooking}>
          Submit Booking
        </button>
      </div>
    </div>
  );
}
