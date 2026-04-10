import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

result = client.models.embed_content(
model="models/gemini-embedding-001",
contents="hello world"
)

print(len(result.embeddings[0].values)) 

