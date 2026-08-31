import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="nav-brand-text">Medisense<span className="nav-brand-accent">AI</span></span>
          <p className="footer-tagline">
            AI-assisted health screening for diabetes, heart, liver, and kidney
            risk patterns. An educational prototype — not a medical device, not
            clinically validated, and never a substitute for professional care.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-heading">Product</span>
            <Link to="/assess">Assessments</Link>
            <Link to="/models">Model Info</Link>
            <Link to="/about">About</Link>
          </div>
          <div>
            <span className="footer-heading">Conditions</span>
            <Link to="/assess/diabetes">Diabetes</Link>
            <Link to="/assess/heart">Heart Disease</Link>
            <Link to="/assess/liver">Liver Disease</Link>
            <Link to="/assess/kidney">Kidney Disease</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Anvara Health. Educational project only — not for clinical use.</span>
      </div>
    </footer>
  );
}
