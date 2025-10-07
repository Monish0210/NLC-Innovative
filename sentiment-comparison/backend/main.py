from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import time

# Corrected import to match the filename
from models.feedforward_model import FeedForwardSentimentModel
from models.lstm_model import LSTMSentimentModel
from models.gru_model import GRUSentimentModel
from models.bert_model import BERTSentimentModel


class PredictRequest(BaseModel):
    text: str


app = FastAPI(title="Sentiment Analysis Architecture Comparison API")


# Initialize models once on startup
print("Loading models...")
fnn_model = FeedForwardSentimentModel()
lstm_model = LSTMSentimentModel()
gru_model = GRUSentimentModel()
bert_model = BERTSentimentModel()
print("Models loaded successfully!")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Allows your frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
def predict_sentiment(payload: PredictRequest) -> Dict[str, Any]:
    text = payload.text

    # Collect predictions from all models
    results: List[Dict[str, Any]] = []

    for model_name, model in [
        ("Feedforward", fnn_model),
        ("GRU", gru_model),
        ("LSTM", lstm_model),
        ("BERT", bert_model),
    ]:
        start = time.perf_counter()
        sentiment, confidence = model.predict_sentiment(text)
        elapsed_ms = (time.perf_counter() - start) * 1000.0
        results.append(
            {
                "model": model_name,
                "sentiment": sentiment,
                "confidence": round(float(confidence), 4),
                "inference_time_ms": round(elapsed_ms, 2),
            }
        )

    return {"results": results}


@app.get("/metrics")
def model_metrics() -> Dict[str, Any]:
    # Placeholder metrics. You can update these after evaluating your models.
    return {
        "Feedforward": {"accuracy": 0.82, "size_mb": 12.3, "avg_time": 5.4},
        "GRU": {"accuracy": 0.85, "size_mb": 24.7, "avg_time": 31.2},
        "LSTM": {"accuracy": 0.88, "size_mb": 29.1, "avg_time": 38.5},
        "BERT": {"accuracy": 0.94, "size_mb": 256, "avg_time": 85.1},
    }


@app.get("/")
def health() -> Dict[str, str]:
    return {"status": "ok"}