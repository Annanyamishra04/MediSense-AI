import React from "react";
import { IconShield, IconLayers, IconCpu } from "../components/icons";
import "./About.css";

const STACK = [
  { name: "React", role: "Frontend UI" },
  { name: "Flask", role: "REST API" },
  { name: "scikit-learn", role: "Model training & inference" },
  { name: "Pandas / NumPy", role: "Data processing" },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-header">
        <div className="hero-bg bg-grid" aria-hidden="true" />
        <div className="container about-header-inner">
          <span className="eyebrow eyebrow--on-ink">About This Project</span>
          <h1>What MediSense AI is, and isn't</h1>
          <p className="about-intro">
            MediSense AI is a self-directed machine learning portfolio project.
            It demonstrates a complete pipeline — dataset sourcing, cleaning,
            model training and evaluation, a REST API, and a production frontend
            — for four small disease-risk screening models: diabetes, heart
            disease, liver disease, and chronic kidney disease.
          </p>
        </div>
      </section>

      <div className="container about-body-wrap">
      <div className="about-columns">
        <div className="about-col card about-col--is">
          <span className="about-col-icon"><IconLayers size={20} /></span>
          <h2>What it is</h2>
          <ul>
            <li>A working, end-to-end demonstration of applied ML engineering: reproducible pipelines, honest evaluation, a tested API, and a deployable frontend.</li>
            <li>Built on well-established public research datasets (Pima Diabetes, UCI Heart Disease, UCI ILPD Liver, UCI Chronic Kidney Disease).</li>
            <li>Transparent about every model's real, measured accuracy, precision, recall and F1 — see the <a href="/models">Model Info</a> page.</li>
          </ul>
        </div>

        <div className="about-col card about-col--isnot">
          <span className="about-col-icon"><IconShield size={20} /></span>
          <h2>What it is not</h2>
          <ul>
            <li>Not a medical device. Not FDA-cleared or clinically validated in any way.</li>
            <li>Not trained on large-scale, real-world clinical data — the datasets used are small, public research sets (a few hundred to a few thousand records each).</li>
            <li>Not a diagnostic tool. A prediction from this system is a statistical pattern match against a small training set, not a clinical assessment.</li>
          </ul>
        </div>
      </div>

      <div className="about-body">
        <h2><span className="about-h2-icon"><IconCpu size={18} /></span>Technology</h2>
        <div className="about-stack">
          {STACK.map((s) => (
            <div className="about-stack-item" key={s.name}>
              <span className="about-stack-name mono">{s.name}</span>
              <span className="about-stack-role">{s.role}</span>
            </div>
          ))}
        </div>

        <h2>Known deviations, documented honestly</h2>
        <ul>
          <li>
            The liver disease model was originally intended to use a larger,
            ~30,691-record dataset hosted on Kaggle. That dataset could not be
            downloaded in this project's build environment, so the smaller,
            well-established UCI ILPD dataset (583 records, same feature
            schema) was used instead — a documented substitution, not a hidden one.
          </li>
          <li>
            The original pretrained models that came with this project's
            starting codebase were pickled with an old, unmaintained version
            of scikit-learn that does not install on current Python versions.
            They could not be reliably deployed to any modern free-tier host,
            so all four models were retrained from scratch under one
            consistent, current toolchain.
          </li>
          <li>
            The kidney disease model reaches 100% accuracy on its test split.
            This is a known property of that specific, small, near-linearly
            separable dataset — not evidence of validated real-world
            performance. See the Model Info page for details.
          </li>
        </ul>

        <h2>Why it was built this way</h2>
        <p>
          The goal was a project that could genuinely be explained, feature
          by feature, decision by decision — not a black box. Every
          preprocessing step lives inside a single scikit-learn{" "}
          <code>Pipeline</code> alongside its model, so training-time and
          inference-time preprocessing can never drift apart. Every metric on
          the Model Info page is reproducible from the training script in the
          repository.
        </p>
      </div>
      </div>
    </div>
  );
}
