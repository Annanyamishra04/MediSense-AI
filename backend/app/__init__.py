from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from app.services.model_service import ModelService


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, origins=config_class.ALLOWED_ORIGINS)

    # Load all four model pipelines once, at startup - not per request.
    app.config["MODEL_SERVICE"] = ModelService(config_class.MODELS_DIR)

    from app.routes.health import health_bp
    from app.routes.model_info import model_info_bp
    from app.routes.predict import predict_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(model_info_bp)
    app.register_blueprint(predict_bp)

    @app.errorhandler(TypeError)
    @app.errorhandler(ValueError)
    def handle_bad_input(e):
        return jsonify({"error": "Invalid or missing input.", "detail": str(e)}), 400

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def handle_server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app
