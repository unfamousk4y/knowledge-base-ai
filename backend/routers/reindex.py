from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Chunk
from services.embedder import embed_texts
from services.faiss_store import build_index

router = APIRouter()

@router.post("/api/reindex")
def reindex(db: Session = Depends(get_db)):
    chunks = db.query(Chunk).all()
    if not chunks:
        return {"error": "No chunks found"}

    texts = [c.content for c in chunks]
    vectors = embed_texts(texts)

    chunk_tuples = [(c.id, c.content) for c in chunks]
    build_index(chunk_tuples, vectors)

    return {"indexed": len(chunks)}
