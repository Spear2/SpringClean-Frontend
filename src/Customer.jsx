import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerBookingPage from "./pages/CustomerPages/CustomerBookingPage";
import CustomerBookingSummary from "./pages/CustomerPages/CustomerBookingSummary";
import CustomerHomePage from "./pages/CustomerPages/CustomerHomePage";
import CustomerPaymentPage from "./pages/CustomerPages/CustomerPaymentPage";
import CustomerProfilePage from "./pages/CustomerPages/CustomerProfilePage";
import CustomerSettingsPage from "./pages/CustomerPages/CustomerSettingsPage";

export default function Customer() {
  return (
    <Routes>
      <Route path="/" element={<CustomerHomePage />} />
      <Route path="bookings" element={<CustomerBookingPage />} />
      <Route path="summary" element={<CustomerBookingSummary />} />
      <Route path="payments" element={<CustomerPaymentPage />} />
      <Route path="profile" element={<CustomerProfilePage />} />
      <Route path="settings" element={<CustomerSettingsPage />} />
    </Routes>
  );
}
