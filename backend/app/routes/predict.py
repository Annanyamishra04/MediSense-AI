from flask import Blueprint, request, jsonify, current_app

from app.schemas.validators import (
    validate_diabetes, validate_heart, validate_liver, validate_kidney,
)
from app.services.prediction_service import (
    predict_diabetes, predict_heart, predict_liver, predict_kidney,
)
from app.utils.advisories import liver_advisory, kidney_advisory

predict_bp = Blueprint("predict", __name__)


@predict_bp.route("/api/diabetes", methods=["POST"])
def diabetes():
    body = request.get_json(silent=True) or {}
    cleaned, errors = validate_diabetes(body)
    if errors:
        return jsonify({"error": "Invalid input.", "details": errors}), 400
    model_service = current_app.config["MODEL_SERVICE"]
    result = predict_diabetes(model_service, cleaned)
    return jsonify(result)


@predict_bp.route("/api/heart", methods=["POST"])
def heart():
    body = request.get_json(silent=True) or {}
    cleaned, errors = validate_heart(body)
    if errors:
        return jsonify({"error": "Invalid input.", "details": errors}), 400
    model_service = current_app.config["MODEL_SERVICE"]
    result = predict_heart(model_service, cleaned)
    return jsonify(result)


@predict_bp.route("/api/liver", methods=["POST"])
def liver():
    body = request.get_json(silent=True) or {}
    cleaned, errors = validate_liver(body)
    if errors:
        return jsonify({"error": "Invalid input.", "details": errors}), 400
    model_service = current_app.config["MODEL_SERVICE"]
    result = predict_liver(model_service, cleaned)
    result["advisory"] = liver_advisory(cleaned, result["result"] == 1)
    return jsonify(result)


@predict_bp.route("/api/kidney", methods=["POST"])
def kidney():
    body = request.get_json(silent=True) or {}
    cleaned, errors = validate_kidney(body)
    if errors:
        return jsonify({"error": "Invalid input.", "details": errors}), 400
    model_service = current_app.config["MODEL_SERVICE"]
    result = predict_kidney(model_service, cleaned)
    result["advisory"] = kidney_advisory(result["result"] == 1)
    return jsonify(result)
