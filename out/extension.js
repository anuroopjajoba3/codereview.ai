"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('codereview-ai.review', async () => {
        vscode.window.showInformationMessage('⚡ CodeReview.AI analyzing...');
        try {
            const response = await fetch('http://127.0.0.1:8000/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ diff: 'print(password)' })
            });
            const data = await response.json();
            const panel = vscode.window.createWebviewPanel('codeReview', 'CodeReview.AI Results', vscode.ViewColumn.Beside, {});
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
        }
        catch (err) {
            vscode.window.showErrorMessage('Make sure your FastAPI server is running on port 8000');
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map