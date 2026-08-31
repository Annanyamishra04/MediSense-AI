"""
Lightweight request validation - no external dependency required, keeping
the production footprint small. Each validator returns (cleaned_dict, None)
on success or (None, list_of_error_strings) on failure.
"""


def _require_number(data, field, cast, errors, min_v=None, max_v=None):
    raw = data.get(field)
    if raw is None or raw == "":
        errors.append(f"'{field}' is required.")
        return None
    try:
        val = cast(raw)
    except (TypeError, ValueError):
        errors.append(f"'{field}' must be a valid {cast.__name__}.")
        return None
    if min_v is not None and val < min_v:
        errors.append(f"'{field}' must be >= {min_v}.")
    if max_v is not None and val > max_v:
        errors.append(f"'{field}' must be <= {max_v}.")
    return val


def _require_choice(data, field, choices, errors):
    raw = data.get(field)
    if raw is None or str(raw).strip() == "":
        errors.append(f"'{field}' is required.")
        return None
    val = str(raw).strip().lower()
    if val not in choices:
        errors.append(f"'{field}' must be one of {sorted(choices)}.")
        return None
    return val


def validate_diabetes(data):
    errors = []
    cleaned = {
        "preg": _require_number(data, "preg", int, errors, 0, 30),
        "glu": _require_number(data, "glu", int, errors, 0, 400),
        "bp": _require_number(data, "bp", int, errors, 0, 250),
        "st": _require_number(data, "st", int, errors, 0, 100),
        "ins": _require_number(data, "ins", int, errors, 0, 900),
        "bmi": _require_number(data, "bmi", float, errors, 0, 80),
        "dpf": _require_number(data, "dpf", float, errors, 0, 3),
        "age": _require_number(data, "age", int, errors, 1, 120),
    }
    return (None, errors) if errors else (cleaned, None)


def validate_heart(data):
    errors = []
    cleaned = {
        "age": _require_number(data, "age", int, errors, 1, 120),
        "sex": _require_number(data, "sex", int, errors, 0, 1),
        "cp": _require_number(data, "cp", int, errors, 0, 3),
        "trestbps": _require_number(data, "trestbps", int, errors, 50, 260),
        "chol": _require_number(data, "chol", int, errors, 50, 700),
        "fbs": _require_number(data, "fbs", int, errors, 0, 1),
        "restecg": _require_number(data, "restecg", int, errors, 0, 2),
        "thalach": _require_number(data, "thalach", int, errors, 50, 250),
        "exang": _require_number(data, "exang", int, errors, 0, 1),
        "oldpeak": _require_number(data, "oldpeak", float, errors, 0, 10),
        "slope": _require_number(data, "slope", int, errors, 0, 2),
        "ca": _require_number(data, "ca", int, errors, 0, 4),
        "thal": _require_number(data, "thal", int, errors, 0, 3),
    }
    return (None, errors) if errors else (cleaned, None)


def validate_liver(data):
    errors = []
    cleaned = {
        "Age": _require_number(data, "Age", int, errors, 1, 120),
        "Gender": _require_choice(data, "Gender", {"male", "female"}, errors),
        "Total_Bilirubin": _require_number(data, "Total_Bilirubin", float, errors, 0, 80),
        "Direct_Bilirubin": _require_number(data, "Direct_Bilirubin", float, errors, 0, 40),
        "AAP": _require_number(data, "AAP", int, errors, 0, 3000),
        "SAA_1": _require_number(data, "SAA_1", int, errors, 0, 3000),
        "SAA_2": _require_number(data, "SAA_2", int, errors, 0, 3000),
        "Total_Protein": _require_number(data, "Total_Protein", float, errors, 0, 15),
        "ALB_Albumin": _require_number(data, "ALB_Albumin", float, errors, 0, 10),
        "AG_RATIO": _require_number(data, "AG_RATIO", float, errors, 0, 5),
    }
    return (None, errors) if errors else (cleaned, None)


def validate_kidney(data):
    errors = []
    cleaned = {
        "age": _require_number(data, "age", int, errors, 0, 120),
        "bp": _require_number(data, "bp", int, errors, 0, 250),
        "sg": _require_number(data, "sg", float, errors, 1.0, 1.03),
        "al": _require_number(data, "al", int, errors, 0, 5),
        "su": _require_number(data, "su", int, errors, 0, 5),
        "rbc": _require_choice(data, "rbc", {"normal", "abnormal"}, errors),
        "pc": _require_choice(data, "pc", {"normal", "abnormal"}, errors),
        "pcc": _require_choice(data, "pcc", {"present", "notpresent"}, errors),
        "ba": _require_choice(data, "ba", {"present", "notpresent"}, errors),
        "bgr": _require_number(data, "bgr", int, errors, 0, 800),
        "bu": _require_number(data, "bu", int, errors, 0, 400),
        "sc": _require_number(data, "sc", float, errors, 0, 30),
        "sod": _require_number(data, "sod", int, errors, 0, 200),
        "pot": _require_number(data, "pot", float, errors, 0, 15),
        "hemo": _require_number(data, "hemo", float, errors, 0, 20),
        "pcv": _require_number(data, "pcv", int, errors, 0, 60),
        "wc": _require_number(data, "wc", int, errors, 0, 30000),
        "rc": _require_number(data, "rc", float, errors, 0, 8),
        "htn": _require_choice(data, "htn", {"yes", "no"}, errors),
        "dm": _require_choice(data, "dm", {"yes", "no"}, errors),
        "cad": _require_choice(data, "cad", {"yes", "no"}, errors),
        "appet": _require_choice(data, "appet", {"good", "poor"}, errors),
        "pe": _require_choice(data, "pe", {"yes", "no"}, errors),
        "ane": _require_choice(data, "ane", {"yes", "no"}, errors),
    }
    return (None, errors) if errors else (cleaned, None)
