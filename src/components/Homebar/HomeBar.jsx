import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeBar.css";

const HomeBar = () => {
  const [isOpen, setIsOpen] = useState(false); // hamburger menu
  const [accountOpen, setAccountOpen] = useState(false); // account dropdown
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogOut = () => {
    alert("Logged out!");
    setAccountOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    setAccountOpen(false);
    navigate("/customer/profile");
  };

  const handleSettings = () => {
    setAccountOpen(false);
    navigate("/customer/settings");
  };

  return (
    <>
      <nav className="navbar-container">
        <a href="/" className="title-link">
          SpringClean
        </a>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="#services">Services</a>
          <a href="#aboutus">About Us</a>
          <a
            href="#account"
            onClick={(e) => {
              e.preventDefault();
              setAccountOpen(!accountOpen);
            }}
          >
            Account
          </a>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {accountOpen && (
        <div className="dropdown-menu">
          <div className="menu-item" onClick={handleProfile}>
            Profile
          </div>
          <div className="menu-item" onClick={handleSettings}>
            Settings
          </div>
          <div className="menu-item sign-out" onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}
    </>
  );
};

export default HomeBar;
