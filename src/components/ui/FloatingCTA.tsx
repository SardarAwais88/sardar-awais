'use client';
import { useState, useEffect } from 'react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${styles.wrapper} ${visible ? styles.show : ''}`}>
      {/* Expanded actions */}
      <div className={`${styles.actions} ${expanded ? styles.actionsOpen : ''}`}>
        <a
          href="https://wa.me/923472725754?text=Hi%20AyeshaLabs!%20I%20want%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionBtn} ${styles.whatsapp}`}
          aria-label="Chat on WhatsApp"
        >
          <span className={styles.actionIcon}>💬</span>
          <span className={styles.actionLabel}>WhatsApp</span>
        </a>

        <a
          href="/contact"
          className={`${styles.actionBtn} ${styles.call}`}
          aria-label="Book a free call"
        >
          <span className={styles.actionIcon}>📅</span>
          <span className={styles.actionLabel}>Book a Call</span>
        </a>

        <a
          href="#get-quote"
          className={`${styles.actionBtn} ${styles.quote}`}
          aria-label="Get a free quote"
          onClick={() => setExpanded(false)}
        >
          <span className={styles.actionIcon}>🚀</span>
          <span className={styles.actionLabel}>Free Quote</span>
        </a>
      </div>

      {/* Main toggle button */}
      <button
        className={`${styles.mainBtn} ${expanded ? styles.mainBtnOpen : ''}`}
        onClick={() => setExpanded((e) => !e)}
        aria-label="Contact options"
      >
        <span className={styles.mainIcon}>{expanded ? '✕' : '💼'}</span>
        {!expanded && <span className={styles.pulse} />}
      </button>
    </div>
  );
}
