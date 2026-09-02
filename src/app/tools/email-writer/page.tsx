'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function EmailWriterPage() {
  const [context, setContext] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim() || context.trim().length < 10) {
      setError('Please provide email context (at least 10 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setEmail('');

    try {
      const res = await fetch('/api/email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate email.');
        return;
      }

      setEmail(data.result);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setContext('');
    setEmail('');
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
              AI <span className="gradient-text">Email Writer</span>
            </h1>
            <p className="section-subtitle">
              Provide context â†’ Get a professional, ready-to-send email instantly
            </p>
          </div>

          <div className={styles.writerGrid}>
            {/* Input */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>ðŸ“‹</span>
                <h3>Email Context / Draft</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder={`Describe the email you want to send...\n\nExample:\n"A follow-up email to John. We had a meeting last Tuesday about the Shopify redesign. I want to check if he has reviewed the proposal and when we can start."`}
                value={context}
                onChange={(e) => setContext(e.target.value)}
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
                      Generating...
                    </>
                  ) : (
                    <>ðŸ“§ Generate Email</>
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
                <span className={styles.panelIcon}>ðŸ“©</span>
                <h3>Your Email</h3>
                {email && (
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
                    <p>AI is drafting your email...</p>
                  </div>
                ) : email ? (
                  <div className={styles.proposalText}>
                    {email.split('\n').map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>ðŸ“§</span>
                    <p>Your AI-generated email will appear here</p>
                    <span className={styles.emptyHint}>
                      Enter context and click "Generate Email"
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className={styles.tipsCard}>
            <h4>ðŸ’¡ Pro Tips for Better Emails</h4>
            <div className={styles.tipsGrid}>
              <div className={styles.tip}>
                <span>ðŸ“Œ</span>
                <p>Provide specific details like dates, names, or key discussion points.</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸŽ¯</span>
                <p>Mention the desired tone if needed (e.g., "Make it very formal" or "Keep it casual").</p>
              </div>
              <div className={styles.tip}>
                <span>âœï¸</span>
                <p>Always review the generated email to ensure it aligns perfectly with your voice.</p>
              </div>
              <div className={styles.tip}>
                <span>ðŸ“ž</span>
                <p>Clearly state your Call to Action (what do you want the recipient to do next?).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
