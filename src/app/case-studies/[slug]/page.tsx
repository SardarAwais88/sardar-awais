import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { caseStudies } from '@/data/caseStudies';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: {
      canonical: `https://sardar-awais.vercel.app/case-studies/${study.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    description: study.metaDescription,
    author: {
      '@type': 'Person',
      name: 'Sardar Awais',
      url: 'https://sardar-awais.vercel.app',
    },
    url: `https://sardar-awais.vercel.app/case-studies/${study.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="page-content">
        <article className={`section ${styles.caseStudyDetail}`}>
          <div className="container">
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span> / </span>
              <Link href="/case-studies">Case Studies</Link>
              <span> / </span>
              <span>{study.title}</span>
            </nav>

            <div className={styles.hero}>
              <span className={styles.categoryBadge}>{study.category}</span>
              <h1 className={styles.title}>{study.title}</h1>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <h2>🎯 The Problem</h2>
                <p>{study.problem}</p>
              </div>
              <div className={styles.section}>
                <h2>⚙️ The Solution</h2>
                <p>{study.solution}</p>
              </div>
              <div className={`${styles.section} ${styles.resultHighlight}`}>
                <h2>✅ The Result</h2>
                <p className={styles.resultText}>{study.result}</p>
              </div>
            </div>

            <div className={styles.techSection}>
              <h2>Technologies Used</h2>
              <div className={styles.techGrid}>
                {study.techStack.map(t => (
                  <span key={t} className={styles.techBadge}>{t}</span>
                ))}
              </div>
            </div>

            <div className={styles.ctaSection}>
              <h2>Ready to achieve similar results?</h2>
              <div className={styles.ctaButtons}>
                <Link href={study.serviceLink} className="btn btn-primary">
                  Explore Service 🚀
                </Link>
                <Link href="/case-studies" className="btn btn-outline">
                  &larr; More Case Studies
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
