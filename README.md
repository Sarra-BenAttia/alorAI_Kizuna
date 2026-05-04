# 🌾 CropDNA — AI-Powered Agricultural Research Platform

<p align="center">
  <strong>Bridging Genetics and Agriculture through Artificial Intelligence</strong>
</p>

<p align="center">
  <a href="https://github.com/Sarra-BenAttia/CropDNA"><img src="https://img.shields.io/badge/GitHub-CropDNA-181717?style=for-the-badge&logo=github" alt="GitHub Repo"></a>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow">
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch">
  <img src="https://img.shields.io/badge/RAG-7C3AED?style=for-the-badge&logo=openai&logoColor=white" alt="RAG">
</p>

---

## 📖 Overview

**CropDNA** is a full-stack, AI-powered platform developed as part of an academic project at **Esprit School of Engineering**. It is designed for **agricultural researchers** and **farmers**, providing a unified suite of 9+ integrated modules that leverage cutting-edge Machine Learning, Deep Learning, and Retrieval-Augmented Generation (RAG) techniques to optimize crop yields, monitor plant health, analyze genomics, and deliver data-driven insights.

---

## ✨ Features & Modules

Our platform provides **two distinct portals** — one for **Researchers** and one for **Farmers** — with the following integrated modules:

### 🔬 Researcher Portal

| Module | Description | Tech Used |
|--------|-------------|-----------|
| **🧬 DNA Manipulation** | Analyze and manipulate DNA sequences for genomic research | BioPython, XGBoost |
| **🌿 Directed Crossing** | Simulate and plan directed plant crossing strategies | ML Pipeline (Ridge, RF, XGBoost, MLP) |
| **💊 Pharmaceutical Analysis** | Explore pharmaceutical applications of plant compounds | NLP, Data Mining |
| **📄 OCR Analysis** | Extract and analyze text from agricultural documents and research papers | OCR, Computer Vision |
| **🔍 RAG Genomic Search** | AI-powered Q&A system with genomic database search, trait prediction, and PDF report generation | RAG (Groq LLM), DNASearchEngine, FAISS |
| **⚖️ Ethical Analysis** | Evaluate ethical implications of genetic modifications | LLM-based Analysis |
| **📝 Article Generator** | Auto-generate research articles from experimental data | NLG, Template Engine |
| **🧪 CRISPR-Cas9 Efficiency** | Predict CRISPR editing efficiency with SHAP explainability | Gradient Boosting, SHAP |
| **🔬 ODM Wheat Analysis** | DNABERT fine-tuning for advanced oligonucleotide-directed mutagenesis | DNABERT, Transformers |

### 🌾 Farmer Portal

| Module | Description | Tech Used |
|--------|-------------|-----------|
| **📊 Farmer Dashboard** | Real-time plant monitoring with Digital Twin simulation (VWC, temperature, humidity) | Digital Twin, WebSocket |
| **🔊 Plant Sound Analysis** | Detect plant stress through acoustic signal analysis | CNN14 PANN |
| **🐛 Insect AI Classifier** | Classify 15 insect species from images for pest management | ResNet50 (timm, PyTorch) |
| **🍃 Plant Disease Detection** | Identify wheat leaf diseases from images | CNN (TensorFlow/Keras) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    🌐 React Frontend                     │
│          (Vite + TailwindCSS + Framer Motion)            │
├─────────────────────────────────────────────────────────┤
│                    ⚡ FastAPI Backend                     │
│              (REST API + CORS Middleware)                 │
├──────────┬──────────┬──────────┬────────────────────────┤
│ 🧬 RAG   │ 🌱 Digital│ 🔬 ODM   │  📊 ML/DL Models      │
│ Engine   │ Twin Sim  │ Router  │  (TF, PyTorch, XGB)    │
├──────────┴──────────┴──────────┴────────────────────────┤
│        📦 Data Layer (BioPython, Pandas, NumPy)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based UI framework |
| **Vite 8** | Fast build tool and dev server |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Framer Motion** | Animations and transitions |
| **Chart.js** | Data visualization and charts |
| **React Router v7** | Client-side routing |
| **Lucide React** | Modern icon library |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI 0.109** | High-performance Python web framework |
| **Uvicorn** | ASGI server |
| **Pydantic v2** | Data validation and serialization |
| **Twilio** | SMS alert notifications for critical plant states |
| **python-dotenv** | Environment variable management |
| **wkhtmltopdf** | PDF report generation |

### ML / DL / AI
| Technology | Purpose |
|------------|---------|
| **TensorFlow / Keras** | Deep Learning (CNN for plant disease classification) |
| **PyTorch / timm** | Transfer Learning (ResNet50 insect classification) |
| **XGBoost** | Gradient Boosting for genomic trait prediction |
| **scikit-learn** | Classical ML pipelines (Ridge, RF, MLP) |
| **BioPython** | DNA/RNA sequence analysis and parsing |
| **RAG Pipeline** | Retrieval-Augmented Generation with Groq LLM |
| **DNABERT** | Pre-trained Transformer for DNA sequences |
| **SHAP** | Model explainability for CRISPR predictions |
| **CNN14 PANN** | Pre-trained Audio Neural Network for insect sounds |

