export default function BookingCard({
  status,
  date,
  cleaner,
  location,
  onEdit,
  onCancel,
  onViewHistory,
}) {
  return (
    <div className="cbc-summary-card">
      <div className="cbc-booking-info">
        <p><strong>Status:</strong> {status || "Pending"}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Cleaner:</strong> {cleaner}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>

      <div className="cbc-booking-actions">
        {status === "Pending" ? (
          <>
            <button className="cbc-btn-edit" onClick={onEdit}>Edit</button>
            <button className="cbc-btn-cancel" onClick={onCancel}>Cancel</button>
          </>
        ) : status === "Confirmed" || status === "Completed" ? (
          <button className="cbc-btn-view" onClick={onViewHistory}>View History</button>
        ) : (
          <span>Status Unknown</span>
        )}
      </div>
    </div>
  );
}
