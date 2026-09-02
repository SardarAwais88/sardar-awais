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

const budgets = ['< $500', '$500–$2k', '$2k–$5k', '$5k–$15k', '$15k+'];

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@sardarawais.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead from ${form.name}`,
          name: form.name,
          email: form.email,
          service: form.service || 'Not specified',
          budget: form.budget || 'Not specified',
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error('Failed to send email');
      setStatus('sent');
      setForm({ name: '', email: '', service: '', budget: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg((err as Error).message);
    }
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for WhatsApp
    if (!form.name || !form.email) {
      setErrorMsg('Please enter your Name and Email first.');
      setStatus('error');
      return;
    }

    const text = `Hi Sardar Awais! I want to discuss a project.
    
*Name:* ${form.name}
*Email:* ${form.email}
*Service:* ${form.service || 'Not specified'}
*Budget:* ${form.budget || 'Not specified'}

*Message:*
${form.message}`;

    const whatsappMsg = encodeURIComponent(text);
    window.open(`https://wa.me/923472725754?text=${whatsappMsg}`, '_blank');
    
    setStatus('sent');
    setForm({ name: '', email: '', service: '', budget: '', message: '' });
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
              '✅ Free project proposal in 24h',
              '✅ No upfront payment required',
              '✅ Dedicated project manager',
              '✅ Weekly progress updates',
              '✅ Post-launch support included',
            ].map((p) => (
              <li key={p} className={styles.perk}>
                {p}
              </li>
            ))}
          </ul>

          <div className={styles.badges}>
            <span className={styles.badge}>⭐ 5.0 Upwork Rating</span>
            <span className={styles.badge}>🚀 500+ projects</span>
            <span className={styles.badge}>🌍 Clients Worldwide</span>
          </div>
        </div>

        {/* Right column — form */}
        <div className={styles.right}>
          {status === 'sent' ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>🎉</div>
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
            <form className={styles.form}>
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
                <p className={styles.errorMsg}>⚠️ {errorMsg || 'Something went wrong. Try again.'}</p>
              )}

              <div className={styles.actionButtons}>
                <button 
                  type="button" 
                  onClick={handleWhatsApp}
                  disabled={status === 'sending'} 
                  className={styles.whatsappBtn}
                >
                  🚀 Send via WhatsApp
                </button>
                
                <button 
                  type="button" 
                  onClick={handleEmailSubmit}
                  disabled={status === 'sending'} 
                  className={styles.submitBtn}
                >
                  {status === 'sending' ? (
                    <>
                      <span className={styles.spinner} /> Sending...
                    </>
                  ) : (
                    <>📧 Send my Email</>
                  )}
                </button>
              </div>

              <p className={styles.note}>
                🔒 Your info is safe. We never share or sell your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
