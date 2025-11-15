import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import CleanerLoginPage from "./pages/CleanerLoginPage/CleanerLoginPage";
import CustomerLoginPage from "./pages/CustomerLoginPage/CustomerLoginPage";
import ChooseYourRole from "./pages/ChooseYourRole/ChooseYourRole";
import CompanyCleaner from "./CompanyCleaner";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/login/cleaner" element={<CleanerLoginPage />} />
      <Route path="/login/Customer" element={<CustomerLoginPage />} />
      <Route path="/login/ChooseYourRole" element={<ChooseYourRole />} />
      <Route path="/cleaner/*" element={<CompanyCleaner />} />
    </Routes>
  );
};

export default AppRoutes;
