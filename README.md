# MediCRM AI – AI-Powered Healthcare CRM

## Overview

MediCRM AI is an AI-powered Healthcare CRM designed for Medical Representatives and Pharmaceutical companies. It combines traditional CRM functionality with Generative AI to simplify interaction logging, searching, summarization, and follow-up recommendations.

The application allows users to manage Healthcare Professionals (HCPs), record interactions manually or using natural language, and leverage AI to improve productivity.

---

## Features

### Dashboard
- Total Healthcare Professionals
- Total Interactions
- Today's Interactions
- Upcoming Follow-ups
- Recent Activity Overview

### HCP Management
- Add Healthcare Professionals
- Edit HCP Details
- Delete HCP
- Search by Doctor Name
- Search by Hospital
- Search by Phone Number

### Interaction Management
- Manual Interaction Logging
- AI-based Natural Language Interaction Logging
- Edit Existing Interactions
- Search Interaction History
- Interaction Summarization
- AI-powered Next Best Action Recommendations

### AI Assistant
Supports natural language commands such as:

- "I met Dr Sharma today at Apollo Hospital. Discussed CardioX. Follow up next week."
- "Show interactions with Dr Sharma."
- "Summarize all interactions."
- "What should I do next?"
- "Change doctor name from Yash Raj to Dr Yash."

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React

## Backend
- FastAPI
- Python

## Database
- PostgreSQL (Neon)

## ORM
- SQLAlchemy

## AI
- LangGraph
- Groq (Llama 3.1)

---

# Project Architecture

```
React Frontend
        │
        ▼
 FastAPI REST APIs
        │
        ▼
 LangGraph Workflow
        │
        ▼
 AI Tools
        │
        ▼
 SQLAlchemy ORM
        │
        ▼
 Neon PostgreSQL
```

---

# AI Workflow

```
User Prompt
      │
      ▼
Intent Detection
      │
      ▼
Entity Extraction
      │
      ▼
Tool Selection
      │
      ▼
Database Operation
      │
      ▼
AI Response
```

---

# Backend Structure

```
backend/
│
├── app/
│   ├── graph/
│   ├── routers/
│   ├── services/
│   ├── tools/
│   ├── models/
│   ├── schemas/
│   ├── database.py
│   └── main.py
```

---

# Frontend Structure

```
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── layouts/
│   ├── routes/
│   └── App.tsx
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd MediCRM-AI
```

---

## 2. Backend Setup

Navigate to backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=<your_neon_postgresql_connection_string>
GROQ_API_KEY=<your_groq_api_key>
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend will start at:

```
http://localhost:8000
```

---

## 3. Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

# Health Check

The backend exposes a health endpoint:

```
GET /health
```

Example Response:

```json
{
  "status": "ok",
  "ai": "connected"
}
```

The frontend continuously monitors this endpoint to display the AI connection status.

---

# Example AI Commands

### Log Interaction

```
I met Dr Sharma today at Apollo Hospital.
Discussed CardioX.
Follow up next Monday.
```

### Search

```
Show interactions with Dr Sharma
```

### Summarize

```
Summarize interactions with Dr Sharma
```

### Next Best Action

```
What should I do next?
```

### Edit Interaction

```
Change doctor name from Yash Raj to Dr Yash
```

---

# Key Design Decisions

- Layered architecture separating UI, business logic, AI workflow, and database access.
- Service layer used for all backend operations to keep routers lightweight.
- LangGraph orchestrates AI tool selection based on user intent.
- SQLAlchemy ORM manages database interactions with PostgreSQL.
- Natural language inputs are converted into structured CRM operations using Groq Llama 3.1.

---

# Future Improvements

- Authentication and Role-Based Access Control
- Interaction Analytics and Reporting
- Email and Calendar Integration
- Voice-based Interaction Logging
- Multi-user Collaboration
- Advanced AI Insights and Recommendations

---

# Author

**Manoranjan Kumar**

Bachelor of Engineering (Computer Science)

Chandigarh University

## Assumptions & Limitations

- AI responses depend on the quality of the user's natural language input.
- The application currently assumes a single-user environment without authentication.
- The AI model may occasionally require clarification for ambiguous update requests.
- Internet connectivity is required for AI-powered features using the Groq API.