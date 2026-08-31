# ML Pipeline Documentation

This document explains, honestly and in full, how each of Anvara Health's
four models was built: dataset → cleaning → preprocessing → training →
evaluation → serialization → inference. No step here is invented; every
number is reproducible by running `backend/train_all_models.py`.

## Overview

```
Public dataset (training/data/*.csv)
        │
        ▼
Cleaning (typo/whitespace fixes, missing-value coercion)
        │
        ▼
train_test_split (80/20, stratified, random_state=42)
        │
        ▼
ColumnTransformer
  ├─ numeric columns  → SimpleImputer(median) → StandardScaler
  └─ categorical cols → SimpleImputer(most_frequent) → OneHotEncoder
        │
        ▼
Classifier (RandomForest or LogisticRegression - chosen per model)
        │
        ▼
sklearn Pipeline (preprocessing + model bundled as ONE object)
        │
        ▼
joblib.dump(..., compress=3)  → backend/models/*.joblib
        │
        ▼
Flask API loads each pipeline ONCE at startup (app/services/model_service.py)
        │
        ▼
pipeline.predict(df) / pipeline.predict_proba(df) at request time
```

**The key design decision**: every pipeline bundles its preprocessing and
its model as a single serialized object. This guarantees inference-time
preprocessing is *identical* to training-time preprocessing - there is no
separate encoder/scaler that could be re-fit (or fit differently) at
request time. This directly fixes a real bug found in the original
codebase, where a `LabelEncoder` was re-instantiated and re-fit on every
single incoming request - meaningless on a single-row input, and
inconsistent with whatever encoding the model was actually trained on.

## Per-model details

### Diabetes
- **Dataset**: Pima Indians Diabetes Dataset, 768 records, 8 features, 1 binary target.
- **Source**: public mirror of the standard Pima dataset (originates from the National Institute of Diabetes and Digestive and Kidney Diseases).
- **Model chosen**: Random Forest (150 trees, max depth 6) - outperformed Logistic Regression on this dataset (see `training/legacy_reference` model-comparison notes for both were tried; RF had higher F1).
- **Test metrics**: accuracy 74.0%, precision 65.2%, recall 55.6%, F1 60.0%.

### Heart Disease
- **Dataset**: UCI Heart Disease Dataset (Cleveland subset), 303 records, 13 features.
- **Model chosen**: Random Forest (150 trees, max depth 6).
- **Test metrics**: accuracy 85.2%, precision 80.0%, recall 97.0%, F1 87.7%.
- **Caveat**: test set is only 61 records - these numbers have real statistical uncertainty.

### Liver Disease
- **Dataset**: UCI ILPD (Indian Liver Patient Dataset), 583 records, 10 features.
- **Important documented deviation**: the original project's notebook (`training/notebooks/LiverDiseasePrediction.ipynb`) was written against a different, larger dataset (~30,691 records) hosted on Kaggle (`abhi8923shriv/liver-disease-patient-dataset`). That dataset could not be downloaded in this project's build environment - the sandbox's network access does not extend to Kaggle, and no way was found to obtain it automatically. The UCI ILPD dataset (same feature schema, well-established, 583 real records) was used as an explicit, documented substitute.
- **Model chosen**: Logistic Regression - it had the best F1 score *and* the smallest file size of the three candidates compared (see below), making it the clear choice for a free-tier deployment.
- **Model comparison performed**:

  | Model | Accuracy | Precision | Recall | F1 | Size |
  |---|---|---|---|---|---|
  | RandomForest (4900 trees, original notebook's setting) | 63.2% | 71.7% | 79.5% | 75.4% | 11.7 MB |
  | RandomForest (pruned: 100 trees, depth 8) | 66.7% | 71.6% | 88.0% | 78.9% | 125 KB |
  | **Logistic Regression (chosen)** | **69.2%** | **72.8%** | **90.4%** | **80.6%** | **2.3 KB** |

- **On the original notebook's 99.7% accuracy claim**: that number was produced by a preprocessing bug - the notebook's `LabelEncoder` was fit separately on the test set instead of reusing the encoder fit on the training set, which let information leak between the two. It is not a valid measurement. The numbers in this document come from a corrected, leak-free pipeline.

### Chronic Kidney Disease
- **Dataset**: UCI Chronic Kidney Disease Dataset, 400 records, 24 features (14 numeric, 10 categorical).
- **Model chosen**: Random Forest (150 trees, max depth 6).
- **Test metrics**: accuracy 100%, precision 100%, recall 100%, F1 100%.
- **This is not being presented as proof of real-world accuracy.** This exact, small (400-record), single-hospital dataset is documented in the ML literature as near-linearly separable; many published models trained on it reach 95-100% test accuracy. It reflects the dataset's simplicity, not clinical validation. See `docs/README.md` and the in-app Model Info page for the same caveat.

## Why the original pretrained models were replaced entirely

The project's starting codebase shipped four pretrained model files, pickled
with `scikit-learn==1.2.1` (per its `requirements.txt`). That version does
not build on Python 3.12, which is the default on essentially every current
free-tier hosting platform. Attempting to install it in a fresh Python 3.12
environment fails outright - this is not a configuration problem that can
be worked around, it is a hard compatibility wall. All four models were
therefore retrained from scratch under one consistent, currently-maintained
scikit-learn version (1.4.2, pinned in `backend/requirements.txt`), so the
pickled pipelines are guaranteed loadable wherever that requirements file
is installed.

## Reproducing this pipeline

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python train_all_models.py
```

This regenerates all four `.joblib` files in `backend/models/` with the
exact metrics shown above (fully deterministic - `random_state=42`
throughout).
