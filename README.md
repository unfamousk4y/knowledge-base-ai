# 🧠 Internal Knowledge Base AI
A full-stack RAG (Retrieval-Augmented Generation) application that lets companies upload internal documents and query them instantly via natural language.

## Live Demo
- Frontend: https://knowledge-base-ai-eight.vercel.app
- Backend API: https://knowledge-base-ai-22yv.onrender.com
- Loom : [] (Coming when free tier credits reset)

Upload any PDF and ask questions like "What is this document about?" to see it in action.

## Features
- PDF & TXT document upload with automatic text chunking
- Semantic search using Google Gemini embeddings (3072-dim vectors)
- FAISS vector index for fast nearest-neighbor retrieval
- Gemini 2.0 Flash powered answer generation with source citation (Free tier for project purposes, exhausts quickly)
- Responsive Next.js chat UI with drag-and-drop upload
- PostgreSQL persistence via Neon
- Deployed on Render (backend) and Vercel (frontend)

## Architecture
User uploads PDF → FastAPI parses & chunks text → Gemini embeds chunks → FAISS indexes vectors → User asks question → Query embedded → FAISS retrieves top-5 chunks → Gemini generates answer with citations → Response sent to frontend

## Tech Stack
| Layer | Technology |
|---|---|
| Backend | Python 3.11, FastAPI, Uvicorn |
| Embeddings | Google Gemini gemini-embedding-001 |
| Vector DB | FAISS (faiss-cpu) |
| LLM | Google Gemini 2.0 Flash |
| Database | PostgreSQL (Neon) |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Deployment | Render (backend), Vercel (frontend) |

## Local Setup
```bash

git clone https://github.com/unfamousk4y/knowledge-base-ai
cd knowledge-base-ai


cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env # add your GEMINI_API_KEY and DATABASE_URL
uvicorn main:app --reload


cd frontend
npm install
cp .env.local.example .env.local # add NEXT_PUBLIC_API_URL
npm run dev

## Project Structure
knowledge-base-ai/
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── routers/
│ │ ├── upload.py
│ │ ├── query.py
│ │ └── reindex.py
│ └── services/
│ ├── embedder.py
│ ├── faiss_store.py
│ └── chunker.py
├── frontend/
│ ├── app/
│ │ ├── page.tsx
│ │ └── api/upload/route.ts
│ └── components/
│ ├── FileUploader.tsx
│ ├── ChatWindow.tsx
│ ├── MessageBubble.tsx
│ └── SourceCard.tsx
└── README.md

## Environment Variables
backend/.env
GEMINI_API_KEY=your_key
DATABASE_URL=postgresql://...
CORS_ORIGIN=*

frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

## Future Improvements
- Multi-tenant support (per-company document namespacing)
- Async ingestion queue for large documents
- Feedback loop to improve retrieval ranking
- Slack bot integration

## License
MIT — free to use, fork, and learn from.

