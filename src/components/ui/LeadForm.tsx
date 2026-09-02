'use client';
import { useState } from 'react';
import styles from './LeadForm.module.css';

const services = [
  'AI Agent Development',
  'Full-Stack Web App',
  'E-Commerce / Shopify',
  'Mobile App',
  'DevOps / Cloud',
  'Voice Agent (VAPI)',
  'Other',
];

const budgets = ['< $500', '$500â€“$2k', '$2kâ€“$5k', '$5kâ€“$15k', '$15k+'];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Service: ${form.service} | Budget: ${form.budget}\n\n${form.message}`,
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('sent');
      setForm({ name: '', email: '', service: '', budget: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg((err as Error).message);
    }
  };

  return (
    <section className={styles.section} id="get-quote">
      {/* Glow blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.container}>
        {/* Left column */}
        <div className={styles.left}>
          <span className={styles.label}>// Free Consultation</span>
          <h2 className={styles.heading}>
            Let&apos;s Build Your <span className={styles.accent}>Next Big Thing</span>
          </h2>
          <p className={styles.desc}>
            Tell us about your project and get a free detailed proposal within 24 hours. No
            commitment required.
          </p>

          <ul className={styles.perks}>
            {[
              'âœ… Free project proposal in 24h',
              'âœ… No upfront payment required',
              'âœ… Dedicated project manager',
              'âœ… Weekly progress updates',
              'âœ… Post-launch support included',
            ].map((p) => (
              <li key={p} className={styles.perk}>
                {p}
              </li>
            ))}
          </ul>

          <div className={styles.badges}>
            <span className={styles.badge}>â­ 5.0 Upwork Rating</span>
            <span className={styles.badge}>ðŸš€ 500+ Projects</span>
            <span className={styles.badge}>ðŸŒ Clients Worldwide</span>
          </div>
        </div>

        {/* Right column â€” form */}
        <div className={styles.right}>
          {status === 'sent' ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>ðŸŽ‰</div>
              <h3>Request Received!</h3>
              <p>
                We&apos;ll review your project and send a detailed proposal to{' '}
                <strong>{form.email || 'your inbox'}</strong> within 24 hours.
              </p>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Get a Free Quote</h3>

              {/* Row 1 */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Your Name *</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email Address *</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Service */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Service Needed</label>
                <div className={styles.chips}>
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.chip} ${form.service === s ? styles.chipActive : ''}`}
                      onClick={() => set('service', s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Project Budget</label>
                <div className={styles.chips}>
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`${styles.chip} ${form.budget === b ? styles.chipActive : ''}`}
                      onClick={() => set('budget', b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Project Details</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Describe your project, goals, timeline..."
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  rows={4}
                />
              </div>

              {status === 'error' && (
                <p className={styles.errorMsg}>âš ï¸ {errorMsg || 'Something went wrong. Try again.'}</p>
              )}

              <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} /> Sending...
                  </>
                ) : (
                  <>ðŸš€ Get Free Proposal</>
                )}
              </button>

              <p className={styles.note}>
                ðŸ”’ Your info is safe. We never share or sell your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
