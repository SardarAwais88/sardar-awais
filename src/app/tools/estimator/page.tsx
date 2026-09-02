'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function EstimatorPage() {
  const [requirements, setRequirements] = useState('');
  const [estimate, setEstimate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!requirements.trim() || requirements.trim().length < 20) {
      setError('Please provide project requirements (at least 20 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setEstimate('');

    try {
      const res = await fetch('/api/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate estimate.');
        return;
      }

      setEstimate(data.result);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(estimate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setRequirements('');
    setEstimate('');
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
              Project <span className="gradient-text">Estimator</span>
            </h1>
            <p className="section-subtitle">
              Paste requirements â†’ Get a realistic cost and timeline breakdown
            </p>
          </div>

          <div className={styles.writerGrid}>
            {/* Input */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>ðŸ“‹</span>
                <h3>Project Requirements</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder={`Describe the project requirements...\n\nExample:\n"I need a complete e-commerce platform with user authentication, product catalog, shopping cart, Stripe integration, and an admin dashboard. Built using Next.js and Supabase."`}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                rows={16}
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
                      Analyzing...
                    </>
                  ) : (
                    <>ðŸ“Š Generate Estimate</>
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
                <span className={styles.panelIcon}>â³</span>
                <h3>Estimated Timeline & Cost</h3>
                {estimate && (
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
                    <p>AI is calculating timeline & cost...</p>
                  </div>
                ) : estimate ? (
                  <div className={styles.proposalText}>
                    {estimate.split('\n').map((line, i) => {
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
                    <span className={styles.emptyIcon}>ðŸ“ˆ</span>
                    <p>Your AI-generated estimate will appear here</p>
                    <span className={styles.emptyHint}>
                      Enter project requirements and click "Generate Estimate"
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className={styles.tipsCard}>
            <h4>ðŸ’¡ Pro Tips for Accurate Estimates</h4>
            <div className={styles.tipsGrid}>
              <div className={styles.tip}>
                <span>ðŸ“Œ</span>
                <p>Provide specific features and functionalities (e.g., "Google Auth", "Stripe Checkout").</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸŽ¯</span>
                <p>Mention the preferred tech stack if you have one.</p>
              </div>
              <div className={styles.tip}>
                <span>âœï¸</span>
                <p>Include any design or API integration requirements.</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸ“ž</span>
                <p>Use the estimate as a starting point for client negotiations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
