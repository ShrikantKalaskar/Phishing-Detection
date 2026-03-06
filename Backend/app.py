from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from urllib.parse import urlparse
import pandas as pd


# Flask setup

app = Flask(__name__)
CORS(app)


# Load CNN + LSTM model

dl_model = load_model("models/cnn_lstm_model.h5")


# Load datasets (for tokenizer only)


# Email dataset
email_df = pd.read_csv("data/phishing_email.csv")
email_df["text"] = email_df["text_combined"].fillna("")
email_df = email_df[["text", "label"]]

# URL dataset
url_df = pd.read_csv("data/new_data_urls.csv")
url_df["label"] = url_df["status"].apply(lambda x: 1 if x == 0 else 0)
url_df = url_df[["url", "label"]]
url_df.rename(columns={"url": "text"}, inplace=True)

# Combine both
data = pd.concat([email_df, url_df], ignore_index=True)


# Tokenizer (same as training)

tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>")
tokenizer.fit_on_texts(data["text"])


# Trusted domains (reduce false positives)

TRUSTED_DOMAINS = [
    "google.com",
    "instagram.com",
    "facebook.com",
    "youtube.com",
    "amazon.com",
    "microsoft.com",
    "linkedin.com",
    "apple.com",
    "github.com",
    "onlinesbi.sbi.bank.in",
    "snapchat.com",
    "upstox.com",
    "sbi.co.in",
    "hdfc.bank.in",
    "flipkart.com",
    "ucanapply.com"

]

# Confidence threshold
THRESHOLD = 0.50


# Helper: trusted domain check

def is_trusted_domain(text):
    try:
        domain = urlparse(text).netloc.lower()
        return any(td in domain for td in TRUSTED_DOMAINS)
    except:
        return False


# Prediction logic (CNN + LSTM only)

def predict_text(text):
    # Whitelist check
    if is_trusted_domain(text):
        return "LEGITIMATE", 0.0

    seq = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(seq, maxlen=200)

    prob = dl_model.predict(padded, verbose=0)[0][0]

    if prob >= THRESHOLD:
        return "PHISHING", float(prob)
    else:
        return "LEGITIMATE", float(prob)


# API endpoint

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "Empty input"}), 400

    result, confidence = predict_text(text)

    return jsonify({
        "prediction": result,
        "confidence": round(confidence, 3),
        "indicators": [
            "CNN-based phishing keyword extraction",
            "LSTM-based contextual understanding",
            "Confidence threshold filtering",
            "Trusted-domain verification"
        ]
    })


# Run server

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
