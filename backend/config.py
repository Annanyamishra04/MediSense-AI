"""
Environment-driven configuration for the MediSense AI API.

Nothing sensitive is hardcoded here - every deployment-specific value comes
from an environment variable, with a safe local-development default.
"""
import os


class Config:
    # Never run Flask's debug server in production. Explicit opt-in only.
    DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"

    # Comma-separated list of allowed frontend origins, e.g.
    # "https://medisense-ai.vercel.app,http://localhost:3000"
    ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

    PORT = int(os.environ.get("PORT", 8000))
    HOST = os.environ.get("HOST", "0.0.0.0")

    # Directory containing the lightweight production model pipelines
    # (joblib files only - training notebooks/datasets are NOT deployed).
    MODELS_DIR = os.environ.get(
        "MODELS_DIR",
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "models"),
    )
