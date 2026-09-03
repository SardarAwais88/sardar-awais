'use client';

import { timeline, testimonials, stats } from '@/data/timeline';
import Counter from '@/components/ui/Counter';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className="page-content">
      {/* ── Hero ──────────────────────────────────────── */}
      <section className={styles.aboutHero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarGlow} />
                <div className={styles.avatar}>
                  <span className={styles.avatarEmoji}>👨‍💻</span>
                </div>
                <div className={styles.avatarRing} />
              </div>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                Available for Projects
              </div>
            </div>

            <div className={styles.heroInfo}>
              <span className="section-label">// About Me</span>
              <h1 className={styles.heroTitle}>
                I&apos;m <span className="gradient-text">Sardar Awais</span>
              </h1>
              <h2 className={styles.heroSubtitle}>
                Cloud & AI Automation Engineer
              </h2>
              <p className={styles.heroBio}>
                I&apos;m a passionate developer with 6+ years of experience building
                web applications, AI systems, and automation tools. I started my
                professional journey at <strong>Kinitsol</strong> as a Full Stack
                Developer (2019-2020), where I mastered building enterprise-grade
                applications.
              </p>
              <p className={styles.heroBio}>
                Since then, I&apos;ve expanded into freelancing across Fiverr, Upwork,
                and Truelancer — delivering 500+ projects ranging from AI voice agents
                and trading bots to full e-commerce platforms and SaaS products. My
                mission is to help businesses leverage cutting-edge technology to scale.
              </p>

              <div className={styles.quickStats}>
                {stats.map((s, i) => (
                  <div key={i} className={styles.quickStat}>
                    <span className={styles.quickStatValue}>
                      <Counter end={s.value} suffix={s.suffix} />
                    </span>
                    <span className={styles.quickStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────── */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Journey</span>
            <h2 className="section-title">
              My <span className="gradient-text">Career Path</span>
            </h2>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} />
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`${styles.timelineItem} ${
                  i % 2 === 0 ? styles.left : styles.right
                }`}
              >
                <div className={styles.timelineDot}>
                  <span>{item.icon}</span>
                </div>
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  {item.company && (
                    <span className={styles.timelineCompany}>
                      @ {item.company}
                    </span>
                  )}
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Testimonials</span>
            <h2 className="section-title">
              What Clients <span className="gradient-text">Say</span>
            </h2>
          </div>

          <div className={styles.testimonials}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialQuote}>&ldquo;</div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    <span>{t.avatar}</span>
                  </div>
                  <div>
                    <h4 className={styles.testimonialName}>{t.name}</h4>
                    <p className={styles.testimonialRole}>
                      {t.role} — {t.project}
                    </p>
                    <div className={styles.testimonialMeta}>
                      <span className={styles.testimonialPlatform}>
                        {t.platform}
                      </span>
                      <span className={styles.testimonialDate}>{t.date}</span>
                      <span className={styles.testimonialStars}>
                        {'⭐'.repeat(t.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I Bring ──────────────────────────────── */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Why Choose Me</span>
            <h2 className="section-title">
              What I <span className="gradient-text">Bring</span>
            </h2>
          </div>

          <div className={styles.valuesGrid}>
            {[
              { icon: '🎯', title: 'Results-Driven', desc: 'Every project is built with measurable outcomes in mind. I focus on delivering real business value, not just code.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'I believe in agile development with regular milestones. You see progress from day one, not just at the deadline.' },
              { icon: '🔒', title: 'Reliable & Secure', desc: 'Clean, well-documented code with security best practices. Your project is built to last and scale.' },
              { icon: '💬', title: 'Clear Communication', desc: 'Regular updates, transparent timelines, and always available for questions. No surprises.' },
              { icon: '🚀', title: 'Cutting-Edge Tech', desc: 'I stay ahead of the curve with the latest AI, web, and automation technologies to give you a competitive edge.' },
              { icon: '🤝', title: 'Long-Term Partner', desc: 'I don\'t just deliver and disappear. I provide ongoing support and grow with your business needs.' },
            ].map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
