"""
Loads every disease-prediction pipeline exactly once, at application
startup, and keeps them in memory. Routes never touch the filesystem or
re-fit any preprocessing at request time - each pipeline already bundles
its own imputation/scaling/encoding fitted during training, so inference
always uses the exact same preprocessing as training.
"""
import os
import joblib


class ModelService:
    def __init__(self, models_dir):
        self.models_dir = models_dir
        self._pipelines = {}
        self._load_all()

    def _load_all(self):
        for name, filename in [
            ("diabetes", "diabetes_pipeline.joblib"),
            ("heart", "heart_pipeline.joblib"),
            ("liver", "liver_pipeline.joblib"),
            ("kidney", "kidney_pipeline.joblib"),
        ]:
            path = os.path.join(self.models_dir, filename)
            self._pipelines[name] = joblib.load(path)

    def get(self, name):
        return self._pipelines[name]

    def loaded_status(self):
        return {name: pipe is not None for name, pipe in self._pipelines.items()}

    @staticmethod
    def confidence_for(pipeline, dataframe, predicted_label):
        """Probability the pipeline assigned to its own predicted class."""
        proba = pipeline.predict_proba(dataframe)[0]
        class_index = {cls: i for i, cls in enumerate(pipeline.classes_)}
        return float(proba[class_index[predicted_label]])
