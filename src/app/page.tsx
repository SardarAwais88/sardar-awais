import dynamic from 'next/dynamic';
import Link from 'next/link';
import TypeWriter from '@/components/ui/TypeWriter';
import Counter from '@/components/ui/Counter';
import { projects } from '@/data/projects';
import { stats, testimonials } from '@/data/timeline';
import styles from './page.module.css';
import Team from '@/components/ui/Team';
import LeadForm from '@/components/ui/LeadForm';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'JavaScript', icon: '💛' },
  { name: 'Python', icon: '🐍' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Django', icon: '🎸' },
  { name: 'PHP', icon: '🐘' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'Three.js', icon: '🎮' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'OpenAI', icon: '🧠' },
  { name: 'LangChain', icon: '🔗' },
  { name: 'CrewAI', icon: '🤖' },
  { name: 'VAPI', icon: '🎙️' },
  { name: 'TensorFlow', icon: '🔶' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GitHub Actions', icon: '🔄' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Shopify', icon: '🛍️' },
  { name: 'WordPress', icon: '📝' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Git', icon: '📁' },
];

const featuredProjects = projects.filter((p) =>
  [1, 21, 25, 32, 11, 43].includes(p.id)
);

export default function HomePage() {
  return (
    <>
      <div className="page-content">
        {/* ── HERO ──────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Available for Freelance Projects
            </div>

            <h1 className={styles.heroTitle}>
              Hi, I'm <span className="gradient-text">Sardar Awais</span>
            </h1>

            <div className={styles.heroRole}>
              <span className={styles.heroRolePrefix}>I&apos;m a </span>
              <TypeWriter
                words={[
                  'Full-Stack Developer',
                  'AI Engineer',
                  'DevOps Engineer',
                  'Agentic AI Expert',
                  'Automation Architect',
                  'E-Commerce Specialist',
                  'Voice Agent Builder',
                  'Software Engineer',
                ]}
                speed={80}
                deleteSpeed={40}
                pauseTime={2500}
              />
            </div>

            <p className={styles.heroDescription}>
              I am <strong>Sardar Awais</strong> — an AI Engineer & Full-Stack Developer. I build urgent custom websites, AI agents, voice bots, and enterprise software solutions for clients worldwide. Let's build something amazing together.
            </p>

            <div className={styles.heroCTA}>
              <Link href="/projects" className="btn btn-primary">
                View My Work
                <span>→</span>
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Let&apos;s Talk
                <span>💬</span>
              </Link>
              <Link href="/resume" className="btn btn-outline">
                Download CV
                <span>📄</span>
              </Link>
            </div>

            <div className={styles.heroPlatforms}>
              <span className={styles.platformLabel}>Trusted on:</span>
              <div className={styles.platformBadges}>
                <span className={styles.platformBadge}>🟢 Fiverr</span>
                <span className={styles.platformBadge}>🟢 Upwork</span>
                <span className={styles.platformBadge}>🟢 Truelancer</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeDot} style={{ background: '#ff5f57' }} />
                <span className={styles.codeDot} style={{ background: '#ffbd2e' }} />
                <span className={styles.codeDot} style={{ background: '#28c840' }} />
                <span className={styles.codeTitle}>developer.ts</span>
              </div>
              <pre className={styles.codeContent}>
                <code>
{`const developer = {
  name: "Sardar Awais",
  roles: [
    "Full-Stack Developer",
    "AI Engineer",
    "DevOps Specialist"
  ],
  experience: "6+ years",
  projects: 50,
  expertise: [
    "React", "Next.js",
    "Python", "Node.js",
    "AI Agents", "CrewAI",
    "VAPI", "LangChain",
    "Docker", "K8s",
    "Shopify", "AWS"
  ],
  passion: "Building future"
};`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────── */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statValue}>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED PROJECTS ─────────────────────────── */}
        <section className={`section ${styles.featured}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">// Featured Work</span>
              <h2 className="section-title">
                Projects That <span className="gradient-text">Define Me</span>
              </h2>
              <p className="section-subtitle">
                A selection of my best work across different domains
              </p>
            </div>

            <div className={styles.projectsGrid}>
              {featuredProjects.map((project, i) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className={styles.projectCard}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    borderColor: `${project.color}20`,
                    textDecoration: 'none',
                  }}
                >
                  <div
                    className={styles.projectIcon}
                    style={{ background: `${project.color}15` }}
                  >
                    <span>{project.image}</span>
                  </div>
                  <div className={styles.projectInfo}>
                    <div className={styles.projectMeta}>
                      <span className="badge">{project.category}</span>
                      {project.platform && (
                        <span className={styles.projectPlatform}>
                          {project.platform}
                        </span>
                      )}
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                    <div className={styles.projectTech}>
                      {project.tech.map((t) => (
                        <span key={t} className={styles.techTag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.viewAll}>
              <Link href="/projects" className="btn btn-outline">
                View All 48 Projects →
              </Link>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ────────────────────────────────── */}
        <section className={`section ${styles.techSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">// Tech Stack</span>
              <h2 className="section-title">
                Technologies I <span className="gradient-text">Master</span>
              </h2>
            </div>

            <div className={styles.techGrid}>
              {techStack.map((tech, i) => (
                <div
                  key={tech.name}
                  className={styles.techItem}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className={styles.techItemIcon}>{tech.icon}</span>
                  <span className={styles.techItemName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section className={`section ${styles.testimonials}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">// Client Feedback</span>
              <h2 className="section-title">
                What People <span className="gradient-text">Say</span>
              </h2>
            </div>
            
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                    <div>
                      <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                      <p className={styles.testimonialRole}>{testimonial.role} · {testimonial.platform}</p>
                    </div>
                  </div>
                  <div className={styles.testimonialRating}>
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                  <p className={styles.testimonialProject}>Project: {testimonial.project}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────── */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} />
              <h2 className={styles.ctaTitle}>
                Ready to Build Something{' '}
                <span className="gradient-text">Amazing?</span>
              </h2>
              <p className={styles.ctaDesc}>
                Let&apos;s discuss your project and create something
                extraordinary together. I&apos;m available for freelance work
                and long-term collaborations.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn btn-primary">
                  Start a Project
                  <span>🚀</span>
                </Link>
                <Link href="/services" className="btn btn-outline">
                  View Services
                  <span>💡</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <LeadForm />
        <Team />
      </div>
    </>
  );
}
