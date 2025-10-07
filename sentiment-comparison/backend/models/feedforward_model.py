import torch
import torch.nn as nn
from torchtext.data.utils import get_tokenizer
from typing import Tuple
import os

# Define the model architecture exactly as in the training script
class FeedForwardNet(nn.Module):
    def __init__(self, vocab_size, embedding_dim, output_dim, padding_idx):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=padding_idx)
        self.fc = nn.Linear(embedding_dim, output_dim)
    
    def forward(self, text):
        embedded = self.embedding(text)
        pooled = embedded.mean(dim=1)
        return self.fc(pooled)

class FeedForwardSentimentModel:
    def __init__(self, artifacts_dir: str = "artifacts") -> None:
        self.tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
        self.vocab = torch.load(os.path.join(artifacts_dir, "vocab.pth"))
        
        # Model parameters
        vocab_size = len(self.vocab)
        embedding_dim = 128
        output_dim = 1
        padding_idx = self.vocab.get_stoi()['<pad>']
        
        self.model = FeedForwardNet(vocab_size, embedding_dim, output_dim, padding_idx)
        self.model.load_state_dict(torch.load(os.path.join(artifacts_dir, "feedforward_model.pth")))
        self.model.eval()

    def predict_sentiment(self, text: str) -> Tuple[str, float]:
        with torch.no_grad():
            tokenized = self.tokenizer(text)
            indexed = [self.vocab[token] for token in tokenized]
            tensor = torch.LongTensor(indexed).unsqueeze(0) # Add batch dimension
            
            prediction = torch.sigmoid(self.model(tensor))
            confidence = prediction.item()
            
            sentiment = "Positive" if confidence > 0.5 else "Negative"
            # Return confidence for the predicted class
            final_confidence = confidence if sentiment == "Positive" else 1 - confidence
            
            return sentiment, final_confidence