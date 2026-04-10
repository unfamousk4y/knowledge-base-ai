from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Document, Chunk
from services.chunker import chunk_text
import pypdf, io

router = APIRouter()

@router.post("/api/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()

    if file.filename.endswith(".pdf"):
        pdf = pypdf.PdfReader(io.BytesIO(contents))
        text = " ".join(page.extract_text() for page in pdf.pages)
    else:
        text = contents.decode("utf-8")

    doc = Document(filename=file.filename, raw_text=text)
    db.add(doc)
    db.commit()
    db.refresh(doc)

    chunks = chunk_text(text)
    for i, chunk in enumerate(chunks):
        db.add(Chunk(doc_id=doc.id, chunk_index=i, content=chunk))
    db.commit()

    return {"doc_id": doc.id, "chunks": len(chunks)}
