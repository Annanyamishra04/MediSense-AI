import React, { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { DISEASES } from "../config/diseases";
import { api } from "../api/client";
import AssessmentForm from "../components/AssessmentForm";
import ResultCard from "../components/ResultCard";
import Disclaimer from "../components/Disclaimer";
import { DiseaseIcon } from "../components/icons";
import "./AssessmentDetail.css";

const LOADING_LINES = [
  "Normalizing your inputs…",
  "Running the trained pipeline…",
  "Scoring against the model…",
  "Preparing your result…",
];

export default function AssessmentDetail() {
  const { slug } = useParams();
  const disease = DISEASES[slug];

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [submittedValues, setSubmittedValues] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!disease) return <Navigate to="/assess" replace />;

  const handleSubmit = async (values) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const data = await api[disease.apiFn](values);
      setResult(data);
      setSubmittedValues(values);
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err.details && err.details.length
          ? err.details.join(" ")
          : err.message || "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setSubmittedValues(null);
    setErrorMsg("");
  };

  return (
    <div className="container assess-detail">
      <div className="assess-crumb">
        <Link to="/assess">Assessments</Link> <span>/</span> <span>{disease.name}</span>
      </div>

      {status !== "success" && status !== "loading" && (
        <>
          <div className="assess-heading">
            <span className="assess-heading-icon"><DiseaseIcon icon={disease.icon} size={26} /></span>
            <div>
              <span className="eyebrow">Assessment</span>
              <h1>{disease.name}</h1>
            </div>
          </div>
          <p className="assess-tagline">{disease.tagline}</p>
          <Disclaimer compact />
        </>
      )}

      {status === "error" && (
        <div className="assess-error" role="alert">
          <strong>We couldn't complete that assessment.</strong>
          <p>{errorMsg}</p>
        </div>
      )}

      {status === "loading" && <AnalyzingState disease={disease} />}

      {status !== "success" && status !== "loading" && (
        <div className="card assess-form-card">
          <AssessmentForm disease={disease} onSubmit={handleSubmit} submitting={status === "loading"} />
        </div>
      )}

      {status === "success" && (
        <ResultCard disease={disease} result={result} values={submittedValues} onReset={reset} />
      )}
    </div>
  );
}

function AnalyzingState({ disease }) {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => Math.min(s + 1, LOADING_LINES.length - 1));
    }, 850);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="assess-loading" aria-live="polite">
      <div className="ai-orb">
        <span className="ai-orb-ring" />
        <span className="ai-orb-ring ai-orb-ring--delay" />
        <span className="ai-orb-satellite" />
        <span className="ai-orb-core" />
      </div>
      <p className="ai-loading-title">Analyzing your {disease.name.toLowerCase()} assessment…</p>
      <ul className="ai-loading-steps mono">
        {LOADING_LINES.map((line, i) => (
          <li
            key={line}
            className={i === step ? "ai-step-active" : i < step ? "ai-step-done" : ""}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="ai-step-mark" aria-hidden="true">{i < step ? "✓" : ""}</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
