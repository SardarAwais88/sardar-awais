'use client';

import { useState } from 'react';
import { skillCategories } from '@/data/skills';
import styles from './page.module.css';

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="page-content">
      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Skills & Expertise</span>
            <h1 className="section-title">
              My <span className="gradient-text">Tech Arsenal</span>
            </h1>
            <p className="section-subtitle">
              Mastering modern technologies to deliver exceptional results
            </p>
          </div>

          {/* Category Tabs */}
          <div className={styles.tabs}>
            {skillCategories.map((cat, i) => (
              <button
                key={cat.name}
                className={`${styles.tab} ${
                  activeCategory === i ? styles.tabActive : ''
                }`}
                onClick={() => setActiveCategory(i)}
                style={
                  activeCategory === i
                    ? {
                        borderColor: cat.color,
                        color: cat.color,
                        background: `${cat.color}10`,
                      }
                    : {}
                }
              >
                <span className={styles.tabIcon}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div className={styles.skillsDisplay}>
            <div className={styles.skillsList}>
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className={styles.skillItem}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={styles.skillHeader}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillIcon}>{skill.icon}</span>
                      <span className={styles.skillName}>{skill.name}</span>
                    </div>
                    <div className={styles.skillStats}>
                      <span className={styles.skillProjects}>
                        {skill.projects} projects
                      </span>
                      <span
                        className={styles.skillLevel}
                        style={{
                          color: skillCategories[activeCategory].color,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].color}80)`,
                        boxShadow: `0 0 15px ${skillCategories[activeCategory].color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Category Summary */}
            <div className={styles.categorySummary}>
              <div
                className={styles.summaryCard}
                style={{
                  borderColor: `${skillCategories[activeCategory].color}30`,
                }}
              >
                <div
                  className={styles.summaryIcon}
                  style={{
                    background: `${skillCategories[activeCategory].color}15`,
                  }}
                >
                  <span>
                    {skillCategories[activeCategory].icon}
                  </span>
                </div>
                <h3 className={styles.summaryTitle}>
                  {skillCategories[activeCategory].name}
                </h3>
                <div className={styles.summaryStats}>
                  <div className={styles.summaryStat}>
                    <span className={styles.summaryValue}>
                      {skillCategories[activeCategory].skills.length}
                    </span>
                    <span className={styles.summaryLabel}>Technologies</span>
                  </div>
                  <div className={styles.summaryStat}>
                    <span className={styles.summaryValue}>
                      {skillCategories[activeCategory].skills.reduce(
                        (acc, s) => acc + s.projects,
                        0
                      )}
                    </span>
                    <span className={styles.summaryLabel}>Total Projects</span>
                  </div>
                  <div className={styles.summaryStat}>
                    <span className={styles.summaryValue}>
                      {Math.round(
                        skillCategories[activeCategory].skills.reduce(
                          (acc, s) => acc + s.level,
                          0
                        ) / skillCategories[activeCategory].skills.length
                      )}
                      %
                    </span>
                    <span className={styles.summaryLabel}>Avg Proficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Categories Overview */}
          <div className={styles.overviewSection}>
            <h2 className={styles.overviewTitle}>
              Complete <span className="gradient-text">Overview</span>
            </h2>
            <div className={styles.overviewGrid}>
              {skillCategories.map((cat) => (
                <div key={cat.name} className={styles.overviewCard}>
                  <div className={styles.overviewHeader}>
                    <span className={styles.overviewIcon}>{cat.icon}</span>
                    <h3
                      className={styles.overviewName}
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                  <div className={styles.overviewSkills}>
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className={styles.miniSkill}>
                        <span>{skill.icon}</span>
                        <span className={styles.miniSkillName}>
                          {skill.name}
                        </span>
                        <span
                          className={styles.miniSkillLevel}
                          style={{ color: cat.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
