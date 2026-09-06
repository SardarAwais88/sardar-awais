import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages } from "@/data/servicePages";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return servicePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicePages.find((p) => p.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicePages.find((p) => p.slug === params.slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Awais Portfolio",
      url: "https://example.com"
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="page-content">
        {/* Hero Section */}
        <section className={`section ${styles.hero}`} style={{ '--accent-color': service.color } as React.CSSProperties}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className="section-label" style={{ color: service.color }}>{service.title}</span>
              <h1 className="section-title gradient-text">
                {service.heroHeadline}
              </h1>
              <p className="section-subtitle">
                {service.heroSubtext}
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-primary">
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="section">
          <div className="container">
            <div className={styles.twoColumn}>
              <div className={styles.columnLeft}>
                <h2 className="section-title">What It Is</h2>
              </div>
              <div className={styles.columnRight}>
                <p className={styles.descriptionText}>{service.whatItIs}</p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className={`section ${styles.includedSection}`}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What&apos;s Included</h2>
              <p className="section-subtitle">Comprehensive solutions tailored to your needs</p>
            </div>
            <div className={styles.grid}>
              {service.whatsIncluded.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardIcon} style={{ color: service.color }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="section">
          <div className="container">
            <div className={styles.caseStudyContainer}>
              <div className={styles.caseStudyHeader}>
                <span className="section-label">Case Study</span>
                <h2 className="section-title">Real World Impact</h2>
                <p className="section-subtitle">{service.caseStudy.clientType}</p>
              </div>
              <div className={styles.caseStudyGrid}>
                <div className={styles.caseStudyBox}>
                  <h4 style={{ color: 'var(--color-error, #f87171)' }}>The Problem</h4>
                  <p>{service.caseStudy.problem}</p>
                </div>
                <div className={styles.caseStudyBox}>
                  <h4 style={{ color: 'var(--color-success, #4ade80)' }}>The Solution</h4>
                  <p>{service.caseStudy.solution}</p>
                </div>
                <div className={styles.caseStudyBox}>
                  <h4 style={{ color: service.color }}>The Result</h4>
                  <p className={styles.highlightText}>{service.caseStudy.result}</p>
                </div>
              </div>
              <div className={styles.techStack}>
                <span>Tech Stack:</span>
                <div className={styles.techTags}>
                  {service.caseStudy.techStack.map((tech) => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaBox} style={{ borderColor: service.color }}>
              <h2>Ready to get started?</h2>
              <p>Let&apos;s build something amazing together.</p>
              <Link href="/contact" className="btn btn-primary" style={{ backgroundColor: service.color, borderColor: service.color }}>
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
