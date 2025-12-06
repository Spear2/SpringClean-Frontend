import { useState, useEffect } from "react";
import "./Reviews.css";

export default function Review({ cleaners = [], companies = [] }) {
  const [reviewFor, setReviewFor] = useState("company"); // company | cleaner
  const [cleanerId, setCleanerId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("customerReviews")) || [];
  });

  useEffect(() => {
    localStorage.setItem("customerReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    if (text.trim() === "") {
      alert("Please enter your review or complaint.");
      return;
    }

    const newReview = {
      id: Date.now(),
      reviewFor,
      cleanerId: reviewFor === "cleaner" ? cleanerId : null,
      companyId: reviewFor === "company" ? companyId : null,
      rating,
      text,
      file: file ? URL.createObjectURL(file) : null,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);

    // Reset
    setRating(0);
    setText("");
    setFile(null);
    setCleanerId("");
    setCompanyId("");
  };

  return (
    <div className="review-wrapper">

      <header className="review-header">
        <h1>Send a Review or Complaint</h1>
        <span>We value your feedback!</span>
      </header>

      <form className="review-form" onSubmit={handleSubmit}>
        
        {/* Select Company or Cleaner */}
        <select
          className="review-select"
          value={reviewFor}
          onChange={(e) => setReviewFor(e.target.value)}
        >
          <option value="company">Company</option>
          <option value="cleaner">Cleaner</option>
        </select>

        {/* Company Selection */}
        {reviewFor === "company" && (
          <select
            className="review-select"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          >
            <option value="">Select Company</option>
            {companies.map((co) => (
              <option key={co.id} value={co.id}>
                {co.name}
              </option>
            ))}
          </select>
        )}

        {/* Cleaner Selection */}
        {reviewFor === "cleaner" && (
          <select
            className="review-select"
            value={cleanerId}
            onChange={(e) => setCleanerId(e.target.value)}
          >
            <option value="">Select Cleaner</option>
            {cleaners.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        {/* Star Rating */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : ""}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          className="review-text"
          rows="5"
          placeholder="Write your review or complaint..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* File Upload */}
        <label className="attachment-label">
          Attach Image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Submit Button */}
        <button className="review-submit-btn">Submit</button>
      </form>

      {/* Success Message */}
      {submitted && (
        <div className="review-success">
          <p>Thank you! Your review has been submitted.</p>
        </div>
      )}

      {/* Review History */}
      <section className="review-history">
        <h2>Your Previous Reviews</h2>
        {reviews.length === 0 && <p>No reviews submitted yet.</p>}

        {reviews.map((r) => (
          <div className="review-card" key={r.id}>
            
            <div className="review-top">
              <strong>
                {r.reviewFor === "company"
                  ? `Company Review (ID: ${r.companyId})`
                  : `Cleaner Review (ID: ${r.cleanerId})`}
              </strong>

              <span className="review-date">
                {r.date} • {r.time}
              </span>
            </div>

            <div className="review-stars">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>

            <p className="review-text-display">{r.text}</p>

            {r.file && (
              <img src={r.file} alt="attachment" className="review-img" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
