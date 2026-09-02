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
  metadataBase: new URL('https://awaisaisolutions.com'),
  title: {
    default: 'AwaisAI Solutions – #1 AI Agency | AI Agents, Full-Stack Dev & Automation',
    template: '%s | AwaisAI Solutions',
  },
  description:
    'AwaisAI Solutions is a premier AI-first digital agency led by Awais Mehboob. We build AI agents, voice bots, full-stack web apps, Shopify stores, and enterprise automation. 50+ projects, 5★ rated on Upwork & Fiverr. Hire us for any AI or software development project.',
  keywords: [
    'Python developer',
    'Node.js developer',
    'AI chatbot development',
    'AI voice agent developer',
    'VAPI voice bot developer',
    'LangChain developer',
    'CrewAI developer',
    'Shopify developer for hire',
    'WooCommerce developer',
    'WordPress developer',
    'e-commerce developer',
    'automation engineer',
    'DevOps engineer',
    'bot development services',
    'WhatsApp bot developer',
    'Telegram bot developer',
    'Chrome extension developer',
    'RAG system developer',
    'LLM integration specialist',
    'AI automation engineer',
    'freelance web developer Pakistan',
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
    'headless Shopify developer',
  ],
  authors: [{ name: 'Awais Mehboob', url: 'https://awaisaisolutions.com' }],
  creator: 'Awais Mehboob',
  publisher: 'AwaisAI Solutions',
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
    title: 'AwaisAI Solutions – AI Agency | AI Agents, Voice Bots, Full-Stack Dev',
    description: 'Top-rated AI agency. We build AI agents, VAPI voice bots, full-stack apps, Shopify stores & automation. Led by Awais Mehboob. 50+ delivered projects. Get a free quote.',
    type: 'website',
    locale: 'en_US',
    url: 'https://awaisaisolutions.com',
    siteName: 'AwaisAI Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AwaisAI Solutions – AI Agency | Awais Mehboob',
    description: 'Top-rated AI agency led by Awais Mehboob. 50+ AI agents, voice bots & full-stack projects delivered. 5★ on Upwork & Fiverr.',
    creator: '@awaismehboob',
  },
  alternates: {
    canonical: 'https://awaisaisolutions.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AwaisAI Solutions',
  url: 'https://awaisaisolutions.com',
  logo: 'https://awaisaisolutions.com/logo.png',
  description: 'AI-first digital agency specializing in AI agents, voice bots, full-stack development, and automation.',
  sameAs: [
    'https://www.linkedin.com/company/nexusai-dev',
    'https://twitter.com/awaismehboob',
    'https://www.upwork.com/freelancers/sardara32',
    'https://www.fiverr.com/sellers/mahboobhussa500'
  ],
  contactPoint: [{
    '@type': 'ContactPoint',
    email: 'khanowais8888@gmail.com',
    telephone: '+923472725754',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Urdu'],
    areaServed: ['US', 'UK', 'CA', 'AU', 'AE'],
  }],
  founder: {
    '@type': 'Person',
    name: 'Awais Mehboob',
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
