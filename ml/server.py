# from flask import Flask, request, jsonify
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import StandardScaler
# from imblearn.over_sampling import SMOTE
# from xgboost import XGBClassifier
# from joblib import load
# from flask_cors import CORS
# from dotenv import load_dotenv
# import os

# load_dotenv()
# # Initialize the Flask app
# app = Flask(__name__)
# # CORS(app) 
# CORS(app, 
#     resources={r"/predict": {
#         "origins": os.getenv('CORS_ORIGIN'),
#         "methods": ["POST"],
#         "allow_credentials": True
#     }})



# # Load your trained model and scaler (after optimizing using Optuna)
# model = load("loan_approval_model.pkl")  # Load the trained model
# scaler = load("scaler.pkl")   # Load the scaler used for feature scaling

# # Helper function to preprocess and make predictions
# def preprocess_and_predict(data):
#     # Data Preprocessing for categorical variables
#     data['education'] = data['education'].map({'Graduate': 1, 'Not Graduate': 0})
#     data['self_employed'] = data['self_employed'].map({'Yes': 1, 'No': 0})

#     # Feature engineering (same as the model code)
#     data['income_to_loan_ratio'] = data["income_annum"] / (data["loan_amount"] + 1)
#     data["total_assets"] = (data["residential_assets_value"] + data["commercial_assets_value"] +
#                             data["luxury_assets_value"] + data["bank_asset_value"])
    
#     features = [
#         "no_of_dependents", "education", "self_employed", "income_annum", "loan_amount",
#         "loan_term", "cibil_score", "residential_assets_value", "commercial_assets_value",
#         "luxury_assets_value", "bank_asset_value", "income_to_loan_ratio", "total_assets"
#     ]
    
#     # Prepare input features
#     X = data[features]
    
#     # Scaling features using the previously fitted scaler
#     X_scaled = scaler.transform(X)
    
#     # Predicting using the trained model
#     pred_proba = model.predict_proba(X_scaled)[:, 1]  # Get probabilities of positive class
#     return pred_proba

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get input data from the request
#         input_data = request.get_json()
        
#         # Convert the input data into a DataFrame (assuming the input is in the correct format)
#         input_df = pd.DataFrame([input_data])

#         # Preprocess data and make predictions
#         predictions = preprocess_and_predict(input_df)
        
#         # Adjust decision threshold (default is 0.4)
#         threshold = 0.4
#         prediction_result = (predictions >= threshold).astype(bool)  # Convert to boolean (True/False)

#         # Prepare the response with boolean result
#         response = {
#             "predictions": prediction_result.tolist(),  # Convert to list of boolean values
#             "prediction_probabilities": predictions.tolist()  # Include prediction probabilities for reference
#         }
        
#         return jsonify(response), 200
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # Run the app
# if __name__ == '__main__':
#     app.run(debug=True)









from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier
from joblib import load
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
# Initialize the Flask app
app = Flask(__name__)
# Configure CORS
CORS(app, 
    resources={r"/predict": {
        "origins": os.getenv('CORS_ORIGIN'),
        "methods": ["POST"],
        "allow_credentials": True
    }})

# Load your trained model and scaler (after optimizing using Optuna)
model = load("loan_approval_model.pkl")  # Load the trained model
scaler = load("scaler.pkl")   # Load the scaler used for feature scaling

# Helper function to preprocess and make predictions
def preprocess_and_predict(data):
    # Data Preprocessing for categorical variables
    data['education'] = data['education'].map({'Graduate': 1, 'Not Graduate': 0})
    data['self_employed'] = data['self_employed'].map({'Yes': 1, 'No': 0})

    # Feature engineering (same as the model code)
    data['income_to_loan_ratio'] = data["income_annum"] / (data["loan_amount"] + 1)
    data["total_assets"] = (data["residential_assets_value"] + data["commercial_assets_value"] +
                            data["luxury_assets_value"] + data["bank_asset_value"])
    
    features = [
        "no_of_dependents", "education", "self_employed", "income_annum", "loan_amount",
        "loan_term", "cibil_score", "residential_assets_value", "commercial_assets_value",
        "luxury_assets_value", "bank_asset_value", "income_to_loan_ratio", "total_assets"
    ]
    
    # Prepare input features
    X = data[features]
    
    # Scaling features using the previously fitted scaler
    X_scaled = scaler.transform(X)
    
    # Predicting using the trained model
    pred_proba = model.predict_proba(X_scaled)[:, 1]  # Get probabilities of positive class
    return pred_proba

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Loan Approval Prediction API"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        input_data = request.get_json()
        
        # Convert the input data into a DataFrame
        input_df = pd.DataFrame([input_data])

        # Preprocess data and make predictions
        predictions = preprocess_and_predict(input_df)
        
        # Adjust decision threshold (default is 0.4)
        threshold = 0.4
        prediction_result = (predictions >= threshold).astype(bool)

        # Prepare the response
        response = {
            "predictions": prediction_result.tolist(),
            "prediction_probabilities": predictions.tolist()
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the app
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
