import React, { useState } from "react";
import "./CleanerLoginPage.css";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const CleanerLoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () =>{
    if(!email || !password){
      alert("Please fill the field");
      return;
    }

    const payload = { email, password };

    try{
      const response = await fetch("http://localhost:8080/api/company-cleaners/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if(response.ok) {
        const data = await response.json();
        alert("Login Successfuly", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("cleanerId", data.cleanerId);
        localStorage.setItem("type", "cleaner");

        login({
          id: data.cleanerId,
          token: data.token,
          type: "cleaner",
        });
        
        navigate("/cleaner")
        
      }else{
        const err = await response.json();
        alert(err.message || "Invalid Credentials");
      }
    }catch(error){
      alert("Something is wrong!");

    }
  };

  

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
              value={email}
              placeholder="Enter your username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-footer">
            <button className="login-btn" onClick={handleLogin}>Log In</button>
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
