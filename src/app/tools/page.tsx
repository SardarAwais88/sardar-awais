import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'AI Tools | Sardar Awais â€“ Free & Premium AI Tools',
  description:
    'Powerful AI tools built by Sardar Awais. Free tools: AI Proposal Writer, Client Reply Generator, Email Writer. Premium tools: AI Video Generator, AI Humanizer, Project Estimator, Code Reviewer. Start free today.',
  keywords: [
    'AI tools for freelancers',
    'AI proposal writer free',
    'AI reply generator',
    'AI project estimator',
    'AI code reviewer',
    'AI email writer',
    'AI video generator',
    'Upwork proposal AI',
    'Fiverr proposal generator',
    'Sardar Awais tools',
    'Sardar Awais AI',
  ],
};

const tools = [
  // â”€â”€ FREE TOOLS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'proposal-writer',
    title: 'AI Proposal Writer',
    description:
      'Generate winning Upwork & Fiverr proposals instantly. Paste a job description and get a tailored, client-focused cover letter in seconds.',
    icon: 'âœï¸',
    href: '/tools/proposal-writer',
    color: '#00f5d4',
    tier: 'free',
    badge: 'ðŸ†“ Free',
    badgeColor: '#00f5d4',
  },
  {
    id: 'reply-generator',
    title: 'Client Reply Generator',
    description:
      "Paste the client's message to generate a persuasive, professional reply that handles objections and closes deals.",
    icon: 'ðŸ’¬',
    href: '/tools/reply-generator',
    color: '#7b61ff',
    tier: 'free',
    badge: 'ðŸ†“ Free',
    badgeColor: '#00f5d4',
  },
  {
    id: 'email-writer',
    title: 'AI Email Writer',
    description:
      'Generate professional client emails, follow-ups, and project updates with AI assistance. Never write a cold email from scratch again.',
    icon: 'ðŸ“§',
    href: '/tools/email-writer',
    color: '#ff9f43',
    tier: 'free',
    badge: 'ðŸ†“ Free',
    badgeColor: '#00f5d4',
  },

  // â”€â”€ PREMIUM TOOLS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'video-generator',
    title: 'AI Video Generator',
    description:
      'Create high-quality short and long videos from text or images using the best open-source models like Wan 2.6 and Hailuo 2.3.',
    icon: 'ðŸŽ¬',
    href: '/tools/video-generator',
    color: '#ff4d4d',
    tier: 'premium',
    badge: 'â­ Premium',
    badgeColor: '#ffd700',
  },
  {
    id: 'humanizer',
    title: 'AI Humanizer & Plagiarism Checker',
    description:
      'Detect AI-generated text, check plagiarism risk, and rewrite content to sound 100% human â€” undetectable by any AI detector.',
    icon: 'ðŸ›¡ï¸',
    href: '/tools/humanizer',
    color: '#ff6b6b',
    tier: 'premium',
    badge: 'â­ Premium',
    badgeColor: '#ffd700',
  },
  {
    id: 'estimator',
    title: 'AI Project Estimator',
    description:
      'AI-powered project cost and timeline estimation. Get a detailed proposal-ready breakdown based on your requirements in seconds.',
    icon: 'ðŸ“Š',
    href: '/tools/estimator',
    color: '#ffd700',
    tier: 'premium',
    badge: 'â­ Premium',
    badgeColor: '#ffd700',
  },
  {
    id: 'code-reviewer',
    title: 'AI Code Reviewer',
    description:
      'Automated code review, bug detection, security analysis, and optimization suggestions powered by advanced AI models.',
    icon: 'ðŸ”',
    href: '/tools/code-reviewer',
    color: '#00d2d3',
    tier: 'premium',
    badge: 'â­ Premium',
    badgeColor: '#ffd700',
  },
];

const freeTools = tools.filter((t) => t.tier === 'free');
const premiumTools = tools.filter((t) => t.tier === 'premium');

