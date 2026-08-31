# MediSense AI Health

An end-to-end machine learning portfolio project: four lightweight,
honestly-evaluated disease-risk screening models (diabetes, heart disease,
liver disease, chronic kidney disease), served by a Flask REST API, with a
React frontend — designed from the ground up for free-tier deployment.

**This is an educational prototype, not a medical device.** See
[Medical Disclaimer](#medical-disclaimer) below.

## Overview

MediSense AI demonstrates a complete, reproducible ML application:
dataset sourcing → cleaning → a single bundled preprocessing+model
`Pipeline` per disease → honest train/test evaluation → a tested REST API
→ a production frontend → free-tier deployment. Every metric shown in the
app is measured, not invented, and every real limitation (small datasets,
a documented dataset substitution, a too-good-to-be-true accuracy score) is
disclosed rather than hidden. See [`docs/ML_PIPELINE.md`](docs/ML_PIPELINE.md)
for the full methodology.

## Problem Statement

Publicly available "AI health" demo projects are common, but most present
their model outputs with false confidence and no transparency about
dataset limitations. This project instead treats transparency as a first
principle: every screening result comes with a confidence score, a plain
explanation, and a link to the model's actual measured accuracy and known
weaknesses.

## Features

- Four independent screening modules with clean, validated input forms.
- Confidence-scored predictions (never a bare "positive"/"negative").
- A dedicated Model Info page showing real accuracy/precision/recall/F1 and
  documented limitations for every model.
- Full input validation and clean error handling (no raw stack traces).
- A single `/api/health` endpoint for uptime checks.
- No paid infrastructure anywhere in the stack.

## Architecture

```
frontend/   React SPA (Create React App) - talks to the backend over REST
backend/    Flask REST API - loads all 4 model pipelines once at startup
training/   Datasets, original notebooks, and the training script
            (NOT deployed to production)
docs/       ML pipeline methodology documentation
```

```
 Browser
   │  fetch()
   ▼
React SPA (Vercel, static hosting)
   │  HTTPS / JSON
   ▼
Flask REST API (Render, free web service)
   │  pipeline.predict() / predict_proba()
   ▼
4 × sklearn Pipeline (~436 KB total, loaded once at startup)
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 6, plain CSS (no framework) |
| Backend | Flask 3, Flask-CORS, Gunicorn |
| ML | scikit-learn 1.4, pandas, joblib |
| Deployment | Vercel (frontend), Render (backend) — both free tier |

## ML Models

| Disease | Algorithm | Dataset | Test Accuracy | Test F1 | Size |
|---|---|---|---|---|---|
| Diabetes | Random Forest | Pima Indians Diabetes (768) | 74.0% | 60.0% | 220 KB |
| Heart Disease | Random Forest | UCI Heart Disease (303) | 85.2% | 87.7% | 143 KB |
| Liver Disease | Logistic Regression | UCI ILPD (583)* | 69.2% | 80.6% | 2.3 KB |
| Chronic Kidney Disease | Random Forest | UCI CKD (400)** | 100%** | 100%** | 62 KB |

**Total production model footprint: ~436 KB** (down from an original 326 MB
liver model alone).

\* *The original project's notebook targeted a different, larger (~30,691-row)
Kaggle dataset that could not be downloaded in this project's build
environment. The UCI ILPD dataset — same feature schema, well-established,
publicly verifiable — was used as a documented substitute. See
[`docs/ML_PIPELINE.md`](docs/ML_PIPELINE.md) for full detail.*

\*\* *100% test accuracy reflects this specific small dataset's
near-linear separability (a documented property in the literature), not
validated real-world performance. See the in-app Model Info page and
`docs/ML_PIPELINE.md`.*

None of these models are medically validated, clinically tested, or
approved for diagnostic use. All were trained and evaluated by this
project's own pipeline — see [`docs/ML_PIPELINE.md`](docs/ML_PIPELINE.md)
for the full, reproducible methodology.

## Dataset Information

All four datasets are small, public, well-established research datasets
(not proprietary or scraped): Pima Indians Diabetes, UCI Heart Disease
(Cleveland), UCI ILPD (Liver), and UCI Chronic Kidney Disease. Raw CSVs
live in `training/data/` and are used only for training — they are not
shipped to the production backend.

## API Documentation

Base path: `/api`

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Returns `{status, models_loaded}` |
| GET | `/api/model-info` | Returns metrics/limitations for all 4 models |
| POST | `/api/diabetes` | Body: `{preg, glu, bp, st, ins, bmi, dpf, age}` |
| POST | `/api/heart` | Body: `{age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal}` |
| POST | `/api/liver` | Body: `{Age, Gender, Total_Bilirubin, Direct_Bilirubin, AAP, SAA_1, SAA_2, Total_Protein, ALB_Albumin, AG_RATIO}` |
| POST | `/api/kidney` | Body: `{age, bp, sg, al, su, rbc, pc, pcc, ba, bgr, bu, sc, sod, pot, hemo, pcv, wc, rc, htn, dm, cad, appet, pe, ane}` |

Every prediction endpoint returns `{result: 0|1, confidence: 0-1, advisory?: [...]}`.
On invalid input, endpoints return `400 {"error": "...", "details": [...]}`.

## Project Structure

```
AI Diagnosis System/
├── render.yaml               # Render Blueprint (repo root - points rootDir at backend/)
├── backend/
│   ├── app/
│   │   ├── routes/         # health, model_info, predict
│   │   ├── services/       # model loading + prediction logic
│   │   ├── schemas/        # request validators
│   │   └── utils/          # advisory text, model metadata
│   ├── models/              # 4 × .joblib pipelines (production artifacts)
│   ├── config.py
│   ├── run.py
│   ├── train_all_models.py  # reproduces backend/models/*.joblib
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/           # Home, Assessments, AssessmentDetail, ModelInfo, About
│   │   ├── components/      # Navbar, Footer, AssessmentForm, ResultCard, ConfidenceGauge, Disclaimer
│   │   ├── config/          # disease field configs, API base URL
│   │   └── api/             # fetch client
│   └── vercel.json
├── training/
│   ├── data/                 # raw CSVs (training-only, not deployed)
│   ├── notebooks/            # original 4 training notebooks (reference)
│   └── legacy_reference/     # original pretrained models, old app.py, old frontend - kept for audit trail only
├── docs/
│   └── ML_PIPELINE.md
└── README.md
```

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python run.py                  # http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local     # set REACT_APP_API_URL=http://localhost:8000
npm start                      # http://localhost:3000
```

## Environment Variables

**Backend** (`backend/.env`):
| Variable | Default | Purpose |
|---|---|---|
| `FLASK_DEBUG` | `false` | Never `true` in production |
| `ALLOWED_ORIGINS` | `*` | Comma-separated allowed frontend origins |
| `PORT` | `8000` | Server port (most hosts set this automatically) |

**Frontend** (`frontend/.env.local`):
| Variable | Purpose |
|---|---|
| `REACT_APP_API_URL` | Full URL of the deployed backend, no trailing slash |

## Testing

Both layers were tested against real, running servers (not just unit stubs):

- **Backend**: all 4 prediction endpoints, `/api/health`, `/api/model-info`,
  invalid/missing-input handling, and model loading, tested against a real
  `gunicorn` process using the exact pinned production dependencies.
- **Integration**: the production React build was served statically
  alongside the real backend, and a genuine cross-origin `fetch()` request
  (matching what the browser performs) was verified, including the CORS
  preflight.
- **Build**: `npm run build` verified to compile cleanly with no errors.

## Deployment

### Backend → Render (free tier)

1. Push this repo to GitHub.
2. On Render: New → Blueprint → connect the repo. Render reads `render.yaml`
   from the repo root and configures the service automatically (root
   directory `backend`, build command `pip install -r requirements.txt`,
   start command `gunicorn -w 1 -b 0.0.0.0:$PORT run:app`, free plan).
   - If you instead create the service manually (New → Web Service) rather
     than via Blueprint, set root directory to `backend` and enter the
     build/start commands above yourself.
3. Set environment variable `ALLOWED_ORIGINS` to your deployed frontend URL once you have it.
4. Deploy. Verify with `curl https://<your-service>.onrender.com/api/health`.

### Frontend → Vercel (free tier)

1. On Vercel: New Project → import the repo, root directory `frontend`.
2. Framework preset: Create React App.
3. Set environment variable `REACT_APP_API_URL` to your Render backend URL.
4. Deploy.

Free-tier note: Render's free web services spin down after inactivity and
take ~30-60 seconds to wake on the next request. This is a real,
user-visible tradeoff of free hosting, not a bug.

## Limitations

- All four models are trained on small (300-800 record) public research
  datasets, not large-scale real-world clinical data.
- The liver model's training data is a documented substitute for the
  originally-intended dataset (see above).
- The kidney model's 100% test accuracy reflects a simple, small dataset,
  not validated real-world performance.
- No models are clinically validated or approved for diagnostic use.
- Free-tier hosting means occasional cold-start latency on the backend.

## Medical Disclaimer

MediSense AI is an educational software engineering project. It is **not**
a medical device, has **not** been clinically validated, and must **never**
be used to diagnose, rule out, or make treatment decisions about any real
medical condition. Always consult a qualified healthcare professional.

## Future Improvements

- Add automated CI (lint + backend pytest suite) on push.
- Add SHAP-based feature-importance explanations where technically valid.
- Expand datasets if larger, appropriately-licensed clinical data becomes accessible.
- Add basic rate limiting to the public API.
