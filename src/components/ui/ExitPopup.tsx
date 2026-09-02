'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './ExitPopup.module.css';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('exitPopupDismissed')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
      }
    };

    // Also show after 45s of inactivity
    const timer = setTimeout(() => {
      if (!triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('exitPopupDismissed', '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Exit Popup Lead',
          email,
          message: 'Subscribed via exit-intent popup',
        }),
      });
    } catch {
      // silent fail
    }
    setSent(true);
    setTimeout(dismiss, 3000);
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && dismiss()}>
      <div className={styles.modal}>
        {/* Close */}
        <button className={styles.close} onClick={dismiss} aria-label="Close">âœ•</button>

        {/* Left */}
        <div className={styles.left}>
          <div className={styles.emoji}>ðŸŽ</div>
          <h2 className={styles.title}>Wait! Before You Go...</h2>
          <p className={styles.desc}>
            Get a <strong>FREE 30-minute strategy call</strong> + a custom project roadmap â€” no strings attached.
          </p>
          <ul className={styles.perks}>
            <li>âœ… Free project audit</li>
            <li>âœ… Tech stack recommendations</li>
            <li>âœ… Cost & timeline estimate</li>
            <li>âœ… No sales pressure</li>
          </ul>
        </div>

        {/* Right */}
        <div className={styles.right}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>ðŸŽ‰</div>
              <h3>You&apos;re In!</h3>
              <p>We&apos;ll reach out within 24 hours to schedule your free call.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <p className={styles.formLabel}>Drop your email â€” we&apos;ll do the rest:</p>
              <input
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className={styles.btn}>
                ðŸš€ Claim My Free Call
              </button>
              <button type="button" className={styles.skip} onClick={dismiss}>
                No thanks, I don&apos;t need help
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
