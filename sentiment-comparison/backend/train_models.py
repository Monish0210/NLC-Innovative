import torch
import torch.nn as nn
import torch.optim as optim
from torchtext.datasets import IMDB
from torchtext.data.utils import get_tokenizer
from torchtext.vocab import build_vocab_from_iterator
from torch.utils.data import DataLoader
from torch.nn.utils.rnn import pad_sequence
import os
import spacy

# --- 0. Download Spacy Model ---
# This is needed for the tokenizer.
try:
    spacy.load("en_core_web_sm")
except OSError:
    print("Downloading 'en_core_web_sm' for spacy...")
    os.system("python -m spacy download en_core_web_sm")


# --- 1. Configuration ---
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
ARTIFACTS_DIR = "artifacts"
if not os.path.exists(ARTIFACTS_DIR):
    os.makedirs(ARTIFACTS_DIR)

# Hyperparameters
BATCH_SIZE = 128
EMBEDDING_DIM = 128
HIDDEN_DIM = 256
OUTPUT_DIM = 1
EPOCHS = 3 # Keep epochs low for faster training example

# --- 2. Data Preparation ---
print("Preparing data and building vocabulary...")
tokenizer = get_tokenizer('spacy', language='en_core_web_sm')
train_iter = IMDB(split='train')

def yield_tokens(data_iter):
    for _, text in data_iter:
        yield tokenizer(text)

vocab = build_vocab_from_iterator(yield_tokens(train_iter), specials=["<unk>", "<pad>"])
vocab.set_default_index(vocab["<unk>"])
torch.save(vocab, os.path.join(ARTIFACTS_DIR, "vocab.pth"))
print(f"Vocabulary saved to {ARTIFACTS_DIR}/vocab.pth")

text_pipeline = lambda x: vocab(tokenizer(x))
label_pipeline = lambda x: 1 if x == 'pos' else 0

def collate_batch(batch):
    label_list, text_list = [], []
    for (_label, _text) in batch:
        label_list.append(label_pipeline(_label))
        processed_text = torch.tensor(text_pipeline(_text), dtype=torch.int64)
        text_list.append(processed_text)
    padded_text = pad_sequence(text_list, batch_first=True, padding_value=vocab.get_stoi()['<pad>'])
    return torch.tensor(label_list, dtype=torch.float32), padded_text

train_iter, _ = IMDB()
train_dataloader = DataLoader(list(train_iter), batch_size=BATCH_SIZE, shuffle=True, collate_fn=collate_batch)

# --- 3. Model Architectures ---

# FeedForward Model (Bag of Words)
class FeedForwardNet(nn.Module):
    def __init__(self, vocab_size, embedding_dim, output_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=vocab.get_stoi()['<pad>'])
        self.fc = nn.Linear(embedding_dim, output_dim)
    
    def forward(self, text):
        embedded = self.embedding(text)
        pooled = embedded.mean(dim=1)
        return self.fc(pooled)

# Recurrent Model (for GRU and LSTM)
class RecurrentNet(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, recurrent_layer):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=vocab.get_stoi()['<pad>'])
        RecurrentLayer = getattr(nn, recurrent_layer)
        self.rnn = RecurrentLayer(embedding_dim, hidden_dim, num_layers=2, bidirectional=True, dropout=0.5, batch_first=True)
        self.fc = nn.Linear(hidden_dim * 2, output_dim)

    def forward(self, text):
        embedded = self.embedding(text)
        _, (hidden, _) = self.rnn(embedded) if isinstance(self.rnn, nn.LSTM) else self.rnn(embedded)
        hidden = torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1)
        return self.fc(hidden)


# --- 4. Training Loop ---
def train_model(model, model_name):
    print(f"\n--- Training {model_name} Model ---")
    model.to(DEVICE)
    optimizer = optim.Adam(model.parameters())
    criterion = nn.BCEWithLogitsLoss().to(DEVICE)

    for epoch in range(EPOCHS):
        model.train()
        total_loss = 0
        for i, (labels, texts) in enumerate(train_dataloader):
            labels, texts = labels.to(DEVICE), texts.to(DEVICE)
            optimizer.zero_grad()
            predictions = model(texts).squeeze(1)
            loss = criterion(predictions, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

            if (i + 1) % 10 == 0:
                 print(f"Epoch {epoch+1}/{EPOCHS}, Batch {i+1}/{len(train_dataloader)}, Loss: {loss.item():.4f}")

    # Save the trained model
    model_path = os.path.join(ARTIFACTS_DIR, f"{model_name.lower()}_model.pth")
    torch.save(model.state_dict(), model_path)
    print(f"{model_name} model trained and saved to {model_path}")

# --- 5. Instantiate and Train All Models ---
vocab_size = len(vocab)
train_model(FeedForwardNet(vocab_size, EMBEDDING_DIM, OUTPUT_DIM), "Feedforward")
train_model(RecurrentNet(vocab_size, EMBEDDING_DIM, HIDDEN_DIM, OUTPUT_DIM, 'GRU'), "GRU")
train_model(RecurrentNet(vocab_size, EMBEDDING_DIM, HIDDEN_DIM, OUTPUT_DIM, 'LSTM'), "LSTM")