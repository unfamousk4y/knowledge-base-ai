import pypdf, io

with open("Resume2026_DeanKaori.pdf", "rb") as f:
    pdf = pypdf.PdfReader(f)
    text = " ".join(page.extract_text() for page in pdf.pages)
    print(f"Total words: {len(text.split())}")
    print(f"Preview: {text[:200]}")
    
