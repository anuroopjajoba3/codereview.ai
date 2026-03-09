import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand('codereview-ai.review', async () => {
    
    vscode.window.showInformationMessage('⚡ CodeReview.AI analyzing...');

    try {
      const response = await fetch('http://127.0.0.1:8000/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff: 'print(password)' })
      });

      const data = await response.json() as {
        bugs: string[];
        security: string[];
        improvements: string[];
      };

      const panel = vscode.window.createWebviewPanel(
        'codeReview',
        'CodeReview.AI Results',
        vscode.ViewColumn.Beside,
        {}
      );

      panel.webview.html = `
        <html>
        <body style="font-family: sans-serif; padding: 20px;">
          <h2>⚡ CodeReview.AI</h2>
          
          <h3 style="color:red">🐛 Bugs</h3>
          ${data.bugs.length ? data.bugs.map(b => `<p>• ${b}</p>`).join('') : '<p>None found ✅</p>'}
          
          <h3 style="color:orange">🔐 Security</h3>
          ${data.security.length ? data.security.map(s => `<p>• ${s}</p>`).join('') : '<p>None found ✅</p>'}
          
          <h3 style="color:green">✨ Improvements</h3>
          ${data.improvements.length ? data.improvements.map(i => `<p>• ${i}</p>`).join('') : '<p>None found ✅</p>'}
        </body>
        </html>
      `;

    } catch (err) {
      vscode.window.showErrorMessage('Make sure your FastAPI server is running on port 8000');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}