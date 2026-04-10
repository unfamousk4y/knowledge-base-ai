
import faiss
import numpy as np
import os

INDEX_PATH = "knowledge.index"
MAPPING_PATH = "chunk_map.npy"

index = None
chunk_map = {} # maps faiss position -> chunk text

def build_index(chunks: list[tuple[int, str]], vectors: list[list[float]]):
    global index, chunk_map

    dim = len(vectors[0])
    index = faiss.IndexFlatL2(dim)

    vecs = np.array(vectors, dtype='float32')
    index.add(vecs)

    chunk_map = {i: {"id": chunks[i][0], "text": chunks[i][1]} for i in range(len(chunks))}

    faiss.write_index(index, INDEX_PATH)
    np.save(MAPPING_PATH, chunk_map)

def load_index():
    global index, chunk_map
    if os.path.exists(INDEX_PATH) and os.path.exists(MAPPING_PATH):
        index = faiss.read_index(INDEX_PATH)
        chunk_map = np.load(MAPPING_PATH, allow_pickle=True).item()

def search(query_vector: list[float], k: int = 5):
    if index is None:
        return []
    vec = np.array([query_vector], dtype='float32')
    D, I = index.search(vec, k)
    return [chunk_map[i] for i in I[0] if i in chunk_map]