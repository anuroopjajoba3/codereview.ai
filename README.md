# ⚡ CodeReview.AI

AI-powered code review tool that analyzes your git diffs and catches bugs, security issues, and improvements before they reach production.

## Live Demo

🌐 **Dashboard:** http://codereview-ai-dashboard.s3-website-us-east-1.amazonaws.com  
⚙️ **API:** http://3.236.220.25:8000/docs  
🐳 **Docker:** `docker run -p 8000:8000 -e ANTHROPIC_API_KEY=your-key anuroopjajoba3/codereview-ai`

## Features

- 🐛 **Bug Detection** — catches logic errors and edge cases
- 🔐 **Security Analysis** — flags hardcoded secrets, SQL injection, eval/exec usage
- ✨ **Code Improvements** — suggests better patterns and best practices
- 🖥️ **CLI Tool** — run reviews directly from your terminal
- 🌐 **React Dashboard** — visual interface with terminal-style UI
- 🔗 **FastAPI Backend** — REST API for integrations
- 🛑 **Git Hook** — automatically blocks commits with security issues
- 💻 **VS Code Extension** — review code without leaving your editor

## Getting Started

### Option 1 — Live Dashboard (no setup)
Just paste your git diff and click Review Code. No installation needed.

🌐 **http://codereview-ai-dashboard.s3-website-us-east-1.amazonaws.com**

---

### Option 2 — CLI (run on your own machine)
```bash
git clone https://github.com/anuroopjajoba3/codereview.ai.git
cd codereview.ai
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "ANTHROPIC_API_KEY=your-key-here" > .env
```

Get your free API key at **console.anthropic.com**

Then go to your project and run:
```bash
cd your-project
python3 /path/to/codereview.ai/main.py
```

---

### Option 3 — Git Hook (auto-review on every commit)
```bash
cp /path/to/codereview.ai/pre-commit your-project/.git/hooks/pre-commit
chmod +x your-project/.git/hooks/pre-commit
```

Now every `git commit` automatically reviews your code and blocks commits with security issues.

---

### Option 4 — Docker (no Python setup needed)
```bash
docker run -p 8000:8000 -e ANTHROPIC_API_KEY=your-key-here anuroopjajoba3/codereview-ai
```

API runs at `http://localhost:8000` — use the `/docs` endpoint to explore.

---

> **Note:** Options 2, 3, and 4 require a free Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

## API
```bash
POST /review
Content-Type: application/json

{
  "diff": "your git diff here"
}
```

Response:
```json
{
  "bugs": [],
  "security": ["Hardcoded password found"],
  "improvements": ["Use environment variables"]
}
```

## Tech Stack

**Backend:** Python, FastAPI, Claude API (Anthropic)  
**Frontend:** React, TypeScript  
**DevTools:** Git Hooks, VS Code Extension API, Docker, GitHub Actions  
**Libraries:** GitPython, Click, Rich, Pydantic  
**Cloud:** AWS EC2, AWS S3

## Project Structure
```
codereview-ai/
├── diff.py          # Git diff extraction
├── review.py        # Claude API integration
├── main.py          # CLI entry point
├── api.py           # FastAPI backend
├── pre-commit       # Git hook
├── Dockerfile       # Docker config
├── requirements.txt # Python dependencies
├── dashboard/       # React frontend
└── src/             # VS Code extension
```

## Built By

Anuroop Jajoba
[LinkedIn](https://linkedin.com/in/anuroopjajoba) • [GitHub](https://github.com/anuroopjajoba3)