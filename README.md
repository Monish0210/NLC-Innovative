# Sentiment Analysis Dashboard (React + FastAPI)

<p align="center">
  A full-stack application to analyze and visually compare sentiment analysis models. The app features a real-time analysis interface and a comprehensive dashboard with detailed statistical graphs.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi">
  <img alt="Chart.js" src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
</p>


## About The Project

This project provides an interactive platform to benchmark different sentiment analysis models. It's designed with two main sections:

1.  **Home Section:** Allows users to perform real-time sentiment analysis on any sentence. The results are instantly visualized using confidence bars for each model and a sentiment doughnut chart, providing immediate, easy-to-understand feedback.
2.  **Compare Section:** Offers a high-level dashboard for a deep statistical analysis of the models. It uses six different graphs to compare their overall performance, helping users understand the strengths and weaknesses of each architecture.



## ✨ Features

- **Interactive Analysis:** An intuitive input box on the home page to enter text for analysis.
- **Confidence Bars:** Instantly view each model's prediction confidence on a visual bar graph.
- **Sentiment Doughnut Chart:** A clear, graphical representation of the final predicted sentiment.
- **Comparative Dashboard:** A dedicated section with six different charts for in-depth statistical comparison of all available models.
- **Extensible Backend:** Built with FastAPI, allowing for easy integration of new NLP models.
- **Modern UI:** A clean and responsive user interface built with React, Vite, and Tailwind CSS.


## 🛠️ Tech Stack

### Frontend
- **Framework/Library:** React (with Vite)
- **Styling:** Tailwind CSS
- **Data Visualization:** Chart.js (via `react-chartjs-2`)

### Backend
- **Framework:** FastAPI
- **Server:** Uvicorn
- **Language:** Python

### Models
- All the Model files available in the folder in .ipynb file


## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v16+) & npm
- Python (v3.8+) & pip
- Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Monish0210/NLC-Innovative.git
    cd NLC-Innovative
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    python -m venv .venv
    # On Windows (PowerShell): .\.venv\Scripts\Activate.ps1
    # On Linux/macOS: source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8008
    ```

3.  **Set up the Frontend (in a new terminal):**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```


## Usage

Once both servers are running:

1.  Open your browser to `http://localhost:5173`.
2.  On the **Home** section, type a sentence into the input box and click **"Analyze"**.
3.  Observe the results displayed in the confidence bars and the sentiment doughnut chart.
4.  Navigate to the **Compare** section from the menu.
5.  Explore the six different graphs to see the overall statistical analysis and comparison of the models.


## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the project, please fork the repository and create a pull request, or open an issue with the "enhancement" tag.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

---
