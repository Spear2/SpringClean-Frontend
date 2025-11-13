import React from "react";
import "./RoleButton.css";

const RoleButton = ({ icon, label, onClick, active }) => {
  return (
    <button className={`role-btn ${active ? "active" : ""}`} onClick={onClick}>
      {icon && <img src={icon} alt={`${label} icon`} className="role-icon" />}
      <span>{label}</span>
    </button>
  );
};

export default RoleButton;
