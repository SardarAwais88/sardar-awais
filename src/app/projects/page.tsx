'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects, categories } from '@/data/projects';
import styles from './page.module.css';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="page-content">
      <section className={`section ${styles.projectsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// My Work</span>
            <h1 className="section-title">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle">
              48+ projects delivered across web development, AI, e-commerce,
              and automation
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
                    {cat === 'All' ? projects.length : filtered.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className={styles.card}
                style={{
                  animationDelay: `${(i % 9) * 0.07}s`,
                  textDecoration: 'none',
                }}
              >
                <div
                  className={styles.cardGlow}
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 70%)`,
                  }}
                />

                <div className={styles.cardTop}>
                  <div
                    className={styles.cardIcon}
                    style={{ background: `${project.color}15` }}
                  >
                    <span>{project.image}</span>
                  </div>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.cardCategory}
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        background: `${project.color}10`,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.platform && (
                      <span className={styles.cardPlatform}>
                        {project.platform}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                {project.client && (
                  <div className={styles.cardClient}>
                    <span className={styles.clientLabel}>Client:</span>
                    <span className={styles.clientName}>{project.client}</span>
                  </div>
                )}

                <div className={styles.cardTech}>
                  {project.tech.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
