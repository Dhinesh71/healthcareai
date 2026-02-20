from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
from pydantic import BaseModel
import os

app = FastAPI(title="DiaPredict API", description="Diabetes Risk Prediction API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None
    print(f"Warning: Model not found at {MODEL_PATH}. Prediction endpoint will fail.")

class PatientData(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

@app.get("/")
def read_root():
    return {"message": "Welcome to DiaPredict API"}

@app.post("/predict")
def predict_diabetes(data: PatientData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please train the model first.")
    
    # Prepare input data using numpy instead of pandas to save bundle size
    features = [
        "Pregnancies", "Glucose", "BloodPressure", "SkinThickness", 
        "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
    ]
    
    input_data = np.array([[
        data.Pregnancies, data.Glucose, data.BloodPressure, data.SkinThickness,
        data.Insulin, data.BMI, data.DiabetesPedigreeFunction, data.Age
    ]])
    
    # Predict
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]
    
    # Feature Importance
    importance = {}
    if hasattr(model, "feature_importances_"):
        importance = dict(zip(features, model.feature_importances_.tolist()))
    elif hasattr(model, "coef_"):
        importance = dict(zip(features, model.coef_[0].tolist()))
    
    # Risk Level
    if probability < 0.3:
        risk_level = "Low"
    elif probability < 0.7:
        risk_level = "Medium"
    else:
        risk_level = "High"
    
    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "risk_level": risk_level,
        "feature_importance": importance
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
