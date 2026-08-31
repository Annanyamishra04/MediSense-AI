"""
Model metadata shown on the "Model Info" page in the frontend.

Every number here was produced by an actual train/test evaluation run
during this project's development (see /docs/ML_PIPELINE.md for the
methodology). Nothing is estimated or invented. Known dataset limitations
are documented explicitly rather than omitted.
"""

MODEL_METADATA = {
    "diabetes": {
        "display_name": "Diabetes",
        "algorithm": "Random Forest (150 trees, max depth 6)",
        "dataset_name": "Pima Indians Diabetes Dataset",
        "dataset_size": 768,
        "features": ["preg", "glu", "bp", "st", "ins", "bmi", "dpf", "age"],
        "test_split": "80/20 train-test split, stratified, random_state=42",
        "metrics": {
            "accuracy": 0.740, "precision": 0.652, "recall": 0.556, "f1": 0.600,
        },
        "limitations": [
            "Trained on a small, single-population dataset (768 records, all female, "
            "Pima Heritage) - real-world accuracy on other populations will differ.",
            "Recall of 55.6% means the model misses a substantial share of positive "
            "cases on this test set; it should not be relied on to rule out diabetes.",
        ],
    },
    "heart": {
        "display_name": "Heart Disease",
        "algorithm": "Random Forest (150 trees, max depth 6)",
        "dataset_name": "UCI Heart Disease Dataset (Cleveland)",
        "dataset_size": 303,
        "features": ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
                      "thalach", "exang", "oldpeak", "slope", "ca", "thal"],
        "test_split": "80/20 train-test split, stratified, random_state=42",
        "metrics": {
            "accuracy": 0.852, "precision": 0.800, "recall": 0.970, "f1": 0.877,
        },
        "limitations": [
            "Test set is only 61 records - metrics have wide uncertainty and should "
            "be treated as indicative, not precise.",
        ],
    },
    "liver": {
        "display_name": "Liver Disease",
        "algorithm": "Logistic Regression",
        "dataset_name": "UCI ILPD (Indian Liver Patient Dataset) - 583 records",
        "dataset_size": 583,
        "features": ["Age", "Gender", "Total_Bilirubin", "Direct_Bilirubin",
                      "Alkaline_Phosphotase", "Alamine_Aminotransferase",
                      "Aspartate_Aminotransferase", "Total_Protiens", "Albumin",
                      "Albumin_and_Globulin_Ratio"],
        "test_split": "80/20 train-test split, stratified, random_state=42",
        "metrics": {
            "accuracy": 0.692, "precision": 0.728, "recall": 0.904, "f1": 0.807,
        },
        "limitations": [
            "IMPORTANT: The original project's notebook was written for a different, "
            "larger dataset (~30,691 records, from Kaggle) that could not be "
            "downloaded in this project's build environment (no network access to "
            "Kaggle). This model was instead trained on the smaller, well-established "
            "UCI ILPD dataset (583 records) with the same feature schema, as a "
            "documented substitute - not the originally intended data source.",
            "The dataset is imbalanced (~71% positive class), which biases the model "
            "toward predicting disease; the 90.4% recall / 72.8% precision reflect this.",
            "A prior version of this model reported 99.7% accuracy - that number came "
            "from a preprocessing bug (encoder was re-fit separately on the test set) "
            "and was not a valid measurement. This model was retrained correctly.",
        ],
    },
    "kidney": {
        "display_name": "Chronic Kidney Disease",
        "algorithm": "Random Forest (150 trees, max depth 6)",
        "dataset_name": "UCI Chronic Kidney Disease Dataset",
        "dataset_size": 400,
        "features": ["age", "bp", "sg", "al", "su", "rbc", "pc", "pcc", "ba",
                      "bgr", "bu", "sc", "sod", "pot", "hemo", "pcv", "wc", "rc",
                      "htn", "dm", "cad", "appet", "pe", "ane"],
        "test_split": "80/20 train-test split, stratified, random_state=42",
        "metrics": {
            "accuracy": 1.0, "precision": 1.0, "recall": 1.0, "f1": 1.0,
        },
        "limitations": [
            "IMPORTANT: 100% test accuracy is NOT proof this model works well in the "
            "real world. This specific UCI dataset (400 records) is known in the "
            "literature to be near-linearly separable - many published models on this "
            "exact dataset reach 95-100% test accuracy. This reflects the dataset's "
            "simplicity, not validated real-world diagnostic performance.",
            "The dataset is small (400 records, single hospital, ~2-month collection "
            "window in Tamil Nadu, India) and should not be treated as generalizable.",
        ],
    },
}

GLOBAL_DISCLAIMER = (
    "Anvara Health is an educational / portfolio project demonstrating an "
    "end-to-end ML application. None of the four models are medically "
    "validated, FDA-cleared, or approved for clinical use. They were trained "
    "on small public research datasets, not real-world clinical data at "
    "scale, and must never be used to diagnose, rule out, or make treatment "
    "decisions about any real medical condition. Always consult a qualified "
    "healthcare professional."
)
