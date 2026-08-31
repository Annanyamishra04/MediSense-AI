import React, { useMemo, useState } from "react";
import "./AssessmentForm.css";

function groupFields(fields) {
  const groups = [];
  const bySection = new Map();
  fields.forEach((f) => {
    const section = f.section || "Assessment";
    if (!bySection.has(section)) {
      const group = { section, fields: [] };
      bySection.set(section, group);
      groups.push(group);
    }
    bySection.get(section).fields.push(f);
  });
  return groups;
}

export default function AssessmentForm({ disease, onSubmit, submitting }) {
  const initial = {};
  disease.fields.forEach((f) => {
    initial[f.name] = f.type === "select" ? f.options[0].v : "";
  });
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});

  const groups = useMemo(() => groupFields(disease.fields), [disease]);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const isEmpty = (f) => values[f.name] === "" || values[f.name] === null || values[f.name] === undefined;
  const filledCount = disease.fields.filter((f) => f.type === "select" || !isEmpty(f)).length;
  const totalCount = disease.fields.length;
  const progressPct = Math.round((filledCount / totalCount) * 100);
  const missingFields = disease.fields.filter((f) => f.type !== "select" && isEmpty(f));
  const canSubmit = missingFields.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(disease.fields.map((f) => [f.name, true])));
    if (!canSubmit) return;
    onSubmit(values);
  };

  return (
    <form className="assess-form" onSubmit={handleSubmit} noValidate>
      <div className="assess-progress">
        <div className="assess-progress-track">
          <div className="assess-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="assess-progress-label mono">{filledCount} / {totalCount} fields</span>
      </div>

      {groups.map((group) => (
        <fieldset className="assess-section" key={group.section}>
          <legend>{group.section}</legend>
          <div className="assess-grid">
            {group.fields.map((f) => (
              <div className="field" key={f.name}>
                <label htmlFor={f.name}>
                  {f.label}
                  {f.help && <span className="field-help"> — {f.help}</span>}
                </label>
                {f.type === "select" ? (
                  <select
                    id={f.name}
                    value={values[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  >
                    {f.options.map((o) => (
                      <option key={String(o.v)} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={f.name}
                    type="number"
                    inputMode="decimal"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={values[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    onBlur={() => handleBlur(f.name)}
                    aria-invalid={touched[f.name] && isEmpty(f)}
                    className={touched[f.name] && isEmpty(f) ? "invalid" : ""}
                  />
                )}
                {touched[f.name] && isEmpty(f) && (
                  <span className="field-error">This field is required.</span>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <button type="submit" className="btn btn-primary assess-submit" disabled={submitting}>
        {submitting ? "Running assessment…" : "Run Assessment"}
      </button>
    </form>
  );
}
