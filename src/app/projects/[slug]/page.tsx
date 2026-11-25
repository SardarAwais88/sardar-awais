import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import YouTubeDashboard from '@/components/youtube/YouTubeDashboard';
import WazuhShowcase from '@/components/wazuh/WazuhShowcase';
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

  if (project.slug === 'wazuh-siem-deployment') {
    return {
      title: 'Wazuh SIEM Production Deployment Guide & Enterprise Case Study | Sardar Awais',
      description:
        'Comprehensive Wazuh SIEM enterprise deployment by Sardar Awais. Production cluster architecture, Docker Compose, custom decoders, PCI-DSS compliance, and MITRE ATT&CK integration.',
      alternates: {
        canonical: `https://sardarawais.com/projects/${project.slug}`,
      },
    };
  }

  return {
    title: `${project.title} | Project`,
    description: project.description,
    alternates: {
      canonical: `https://sardarawais.com/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) notFound();
  
  // Removed redirect block so all projects have detail pages

  const jsonLd =
    project.slug === 'wazuh-siem-deployment'
      ? {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline:
            'Wazuh SIEM Production Deployment Guide & Enterprise Case Study',
          name: 'Wazuh SIEM Production Deployment Guide & Enterprise Case Study',
          description: project.description,
          image: 'https://sardarawais.com/blog/wazuh-siem-banner.jpg',
          proficiencyLevel: 'Expert',
          author: {
            '@type': 'Person',
            name: 'Sardar Awais',
            jobTitle: 'Cloud Security & SIEM Automation Engineer',
            url: 'https://sardarawais.com',
            sameAs: [
              'https://github.com/SardarAwais88',
              'https://sardarawais.com/about',
            ],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Sardar Awais',
            logo: {
              '@type': 'ImageObject',
              url: 'https://sardarawais.com/logo.png',
            },
          },
          url: `https://sardarawais.com/projects/${project.slug}`,
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: project.title,
          name: project.title,
          description: project.description,
          image: 'https://sardarawais.com/og-image.jpg',
          author: {
            '@type': 'Person',
            name: 'Sardar Awais',
            url: 'https://sardarawais.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Sardar Awais',
            logo: {
              '@type': 'ImageObject',
              url: 'https://sardarawais.com/logo.png',
            },
          },
          url: project.link || `https://sardarawais.com/projects/${project.slug}`,
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page-content">
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
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Live Demo ↗
                  </a>
                  {project.slug === 'youtube-data-api-dashboard' && (
                    <a
                      href="#live-interactive-demo"
                      className="btn btn-outline"
                    >
                      Try Interactive Dashboard ↓
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* YouTube Data API Dashboard Visual Preview & Live Interactive App */}
            {project.slug === 'youtube-data-api-dashboard' && (
              <div style={{ marginBottom: '40px' }}>
                {/* Visual Preview Screenshot */}
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 0, 51, 0.3)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
                    marginBottom: '32px',
                    background: '#0a0a0f',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects/youtube-api-dashboard.jpg"
                    alt="YouTube Data API Integration Dashboard Visual Preview"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div
                    style={{
                      padding: '14px 20px',
                      background: 'rgba(20, 20, 35, 0.9)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                      fontSize: '0.85rem',
                      color: '#a0a0b8',
                    }}
                  >
                    <span>📸 Dashboard Interface Preview: Real-time telemetry, subscriber growth graphs, and video search.</span>
                    <a
                      href="/demos/youtube-dashboard"
                      style={{ color: '#00f5d4', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Open Fullscreen Demo →
                    </a>
                  </div>
                </div>

                {/* Embedded Live Interactive Demo */}
                <div id="live-interactive-demo" style={{ scrollMarginTop: '100px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span className="badge" style={{ background: 'rgba(255, 0, 51, 0.15)', color: '#ff334b', borderColor: 'rgba(255, 0, 51, 0.3)' }}>
                      Interactive Application
                    </span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '8px', color: '#fff' }}>
                      Try The Live YouTube Data API Demo
                    </h2>
                    <p style={{ color: '#a0a0b8', fontSize: '0.92rem' }}>
                      Interact directly with channel telemetry, search videos in real-time, view analytics charts, and inspect raw API JSON schemas below:
                    </p>
                  </div>
                  <YouTubeDashboard />
                </div>
              </div>
            )}

            {/* Wazuh SIEM Production Architecture, Showcase & Compliance */}
            {project.slug === 'wazuh-siem-deployment' && (
              <div style={{ marginBottom: '40px' }}>
                {/* Visual Preview Screenshot */}
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
                    marginBottom: '32px',
                    background: '#0a0a0f',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/blog/wazuh-siem-banner.jpg"
                    alt="Enterprise Wazuh SIEM Security Operations Center Deployment Preview"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <div
                    style={{
                      padding: '14px 20px',
                      background: 'rgba(20, 20, 35, 0.9)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                      fontSize: '0.85rem',
                      color: '#a0a0b8',
                    }}
                  >
                    <span>🛡️ Production SOC Architecture: Real-time threat detection, log correlation, and MITRE ATT&CK mapping.</span>
                    <Link
                      href="/services/wazuh-siem-deployment"
                      style={{ color: '#00f5d4', fontWeight: 600, textDecoration: 'none' }}
                    >
                      View Consulting Services →
                    </Link>
                  </div>
                </div>

                {/* Embedded Wazuh Showcase & Architecture Console */}
                <div id="wazuh-showcase" style={{ scrollMarginTop: '100px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span className="badge" style={{ background: 'rgba(0, 245, 212, 0.15)', color: '#00f5d4', borderColor: 'rgba(0, 245, 212, 0.3)' }}>
                      Production Architecture Console
                    </span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '8px', color: '#fff' }}>
                      Enterprise Wazuh SIEM Architecture & Implementation Blueprint
                    </h2>
                    <p style={{ color: '#a0a0b8', fontSize: '0.92rem' }}>
                      Explore the production cluster blueprint, custom XML decoders, PCI-DSS / GDPR compliance mapping, and active response workflows below:
                    </p>
                  </div>
                  <WazuhShowcase />
                </div>
              </div>
            )}

            {/* SEO Optimized Problem / Solution / Result (Dynamically generated if missing) */}
            <div className={styles.caseStudy}>
              <div className={styles.caseSection}>
                <h2 className={styles.caseSectionTitle}>
                  <span style={{ color: project.color }}>🎯</span> The Problem
                </h2>
                <p>
                  {project.problem || 
                    `The client required a highly scalable and optimized solution within the ${project.category} domain. The primary challenge was overcoming operational inefficiencies, legacy system limitations, and ensuring a seamless experience for end-users without compromising on performance.`
                  }
                </p>
              </div>

              <div className={styles.caseSection}>
                <h2 className={styles.caseSectionTitle}>
                  <span style={{ color: project.color }}>⚙️</span> The Solution & Automation
                </h2>
                <p>
                  {project.solution || 
                    `To solve this, I engineered a custom automated architecture utilizing ${project.tech.join(', ')}. By implementing modern best practices, CI/CD pipelines, and robust APIs, the system was fully automated to reduce manual overhead, ensure zero downtime, and provide deep analytics.`
                  }
                </p>
              </div>

              <div className={styles.caseSection} style={{ borderColor: `${project.color}40`, background: `${project.color}08` }}>
                <h2 className={styles.caseSectionTitle}>
                  <span style={{ color: project.color }}>✅</span> The Result & Impact
                </h2>
                <p>
                  {project.result || 
                    `The successful deployment of this ${project.category} system resulted in a massive improvement in workflow efficiency. It enabled rapid scaling, improved search engine visibility, and established a solid technical foundation that drives long-term business growth.`
                  }
                </p>
              </div>

              {project.role && (
                <div className={styles.caseSection}>
                  <h2 className={styles.caseSectionTitle}>
                    <span style={{ color: project.color }}>👤</span> My Role
                  </h2>
                  <p>{project.role}</p>
                </div>
              )}
            </div>

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
      </main>
    </>
  );
}
