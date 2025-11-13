import React from "react";
import "./CleanerLoginPage.css";
import { Link } from "react-router-dom";

const CleanerLoginPage = () => {
  return (
    <div className="page-container">
      {/* Left Side */}
      <div className="cleaner-left-side">
        <h1 className="brand-title">SpringClean</h1>
      </div>

      {/* Right Side */}
      <div className="cleaner-right-side">
        <div className="loginform-container">
          <div className="form-header">
            <h1>Cleaner Login</h1>
            <p>Welcome back! Please log in to your account.</p>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <div className="form-footer">
            <button className="login-btn">Log In</button>
            <p className="signup-text">
              Don’t have an account? <Link to="/Register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanerLoginPage;
