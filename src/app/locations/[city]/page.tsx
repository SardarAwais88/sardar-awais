import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { services } from '@/data/services';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  
  if (!location) return {};
  
  return {
    title: `Top ${location.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Sardar Awais`,
    description: location.description,
    alternates: {
      canonical: `https://sardarawais.com/locations/${location.slug}`,
    }
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  
  if (!location) notFound();

  return (
    <main className="page-content" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>Local SEO Optimized</span>
          <h1 className="section-title">
            The Leading <span className="gradient-text">Marketing Automation Agency</span> in {location.city}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {location.description}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {services.slice(0, 3).map((service) => (
            <div key={service.id} style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{service.title} in {location.city}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
