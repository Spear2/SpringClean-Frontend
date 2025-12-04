import React from "react";
import "../CleanerPages/Styles/CleanerDashboard.css";
import NavBarCompany_Cleaner from "../../components/Navbar/NavBarCompany_Cleaner";
import KPI from "../../components/KPI/KPICard";
import { useAuth } from "../../auth/useAuth";
import useCleaner from "../../Hooks/useCleaner";
import { Link } from "react-router-dom";
import BookingTab from "../../components/BookingTab/BookingTab";

export default function CleanerDashboard() {
  // 1. Define your data list
  const auth = useAuth();
  const cleaner = useCleaner();

  if (!cleaner) return <p>Loading...</p>;

  const kpiData = [
    { title: "Total Earnings", info: "$1,250" },
    { title: "Attendance", info: "95%" },
    { title: "Pending Jobs", info: "3" },
  ];

  return (
    <div className="dashboard-container">
      <NavBarCompany_Cleaner />

      <div className="dashboard-header">
        <h1>Welcome back, {cleaner.cleanerName}</h1>
      </div>

      <div className="kpi-grid">
        {/* 2. Map over the data */}
        {kpiData.map((item, index) => (
          <KPI key={index} title={item.title} info={item.info} />
        ))}
      </div>

      <div className="dashboard-content">
        {/* Additional dashboard content can go here */}
      </div>
    </div>
  );
}
