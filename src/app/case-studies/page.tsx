'use client';

import { useState } from 'react';
import Link from 'next/link';
import { caseStudies } from '@/data/caseStudies';
import styles from './page.module.css';

const categories = ['All', 'MCP Server', 'AI Voice Agent', 'RAG Chatbot', 'Full-Stack', 'Automation', 'E-Commerce', 'Chrome Extension'];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <div className="page-content">
      <section className={`section ${styles.projectsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Case Studies</span>
            <h1 className="section-title">
              Real <span className="gradient-text">Results</span>
            </h1>
            <p className="section-subtitle">
              Detailed breakdowns of problems solved, architectures built, and outcomes achieved.
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.filterActive : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {activeCategory === cat && (
                  <span className={styles.filterCount}>
                    {cat === 'All' ? caseStudies.length : filtered.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map((study, i) => (
              <Link
                href={`/case-studies/${study.slug}`}
                key={study.slug}
                className={styles.card}
                style={{
                  animationDelay: `${(i % 9) * 0.07}s`,
                }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardCategory}>
                    {study.category}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.cardDesc}>{study.problem}</p>

                <div className={styles.cardTech}>
                  {study.techStack.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={styles.cardLink}>
                  Read Case Study &rarr;
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No case studies found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
