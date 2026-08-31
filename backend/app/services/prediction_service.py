"""
Turns validated request data into the exact feature DataFrame each pipeline
was trained on, runs prediction, and returns a clean result dict. All
preprocessing (imputation/scaling/encoding) lives inside the pipeline
itself - this layer only shapes column names/order.
"""
import pandas as pd


def predict_diabetes(model_service, data):
    df = pd.DataFrame([{
        "preg": data["preg"], "glu": data["glu"], "bp": data["bp"],
        "st": data["st"], "ins": data["ins"], "bmi": data["bmi"],
        "dpf": data["dpf"], "age": data["age"],
    }])
    pipe = model_service.get("diabetes")
    pred = int(pipe.predict(df)[0])
    conf = model_service.confidence_for(pipe, df, pred)
    return {"result": pred, "confidence": round(conf, 4)}


def predict_heart(model_service, data):
    df = pd.DataFrame([{
        "age": data["age"], "sex": data["sex"], "cp": data["cp"],
        "trestbps": data["trestbps"], "chol": data["chol"], "fbs": data["fbs"],
        "restecg": data["restecg"], "thalach": data["thalach"], "exang": data["exang"],
        "oldpeak": data["oldpeak"], "slope": data["slope"], "ca": data["ca"], "thal": data["thal"],
    }])
    pipe = model_service.get("heart")
    pred = int(pipe.predict(df)[0])
    conf = model_service.confidence_for(pipe, df, pred)
    return {"result": pred, "confidence": round(conf, 4)}


def predict_liver(model_service, data):
    df = pd.DataFrame([{
        "Age": data["Age"], "Gender": data["Gender"].capitalize(),
        "Total_Bilirubin": data["Total_Bilirubin"], "Direct_Bilirubin": data["Direct_Bilirubin"],
        "Alkaline_Phosphotase": data["AAP"], "Alamine_Aminotransferase": data["SAA_1"],
        "Aspartate_Aminotransferase": data["SAA_2"], "Total_Protiens": data["Total_Protein"],
        "Albumin": data["ALB_Albumin"], "Albumin_and_Globulin_Ratio": data["AG_RATIO"],
    }])
    pipe = model_service.get("liver")
    raw_pred = pipe.predict(df)[0]  # dataset convention: 1 = disease, 2 = no disease
    result = 1 if raw_pred == 1 else 0
    conf = model_service.confidence_for(pipe, df, raw_pred)
    return {"result": result, "confidence": round(conf, 4)}


def predict_kidney(model_service, data):
    df = pd.DataFrame([{k: data[k] for k in [
        "age", "bp", "sg", "al", "su", "rbc", "pc", "pcc", "ba", "bgr", "bu",
        "sc", "sod", "pot", "hemo", "pcv", "wc", "rc", "htn", "dm", "cad",
        "appet", "pe", "ane",
    ]}])
    pipe = model_service.get("kidney")
    pred = int(pipe.predict(df)[0])
    conf = model_service.confidence_for(pipe, df, pred)
    return {"result": pred, "confidence": round(conf, 4)}
