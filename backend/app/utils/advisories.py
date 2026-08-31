"""
Generates simple, general-purpose next-step suggestions based on input
ranges. These are NOT medical advice, NOT a substitute for a clinician, and
are not derived from any clinical guideline - they are basic threshold
flags meant to prompt the user to seek appropriate professional care.
"""


def liver_advisory(data, prediction_positive):
    notes = []
    if data["Age"] < 18:
        notes.append("Pediatric cases should be evaluated by a pediatric specialist.")
    elif data["Age"] > 65:
        notes.append("Older adults may need closer monitoring for liver-related changes.")
    if data["Total_Bilirubin"] > 2.5 or data["Direct_Bilirubin"] > 1.0:
        notes.append("Bilirubin levels entered are above typical reference ranges.")
    if data["AAP"] > 150 or data["SAA_1"] > 40 or data["SAA_2"] > 35:
        notes.append("Enzyme levels entered are above typical reference ranges.")
    if data["Total_Protein"] < 6.0 or data["ALB_Albumin"] < 3.5 or data["AG_RATIO"] < 1.0:
        notes.append("Protein/albumin levels entered are below typical reference ranges.")
    if not notes:
        notes.append("No values fell outside the general reference ranges used by this tool.")
    notes.append(
        "This is a statistical estimate only, not a diagnosis. Please consult a "
        "qualified healthcare professional for interpretation and next steps."
    )
    return notes


def kidney_advisory(prediction_positive):
    if prediction_positive:
        return [
            "The model flagged this input as consistent with patterns seen in the "
            "training data for chronic kidney disease.",
            "Please consult a nephrologist or your primary care physician for proper "
            "testing and interpretation.",
            "This is a statistical estimate only, not a diagnosis.",
        ]
    return [
        "The model did not flag this input as consistent with the chronic kidney "
        "disease patterns it was trained on.",
        "This does not rule out kidney disease. If you have symptoms or risk "
        "factors, please consult a healthcare professional.",
    ]
