'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ReplyGeneratorPage() {
  const [originalOffer, setOriginalOffer] = useState('');
  const [clientReply, setClientReply] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!clientReply.trim()) {
      setError('Please paste the client\'s reply.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalOffer, clientReply }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate reply.');
        return;
      }

      setGeneratedReply(data.reply);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOriginalOffer('');
    setClientReply('');
    setGeneratedReply('');
    setError('');
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.replySection}`}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/tools">â† Back to Tools</Link>
          </div>

          <div className="section-header">
            <span className="section-label">// AI Tool</span>
            <h1 className="section-title">
              Client <span className="gradient-text">Reply Generator</span>
            </h1>
            <p className="section-subtitle">
              Paste the client&apos;s message and your original offer to generate a professional, persuasive reply that closes the deal.
            </p>
          </div>

          <div className={styles.writerGrid}>
            {/* Input Panel */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>ðŸ“„</span>
                <h3>Original Offer / Context (Optional)</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder="Paste what you originally sent to the client so the AI knows the context..."
                value={originalOffer}
                onChange={(e) => setOriginalOffer(e.target.value)}
                rows={8}
              />

              <div className={styles.panelHeader} style={{ marginTop: '20px' }}>
                <span className={styles.panelIcon}>ðŸ’¬</span>
                <h3>Client&apos;s Message</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder="Paste the client's reply here..."
                value={clientReply}
                onChange={(e) => setClientReply(e.target.value)}
                rows={8}
              />
              
              <div className={styles.inputActions} style={{ marginTop: '20px' }}>
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
                    <>ðŸ’¬ Generate Reply</>
                  )}
                </button>
                <button onClick={handleClear} className="btn btn-outline">
                  Clear
                </button>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>

            {/* Output Panel */}
            <div className={styles.outputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>ðŸŽ¯</span>
                <h3>Generated Reply</h3>
                {generatedReply && (
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
                    <p>AI is crafting the perfect reply...</p>
                  </div>
                ) : generatedReply ? (
                  <div className={styles.proposalText}>
                    {generatedReply.split('\n').map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>âœï¸</span>
                    <p>Your AI-generated reply will appear here</p>
                    <span className={styles.emptyHint}>
                      Paste the conversation context and click &quot;Generate Reply&quot;
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
