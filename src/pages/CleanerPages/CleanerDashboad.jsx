import React, { useState } from "react";
import {
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  Calendar,
  User,
  ChevronRight,
} from "lucide-react";
import "../CleanerPages/Styles/CleanerDashboard.css";

export default function CleanerDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");

  // Mock Data
  const stats = [
    {
      label: "Earnings Today",
      value: "$120.00",
      icon: <DollarSign size={24} />,
    },
    { label: "Jobs Completed", value: "3", icon: <CheckCircle size={24} /> },
    { label: "Hours Worked", value: "5.5", icon: <Clock size={24} /> },
  ];

  const upcomingJobs = [
    {
      id: 1,
      client: "Alice Johnson",
      type: "Deep Clean",
      time: "10:00 AM - 1:00 PM",
      address: "452 Maple Avenue, Apt 4B",
      price: "$85.00",
      status: "Upcoming",
    },
    {
      id: 2,
      client: "TechStart Office",
      type: "Standard Office Clean",
      time: "2:30 PM - 4:30 PM",
      address: "101 Tech Blvd, Suite 200",
      price: "$60.00",
      status: "Pending",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar / Mobile Nav */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>
            Clean<span>Co</span>
          </h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            <Calendar size={20} /> Schedule
          </button>
          <button
            className={`nav-item ${activeTab === "earnings" ? "active" : ""}`}
            onClick={() => setActiveTab("earnings")}
          >
            <DollarSign size={20} /> Earnings
          </button>
          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={20} /> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="content-header">
          <div className="header-greeting">
            <h1>Welcome back, Sarah!</h1>
            <p className="hero-subtitle">You have 2 jobs remaining today.</p>
          </div>
          <div className="profile-badge">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              alt="Profile"
            />
          </div>
        </header>

        {/* Quick Stats Row */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="divider"></div>

        {/* Job List Section */}
        <section className="jobs-section">
          <h2 className="section-title">Today's Schedule</h2>

          <div className="jobs-list">
            {upcomingJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <span className="job-time">
                    <Clock size={16} /> {job.time}
                  </span>
                  <span className={`job-status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>

                <div className="job-body">
                  <h3>{job.client}</h3>
                  <p className="job-type">{job.type}</p>
                  <p className="job-address">
                    <MapPin size={16} /> {job.address}
                  </p>
                </div>

                <div className="job-footer">
                  <span className="job-price">{job.price}</span>
                  <button className="service-button small">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Banner */}
        <section className="action-banner">
          <div className="banner-text">
            <h2>Ready for more work?</h2>
            <p>There are 3 new requests in your area.</p>
          </div>
          <button className="book-button">Find Jobs</button>
        </section>
      </main>
    </div>
  );
}
