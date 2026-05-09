import Link from 'next/link';
import styles from './page.module.css';

const tools = [
  {
    id: 'proposal-writer',
    title: 'AI Proposal Writer',
    description: 'Generate winning Upwork & Fiverr proposals instantly. Paste a job description and get a tailored, client-focused cover letter.',
    icon: '✍️',
    href: '/tools/proposal-writer',
    color: '#00f5d4',
    status: 'Live',
  },
  {
    id: 'reply-generator',
    title: 'Client Reply Generator',
    description: 'Paste the client\'s message to generate a persuasive, professional reply that handles objections and closes deals.',
    icon: '💬',
    href: '/tools/reply-generator',
    color: '#7b61ff',
    status: 'Live',
  },
  {
    id: 'coming-soon-1',
    title: 'AI Email Writer',
    description: 'Generate professional client emails, follow-ups, and project updates with AI assistance.',
    icon: '📧',
    href: '#',
    color: '#ff6b6b',
    status: 'Coming Soon',
  },
  {
    id: 'coming-soon-2',
    title: 'Project Estimator',
    description: 'AI-powered project cost and timeline estimation based on requirements analysis.',
    icon: '📊',
    href: '#',
    color: '#ffd700',
    status: 'Coming Soon',
  },
  {
    id: 'coming-soon-3',
    title: 'Code Reviewer',
    description: 'Automated code review and optimization suggestions powered by AI.',
    icon: '🔍',
    href: '#',
    color: '#ff6b6b',
    status: 'Coming Soon',
  },
];

export default function ToolsPage() {
  return (
    <div className="page-content">
      <section className={`section ${styles.toolsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// AI Tools</span>
            <h1 className="section-title">
              My <span className="gradient-text">AI Tools</span>
            </h1>
            <p className="section-subtitle">
              AI-powered tools I&apos;ve built to streamline freelancing workflow
            </p>
          </div>

          <div className={styles.toolsGrid}>
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className={styles.toolCard}
                style={{ borderColor: `${tool.color}20` }}
              >
                <div className={styles.toolHeader}>
                  <span className={styles.toolIcon} style={{ background: `${tool.color}15` }}>
                    {tool.icon}
                  </span>
                  <span
                    className={styles.toolStatus}
                    style={{
                      background: tool.status === 'Live' ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.05)',
                      color: tool.status === 'Live' ? '#00f5d4' : 'var(--text-muted)',
                    }}
                  >
                    {tool.status}
                  </span>
                </div>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.description}</p>
                {tool.status === 'Live' && (
                  <span className={styles.toolCta}>
                    Try Now <span>→</span>
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
