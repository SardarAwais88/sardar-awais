import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Chatbot from '@/components/ui/Chatbot';

export const metadata: Metadata = {
  title: 'Awais Mehboob | Full-Stack Developer, AI Engineer & DevOps Expert — Hire Me',
  description:
    'Awais Mehboob — Expert Full-Stack Developer, AI Engineer, Agentic AI Developer, DevOps Engineer & Automation Specialist. 50+ projects delivered. Hire me for custom AI agent development, website development, software development, Shopify e-commerce, VAPI voice bots, and automation solutions. Available on Fiverr & Upwork.',
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
  ],
  authors: [{ name: 'Awais Mehboob' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Awais Mehboob | Full-Stack Developer & AI Engineer — Hire Me for $10K+ Projects',
    description:
      '50+ projects delivered across AI agents, web apps, e-commerce & automation. Expert in React, Next.js, Python, VAPI, CrewAI, Shopify & DevOps. Available for freelance projects.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awais Mehboob | Full-Stack Developer & AI Engineer',
    description: 'Hire a top-rated freelance developer with 50+ projects in AI, web, e-commerce & automation.',
  },
  other: {
    'google-site-verification': '',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Awais Mehboob',
  jobTitle: 'Full-Stack Developer & AI Engineer',
  url: 'https://awaismehboob.dev',
  email: 'khanowais8888@gmail.com',
  telephone: '+923472725754',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://www.fiverr.com/sellers/mahboobhussa500',
    'https://www.upwork.com/freelancers/sardara32',
    'https://www.linkedin.com/in/awais-mahboob-25202a13b/',
  ],
  knowsAbout: [
    'Full Stack Development', 'AI Engineering', 'Agentic AI',
    'React', 'Next.js', 'Python', 'Node.js', 'DevOps',
    'Shopify Development', 'AI Voice Agents', 'Automation',
  ],
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
        <link rel="canonical" href="https://awaismehboob.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <video autoPlay loop muted playsInline className="video-bg">
          <source src="/blackhole.webm" type="video/webm" />
        </video>
        <div className="video-overlay"></div>
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
