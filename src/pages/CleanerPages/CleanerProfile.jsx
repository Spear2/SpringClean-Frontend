import React from "react";
import "../../pages/CleanerPages/Styles/CleanerProfileStyles.css"; // Creating this below
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";
import useCleaner from "../../Hooks/useCleaner";
import { useAuth } from "../../auth/useAuth";

export default function CleanerProfile() {
  const { logout } = useAuth();
  const cleaner = useCleaner();

  // Show loading if cleaner data isn't ready yet
  if (!cleaner) return <div className="loading-text">Loading Profile...</div>;

  // Helper to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="CleanerProfile-container">
      <NavBarCompany_Cleaner />

      <div className="dashboard-header">
        <h1>My Profile</h1>
        <h1>Account</h1>
      </div>

      <div className="profile-body">
        {/* THE MAIN PROFILE CARD */}
        <div className="profile-card">
          {/* 1. Header Section: Avatar & Name */}
          <div className="profile-header-section">
            <div className="profile-avatar">
              {getInitials(cleaner.cleanerName)}
            </div>
            <h2 className="profile-name">{cleaner.cleanerName}</h2>
            <p className="profile-role">Senior Cleaner</p>

            {/* Quick Stats Row */}
            <div className="profile-stats">
              <div className="stat-box">
                <span className="stat-val">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-box">
                <span className="stat-val">124</span>
                <span className="stat-label">Jobs Done</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* 2. Details Section */}
          <div className="profile-details-section">
            <h3 className="section-header">Contact Information</h3>

            <div className="detail-row">
              <label>Email</label>
              <p>johanne@cleaner.com</p>{" "}
              {/* Replace with dynamic email if available */}
            </div>

            <div className="detail-row">
              <label>Phone</label>
              <p>+1 (555) 019-2834</p>
            </div>

            <div className="detail-row">
              <label>Address</label>
              <p>123 Clean Street, Metro City</p>
            </div>
          </div>

          {/* 3. Actions Section */}
          <div className="profile-actions">
            <button className="btn-logout" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
