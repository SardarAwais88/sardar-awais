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
    id: 'humanizer',
    title: 'AI Humanizer & Plagiarism Checker',
    description: 'Detect AI-generated text, check plagiarism risk, and rewrite content to sound 100% human — undetectable by any tool.',
    icon: '🛡️',
    href: '/tools/humanizer',
    color: '#ff6b6b',
    status: 'Live',
  },
  {
    id: 'email-writer',
    title: 'AI Email Writer',
    description: 'Generate professional client emails, follow-ups, and project updates with AI assistance.',
    icon: '📧',
    href: '/tools/email-writer',
    color: '#ff9f43',
    status: 'Live',
  },
  {
    id: 'estimator',
    title: 'Project Estimator',
    description: 'AI-powered project cost and timeline estimation based on requirements analysis.',
    icon: '📊',
    href: '/tools/estimator',
    color: '#ffd700',
    status: 'Live',
  },
  {
    id: 'code-reviewer',
    title: 'Code Reviewer',
    description: 'Automated code review, bug detection, and optimization suggestions powered by AI.',
    icon: '🔍',
    href: '/tools/code-reviewer',
    color: '#00d2d3',
    status: 'Live',
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
