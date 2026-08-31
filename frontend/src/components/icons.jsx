import React from "react";

// Small, dependency-free icon set. Kept as inline SVG so the bundle stays
// light (no icon library) and every stroke can inherit currentColor.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconDroplet(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M12 2.8c3.4 4.2 6.4 8.1 6.4 11.6a6.4 6.4 0 1 1-12.8 0C5.6 10.9 8.6 7 12 2.8Z" />
    </svg>
  );
}

export function IconHeartPulse(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M12.5 20.2 5.9 13.7a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.1.1.1-.1a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5l-1.2 1.2" />
      <path d="M3.5 13h3l1.6-2.8L9.8 15l1.6-3.4h2.3l1.3 1.8" />
    </svg>
  );
}

export function IconLiver(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M4 12c0-3.6 2.7-6.4 6.6-6.4 2 0 3 .9 4.3.9 2 0 4.6-1.4 5.1.7.4 1.7-1 2.2-1 3.6 0 1.6 1.7 2.1 1.7 4 0 3-3 5.9-8 5.9-5.4 0-8.7-3.7-8.7-8.7Z" />
      <path d="M9 11.2c.9-.7 2-.7 3 0" />
    </svg>
  );
}

export function IconKidney(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M9.2 3.4C6 3.4 4 6.6 4 10.2c0 5 3 9.9 6.7 10.4 2 .3 2.7-1.3 2.4-3-.3-1.7-1.7-2.2-1.7-3.9 0-2.2 2.2-2.6 2.2-5.1 0-3-1.8-5.2-4.4-5.2Z" />
      <path d="M13.6 8.2c1.7.5 2.6 1.9 2.6 3.6" />
    </svg>
  );
}

export function IconScan(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 8.8V7M12 17v-1.8M15.2 12H17M7 12h1.8" />
    </svg>
  );
}

export function IconForm(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" />
    </svg>
  );
}

export function IconCpu(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export function IconReport(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M7 3.5h7.5L19 8v12.5H7z" />
      <path d="M14.5 3.5V8H19" />
      <path d="M9.5 12.5h5M9.5 15.5h5M9.5 18h3" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} {...base} {...props}>
      <path d="M5 12h13.5M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="M12 3.2 19 6v6c0 4.7-3 7.8-7 8.8-4-1-7-4.1-7-8.8V6l7-2.8Z" />
      <path d="M9.2 12.1 11.2 14l3.6-3.9" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 22} height={props.size || 22} {...base} {...props}>
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z" />
      <path d="m3.5 12 8.5 4.6 8.5-4.6M3.5 16.4 12 21l8.5-4.6" />
    </svg>
  );
}

const DISEASE_ICONS = {
  droplet: IconDroplet,
  heart: IconHeartPulse,
  liver: IconLiver,
  kidney: IconKidney,
};

export function DiseaseIcon({ icon, ...rest }) {
  const Cmp = DISEASE_ICONS[icon] || IconDroplet;
  return <Cmp {...rest} />;
}

export function IconAlert(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} {...base} {...props}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4.2M12 17.2v.1" />
    </svg>
  );
}
