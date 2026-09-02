import styles from './Team.module.css';
import TiltCard from './TiltCard';

const members = [
  {
    name: 'Awais Mehboob',
    role: 'Founder & AI Engineer',
    emoji: '🧠',
    color: '#00f5d4',
    bio: 'Leading AI research, full‑stack development and automation for clients worldwide. 6+ years, 50+ projects.',
    skills: ['AI Agents', 'Next.js', 'Python', 'DevOps'],
  },
  {
    name: 'Ayesha Awais',
    role: 'CEO & Co-Founder',
    emoji: '👑',
    color: '#ff6b9d',
    bio: 'The inspiration behind AyeshaLabs. Visionary leader driving the agency\'s mission to build world-class digital products.',
    skills: ['Strategy', 'Leadership', 'Branding', 'Vision'],
  },
  {
    name: 'Zain Ahmad',
    role: 'Backend & DevOps Engineer',
    emoji: '⚙️',
    color: '#7b61ff',
    bio: 'Architecting scalable cloud infrastructure, APIs and CI/CD pipelines that handle millions of requests.',
    skills: ['AWS', 'Docker', 'Node.js', 'PostgreSQL'],
  },
];

export default function Team() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>// The Team</span>
          <h2 className={styles.title}>
            Built by <span className="holographic">Experts</span>, Delivered with Passion
          </h2>
          <p className={styles.subtitle}>
            A tight-knit team of specialists who care deeply about quality, deadlines, and your success.
          </p>
        </div>

        <div className={styles.grid}>
          {members.map((m) => (
            <TiltCard key={m.name} maxTilt={12} glare>
              <div
                className={`${styles.card} corner-brackets`}
                style={{ '--accent': m.color } as React.CSSProperties}
              >
                <div
                  className={styles.cardGlow}
                  style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}20, transparent 70%)` }}
                />

                {/* Avatar */}
                <div
                  className={styles.avatar}
                  style={{ borderColor: `${m.color}50`, background: `${m.color}12` }}
                >
                  <span className={styles.avatarEmoji}>{m.emoji}</span>
                </div>

                <h3 className={styles.name}>{m.name}</h3>
                <p className={styles.role} style={{ color: m.color }}>{m.role}</p>
                <p className={styles.bio}>{m.bio}</p>

                <div className={styles.skills}>
                  {m.skills.map((s) => (
                    <span key={s} className={styles.skill} style={{ borderColor: `${m.color}35`, color: m.color }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
