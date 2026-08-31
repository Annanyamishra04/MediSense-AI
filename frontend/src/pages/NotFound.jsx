import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
      <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
      <h1>Page not found</h1>
      <p style={{ marginBottom: 28, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
