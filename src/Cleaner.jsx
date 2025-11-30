import React from "react";
import { Routes, Route } from "react-router-dom";
import CleanerDashboad from "./pages/CleanerPages/CleanerDashboad";
import CleanerBookings from "./pages/CleanerPages/CleanerBookings";
import CleanerSchedule from "./pages/CleanerPages/CleanerSchedule";
import CleanerPayments from "./pages/CleanerPages/CleanerPayments";
import CleanerProfile from "./pages/CompanyPages/CompanyProfile";

export default function Cleaner() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CleanerDashboad />} />
        <Route path="bookings" element={<CleanerBookings />} />
        <Route path="schedule" element={<CleanerSchedule />} />
        <Route path="payments" element={<CleanerPayments />} />
        <Route path="profile" element={<CleanerProfile />} />
      </Routes>
    </div>
  );
}
 