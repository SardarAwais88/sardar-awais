'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CodeReviewerPage() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim() || code.trim().length < 10) {
      setError('Please paste some code to review (at least 10 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const res = await fetch('/api/code-reviewer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate review.');
        return;
      }

      setReview(data.result);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(review);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    setReview('');
    setError('');
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.proposalSection}`}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/tools">â† Back to Tools</Link>
          </div>

          <div className="section-header">
            <span className="section-label">// AI Tool</span>
            <h1 className="section-title">
              Code <span className="gradient-text">Reviewer</span>
            </h1>
            <p className="section-subtitle">
              Paste your code â†’ Get automated review, bug fixes, and optimization tips
            </p>
          </div>

          <div className={styles.writerGrid}>
            {/* Input */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>ðŸ’»</span>
                <h3>Your Code</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder={`Paste your code snippet here...\n\nExample:\nfunction fetchData(url) {\n  let data = fetch(url);\n  return data.json();\n}`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={16}
                style={{ fontFamily: 'var(--font-mono)' }}
              />
              <div className={styles.inputActions}>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className={`btn btn-primary ${styles.generateBtn}`}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} />
                      Reviewing...
                    </>
                  ) : (
                    <>ðŸ” Review Code</>
                  )}
                </button>
                <button onClick={handleClear} className="btn btn-outline">
                  Clear
                </button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* Output */}
            <div className={styles.outputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>âœ¨</span>
                <h3>Review & Feedback</h3>
                {review && (
                  <button onClick={handleCopy} className={styles.copyBtn}>
                    {copied ? 'âœ… Copied!' : 'ðŸ“‹ Copy'}
                  </button>
                )}
              </div>
              <div className={styles.proposalOutput}>
                {loading ? (
                  <div className={styles.loadingState}>
                    <div className={styles.loadingDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <p>AI is reviewing your code...</p>
                  </div>
                ) : review ? (
                  <div className={styles.proposalText}>
                    {review.split('\n').map((line, i) => {
                      if (line.startsWith('```')) return null; // Skip markdown code tags for simple text view
                      if (line.startsWith('#')) {
                        return <h4 key={i} style={{ marginTop: '15px', color: 'var(--accent-primary)' }}>{line.replace(/#/g, '').trim()}</h4>;
                      }
                      if (line.startsWith('-')) {
                        return <li key={i} style={{ marginLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{line.replace('-', '').trim()}</li>;
                      }
                      return <p key={i}>{line || <br />}</p>;
                    })}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>ðŸ”¬</span>
                    <p>Your code review will appear here</p>
                    <span className={styles.emptyHint}>
                      Paste code and click "Review Code"
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className={styles.tipsCard}>
            <h4>ðŸ’¡ Pro Tips for Better Reviews</h4>
            <div className={styles.tipsGrid}>
              <div className={styles.tip}>
                <span>ðŸ“Œ</span>
                <p>Include the surrounding context or dependencies if the code relies on them.</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸŽ¯</span>
                <p>Specify any specific concerns (e.g., "Is this SQL query safe?").</p>
              </div>
              <div className={styles.tip}>
                <span>âœï¸</span>
                <p>The AI will suggest a refactored, optimized version of your code.</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸ“ž</span>
                <p>Use this to catch subtle bugs before committing to production.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
