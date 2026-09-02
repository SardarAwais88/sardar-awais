'use client';

import Link from 'next/link';
import { services, processSteps } from '@/data/services';
import styles from './page.module.css';

export default function ServicesPage() {
  return (
    <div className="page-content">
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Services</span>
            <h1 className="section-title">
              What I <span className="gradient-text">Offer</span>
            </h1>
            <p className="section-subtitle">
              End-to-end development solutions to transform your business
            </p>
          </div>

          {/* Services Grid */}
          <div className={styles.servicesGrid}>
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`${styles.serviceCard} ${
                  service.popular ? styles.popular : ''
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {service.popular && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}
                <div
                  className={styles.serviceGlow}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${service.color}12 0%, transparent 70%)`,
                  }}
                />

                <div
                  className={styles.serviceIcon}
                  style={{ background: `${service.color}12` }}
                >
                  <span>{service.icon}</span>
                </div>

                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>

                <ul className={styles.featureList}>
                  {service.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span
                        className={styles.featureCheck}
                        style={{ color: service.color }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={styles.serviceBottom}>
                  <div className={styles.priceRange}>
                    <span className={styles.priceLabel}>Starting from</span>
                    <span
                      className={styles.priceValue}
                      style={{ color: service.color }}
                    >
                      {service.priceRange}
                    </span>
                  </div>
                  <Link href="/contact" className={styles.serviceBtn}>
                    Get Started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// How I Work</span>
            <h2 className="section-title">
              My <span className="gradient-text">Process</span>
            </h2>
            <p className="section-subtitle">
              A systematic approach to delivering exceptional results
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={styles.processCard}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.processNumber}>
                  <span>{String(step.step).padStart(2, '0')}</span>
                </div>
                <span className={styles.processIcon}>{step.icon}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className={styles.ctaDesc}>
              Let&apos;s discuss your project requirements and find the perfect
              solution for your business.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Me Now 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
