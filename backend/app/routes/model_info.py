from flask import Blueprint, jsonify
from app.utils.model_metadata import MODEL_METADATA, GLOBAL_DISCLAIMER

model_info_bp = Blueprint("model_info", __name__)


@model_info_bp.route("/api/model-info", methods=["GET"])
def model_info():
    return jsonify({"disclaimer": GLOBAL_DISCLAIMER, "models": MODEL_METADATA})
