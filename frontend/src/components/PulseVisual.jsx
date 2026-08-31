import React from "react";
import "./PulseVisual.css";

// Anvara Health's signature visual device: a vital-sign waveform that
// resolves into a small graph of connected nodes orbited by a slow
// telemetry ring, standing for "a physiological signal, read by a model."
// Reused at smaller scale as a section divider elsewhere so it reads as
// one continuous idea.
export default function PulseVisual({ variant = "hero" }) {
  const nodes = [
    { x: 300, y: 96 }, { x: 360, y: 60 }, { x: 356, y: 150 },
    { x: 408, y: 104 }, { x: 330, y: 190 }, { x: 420, y: 176 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[2,3]];
  const hub = nodes[0];

  return (
    <div className={`pulse-visual pulse-visual--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 460 220" className="pulse-svg">
        <defs>
          <linearGradient id="pv-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--signal-glow)" stopOpacity="0" />
            <stop offset="18%" stopColor="var(--signal-glow)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--signal-glow)" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="pv-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal-glow)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--signal-glow)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pv-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal-glow)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--signal-glow)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint dot grid */}
        <g className="pv-grid">
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 24 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={4 + c * 20} cy={4 + r * 20} r="1" />
            ))
          )}
        </g>

        {/* soft ambient wash behind the node cluster */}
        <circle cx={hub.x + 55} cy={hub.y + 55} r="120" fill="url(#pv-hub-glow)" className="pv-ambient" />

        {/* slow orbital telemetry ring around the node cluster */}
        <g className="pv-orbit" style={{ transformOrigin: `${hub.x + 55}px ${hub.y + 55}px` }}>
          <circle cx={hub.x + 55} cy={hub.y + 55} r="86" fill="none" stroke="var(--signal-glow)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="1 9" strokeLinecap="round" />
          <circle cx={hub.x + 55 + 86} cy={hub.y + 55} r="2.4" className="pv-orbit-dot" />
        </g>

        {/* connecting edges of the node graph */}
        <g className="pv-edges">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              style={{ animationDelay: `${1.1 + i * 0.09}s` }}
            />
          ))}
        </g>

        {/* the vital-sign waveform, drawing in on load */}
        <path
          className="pv-waveform"
          d="M8 110 H100 L120 110 L132 70 L148 150 L162 40 L178 178 L192 110 L212 110 L226 88 L240 132 L260 110 H300"
          fill="none"
          stroke="url(#pv-line)"
          strokeWidth="2.6"
        />

        {/* node graph, resolving where the waveform ends */}
        <g className="pv-nodes">
          {nodes.map((n, i) => (
            <g key={i} style={{ animationDelay: `${1.2 + i * 0.1}s` }}>
              <circle cx={n.x} cy={n.y} r="16" fill="url(#pv-node-glow)" />
              <circle cx={n.x} cy={n.y} r={i === 0 ? 5 : 3.4} className="pv-node-dot" />
            </g>
          ))}
        </g>
      </svg>

      {variant === "hero" && (
        <div className="pv-panel">
          <span className="pv-panel-dot" />
          <span>Inference pipeline active</span>
        </div>
      )}
    </div>
  );
}
