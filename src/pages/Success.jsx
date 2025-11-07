// src/pages/Success.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        🎉 Form Submitted Successfully!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Thank you for your response. We have recorded your submission.
      </p>
      <Link
        to="/"
        style={{
          padding: "12px 30px",
          backgroundColor: "#fff",
          color: "#2575fc",
          fontWeight: "bold",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