export default function ToolsPage() {
  return (
    <div className="page-content">
      <section className={`section ${styles.toolsSection}`}>
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-label">// Sardar Awais Tools</span>
            <h1 className="section-title">
              AI-Powered <span className="gradient-text">Tools</span>
            </h1>
            <p className="section-subtitle">
              Built by <strong>Sardar Awais</strong> â€” practical tools that save
              hours of work every day. Free tools available instantly. Premium tools unlock
              advanced AI features.
            </p>
          </div>

          {/* Stats bar */}
          <div className={styles.statsBar}>
            {[
              { n: '7+', label: 'AI Tools' },
              { n: '3', label: 'Free Forever' },
              { n: '4', label: 'Premium Features' },
              { n: '500+', label: 'Happy Users' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* â”€â”€ Free Tools â”€â”€ */}
          <div className={styles.tierSection}>
            <div className={styles.tierHeader}>
              <span className={styles.tierBadge} style={{ background: 'rgba(0,245,212,0.12)', color: '#00f5d4', borderColor: 'rgba(0,245,212,0.3)' }}>
                ðŸ†“ Free Tools
              </span>
              <h2 className={styles.tierTitle}>Start for Free â€” No Credit Card Required</h2>
              <p className={styles.tierDesc}>
                These tools are completely free to use. No sign-up, no limits. Built to help
                freelancers and agencies win more clients.
              </p>
            </div>

            <div className={styles.toolsGrid}>
              {freeTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className={`${styles.toolCard} ${styles.freeCard}`}
                  style={{ borderColor: `${tool.color}25` }}
                >
                  <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}12, transparent 70%)` }} />
                  <div className={styles.toolHeader}>
                    <span className={styles.toolIcon} style={{ background: `${tool.color}15`, color: tool.color }}>
                      {tool.icon}
                    </span>
                    <span className={styles.toolBadge} style={{ background: 'rgba(0,245,212,0.1)', color: '#00f5d4', borderColor: 'rgba(0,245,212,0.25)' }}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className={styles.toolTitle}>{tool.title}</h3>
                  <p className={styles.toolDesc}>{tool.description}</p>
                  <span className={styles.toolCta} style={{ color: tool.color }}>
                    Use Free Tool <span>â†’</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* â”€â”€ Premium Tools â”€â”€ */}
          <div className={styles.tierSection}>
            <div className={styles.tierHeader}>
              <span className={styles.tierBadge} style={{ background: 'rgba(255,215,0,0.1)', color: '#ffd700', borderColor: 'rgba(255,215,0,0.3)' }}>
                â­ Premium Tools
              </span>
              <h2 className={styles.tierTitle}>Premium â€” Advanced AI, Unlimited Access</h2>
              <p className={styles.tierDesc}>
                Premium tools give you access to advanced AI models, video generation, plagiarism
                detection, and more. <strong>Contact Awais</strong> to get access.
              </p>
            </div>

            <div className={styles.toolsGrid}>
              {premiumTools.map((tool) => (
                <div
                  key={tool.id}
                  className={`${styles.toolCard} ${styles.premiumCard}`}
                  style={{ borderColor: `${tool.color}25` }}
                >
                  <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}10, transparent 70%)` }} />
                  <div className={styles.premiumLock}>
                    <span className={styles.lockIcon}>ðŸ”’</span>
                    <span>Premium Access Required</span>
                  </div>
                  <div className={styles.toolHeader}>
                    <span className={styles.toolIcon} style={{ background: `${tool.color}15`, color: tool.color }}>
                      {tool.icon}
                    </span>
                    <span className={styles.toolBadge} style={{ background: 'rgba(255,215,0,0.1)', color: '#ffd700', borderColor: 'rgba(255,215,0,0.3)' }}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className={styles.toolTitle}>{tool.title}</h3>
                  <p className={styles.toolDesc}>{tool.description}</p>
                  <Link href="#get-quote" className={styles.premiumCta}>
                    Get Access <span>â†’</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Need a <span className="holographic">Custom AI Tool</span>?
              </h2>
              <p className={styles.ctaDesc}>
                Sardar Awais builds custom AI solutions tailored to your
                business. From internal tools to client-facing SaaS platforms. Let's discuss your project.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btn-primary">
                  ðŸš€ Request Custom Tool
                </Link>
                <Link href="#get-quote" className="btn btn-outline">
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
