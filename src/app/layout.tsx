import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Chatbot from '@/components/ui/Chatbot';
import FloatingCTA from '@/components/ui/FloatingCTA';
import ExitPopup from '@/components/ui/ExitPopup';
import ScrollReveal3D from '@/components/ui/ScrollReveal3D';
import Scene3DWrapper from '@/components/three/Scene3DWrapper';

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
    'Fiverr top rated developer',
    'Upwork developer',
    'hire agentic AI developer',
    'AI solutions provider',
    'custom software development',
    'SaaS development',
    'Docker DevOps',
    'CI/CD pipeline',
    'full stack AI application developer',
    'Android app developer',
    'n8n automation developer',
    'Amazon seller tools developer',
    'POS system developer',
    'trading bot developer',
    'influencer marketing platform developer',
    'hire Pakistani AI developer for US clients',
    'hire Pakistani developer for UK clients',
    'Wazuh SIEM deployment',
    'voice cloning developer',
    'ElevenLabs developer',
    'Whisper STT developer',
    'Ollama local LLM developer',
    'composable commerce developer',
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
    creator: '@awaismehboob',
  },
  alternates: {
    canonical: 'https://sardarawais.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sardar Awais',
  url: 'https://sardarawais.com',
  logo: 'https://sardarawais.com/logo.png',
  jobTitle: 'Full-Stack Developer & AI Engineer',
  description: 'Expert in urgent website development, AI agents, chatbots, and full-stack solutions.',
  sameAs: [
    'https://www.linkedin.com/company/nexusai-dev',
    'https://twitter.com/awaismehboob',
    'https://www.upwork.com/freelancers/sardara32',
    'https://www.fiverr.com/sellers/mahboobhussa500'
  ],
  contactPoint: [{
    '@type': 'ContactPoint',
    email: 'info@sardarawais.com',
    telephone: '+923472725754',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Urdu'],
    areaServed: ['US', 'UK', 'CA', 'AU', 'AE'],
  }],
  founder: {
    '@type': 'Person',
    name: 'Sardar Awais',
    jobTitle: 'CEO & Founder',
    url: 'https://nexusai.dev',
    sameAs: [
      'https://www.upwork.com/freelancers/sardara32',
      'https://www.fiverr.com/sellers/mahboobhussa500',
      'https://www.linkedin.com/in/awais-mahboob-25202a13b/'
    ]
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Punjab',
  },
  knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Voice AI', 'Full-Stack Development', 'DevOps', 'LangChain', 'VAPI', 'CrewAI', 'Shopify', 'Next.js'],
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Scene3DWrapper />
        <div className="content-wrapper">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <FloatingCTA />
        <ExitPopup />
        <ScrollReveal3D />
        <GoogleAnalytics gaId="G-8J6ZM39V0D" />
      </body>
    </html>
  );
}
