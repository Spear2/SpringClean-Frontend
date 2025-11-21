import React, { useState } from "react";
import "./SecondStep.css";

export default function CompanyForm() {
  const [selectedCompany, setSelectedCompany] = useState("");

  const companies = [
    { id: 1, name: "The Great Wall Cleaning Co." },
    { id: 2, name: "Trump's Cleaning Services" },
    { id: 3, name: "Epstein's Island Cleaners" },
  ];

  return (
    <div className="form-container">
      <div className="description">
        <h1>Company Information</h1>
        <p>Please select your company from the list below.</p>
      </div>

      <div className="form-fields">
        <select
          className="form-input"
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
      </div>

      <div className="button-group">
        <button className="back-button">Back</button>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
}
