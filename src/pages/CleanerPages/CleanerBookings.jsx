import React from "react";
import "./Styles/CleanerBookings.css";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";

export default function CleanerBookings() {
  const assignedJobs = [
    {
      id: 1,
      customerName: "Sarah Connor",
      date: "Aug 14, 2025",
      time: "09:00 AM - 12:00 PM",
      address: "245 Cyberdyne Ave, Tech District",
      serviceType: "Deep Cleaning",
      price: "$120",
      status: "Upcoming",
      notes: "Please focus on the kitchen grease. The key is under the mat.",
    },
    {
      id: 2,
      customerName: "Bruce Wayne",
      date: "Aug 15, 2025",
      time: "02:00 PM - 04:00 PM",
      address: "1007 Mountain Drive, Gotham Heights",
      serviceType: "Standard Cleaning",
      price: "$85",
      status: "Confirmed",
      notes: "Do not enter the basement. Security alarm code is 1939.",
    },
    {
      id: 3,
      customerName: "Peter Parker",
      date: "Aug 16, 2025",
      time: "10:00 AM",
      address: "20 Ingram St, Queens",
      serviceType: "Move-out Cleaning",
      price: "$150",
      status: "Pending",
      notes: "Apartment is empty. Just need floors and windows done.",
    },
  ];

  return (
    <div className="dashboard-container">
      <NavBarCompany_Cleaner />

      {/* Header aligned with the cards below */}
      <div className="dashboard-header">
        <div>
          <h1>My Assigned Bookings</h1>
        </div>
        <div>
          <h1 style={{ opacity: 0.5 }}>{assignedJobs.length} Jobs Assigned</h1>
        </div>
      </div>

      <div className="booking-list-body">
        {assignedJobs.map((job) => (
          <div key={job.id} className="job-card">
            {/* 1. Header: Date & Status */}
            <div className="job-card-header">
              <div className="job-date">
                <span className="date-text">{job.date}</span>
                <span className="time-text">{job.time}</span>
              </div>
              <span className={`status-badge ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>

            <hr className="divider" />

            {/* 2. Main Details: Address & Service */}
            <div className="job-details-grid">
              <div className="detail-group">
                <label>Location</label>
                <p className="address-text">{job.address}</p>
              </div>

              <div className="detail-group">
                <label>Service Type</label>
                <p className="service-text">{job.serviceType}</p>
              </div>

              <div className="detail-group">
                <label>Customer</label>
                <p>{job.customerName}</p>
              </div>

              <div className="detail-group">
                <label>Payout</label>
                <p className="price-text">{job.price}</p>
              </div>
            </div>

            {/* 3. Footer: Special Instructions */}
            <div className="job-notes">
              <label>Special Instructions:</label>
              <p>"{job.notes}"</p>
            </div>

            {/* Action Buttons */}
            <div className="job-actions">
              <button className="btn-secondary">Decline</button>
              <button className="btn-primary">Start Job</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
