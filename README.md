# ⚡ CodeReview.AI

AI-powered code review tool that analyzes your git diffs and catches bugs, security issues, and improvements before they reach production.

## Demo

![CodeReview.AI Dashboard](dashboard/public/demo.png)

## Features

- 🐛 **Bug Detection** — catches logic errors and edge cases
- 🔐 **Security Analysis** — flags hardcoded secrets, SQL injection, eval/exec usage
- ✨ **Code Improvements** — suggests better patterns and best practices
- 🖥️ **CLI Tool** — run reviews directly from your terminal
- 🌐 **React Dashboard** — visual interface with terminal-style UI
- 🔗 **FastAPI Backend** — REST API for integrations
- 🛑 **Git Hook** — automatically blocks commits with security issues
- 💻 **VS Code Extension** — review code without leaving your editor

## Tech Stack

**Backend:** Python, FastAPI, Claude API (Anthropic)  
**Frontend:** React, TypeScript  
**DevTools:** Git Hooks, VS Code Extension API  
**Libraries:** GitPython, Click, Rich, Pydantic

## Quick Start

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/anuroopjajoba3/codereview.ai.git
cd codereview-ai
\`\`\`

### 2. Set up Python environment
\`\`\`bash
python3 -m venv venv
source venv/bin/activate
pip install anthropic gitpython click rich python-dotenv fastapi uvicorn
\`\`\`

### 3. Add your API key
\`\`\`bash
echo "ANTHROPIC_API_KEY=your-key-here" > .env
\`\`\`

### 4. Run CLI review
\`\`\`bash
git add .
python3 main.py
\`\`\`

### 5. Run API server
\`\`\`bash
uvicorn api:app --reload
\`\`\`

### 6. Run Dashboard
\`\`\`bash
cd dashboard
npm install
npm start
\`\`\`

## Install Git Hook

Automatically review code before every commit:
\`\`\`bash
cp pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
\`\`\`

Now every `git commit` will trigger an AI review. Commits with security issues are **blocked automatically**.

## API

\`\`\`bash
POST /review
Content-Type: application/json

{
  "diff": "your git diff here"
}
\`\`\`

Response:
\`\`\`json
{
  "bugs": [],
  "security": ["Hardcoded password found"],
  "improvements": ["Use environment variables"]
}
\`\`\`

## Project Structure

\`\`\`
codereview-ai/
├── diff.py          # Git diff extraction
├── review.py        # Claude API integration
├── main.py          # CLI entry point
├── api.py           # FastAPI backend
├── pre-commit       # Git hook
├── dashboard/       # React frontend
└── src/             # VS Code extension
\`\`\`

## Built By

Anuroop Jajoba — MS Information Technology, University of New Hampshire  
[LinkedIn](https://linkedin.com/in/anuroopjajoba) • [GitHub](https://github.com/anuroopjajoba3)