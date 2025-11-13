import React, { useState } from "react";
import "./FirstStep.css";
import RoleButton from "../RoleButton/RoleButton";
import cleanerIcon from "../../../assets/broom.ico";
import customerIcon from "../../../assets/user-solid-full.svg";
import StepJourney from "../Journey/StepJourney";

export default function FirstStep({
  onNext,
  formData,
  updateFormData,
  currentStep,
}) {
  // ⬆️ ADD CURLY BRACES AROUND PROPS!
  const [role, setRole] = useState(formData.role || "");

  const handleNext = () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }
    updateFormData({ role });
    onNext();
  };

  return (
    <div className="form-container">
      <div className="description">
        <h1>Please choose your role:</h1>
        <p>Looking to book or be booked?</p>
      </div>
      <div className="role-buttons">
        <RoleButton
          icon={cleanerIcon}
          label="Cleaner"
          onClick={() => setRole("cleaner")}
          active={role === "cleaner"}
        />

        <RoleButton
          icon={customerIcon}
          label="Customer"
          onClick={() => setRole("customer")}
          active={role === "customer"}
        />
      </div>

      <div>
        <button className="next-button" onClick={handleNext} disabled={!role}>
          Next →
        </button>
      </div>
    </div>
  );
}
