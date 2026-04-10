import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def embed_texts(texts: list[str]) -> list[list[float]]:
    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=texts
)
    return [e.values for e in result.embeddings]

def embed_single(text: str) -> list[float]:
    return embed_texts([text])[0]



