from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import Base, engine
from routers.upload import router as upload_router
import os

load_dotenv()
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)

@app.get("/health")
def health():
    return {"status": "ok"}

from routers.reindex import router as reindex_router
from services.faiss_store import load_index

app.include_router(reindex_router)

@app.on_event("startup")
async def startup():
    load_index()
    
from routers.query import router as query_router

app.include_router(query_router)
