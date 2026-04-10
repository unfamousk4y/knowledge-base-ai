from fastapi import APIRouter
from pydantic import BaseModel
from services.embedder import embed_single
from services.faiss_store import search
import os
from google import genai

router = APIRouter()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are a precise, helpful assistant for a company knowledge base.
Answer the user's question using ONLY the context provided below.
If the answer is not in the context, say "I couldn't find that in the documents."
Always be concise and clear."""

class QueryRequest(BaseModel):
    question: str

@router.post("/api/query")
def query(body: QueryRequest):
    q_vector = embed_single(body.question)

    results = search(q_vector, k=5)

    if not results:
        return {"answer": "No relevant documents found.", "sources": []}

    context = "\n\n".join([r["text"] for r in results])

    response = client.models.generate_content(
        model="models/gemini-2.0-flash-lite",
        contents=f"{SYSTEM_PROMPT}\n\nContext:\n{context}\n\nQuestion: {body.question}"
)

    return {
        "answer": response.text,
        "sources": [r["id"] for r in results]
}
