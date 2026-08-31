# MediSense AI

An end-to-end ML portfolio project: four disease-risk screening models (diabetes, heart, liver, chronic kidney disease), served by a Flask API, with a React frontend.

**Educational prototype, not a medical device.** See [Medical Disclaimer](#medical-disclaimer).

## 🔗 https://medi-sense-ai-indol.vercel.app/

- **Frontend:** [Add your Vercel link here]
- **Backend API:** [Add your Render link here]

## Features

- 4 independent screening modules with validated input forms
- Confidence-scored predictions with plain-language explanations
- Model Info page showing real accuracy/precision/recall/F1 for every model
- No paid infrastructure — fully free-tier deployable

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 6 |
| Backend | Flask 3, Flask-CORS, Gunicorn |
| ML | scikit-learn 1.4, pandas, joblib |
| Deployment | Vercel (frontend), Render (backend) |

## ML Models

| Disease | Algorithm | Dataset | Test Accuracy | Test F1 |
|---|---|---|---|---|
| Diabetes | Random Forest | Pima Indians Diabetes | 74.0% | 60.0% |
| Heart Disease | Random Forest | UCI Heart Disease | 85.2% | 87.7% |
| Liver Disease | Logistic Regression | UCI ILPD | 69.2% | 80.6% |
| Chronic Kidney Disease | Random Forest | UCI CKD | 100%* | 100%* |

\* *Reflects this small dataset's near-linear separability, not real-world validated performance. Full methodology in [`docs/ML_PIPELINE.md`](docs/ML_PIPELINE.md).*

None of these models are clinically validated or approved for diagnostic use.

## Project Structure
├── backend/ # Flask REST API + trained model pipelines
├── frontend/ # React SPA
├── training/ # Datasets, notebooks, training script (reference only)
└── docs/ # ML methodology


## API Endpoints

Base path: `/api`

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/model-info` | Metrics for all 4 models |
| POST | `/api/diabetes` \| `/api/heart` \| `/api/liver` \| `/api/kidney` | Prediction endpoints |

## Local Setup

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python run.py                # http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local   # set REACT_APP_API_URL=http://localhost:8000
npm start                    # http://localhost:3000
```

## Deployment

- **Backend → Render:** New → Blueprint → connect repo (uses `render.yaml`). Set `ALLOWED_ORIGINS` to your frontend URL.
- **Frontend → Vercel:** New Project → root directory `frontend` → set `REACT_APP_API_URL` to your Render backend URL.

## Limitations

- Small (300-800 record) public research datasets, not large-scale clinical data
- No models are clinically validated
- Free-tier backend has cold-start latency (~30-60s after inactivity)

## Medical Disclaimer

MediSense AI is an educational software engineering project. It is **not** a medical device, has **not** been clinically validated, and must **never** be used to diagnose, rule out, or make treatment decisions about any real medical condition. Always consult a qualified healthcare professional.