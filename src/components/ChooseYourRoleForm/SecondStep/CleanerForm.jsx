import React, { useState } from "react";
import "./SecondStep.css";
import ErrorMessage from "./ErrorMessage";

export default function CompanyForm({
  onNext,
  onBack,
  updateFormData,
  formData,
}) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [cleanerName, setCleanerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const companies = [
    { id: 1, name: "The Great Wall Cleaning Co." },
    { id: 2, name: "Trump's Cleaning Services" },
    { id: 3, name: "Epstein's Island Cleaners" },
  ];

  const handleSubmit = () => {
    if (
      !selectedCompany ||
      !cleanerName ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      setError("Please Enter All required fields!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please Enter a valid email address.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("Please enter a valid PH phone number (e.g., 09123456789).");
      return;
    }
  };

  return (
    <div className="form-container">
      <div className="description">
        <h1>Create Cleaner Account</h1>
        <p>Please select your company from the list below.</p>
      </div>

      <div className="form-fields">
        <select
          className="form-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="" disabled>
            Choose a company
          </option>

          {companies.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          value={cleanerName}
          onChange={(e) => setCleanerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}
      <div className="button-group">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <button className="next-button" onClick={handleSubmit}>
          Next →
        </button>
      </div>
    </div>
  );
}
