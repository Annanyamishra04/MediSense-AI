import React, { useEffect, useState } from "react";
import { DISEASES } from "../config/diseases";
import { DiseaseIcon, IconLayers } from "../components/icons";
import { api } from "../api/client";
import "./ModelInfo.css";

const METRIC_LABELS = [
  ["accuracy", "Accuracy"],
  ["precision", "Precision"],
  ["recall", "Recall"],
  ["f1", "F1 Score"],
];

export default function ModelInfo() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api.modelInfo()
      .then((d) => {
        if (!d || !d.models) throw new Error("Malformed model-info response");
        setData(d);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="model-info-page">
      <section className="mi-header">
        <div className="hero-bg bg-grid" aria-hidden="true" />
        <div className="container mi-header-inner">
          <span className="eyebrow eyebrow--on-ink">Transparency</span>
          <h1>Model performance & limitations</h1>
          <p className="mi-lede">
            Every number below comes from an actual train/test evaluation performed
            during this project's development — none are estimated or invented.
            Dataset limitations are documented directly, including where a model's
            strong-looking score reflects a simple dataset rather than proven
            real-world accuracy.
          </p>
        </div>
      </section>

      <div className="container mi-body">
      {status === "loading" && (
        <div className="mi-loading">
          <span className="mi-loading-dot" /> Loading model data…
        </div>
      )}
      {status === "error" && <p>Couldn't load model information right now. Please try again shortly.</p>}

      {status === "success" && (
        <>
          <div className="mi-disclaimer"><IconLayers size={18} /> {data.disclaimer}</div>

          <div className="mi-grid">
            {Object.entries(data.models).map(([key, m]) => {
              const diseaseMeta = DISEASES[key] || {};
              return (
                <div className="card mi-card" key={key}>
                  <div className="mi-card-head">
                    <span className="mi-card-icon"><DiseaseIcon icon={diseaseMeta.icon} size={22} /></span>
                    <h2>{m.display_name}</h2>
                  </div>

                  <div className="mi-meta">
                    <span><strong>Algorithm</strong>{m.algorithm}</span>
                    <span>
                      <strong>Dataset</strong>
                      {m.dataset_name}
                      {!/\d[,\d]*\s*records/i.test(m.dataset_name) && ` · ${m.dataset_size} records`}
                    </span>
                    <span><strong>Evaluation</strong>{m.test_split}</span>
                  </div>

                  <div className="mi-metrics">
                    {METRIC_LABELS.map(([key2, label]) => {
                      const pct = m.metrics[key2] * 100;
                      return (
                        <div className="mi-metric" key={key2}>
                          <span className="mi-metric-value mono">{pct.toFixed(1)}<small>%</small></span>
                          <span className="mi-metric-label">{label}</span>
                          <span className="mi-metric-bar"><span style={{ width: `${pct}%` }} /></span>
                        </div>
                      );
                    })}
                  </div>

                  <details className="mi-features">
                    <summary>Model input features ({m.features.length})</summary>
                    <p className="mono">{m.features.join(", ")}</p>
                  </details>

                  <div className="mi-limitations">
                    <h3>Known limitations</h3>
                    <ul>
                      {m.limitations.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      </div>
    </div>
  );
}
