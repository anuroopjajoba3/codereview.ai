from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from review import review_code
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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