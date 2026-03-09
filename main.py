import click
import json
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from diff import get_diff
from review import review_code

console = Console()

@click.command()
def codereview():
    console.print("\n[bold green]⚡ CodeReview.AI[/bold green]", justify="center")
    console.print("[dim]Analyzing your code...[/dim]\n")

    diff = get_diff()

    if not diff:
        console.print("[yellow]No changes detected. Stage your changes first with git add[/yellow]")
        return

    result = review_code(diff)

    # clean json
    clean = result.replace("```json", "").replace("```", "").strip()
    data = json.loads(clean)

    # bugs
    if data["bugs"]:
        console.print(Panel(
            "\n".join(f"🐛 {b}" for b in data["bugs"]),
            title="[red]Bugs[/red]", border_style="red"
        ))

    # security
    if data["security"]:
        console.print(Panel(
            "\n".join(f"🔐 {s}" for s in data["security"]),
            title="[yellow]Security Issues[/yellow]", border_style="yellow"
        ))

    # improvements
    if data["improvements"]:
        console.print(Panel(
            "\n".join(f"✨ {i}" for i in data["improvements"]),
            title="[green]Improvements[/green]", border_style="green"
        ))

    console.print("\n[dim]Review complete![/dim]\n")

if __name__ == "__main__":
    codereview()