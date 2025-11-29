import React from "react";
import { Routes, Route } from "react-router-dom";
import CleanerDashboard from "./pages/CompanyPages/CleanersDashboard";
import CleanerBookings from "./pages/CompanyPages/CleanerBookings";
import CleanerSchedule from "./pages/CompanyPages/CleanersSchedule";
import CleanerPayments from "./pages/CompanyPages/CleanerPayments";
import CleanerProfile from "./pages/CompanyPages/CleanerProfile";

export default function CompanyCleaner() {
  return (
    <Routes>
      <Route path="/" element={<CleanerDashboard />} />
      <Route path="bookings" element={<CleanerBookings />} />
      <Route path="schedule" element={<CleanerSchedule />} />
      <Route path="payments" element={<CleanerPayments />} />
      <Route path="profile" element={<CleanerProfile />} />
    </Routes>
  );
}
