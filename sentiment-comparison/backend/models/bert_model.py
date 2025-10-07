from transformers import pipeline
from typing import Tuple

class BERTSentimentModel:
    def __init__(self) -> None:
        # Use a smaller, faster version of BERT for quicker inference
        model_name = "distilbert-base-uncased-finetuned-sst-2-english"
        self.classifier = pipeline("sentiment-analysis", model=model_name)

    def predict_sentiment(self, text: str) -> Tuple[str, float]:
        result = self.classifier(text)[0]
        sentiment = result['label'].title() # "POSITIVE" -> "Positive"
        confidence = result['score']
        
        # The pipeline might label "POSITIVE" or "NEGATIVE". We ensure the confidence
        # reflects the predicted sentiment, not just the raw score for that label.
        return sentiment, confidence