from fastapi import FastAPI
from pydantic import BaseModel
from review import review_code
import json

app = FastAPI()

class CodeRequest(BaseModel):
    diff: str

@app.get("/")
def root():
    return {"status": "CodeReview.AI is running"}

@app.post("/review")
def review(request: CodeRequest):
    result = review_code(request.diff)
    clean = result.replace("```json", "").replace("```", "").strip()
    data = json.loads(clean)
    return data