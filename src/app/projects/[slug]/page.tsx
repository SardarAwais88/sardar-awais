import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Project by Sardar Awais`,
    description: project.description,
    alternates: {
      canonical: `https://sardar-awais.vercel.app/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    author: {
      '@type': 'Person',
      name: 'Sardar Awais',
      url: 'https://sardar-awais.vercel.app',
    },
    programmingLanguage: project.tech,
    url: project.link || `https://sardar-awais.vercel.app/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="page-content">
        <article className={`section ${styles.projectDetail}`}>
          <div className="container">
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span> / </span>
              <Link href="/projects">Projects</Link>
              <span> / </span>
              <span>{project.title}</span>
            </nav>

            {/* Hero */}
            <div className={styles.hero} style={{ borderColor: `${project.color}30` }}>
              <div className={styles.heroIcon} style={{ background: `${project.color}15` }}>
                <span>{project.image}</span>
              </div>
              <div className={styles.heroMeta}>
                <span className="badge">{project.category}</span>
                {project.platform && (
                  <span className={styles.platform}>{project.platform}</span>
                )}
                {project.client && (
                  <span className={styles.client}>Client: {project.client}</span>
                )}
              </div>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.description}>{project.fullDescription || project.description}</p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: '8px' }}
                >
                  View Live Project ↗
                </a>
              )}
            </div>

            {/* Problem / Solution / Result */}
            {(project.problem || project.solution || project.result) && (
              <div className={styles.caseStudy}>
                {project.problem && (
                  <div className={styles.caseSection}>
                    <h2 className={styles.caseSectionTitle}>
                      <span style={{ color: project.color }}>🎯</span> The Problem
                    </h2>
                    <p>{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div className={styles.caseSection}>
                    <h2 className={styles.caseSectionTitle}>
                      <span style={{ color: project.color }}>⚙️</span> The Solution
                    </h2>
                    <p>{project.solution}</p>
                  </div>
                )}
                {project.result && (
                  <div className={styles.caseSection} style={{ borderColor: `${project.color}40`, background: `${project.color}08` }}>
                    <h2 className={styles.caseSectionTitle}>
                      <span style={{ color: project.color }}>✅</span> The Result
                    </h2>
                    <p>{project.result}</p>
                  </div>
                )}
                {project.role && (
                  <div className={styles.caseSection}>
                    <h2 className={styles.caseSectionTitle}>
                      <span style={{ color: project.color }}>👤</span> My Role
                    </h2>
                    <p>{project.role}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div className={styles.techSection}>
              <h2 className={styles.sectionTitle}>Tech Stack</h2>
              <div className={styles.techGrid}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={styles.techBadge}
                    style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={styles.ctaSection}>
              <h2>Want something similar built?</h2>
              <p>I build custom AI agents, web apps, e-commerce solutions, and automation systems. Let&apos;s discuss your project.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn btn-primary">
                  Start a Project 🚀
                </Link>
                <Link href="/projects" className="btn btn-outline">
                  ← Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
