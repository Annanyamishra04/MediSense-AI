import React from "react";
import { Link } from "react-router-dom";
import { DISEASE_LIST } from "../config/diseases";
import { DiseaseIcon, IconArrowRight, IconLayers, IconForm, IconShield } from "../components/icons";
import Disclaimer from "../components/Disclaimer";
import "./Home.css";
import "./Assessments.css";

export default function Assessments() {
  const totalInputs = DISEASE_LIST.reduce((sum, d) => sum + d.fields.length, 0);

  return (
    <div className="assess-dashboard">
      <section className="assess-dash-header">
        <div className="hero-bg bg-grid" aria-hidden="true" />
        <div className="container assess-dash-header-inner">
          <span className="eyebrow eyebrow--on-ink">Assessments</span>
          <h1>Choose a screening module</h1>
          <p className="assess-dash-lede">
            Each module runs a lightweight, independently trained model. Every
            result includes the model's confidence and a plain-language
            summary — never a diagnosis.
          </p>
          <div className="assess-dash-stats">
            <div className="assess-dash-stat">
              <IconLayers size={16} /> <span><strong>{DISEASE_LIST.length}</strong> screening models</span>
            </div>
            <div className="assess-dash-stat">
              <IconForm size={16} /> <span><strong>{totalInputs}</strong> total input fields</span>
            </div>
            <div className="assess-dash-stat">
              <IconShield size={16} /> <span>Public research datasets only</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container assess-dash-body">
        <Disclaimer compact />
        <div className="disease-grid" style={{ marginTop: 32 }}>
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
      </div>
    </div>
  );
}
