// src/SummaryPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <div className="page-container">
        <div className="form-card">
          <h1 className="form-title">No Data</h1>
          <p>Looks like you landed here directly. Please fill the form first.</p>
          <button className="submit-btn" onClick={() => navigate("/register")}>
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="form-title">Submitted Details</h1>
        <div className="details-grid">
          <Detail label="First Name" value={formData.firstName} />
          <Detail label="Last Name" value={formData.lastName} />
          <Detail label="Username" value={formData.username} />
          <Detail label="Email" value={formData.email} />
          <Detail
            label="Phone"
            value={`${formData.countryCode} ${formData.phone}`}
          />
          <Detail label="Country" value={formData.country} />
          <Detail label="City" value={formData.city} />
          <Detail label="PAN" value={formData.pan} />
          <Detail label="Aadhaar" value={formData.aadhaar} />
        </div>

        <button
          className="submit-btn"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/register")}
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}
