"""
Retrains all four lightweight pipelines under the exact scikit-learn
version pinned in requirements.txt, so the pickled pipelines are
guaranteed to load correctly in production. Run with the venv that has
requirements.txt installed:

    /path/to/venv/bin/python backend/train_all_models.py

Datasets live in ../data (training-only, not shipped to production).
Outputs go to backend/models/*.joblib (the only ML artifacts deployed).
"""
import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "training", "data")
OUT_DIR = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(OUT_DIR, exist_ok=True)


def report(name, y_test, preds, pos_label=1):
    acc = accuracy_score(y_test, preds)
    prec = precision_score(y_test, preds, pos_label=pos_label)
    rec = recall_score(y_test, preds, pos_label=pos_label)
    f1 = f1_score(y_test, preds, pos_label=pos_label)
    print(f"{name}: acc={acc:.3f} prec={prec:.3f} rec={rec:.3f} f1={f1:.3f}")
    return acc, prec, rec, f1


def save(pipe, filename):
    path = os.path.join(OUT_DIR, filename)
    joblib.dump(pipe, path, compress=3)
    print(f"  saved {filename} ({os.path.getsize(path)/1024:.1f} KB)")


# ---------------- DIABETES ----------------
df = pd.read_csv(os.path.join(DATA_DIR, "diabetes.csv"))
X, y = df.drop(columns=["Outcome"]), df["Outcome"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
pre = ColumnTransformer([("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), list(X.columns))])
pipe = Pipeline([("pre", pre), ("model", RandomForestClassifier(n_estimators=150, max_depth=6, random_state=42))]).fit(X_train, y_train)
report("DIABETES", y_test, pipe.predict(X_test))
save(pipe, "diabetes_pipeline.joblib")

# ---------------- HEART ----------------
df = pd.read_csv(os.path.join(DATA_DIR, "heart.csv"))
df.columns = [c.strip() for c in df.columns]
X, y = df.drop(columns=["target"]), df["target"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
pre = ColumnTransformer([("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), list(X.columns))])
pipe = Pipeline([("pre", pre), ("model", RandomForestClassifier(n_estimators=150, max_depth=6, random_state=42))]).fit(X_train, y_train)
report("HEART", y_test, pipe.predict(X_test))
save(pipe, "heart_pipeline.joblib")

# ---------------- LIVER ----------------
df = pd.read_csv(os.path.join(DATA_DIR, "indian_liver_patient.csv"))
X, y = df.drop(columns=["Dataset"]), df["Dataset"]
num_features = ["Age", "Total_Bilirubin", "Direct_Bilirubin", "Alkaline_Phosphotase",
                 "Alamine_Aminotransferase", "Aspartate_Aminotransferase", "Total_Protiens",
                 "Albumin", "Albumin_and_Globulin_Ratio"]
cat_features = ["Gender"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), num_features),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")), ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_features),
])
pipe = Pipeline([("pre", pre), ("model", LogisticRegression(max_iter=2000))]).fit(X_train, y_train)
report("LIVER", y_test, pipe.predict(X_test), pos_label=1)
save(pipe, "liver_pipeline.joblib")

# ---------------- KIDNEY ----------------
df = pd.read_csv(os.path.join(DATA_DIR, "kidney_disease.csv")).drop(columns=["id"])
for c in df.select_dtypes(include="object").columns:
    df[c] = df[c].astype(str).str.strip().replace({"nan": None, "?": None})
df["classification"] = df["classification"].replace({"ckd\t": "ckd"})
y = df["classification"].map({"ckd": 1, "notckd": 0})
X = df.drop(columns=["classification"])
num_features = ["age", "bp", "sg", "al", "su", "bgr", "bu", "sc", "sod", "pot", "hemo", "pcv", "wc", "rc"]
cat_features = ["rbc", "pc", "pcc", "ba", "htn", "dm", "cad", "appet", "pe", "ane"]
for c in num_features:
    X[c] = pd.to_numeric(X[c], errors="coerce")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), num_features),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")), ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat_features),
])
pipe = Pipeline([("pre", pre), ("model", RandomForestClassifier(n_estimators=150, max_depth=6, random_state=42))]).fit(X_train, y_train)
report("KIDNEY", y_test, pipe.predict(X_test))
save(pipe, "kidney_pipeline.joblib")

print("\nAll models retrained under pinned production scikit-learn version.")
