from flask import Blueprint, jsonify, current_app

health_bp = Blueprint("health", __name__)


@health_bp.route("/api/health", methods=["GET"])
def health():
    model_service = current_app.config["MODEL_SERVICE"]
    return jsonify({"status": "ok", "models_loaded": model_service.loaded_status()})
