// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import SummaryPage from "./SummaryPage";

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </div>
  );
}

export default App;
