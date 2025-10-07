import torch
import torch.nn as nn
from torchtext.data.utils import get_tokenizer
from typing import Tuple
import os

# Define the model architecture exactly as in the training script
class RecurrentNet(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, padding_idx):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=padding_idx)
        self.rnn = nn.LSTM(embedding_dim, hidden_dim, num_layers=2, bidirectional=True, dropout=0.5, batch_first=True)
        self.fc = nn.Linear(hidden_dim * 2, output_dim)

    def forward(self, text):
        embedded = self.embedding(text)
        _, (hidden, _) = self.rnn(embedded)
        hidden = torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1)
        return self.fc(hidden)

class LSTMSentimentModel:
    def __init__(self, artifacts_dir: str = "artifacts") -> None:
        self.tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
        self.vocab = torch.load(os.path.join(artifacts_dir, "vocab.pth"))
        
        # Model parameters
        vocab_size = len(self.vocab)
        embedding_dim = 128
        hidden_dim = 256
        output_dim = 1
        padding_idx = self.vocab.get_stoi()['<pad>']
        
        self.model = RecurrentNet(vocab_size, embedding_dim, hidden_dim, output_dim, padding_idx)
        self.model.load_state_dict(torch.load(os.path.join(artifacts_dir, "lstm_model.pth")))
        self.model.eval()

    def predict_sentiment(self, text: str) -> Tuple[str, float]:
        with torch.no_grad():
            tokenized = self.tokenizer(text)
            indexed = [self.vocab[token] for token in tokenized]
            tensor = torch.LongTensor(indexed).unsqueeze(0)
            
            prediction = torch.sigmoid(self.model(tensor))
            confidence = prediction.item()
            
            sentiment = "Positive" if confidence > 0.5 else "Negative"
            final_confidence = confidence if sentiment == "Positive" else 1 - confidence
            
            return sentiment, final_confidence