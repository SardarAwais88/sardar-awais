'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message with form data
    const whatsappMsg = encodeURIComponent(
      `Hi Awais! I'm ${formData.name} (${formData.email}).\nBudget: ${formData.budget}\n\n${formData.message}`
    );
    window.open(`https://wa.me/923472725754?text=${whatsappMsg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Get in Touch</span>
            <h1 className="section-title">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h1>
            <p className="section-subtitle">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
          </div>

          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Let&apos;s Build Together</h3>
                <p className={styles.infoDesc}>
                  Whether you need a full-stack web application, an AI agent,
                  an e-commerce solution, DevOps setup, or automation tools — I&apos;m here
                  to help turn your vision into reality.
                </p>

                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📧</span>
                    <div>
                      <span className={styles.infoLabel}>Email</span>
                      <a href="mailto:info@sardarawais.com" className={styles.infoValue} style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                        info@sardarawais.com
                      </a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📱</span>
                    <div>
                      <span className={styles.infoLabel}>Phone</span>
                      <a href="tel:+923472725754" className={styles.infoValue} style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                        +92 347 2725754
                      </a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <div>
                      <span className={styles.infoLabel}>Location</span>
                      <span className={styles.infoValue}>Pakistan (Remote Worldwide)</span>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>⏰</span>
                    <div>
                      <span className={styles.infoLabel}>Availability</span>
                      <span className={styles.infoValue}>Mon - Sat, 9:00 AM - 11:00 PM PKT</span>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>⚡</span>
                    <div>
                      <span className={styles.infoLabel}>Response Time</span>
                      <span className={styles.infoValue}>Within 2-4 hours</span>
                    </div>
                  </div>
                </div>

                {/* Direct Message Buttons */}
                <div className={styles.directButtons}>
                  <a
                    href="https://wa.me/923472725754?text=Hi%20Awais!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Me Directly
                  </a>
                  <a
                    href="https://t.me/+923472725754"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.telegramBtn}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Telegram Me Directly
                  </a>
                </div>

                <div className={styles.platforms}>
                  <h4 className={styles.platformsTitle}>Hire me on</h4>
                  <div className={styles.platformLinks}>
                    <a
                      href="https://www.fiverr.com/sellers/mahboobhussa500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.platformLink}
                    >
                      <span>🟢</span> Fiverr
                    </a>
                    <a
                      href="https://www.upwork.com/freelancers/sardara32"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.platformLink}
                    >
                      <span>🟢</span> Upwork
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.platformLink}
                    >
                      <span>⚫</span> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/awais-mahboob-25202a13b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.platformLink}
                    >
                      <span>🔵</span> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formWrapper}>
              {submitted ? (
                <div className={styles.successCard}>
                  <span className={styles.successIcon}>🎉</span>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className={styles.input}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={styles.input}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-budget" className={styles.label}>
                      Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      className={styles.select}
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="$500 - $2,000">$500 - $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                      <option value="$20,000+">$20,000+</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      className={styles.textarea}
                      placeholder="Tell me about your project, goals, and timeline..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                    Send via WhatsApp 🚀
                  </button>
                  <p className={styles.formNote}>
                    Your message will open WhatsApp for instant communication
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
