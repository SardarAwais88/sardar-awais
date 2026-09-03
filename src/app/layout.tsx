import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import LazyMount from '@/components/ui/LazyMount';

// Load fonts
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

// Dynamically import heavy components
const Scene3DWrapper = dynamic(() => import('@/components/three/Scene3DWrapper'));
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'));
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'));
const ExitPopup = dynamic(() => import('@/components/ui/ExitPopup'));
const ScrollReveal3D = dynamic(() => import('@/components/ui/ScrollReveal3D'));

export const metadata: Metadata = {
  metadataBase: new URL('https://sardarawais.com'),
  title: {
    default: 'Sardar Awais | Urgent Website Development, AI Agents & Chatbots',
    template: '%s | Sardar Awais',
  },
  description:
    'Need urgent website development, custom AI agents, or full-stack software solutions? Sardar Awais delivers top-tier web dev, VAPI voice bots, and AI integrations globally. Get your project done fast and perfectly.',
  keywords: [
    'urgent website development',
    'AI agents development',
    'chatbot developer',
    'full stack solutions',
    'hire full stack developer',
    'VAPI voice bots',
    'Sardar Awais',
    'urgent software development',
    'custom AI solutions',
    'AI automation agency',
    'React Next.js expert',
    'Telegram bot developer',
    'Chrome extension developer',
    'RAG system developer',
    'LLM integration specialist',
    'AI automation engineer',
    'hire agentic AI developer',
    'hire Pakistani AI developer for US clients',
    'hire Pakistani developer for UK clients',
    'Wazuh SIEM deployment',
    'voice cloning developer',
    'ElevenLabs developer',
    'Whisper STT developer',
    'Ollama local LLM developer',
  ],
  authors: [{ name: 'Sardar Awais', url: 'https://sardarawais.com' }],
  creator: 'Sardar Awais',
  publisher: 'Sardar Awais',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Sardar Awais | Urgent Website Development & AI Solutions',
    description: 'Looking for urgent website development or AI chatbot solutions? Hire Sardar Awais for full-stack apps, AI agents, and enterprise software globally.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sardarawais.com',
    siteName: 'Sardar Awais',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sardar Awais | Web Dev & AI Agents',
    description: 'Looking for urgent website development or AI chatbot solutions? Hire Sardar Awais for full-stack apps and AI agents.',
    creator: '@sardarawais',
  },
  alternates: {
    canonical: 'https://sardarawais.com',
  },
  other: {
    'geo.region': 'PK-PB',
    'geo.placename': 'Punjab, Pakistan',
    'geo.position': '31.1471;75.3412',
    'ICBM': '31.1471, 75.3412',
    'coverage': 'Worldwide',
    'distribution': 'Global',
    'rating': 'General',
  }
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sardar Awais',
    url: 'https://sardarawais.com',
    logo: 'https://sardarawais.com/logo.png',
    jobTitle: 'Cloud & AI Automation Engineer',
    description: 'Expert in urgent website development, AI agents, chatbots, and full-stack solutions.',
    sameAs: [
      'https://www.linkedin.com/company/nexusai-dev',
      'https://twitter.com/sardarawais',
      'https://www.upwork.com/freelancers/sardara32',
      'https://www.fiverr.com/sellers/mahboobhussa500'
    ],
    knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Voice AI', 'Full-Stack Development', 'DevOps', 'Next.js'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sardar Awais AI & Web Development Services',
    url: 'https://sardarawais.com',
    image: 'https://sardarawais.com/logo.png',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Punjab',
      addressRegion: 'PB',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.1471',
      longitude: '75.3412'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@sardarawais.com',
      telephone: '+923472725754',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Urdu']
    },
    areaServed: [
      { '@type': 'Country', name: 'US' },
      { '@type': 'Country', name: 'UK' },
      { '@type': 'Country', name: 'CA' },
      { '@type': 'Country', name: 'AU' },
      { '@type': 'Country', name: 'AE' }
    ]
  }
];

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LazyMount delay={3500}>
          <Scene3DWrapper />
        </LazyMount>
        
        <div className="content-wrapper">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>

        <LazyMount delay={4000}>
          <Chatbot />
          <FloatingCTA />
          <ExitPopup />
          <ScrollReveal3D />
        </LazyMount>

        <GoogleAnalytics gaId="G-8J6ZM39V0D" />
      </body>
    </html>
  );
}
