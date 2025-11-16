import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import CleanerLoginPage from "./pages/CleanerLoginPage/CleanerLoginPage";
import CustomerLoginPage from "./pages/CustomerLoginPage/CustomerLoginPage";
import ChooseYourRole from "./pages/ChooseYourRole/ChooseYourRole";
import CompanyCleaner from "./CompanyCleaner";
import CustomerHomePage from "./pages/CustomerHomePage/CustomerHomePage";
import CustomerBookingPage from "./pages/CustomerBookingPage/CustomerBookingPage";
import CustomerBookingSummary from "./pages/CustomerBookingSummary/CustomerBookingSummary";
import CustomerPaymentPage from "./pages/CustomerPaymentPage/CustomerPaymentPage";
import CustomerProfilePage from "./pages/CustomerProfilePage/CustomerProfilePage";
import CustomerSettingsPage from "./pages/CustomerSettingsPage/CustomerSettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/login/cleaner" element={<CleanerLoginPage />} />
      <Route path="/login/Customer" element={<CustomerLoginPage />} />
      <Route path="/login/ChooseYourRole" element={<ChooseYourRole />} />
      <Route path="/cleaner/*" element={<CompanyCleaner />} />
      <Route path="/customer/home" element={<CustomerHomePage />} />
      <Route path="/customer/booking" element={<CustomerBookingPage/>}/>
      <Route path="/customer/bookingSummary" element={<CustomerBookingSummary/>}/>
      <Route path="/customer/payment" element={<CustomerPaymentPage/>}/>
      <Route path="/customer/profile" element={<CustomerProfilePage/>}/>
      <Route path="/customer/settings" element={<CustomerSettingsPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
