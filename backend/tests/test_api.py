import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    return app.test_client()


def test_health_endpoint(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["status"] == "ok"
    assert all(data["models_loaded"].values())


def test_model_info_endpoint(client):
    resp = client.get("/api/model-info")
    assert resp.status_code == 200
    data = resp.get_json()
    assert set(data["models"].keys()) == {"diabetes", "heart", "liver", "kidney"}
    assert "disclaimer" in data


VALID_DIABETES = {"preg": 6, "glu": 148, "bp": 72, "st": 35, "ins": 0, "bmi": 33.6, "dpf": 0.627, "age": 50}
VALID_HEART = {"age": 63, "sex": 1, "cp": 3, "trestbps": 145, "chol": 233, "fbs": 1, "restecg": 0,
               "thalach": 150, "exang": 0, "oldpeak": 2, "slope": 0, "ca": 0, "thal": 1}
VALID_LIVER = {"Age": 65, "Gender": "Male", "Total_Bilirubin": 10.9, "Direct_Bilirubin": 5.5, "AAP": 699,
               "SAA_1": 64, "SAA_2": 100, "Total_Protein": 7.5, "ALB_Albumin": 3.2, "AG_RATIO": 0.74}
VALID_KIDNEY = {"age": 48, "bp": 80, "sg": 1.02, "al": 1, "su": 0, "rbc": "normal", "pc": "normal",
                "pcc": "notpresent", "ba": "notpresent", "bgr": 121, "bu": 36, "sc": 1.2, "sod": 135,
                "pot": 4.0, "hemo": 15.4, "pcv": 44, "wc": 7800, "rc": 5.2, "htn": "yes", "dm": "yes",
                "cad": "no", "appet": "good", "pe": "no", "ane": "no"}


@pytest.mark.parametrize("path,payload", [
    ("/api/diabetes", VALID_DIABETES),
    ("/api/heart", VALID_HEART),
    ("/api/liver", VALID_LIVER),
    ("/api/kidney", VALID_KIDNEY),
])
def test_valid_predictions_return_result_and_confidence(client, path, payload):
    resp = client.post(path, json=payload)
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["result"] in (0, 1)
    assert 0.0 <= data["confidence"] <= 1.0


@pytest.mark.parametrize("path,payload", [
    ("/api/diabetes", {}),
    ("/api/heart", {}),
    ("/api/liver", {}),
    ("/api/kidney", {}),
])
def test_missing_fields_return_400_with_details(client, path, payload):
    resp = client.post(path, json=payload)
    assert resp.status_code == 400
    data = resp.get_json()
    assert "details" in data
    assert len(data["details"]) > 0


def test_diabetes_out_of_range_value_rejected(client):
    bad = dict(VALID_DIABETES)
    bad["age"] = 999  # out of allowed range
    resp = client.post("/api/diabetes", json=bad)
    assert resp.status_code == 400


def test_liver_invalid_choice_rejected(client):
    bad = dict(VALID_LIVER)
    bad["Gender"] = "unknown"
    resp = client.post("/api/liver", json=bad)
    assert resp.status_code == 400


def test_unknown_route_returns_404(client):
    resp = client.get("/api/does-not-exist")
    assert resp.status_code == 404


def test_liver_known_disease_case_predicts_positive_with_high_confidence(client):
    # This exact row is from the training dataset with a known positive label.
    resp = client.post("/api/liver", json=VALID_LIVER)
    data = resp.get_json()
    assert data["result"] == 1
    assert data["confidence"] > 0.9
