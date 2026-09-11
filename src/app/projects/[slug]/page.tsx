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

  const jsonLd = {
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
        url: 'https://sardarawais.com/logo.png'
      }
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
