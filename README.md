Sentiment Analysis Architecture Comparison (React + FastAPI)

This project compares multiple deep learning architectures for sentiment analysis and visualizes their performance.

Stack
- Frontend: React (Vite), Tailwind CSS, Chart.js via react-chartjs-2
- Backend: FastAPI, placeholder model stubs (ready for Keras/Transformers integration)

Dev Setup

Backend
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (frontend) and ensure backend is on `http://127.0.0.1:8000`.

API
- POST `/predict` body `{ "text": "some text" }` → per-model predictions
- GET `/metrics` → accuracy, size, avg inference time per model

Implementation Notes
- Models are initialized on server start in `backend/main.py`.
- Replace stubs in `backend/models/*` with real TensorFlow/Transformers code.
- Charts are wired for dynamic data; additional metrics can be added via `/metrics`.

License
MIT


