import React from "react";
import { Link } from "react-router-dom";
import { DISEASE_LIST } from "../config/diseases";
import { DiseaseIcon, IconArrowRight, IconCpu, IconForm, IconReport, IconScan, IconLayers, IconShield } from "../components/icons";
import PulseVisual from "../components/PulseVisual";
import "./Home.css";

const STEPS = [
  { n: "01", t: "Select an assessment", d: "Choose diabetes, heart, liver, or kidney screening based on what you'd like to check.", icon: IconScan },
  { n: "02", t: "Enter health information", d: "Fill in the clinical measurements and lab values the model was trained on.", icon: IconForm },
  { n: "03", t: "The model analyzes the inputs", d: "A dedicated pipeline scales, encodes, and scores your inputs in real time.", icon: IconCpu },
  { n: "04", t: "Receive an assessment result", d: "See the result, the model's confidence, and exactly what was measured.", icon: IconReport },
];

const TRUST_ITEMS = [
  { icon: IconLayers, label: "4 Screening Models", sub: "Diabetes · Heart · Liver · Kidney" },
  { icon: IconCpu, label: "Lightweight ML Pipelines", sub: "Scikit-learn, trained & versioned" },
  { icon: IconScan, label: "Real-Time API", sub: "Inference in under a second" },
  { icon: IconShield, label: "Transparent Evaluation", sub: "Measured metrics, no hidden claims" },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg bg-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow eyebrow--on-ink">AI-Assisted Health Screening</span>
            <h1>See what your health data suggests, before you see a doctor.</h1>
            <p className="hero-lede">
              Anvara Health runs your inputs through four dedicated screening
              models — diabetes, heart, liver, and kidney — and returns a
              clear result with the model's confidence. Every metric is
              measured, every limitation is disclosed, and nothing here is a
              diagnosis.
            </p>
            <div className="hero-actions">
              <Link to="/assess" className="btn btn-primary">
                Start Assessment <IconArrowRight size={16} />
              </Link>
              <a href="#conditions" className="btn btn-ghost">Explore Conditions</a>
            </div>
          </div>
          <div className="hero-visual">
            <PulseVisual variant="hero" />
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip-inner">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
            <div className="trust-item" key={label}>
              <span className="trust-icon"><Icon size={18} /></span>
              <div>
                <span className="trust-label">{label}</span>
                <span className="trust-sub">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container flow-section" id="how-it-works">
        <span className="eyebrow">How it works</span>
        <h2>From your inputs to a scored result</h2>
        <div className="flow-grid">
          {STEPS.map(({ n, t, d, icon: Icon }, i) => (
            <div className="flow-card card" key={n}>
              <div className="flow-card-top">
                <span className="flow-icon"><Icon size={20} /></span>
                <span className="flow-num mono">{n}</span>
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              {i < STEPS.length - 1 && <span className="flow-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section className="container disease-section" id="conditions">
        <span className="eyebrow">Assessments</span>
        <h2>Four screening modules</h2>
        <p className="disease-section-lede">
          Each module is a separate model trained on its own public research
          dataset, wrapped in one consistent, honest experience.
        </p>
        <div className="disease-grid">
          {DISEASE_LIST.map((d) => (
            <Link to={`/assess/${d.slug}`} className="disease-card card" key={d.slug}>
              <span className="disease-card-glow" aria-hidden="true" />
              <span className="disease-icon"><DiseaseIcon icon={d.icon} size={24} /></span>
              <h3>{d.name}</h3>
              <p>{d.tagline}</p>
              <div className="disease-card-foot">
                <span className="disease-meta mono">{d.fields.length} inputs</span>
                <span className="disease-cta">Start assessment <IconArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
