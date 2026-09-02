'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProposalWriterPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError('Please paste a job description (at least 20 characters).');
      return;
    }

    setLoading(true);
    setError('');
    setProposal('');

    try {
      const res = await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to generate proposal.');
        return;
      }

      setProposal(data.proposal);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setJobDescription('');
    setProposal('');
    setError('');
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.proposalSection}`}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/tools">← Back to Tools</Link>
          </div>

          <div className="section-header">
            <span className="section-label">// AI Tool</span>
            <h1 className="section-title">
              AI <span className="gradient-text">Proposal Writer</span>
            </h1>
            <p className="section-subtitle">
              Paste a job description → Get a winning, client-focused proposal instantly
            </p>
          </div>

          <div className={styles.writerGrid}>
            {/* Input */}
            <div className={styles.inputPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon}>📋</span>
                <h3>Job Description</h3>
              </div>
              <textarea
                className={styles.jobInput}
                placeholder={`Paste the Upwork/Fiverr job description here...\n\nExample:\n"We are seeking an experienced developer to build a custom AI chatbot for our e-commerce platform. The chatbot should handle customer inquiries, process orders, and provide product recommendations..."`}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
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
                    <>✍️ Generate Proposal</>
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
                <span className={styles.panelIcon}>🎯</span>
                <h3>Your Proposal</h3>
                {proposal && (
                  <button onClick={handleCopy} className={styles.copyBtn}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
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
                    <p>AI is crafting your proposal...</p>
                  </div>
                ) : proposal ? (
                  <div className={styles.proposalText}>
                    {proposal.split('\n').map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>✍️</span>
                    <p>Your AI-generated proposal will appear here</p>
                    <span className={styles.emptyHint}>
                      Paste a job description and click &quot;Generate Proposal&quot;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className={styles.tipsCard}>
            <h4>💡 Pro Tips for Better Proposals</h4>
            <div className={styles.tipsGrid}>
              <div className={styles.tip}>
                <span>📌</span>
                <p>Include the full job description with required skills for the best results</p>
              </div>
              <div className={styles.tip}>
                <span>🎯</span>
                <p>The AI targets specific client needs and avoids generic filler language</p>
              </div>
              <div className={styles.tip}>
                <span>✏️</span>
                <p>Review and personalize the generated proposal before sending</p>
              </div>
              <div className={styles.tip}>
                <span>📞</span>
                <p>Every proposal ends with a Zoom call invitation to build rapport</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
