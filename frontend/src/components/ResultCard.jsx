import React from "react";
import { Link } from "react-router-dom";
import ConfidenceGauge from "./ConfidenceGauge";
import Disclaimer from "./Disclaimer";
import "./ResultCard.css";

export default function ResultCard({ disease, result, values, onReset }) {
  const positive = result.result === 1;
  const tone = positive ? "amber" : "signal";

  return (
    <div className="result-card card result-reveal">
      <div className="result-top" data-tone={tone}>
        <div>
          <span className={`pill result-pill result-pill--${tone}`}>
            <span className="result-pill-dot" />
            {positive ? "Pattern Detected" : "No Pattern Detected"}
          </span>
          <span className="eyebrow result-eyebrow">{disease.name} · Result</span>
          <h2>{positive ? "Pattern consistent with risk" : "No risk pattern found"}</h2>
          <p className="result-sub">
            {positive
              ? "The model found this input consistent with patterns it associated with disease-positive cases during training."
              : "The model did not find this input consistent with the disease-positive patterns it was trained on."}
          </p>
        </div>
        <div className="gauge-panel" data-tone={tone}>
          <ConfidenceGauge value={result.confidence} tone={tone} label="Model Confidence" />
        </div>
      </div>

      {result.advisory && result.advisory.length > 0 && (
        <div className="result-advisory">
          <h3>What this means</h3>
          <ul>
            {result.advisory.map((note, i) => <li key={i}>{note}</li>)}
          </ul>
        </div>
      )}

      <div className="result-summary">
        <h3>Your Input Summary</h3>
        <div className="summary-grid">
          {disease.fields.map((f) => (
            <div className="summary-item" key={f.name}>
              <span className="summary-label">{f.label}</span>
              <span className="summary-value mono">{String(values[f.name])}</span>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer />

      <div className="result-actions">
        <button className="btn btn-primary" onClick={onReset}>Run Another Assessment</button>
        <Link to="/models" className="btn btn-ghost">See Model Details</Link>
      </div>
    </div>
  );
}
