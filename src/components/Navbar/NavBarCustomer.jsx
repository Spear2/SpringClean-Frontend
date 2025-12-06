import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarCustomerStyle.css";
import { useAuth } from "../../auth/useAuth";
import useCustomer from "../../Hooks/useCustomer";

export default function NavBarCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const auth = useAuth();
  const customer = useCustomer();

  if (!customer) return null; // or "Loading..."

  if (!auth.user) return null; // or "Loading..." 

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      <nav className="navbar-container">
        <Link to="/customer" className="title-link">
          SpringClean
        </Link>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/customer">Home</Link>
          <Link to="/customer/reviews">Reviews</Link>
          <Link to="/customer/wallet">Wallet</Link>

          <button className="account-btn" onClick={toggleDropdown}>
            {customer.lastName || "Account"}
          </button>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {dropdownOpen && (
        <div className="dropdown-menu">
          <Link
            to="/customer/profile"
            className="menu-item"
            onClick={() => setDropdownOpen(false)}
          >
            Profile
          </Link>

          <Link
            to="/customer/settings"
            className="menu-item"
            onClick={() => setDropdownOpen(false)}
          >
            Settings
          </Link>

          <div
            className="menu-item sign-out"
            onClick={() => {
              auth.logout();
              setDropdownOpen(false);
            }}
          >
            Log Out
          </div>
        </div>
      )}
    </>
  );
}
