import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface ReviewResult {
  bugs: string[];
  security: string[];
  improvements: string[];
}

function App() {
  const [diff, setDiff] = useState('');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState<string[]>(['CodeReview.AI v1.0.0', 'Type or paste your git diff below and press REVIEW CODE...', '']);
  const [cursor, setCursor] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (text: string) => {
    setLines(prev => [...prev, text]);
  };

  const handleReview = async () => {
    if (!diff) return;
    setLoading(true);
    setResult(null);
    addLine('');
    addLine('$ codereview --analyze diff');
    addLine('> Connecting to AI engine...');
    addLine('> Scanning for bugs...');
    addLine('> Running security checks...');
    addLine('> Generating improvements...');

    try {
      const response = await axios.post('http://3.236.220.25:8000/review', { diff });
      const data: ReviewResult = response.data;
      setResult(data);

      addLine('');
      addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      addLine('  ANALYSIS COMPLETE');
      addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      addLine(`  [BUGS]         ${data.bugs.length} found`);
      addLine(`  [SECURITY]     ${data.security.length} found`);
      addLine(`  [IMPROVEMENTS] ${data.improvements.length} found`);
      addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      if (data.bugs.length > 0) {
        addLine('');
        addLine('  🐛 BUGS:');
        data.bugs.forEach(b => addLine(`     • ${b}`));
      }
      if (data.security.length > 0) {
        addLine('');
        addLine('  🔐 SECURITY ISSUES:');
        data.security.forEach(s => addLine(`     • ${s}`));
      }
      if (data.improvements.length > 0) {
        addLine('');
        addLine('  ✨ IMPROVEMENTS:');
        data.improvements.forEach(i => addLine(`     • ${i}`));
      }
      addLine('');
      addLine('> Review complete. Stay secure. 🚀');
    } catch {
      addLine('> ERROR: Make sure FastAPI server is running on port 8000');
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      fontFamily: '"Courier New", monospace',
      color: '#00ff88',
      padding: 24,
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #00ff8840', paddingBottom: 12, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#00ff88" opacity="0.15"/>
            <rect x="1" y="1" width="26" height="26" rx="5" stroke="#00ff88" strokeWidth="1.5"/>
            <text x="5" y="19" fontFamily="Courier New" fontSize="13" fontWeight="bold" fill="#00ff88">{"</>"}</text>
          </svg>
          <span style={{ color: '#00ff88', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>CodeReview.AI</span>
        </span>
        <span style={{ color: '#ffffff30', fontSize: 13 }}>AI-Powered Code Analysis</span>
        <span style={{ color: '#00ff8860', fontSize: 12 }}>{new Date().toLocaleTimeString()}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1200, margin: '0 auto' }}>

        {/* Left — Input */}
        <div>
          <div style={{ color: '#00ff8880', fontSize: 12, marginBottom: 8 }}>// PASTE GIT DIFF</div>
          <textarea
            rows={14}
            value={diff}
            onChange={e => setDiff(e.target.value)}
            placeholder="+ print(password)&#10;+ eval(user_input)&#10;- safe_function()"
            style={{
              width: '100%',
              background: '#111',
              border: '1px solid #00ff8840',
              color: '#00ff88',
              fontFamily: '"Courier New", monospace',
              fontSize: 13,
              padding: 16,
              borderRadius: 4,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleReview}
            disabled={loading || !diff}
            style={{
              marginTop: 12,
              width: '100%',
              padding: '14px 0',
              background: loading ? '#001a0d' : '#00ff88',
              color: loading ? '#00ff88' : '#0a0a0a',
              border: loading ? '1px solid #00ff88' : 'none',
              borderRadius: 4,
              fontFamily: '"Courier New", monospace',
              fontSize: 14,
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: 2,
              transition: 'all 0.2s'
            }}
          >
            {loading ? '> ANALYZING...' : '> REVIEW CODE'}
          </button>

          {/* Stats */}
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: 'BUGS', value: result.bugs.length, color: '#ff4444' },
                { label: 'SECURITY', value: result.security.length, color: '#ffaa00' },
                { label: 'IMPROVE', value: result.improvements.length, color: '#00ff88' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: '#111',
                  border: `1px solid ${stat.color}40`,
                  borderRadius: 4,
                  padding: '16px 0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 28, fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: stat.color + '80', letterSpacing: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Terminal output */}
        <div style={{
          background: '#060606',
          border: '1px solid #00ff8830',
          borderRadius: 4,
          padding: 16,
          height: 480,
          overflowY: 'auto',
          fontSize: 12,
          lineHeight: 1.8
        }}>
          <div style={{ color: '#00ff8840', marginBottom: 8, fontSize: 11 }}>
            ● ● ● &nbsp;&nbsp; terminal
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line.startsWith('  [BUGS]') ? '#ff4444' :
                     line.startsWith('  [SECURITY]') ? '#ffaa00' :
                     line.startsWith('> ERROR') ? '#ff4444' :
                     line.startsWith('> Review complete') ? '#00ff88' :
                     line.includes('━') ? '#00ff8860' :
                     line.startsWith('  ANALYSIS') ? '#ffffff' :
                     '#00ff88aa'
            }}>
              {line}
            </div>
          ))}
          <div style={{ color: '#00ff88' }}>
            {cursor ? '█' : ' '}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default App;