### Data & Utils
| Technology | Purpose |
|------------|---------|
| **Pandas** | Data manipulation and analysis |
| **NumPy** | Numerical computing |
| **OpenPyXL** | Excel file processing |

---

## 🔌 Backend API Endpoints

### 🌱 Digital Twin — Plant Monitoring
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/plants` | Retrieve all plant states (VWC, temp, humidity, status) |

> The Digital Twin runs a **background simulation** that updates plant metrics every 10 seconds and triggers **SMS alerts** via Twilio when a plant reaches critically dry conditions (VWC < 15%).

### 🧬 RAG — Genomic Search & Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/rag/search` | Search genomic database using natural language queries |
| `POST` | `/api/rag/predict` | Predict traits from a DNA sequence |
| `POST` | `/api/rag/answer` | RAG-powered Q&A with cited PubMed articles |
| `POST` | `/api/rag/pdf` | Generate a full PDF genomic report (sequence → HTML → PDF) |

### 🔬 ODM — Oligonucleotide-Directed Mutagenesis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `*` | `/api/odm/*` | ODM analysis routes (DNABERT-powered) — mounted via external router |

---

## 📁 Directory Structure

```text
CropDNA/
├── client/                          # React Frontend (Vite + TailwindCSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AgriAgent.jsx        # AI chat agent component
│   │   │   ├── CustomCursor.jsx     # Custom cursor animation
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── RAGSearch.jsx        # RAG search component
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Researcher home dashboard
│   │   │   ├── RoleSelection.jsx    # Role selection (Researcher/Farmer)
│   │   │   ├── Auth.jsx             # Researcher authentication
│   │   │   ├── FarmerAuth.jsx       # Farmer authentication
│   │   │   ├── FarmerDashboard.jsx  # Farmer Digital Twin dashboard
│   │   │   ├── DNAManipulation.jsx  # DNA sequence manipulation
│   │   │   ├── DirectedCrossing.jsx # Directed crossing simulation
│   │   │   ├── Pharmaceutical.jsx   # Pharmaceutical analysis
│   │   │   ├── OCRAnalysis.jsx      # OCR document analysis
│   │   │   ├── RAGAnalysis.jsx      # RAG genomic search & Q&A
│   │   │   ├── EthicAnalysis.jsx    # Ethical analysis module
│   │   │   ├── ArticleGenerator.jsx # Research article generator
│   │   │   ├── CrisprEfficiency.jsx # CRISPR-Cas9 prediction
│   │   │   ├── ODMAnalysis.jsx      # ODM wheat analysis
│   │   │   ├── PlantSound.jsx       # Plant/insect sound classifier
│   │   │   ├── InsectAI.jsx         # Insect image classifier
│   │   │   └── PlantDisease.jsx     # Plant disease detection
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Utility functions
│   │   ├── App.jsx                  # Main app with routing
│   │   └── main.jsx                 # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # FastAPI Backend
│   ├── main.py                      # API server (endpoints + Digital Twin sim)
│   └── requirements.txt             # Python dependencies
│
├── assets/                          # Static assets (images, CSS, JS)
├── forms/                           # Form handling scripts
├── index.html                       # Landing page (static)
└── README.md                        # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** & npm (for the React frontend)
- **Python 3.8+** (for the FastAPI backend & ML models)
- **wkhtmltopdf** (optional — for PDF report generation)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sarra-BenAttia/CropDNA.git
   cd CropDNA
   ```

2. **Setup the Backend (FastAPI):**
   ```bash
   cd server
   python -m venv venv

   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   uvicorn main:app --reload --port 5000
   ```

3. **Setup the Frontend (React):**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`
   - API Docs (Swagger): `http://localhost:5000/docs`

### Environment Variables

Create a `.env` file in the project root with the following (optional for SMS alerts):

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
USER_PHONE_NUMBER=your_phone_number
GROQ_KEY=your_groq_api_key
```

> **Note on `.pkl` files:** The `.pkl` files (trained ML models) are not included in this repository due to their size. Contact the team for access if needed.

---

## 📸 Screenshots

*Coming soon — screenshots of the platform's key modules and dashboards.*

---

## 👥 Team

Developed by students at **Esprit School of Engineering** as part of an academic project.

---

## 🙏 Acknowledgments

We would like to express our deepest gratitude to our **Professor** for their invaluable guidance and support throughout this project. Special thanks to **Esprit School of Engineering** for providing the academic environment and resources necessary to bring this project to life.

---

<p align="center">
  <sub>© 2026 CropDNA Platform — Bridging Genetics and Agriculture 🌱</sub>
</p>
