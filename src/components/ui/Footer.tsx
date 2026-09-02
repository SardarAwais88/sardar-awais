import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>👨‍💻</span>
              <span className={styles.logoText}>
                Sardar<span className={styles.logoAccent}>Awais</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              AI-first digital agency led by <strong>Sardar Awais</strong>. We build
              intelligent software, voice agents &amp; immersive apps that scale globally.
            </p>
            <div className={styles.socials}>
              <a href="https://www.fiverr.com/sellers/mahboobhussa500" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>Fiverr</span>
              </a>
              <a href="https://www.upwork.com/freelancers/sardara32" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>Upwork</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/awais-mahboob-25202a13b/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link href="/about" className={styles.footerLink}>About Me</Link>
            <Link href="/projects" className={styles.footerLink}>Projects</Link>
            <Link href="/skills" className={styles.footerLink}>Skills</Link>
            <Link href="/services" className={styles.footerLink}>Services</Link>
            <Link href="/resume" className={styles.footerLink}>Resume / CV</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Services</h4>
            <span className={styles.footerLink}>Full-Stack Web Development</span>
            <span className={styles.footerLink}>AI Agent & Voice Bot Dev</span>
            <span className={styles.footerLink}>Agentic AI Solutions</span>
            <span className={styles.footerLink}>E-Commerce Solutions</span>
            <span className={styles.footerLink}>DevOps & Cloud</span>
            <span className={styles.footerLink}>Bot Automation</span>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Get in Touch</h4>
            <span className={styles.footerLink}>📧 info@sardarawais.com</span>
            <span className={styles.footerLink}>📱 +92 347 2725754</span>
            <span className={styles.footerLink}>📍 Pakistan (Remote Worldwide)</span>
            <a href="https://wa.me/923472725754?text=Hi%20Awais!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className={styles.footerLink} style={{ color: '#25d366', cursor: 'pointer' }}>
              💬 WhatsApp Me
            </a>
            <a href="https://t.me/+923472725754" target="_blank" rel="noopener noreferrer" className={styles.footerLink} style={{ color: '#0088cc', cursor: 'pointer' }}>
              ✈️ Telegram Me
            </a>
            <Link href="/contact" className={styles.ctaSmall}>
              Start a Project →
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} <span style={{color:'var(--accent-primary)'}}>Sardar Awais</span> — All rights reserved.</p>
          <p className={styles.builtWith}>
            Built with <span className={styles.heart}>♥</span> using Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
