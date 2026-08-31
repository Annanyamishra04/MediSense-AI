import React from "react";
import { IconAlert } from "./icons";
import "./Disclaimer.css";

export default function Disclaimer({ compact = false }) {
  return (
    <div className={`disclaimer ${compact ? "compact" : ""}`} role="note">
      <span className="disclaimer-mark" aria-hidden="true"><IconAlert size={14} /></span>
      <p>
        This tool is an educational prototype. It is <strong>not a medical device</strong>,
        has not been clinically validated, and must never be used to diagnose,
        rule out, or make treatment decisions about a real medical condition.
        Always consult a qualified healthcare professional.
      </p>
    </div>
  );
}
