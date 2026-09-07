import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="section text-center" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
          404
        </div>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
          Page Not <span className="gradient-text">Found</span>
        </h1>
        <p className="section-subtitle" style={{ marginBottom: '2.5rem', lineHeight: '1.6' }}>
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. 
          Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
          <Link href="/services" className="btn btn-outline">
            View Services
          </Link>
          <Link href="/case-studies" className="btn btn-outline">
            Read Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
