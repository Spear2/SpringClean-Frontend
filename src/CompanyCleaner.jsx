import React from "react";
import { Routes, Route } from "react-router-dom";
import CleanerDashboard from "./pages/CleanersPages/CleanersDashboard";
import CleanerBookings from "./pages/CleanersPages/CleanerBookings";
import CleanerSchedule from "./pages/CleanersPages/CleanersSchedule";
import CleanerPayments from "./pages/CleanersPages/CleanerPayments";
import CleanerProfile from "./pages/CleanersPages/CleanerProfile";

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
