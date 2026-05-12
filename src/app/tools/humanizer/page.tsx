'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type Mode = 'humanize' | 'detect';

interface DetectionResult {
  aiScore: number;
  plagScore: number;
  indicators: string[];
  verdict: string;
}

export default function HumanizerPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [mode, setMode] = useState<Mode>('humanize');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim() || inputText.trim().length < 20) {
      setError('Please enter at least 20 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setOutputText('');
    setDetection(null);

    try {
      const res = await fetch('/api/humanizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      if (mode === 'detect') {
        setDetection({
          aiScore: data.aiScore,
          plagScore: data.plagScore,
          indicators: data.indicators,
          verdict: data.verdict,
        });
      } else {
        setOutputText(data.result);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score <= 20) return '#00f5d4';
    if (score <= 50) return '#ffd700';
    return '#ff6b6b';
  };

  const getScoreLabel = (score: number) => {
    if (score <= 20) return 'Human';
    if (score <= 50) return 'Mixed';
    return 'AI Detected';
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.humanizerSection}`}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/tools">← Back to Tools</Link>
          </div>

          <div className="section-header">
            <span className="section-label">// AI Tool</span>
            <h1 className="section-title">
              AI <span className="gradient-text">Humanizer</span> &amp; Plagiarism Checker
            </h1>
            <p className="section-subtitle">
              Detect AI-generated content, check for plagiarism, and rewrite text to sound 100% human — undetectable by any tool.
            </p>
          </div>

          {/* Mode Selector */}
          <div className={styles.modeSelector}>
            <button
              className={`${styles.modeBtn} ${mode === 'humanize' ? styles.modeBtnActive : ''}`}
              onClick={() => { setMode('humanize'); setDetection(null); setOutputText(''); }}
            >
              ✨ Humanize &amp; Remove Plagiarism
            </button>
            <button
              className={`${styles.modeBtn} ${mode === 'detect' ? styles.modeBtnActive : ''}`}
              onClick={() => { setMode('detect'); setDetection(null); setOutputText(''); }}
            >
              🔍 Detect AI &amp; Plagiarism
            </button>
          </div>

          <div className={styles.writerGrid}>
            {/* Input Panel */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>📝</span>
                <h3>Input Text</h3>
                <span className={styles.wordCount}>
                  {inputText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                className={styles.textInput}
                placeholder={mode === 'humanize'
                  ? 'Paste your AI-generated or plagiarized text here to humanize it...'
                  : 'Paste any text here to check if it was written by AI or contains plagiarism...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={14}
              />
              <div className={styles.inputActions}>
                <button
                  onClick={handleProcess}
                  disabled={loading}
                  className={`btn btn-primary ${styles.processBtn}`}
                >
                  {loading ? (
                    <><span className={styles.spinner} /> Processing...</>
                  ) : mode === 'humanize' ? (
                    <>✨ Humanize Text</>
                  ) : (
                    <>🔍 Analyze Text</>
                  )}
                </button>
                <button
                  onClick={() => { setInputText(''); setOutputText(''); setDetection(null); setError(''); }}
                  className="btn btn-outline"
                >
                  Clear
                </button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* Output Panel */}
            <div className={styles.outputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>{mode === 'humanize' ? '🎯' : '📊'}</span>
                <h3>{mode === 'humanize' ? 'Humanized Output' : 'Analysis Results'}</h3>
                {outputText && (
                  <button onClick={handleCopy} className={styles.copyBtn}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                )}
              </div>

              <div className={styles.outputArea}>
                {loading ? (
                  <div className={styles.loadingState}>
                    <div className={styles.loadingDots}><span /><span /><span /></div>
                    <p>{mode === 'humanize' ? 'Rewriting to sound human...' : 'Analyzing text patterns...'}</p>
                  </div>
                ) : mode === 'detect' && detection ? (
                  <div className={styles.detectionResults}>
                    {/* Score Cards */}
                    <div className={styles.scoreCards}>
                      <div className={styles.scoreCard}>
                        <div className={styles.scoreCircle} style={{ borderColor: getScoreColor(detection.aiScore) }}>
                          <span className={styles.scoreValue} style={{ color: getScoreColor(detection.aiScore) }}>
                            {detection.aiScore}%
                          </span>
                        </div>
                        <span className={styles.scoreTitle}>AI Detection</span>
                        <span className={styles.scoreLabel} style={{ color: getScoreColor(detection.aiScore) }}>
                          {getScoreLabel(detection.aiScore)}
                        </span>
                      </div>
                      <div className={styles.scoreCard}>
                        <div className={styles.scoreCircle} style={{ borderColor: getScoreColor(detection.plagScore) }}>
                          <span className={styles.scoreValue} style={{ color: getScoreColor(detection.plagScore) }}>
                            {detection.plagScore}%
                          </span>
                        </div>
                        <span className={styles.scoreTitle}>Plagiarism Risk</span>
                        <span className={styles.scoreLabel} style={{ color: getScoreColor(detection.plagScore) }}>
                          {detection.plagScore <= 20 ? 'Original' : detection.plagScore <= 50 ? 'Some Risk' : 'High Risk'}
                        </span>
                      </div>
                    </div>

                    {/* Indicators */}
                    <div className={styles.indicatorsSection}>
                      <h4>⚠️ Key Indicators Found</h4>
                      <ul className={styles.indicatorsList}>
                        {detection.indicators.map((ind, i) => (
                          <li key={i}>{ind}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Verdict */}
                    <div className={styles.verdictBox}>
                      <strong>Verdict:</strong> {detection.verdict}
                    </div>

                    {/* CTA */}
                    <button
                      className={`btn btn-primary ${styles.humanizeCtaBtn}`}
                      onClick={() => { setMode('humanize'); setDetection(null); setOutputText(''); }}
                    >
                      ✨ Humanize This Text Now
                    </button>
                  </div>
                ) : outputText ? (
                  <div className={styles.humanizedOutput}>
                    <div className={styles.outputMeta}>
                      <span>✅ AI Undetectable</span>
                      <span>✅ Plagiarism Free</span>
                      <span>{outputText.split(/\s+/).length} words</span>
                    </div>
                    <div className={styles.outputText}>
                      {outputText.split('\n').map((line, i) => (
                        <p key={i}>{line || <br />}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>{mode === 'humanize' ? '✨' : '🔍'}</span>
                    <p>{mode === 'humanize' ? 'Your humanized text will appear here' : 'Analysis results will appear here'}</p>
                    <span className={styles.emptyHint}>
                      Paste your text and click &quot;{mode === 'humanize' ? 'Humanize Text' : 'Analyze Text'}&quot;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
