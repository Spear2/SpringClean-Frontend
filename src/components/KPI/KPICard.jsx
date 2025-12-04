import React from "react";
import "./KPI.css";

export default function KPICard({ title, info }) {
  return (
    <div className="card-container">
      <h3 className="card-title">{title}</h3>
      <br></br>
      <h2 className="card-info">{info}</h2>
    </div>
  );
}
