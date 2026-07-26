import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Chatbot from '@/components/ui/Chatbot';

export const metadata: Metadata = {
  metadataBase: new URL('https://sardar-awais.vercel.app'),
  title: {
    default: 'Awais Mehboob | Full-Stack Developer, AI Engineer & Automation Specialist',
    template: '%s | Awais Mehboob',
  },
  description:
    'Awais Mehboob — Expert Full-Stack Developer, AI Engineer & Agentic AI Specialist. 500+ projects delivered across Fiverr, Upwork, and direct clients. Hire me for AI agent development, VAPI voice bots, Shopify e-commerce, web apps, automation, and DevOps. 7+ years experience.',
  keywords: [
    'hire full stack developer',
    'hire AI developer',
    'hire AI engineer',
    'freelance AI developer',
    'custom AI agent development services',
    'agentic AI developer',
    'AI agent development',
    'hire software developer',
    'website development services',
    'software development freelancer',
    'full stack web developer for hire',
    'React developer for hire',
    'Next.js developer',
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
  authors: [{ name: 'Awais Mehboob', url: 'https://sardar-awais.vercel.app' }],
  creator: 'Awais Mehboob',
  publisher: 'Awais Mehboob',
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
    title: 'Awais Mehboob | Full-Stack Developer & AI Engineer — 500+ Projects Delivered',
    description:
      '500+ projects delivered across AI agents, web apps, e-commerce & automation. Expert in React, Next.js, Python, VAPI, CrewAI, Shopify & DevOps. Available for freelance projects worldwide.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sardar-awais.vercel.app',
    siteName: 'Awais Mehboob Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awais Mehboob | Full-Stack Developer & AI Engineer',
    description: 'Hire a top-rated freelance developer with 500+ projects in AI, web, e-commerce & automation.',
    creator: '@awaismehboob',
  },
  alternates: {
    canonical: 'https://sardar-awais.vercel.app',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Awais Mehboob',
  jobTitle: 'Full-Stack Developer & AI Engineer',
  description:
    'Expert Full-Stack Developer, AI Engineer, and Automation Specialist with 7+ years experience and 500+ projects delivered worldwide.',
  url: 'https://sardar-awais.vercel.app',
  email: 'khanowais8888@gmail.com',
  telephone: '+923472725754',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Punjab',
  },
  sameAs: [
    'https://www.fiverr.com/sellers/mahboobhussa500',
    'https://www.upwork.com/freelancers/sardara32',
    'https://www.linkedin.com/in/awais-mahboob-25202a13b/',
  ],
  knowsAbout: [
    'Full Stack Development',
    'AI Engineering',
    'Agentic AI',
    'React',
    'Next.js',
    'Python',
    'Node.js',
    'DevOps',
    'Shopify Development',
    'AI Voice Agents',
    'VAPI',
    'LangChain',
    'CrewAI',
    'Automation',
    'Android Development',
    'Chrome Extensions',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack Developer & AI Engineer',
    occupationLocation: { '@type': 'Country', name: 'Pakistan' },
    estimatedSalary: {
      '@type': 'MonetaryAmountDistribution',
      name: 'Hourly',
      currency: 'USD',
      median: 45,
    },
  },
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
        <div className="content-wrapper">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <GoogleAnalytics gaId="G-8J6ZM39V0D" />
      </body>
    </html>
  );
}
