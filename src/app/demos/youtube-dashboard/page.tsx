import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import YouTubeDashboard from '@/components/youtube/YouTubeDashboard';

export const metadata: Metadata = {
  title: 'YouTube Data API Integration Dashboard | Live Interactive Demo',
  description:
    'Interactive developer demo showcasing YouTube Data API v3 integration: channel analytics, subscriber telemetry, video search, filters, pagination, and raw JSON API schemas.',
  alternates: {
    canonical: 'https://sardarawais.com/demos/youtube-dashboard',
  },
};

export default function YouTubeDashboardDemoPage() {
  return (
    <main className="page-content" style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Navigation Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '0.88rem', color: '#a0a0b8' }}>
          <Link href="/" style={{ color: '#00f5d4', textDecoration: 'none' }}>Home</Link>
          <span> / </span>
          <Link href="/projects" style={{ color: '#00f5d4', textDecoration: 'none' }}>Projects</Link>
          <span> / </span>
          <Link href="/projects/youtube-data-api-dashboard" style={{ color: '#00f5d4', textDecoration: 'none' }}>
            YouTube API Project
          </Link>
          <span> / </span>
          <span style={{ color: '#fff' }}>Live Demo</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 0, 51, 0.1)', border: '1px solid rgba(255, 0, 51, 0.3)', padding: '6px 14px', borderRadius: '20px', color: '#ff334b', fontSize: '0.82rem', fontWeight: 600, marginBottom: '14px' }}>
            <span>📺</span> Developer Showcase Demo
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '12px', color: '#fff' }}>
            YouTube Data API <span style={{ color: '#ff0033' }}>Integration Dashboard</span>
          </h1>
          <p style={{ color: '#a0a0b8', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6 }}>
            A fully interactive demonstration of YouTube Data API v3 capabilities: channel telemetry, video search, category filtering, dynamic sorting, analytics charts, and raw JSON response inspection.
          </p>
        </div>

        {/* The Live Interactive Dashboard */}
        <YouTubeDashboard />

        {/* Technical Architecture Breakdown */}
        <div style={{ marginTop: '50px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
            Engineering & YouTube Data API Concepts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', color: '#a0a0b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ color: '#00f5d4', fontSize: '1.05rem', marginBottom: '8px' }}>1. Quota & Cost Optimization</h3>
              <p>
                The YouTube Data API enforces a default quota of 10,000 units/day. While `videos.list` and `channels.list` cost 1 unit each, `search.list` costs 100 units. In production architectures, I implement Redis caching and debounce strategies to reduce quota consumption by 90%+.
              </p>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ color: '#7b61ff', fontSize: '1.05rem', marginBottom: '8px' }}>2. REST API & Webhook Ingestion</h3>
              <p>
                Seamless backend integration using Python (FastAPI) and Node.js with Google APIs Client Library, handling OAuth2 refresh tokens, PubSubHubbub webhook feeds for instant upload notifications, and automated playlist ingestion.
              </p>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 style={{ color: '#ff334b', fontSize: '1.05rem', marginBottom: '8px' }}>3. Analytics & Token Pagination</h3>
              <p>
                Handling cursor-based `nextPageToken` and `prevPageToken` parameters, batching multiple video IDs in a single query (`id=id1,id2,id3`), and transforming raw statistics into interactive telemetry visualizations.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/projects/youtube-data-api-dashboard" className="btn btn-primary">
              View Project Case Study ↗
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Hire for API Integration 🚀
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
