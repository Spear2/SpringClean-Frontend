export default function BookingCard({
  status,
  date,
  companyCleaner,
  cleaner,
  location,
  onEdit,
  onCancel,
  onPay,
  onViewHistory,
}) {
  const normalized = status?.trim() || "Pending";

  return (
    <div className="cbc-summary-card">
      <div className="cbc-booking-info">
        <h3>
          Company: <strong>{companyCleaner}</strong>
        </h3>
        <p>
          <strong>Status:</strong> {normalized}
        </p>
        <p>
          <strong>Date:</strong> {date}</p>
        <p>
          <strong>Cleaner:</strong> {cleaner}</p>
        <p>
          <strong>Location:</strong> {location}</p>
      </div>

      <div className="cbc-booking-actions">
        {/* ======================
            PENDING — needs payment
        ======================= */}
        {normalized === "Pending" && (
          <>
            <button className="cbc-btn-pay" onClick={onPay}>Pay Now</button>
            <button className="cbc-btn-cancel" onClick={onCancel}>Cancel</button>
          </>
        )}

        {/* ======================
            PAID — still editable
        ======================= */}
        {normalized === "Paid" && (
          <>
            <button className="cbc-btn-edit" onClick={onEdit}>Edit</button>
            <button className="cbc-btn-cancel" onClick={onCancel}>Cancel</button>
          </>
        )}

        {/* ======================
            ASSIGNED — waiting for cleaner
        ======================= */}
        {normalized === "Assigned" && (
          <>
            <button className="cbc-btn-view" onClick={onViewHistory}>
              View Details
            </button>
          </>
        )}

        {/* ======================
            IN PROGRESS or COMPLETED
        ======================= */}
        {(normalized === "In-progress" || normalized === "Completed") && (
          <button className="cbc-btn-view" onClick={onViewHistory}>
            View History
          </button>
        )}

        {/* ======================
            Unknown fallback
        ======================= */}
        {!["Pending", "Paid", "Assigned", "In-progress", "Completed"].includes(normalized) && (
          <span>Status Unknown</span>
        )}
      </div>
    </div>
  );
}
