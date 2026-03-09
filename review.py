import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def review_code(diff):
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1000,
        messages=[{
            "role": "user",
            "content": f"""You are an expert code reviewer. Analyze this git diff and return ONLY a JSON object with this structure:
{{
  "bugs": ["list of bugs found"],
  "security": ["list of security issues"],
  "improvements": ["list of suggestions"]
}}

Git diff:
{diff}"""
        }]
    )
    return response.content[0].text

if __name__ == "__main__":
    from diff import get_diff
    diff = get_diff()
    if diff:
        print(review_code(diff))
    else:
        print("No changes to review")