import React from "react";
import "./ConfidenceGauge.css";

// A semicircular instrument dial, styled after an analog gauge, used
// consistently as the one signature visual device across every result
// screen. Ticks mark 0/25/50/75/100%; the needle rotates to the model's
// confidence in its own predicted class.
export default function ConfidenceGauge({ value, tone = "signal", label }) {
  const pct = Math.max(0, Math.min(1, value));
  const angle = -90 + pct * 180; // -90deg (left) to +90deg (right)
  const needleColor = tone === "amber" ? "var(--amber)" : "var(--signal)";

  const ticks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="gauge" role="img" aria-label={`${label}: ${(pct * 100).toFixed(0)} percent`}>
      <svg viewBox="0 0 200 120" className="gauge-svg">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--line)" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={needleColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${pct * 251.2} 251.2`}
        />
        {ticks.map((t) => {
          const a = (-90 + t * 180) * (Math.PI / 180);
          const x1 = 100 + 68 * Math.sin(a);
          const y1 = 100 - 68 * Math.cos(a);
          const x2 = 100 + 78 * Math.sin(a);
          const y2 = 100 - 78 * Math.cos(a);
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line-strong)" strokeWidth="2" />;
        })}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <line x1="100" y1="100" x2="100" y2="34" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="6" fill="var(--ink)" />
      </svg>
      <div className="gauge-readout">
        <span className="gauge-value mono">{(pct * 100).toFixed(1)}%</span>
        <span className="gauge-label">{label}</span>
      </div>
    </div>
  );
}
