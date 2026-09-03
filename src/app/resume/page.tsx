'use client';

import { useRef } from 'react';
import styles from './page.module.css';

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Open print dialog for the resume section — user can save as PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const resumeContent = resumeRef.current?.innerHTML || '';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sardar Awais - Resume</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { margin: 0.4in 0.5in; }
          body {
            font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
            font-size: 10.5pt;
            line-height: 1.5;
            color: #1a1a1a;
            background: #fff;
          }
          h1 { font-size: 22pt; font-weight: 700; color: #0a0a0f; margin-bottom: 2px; }
          h2 { font-size: 12pt; font-weight: 700; color: #0a0a0f; border-bottom: 2px solid #00c9a7; padding-bottom: 3px; margin: 14px 0 8px; text-transform: uppercase; letter-spacing: 1.5px; }
          h3 { font-size: 11pt; font-weight: 600; color: #1a1a1a; margin-bottom: 2px; }
          p, li { font-size: 10.5pt; line-height: 1.55; color: #333; }
          a { color: #0066cc; text-decoration: none; }
          ul { padding-left: 18px; margin: 4px 0; }
          li { margin-bottom: 3px; }
          .header-contact { font-size: 9.5pt; color: #555; display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 4px; }
          .header-contact span { white-space: nowrap; }
          .header-contact span::after { content: ' | '; color: #ccc; }
          .header-contact span:last-child::after { content: ''; }
          .subtitle { font-size: 12pt; color: #00c9a7; font-weight: 600; margin-bottom: 4px; }
          .summary { font-size: 10.5pt; color: #444; margin-bottom: 4px; }
          .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
          .skill-cat { font-weight: 600; color: #1a1a1a; font-size: 10pt; }
          .skill-items { font-size: 10pt; color: #444; }
          .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
          .exp-date { font-size: 9.5pt; color: #777; font-style: italic; }
          .exp-company { font-size: 10pt; color: #555; }
          .project-item { margin-bottom: 8px; }
          .project-tech { font-size: 9pt; color: #666; font-style: italic; }
          .cert-item { margin-bottom: 4px; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>${resumeContent}</body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="page-content">
      <section className={`section ${styles.resumeSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// Resume / CV</span>
            <h1 className="section-title">
              My <span className="gradient-text">Resume</span>
            </h1>
            <p className="section-subtitle">
              ATS-optimized professional resume — download or print as PDF
            </p>
          </div>

          <div className={styles.downloadBar}>
            <button onClick={handleDownload} className={`btn btn-primary ${styles.downloadBtn}`}>
              📄 Download Resume as PDF
            </button>
            <a
              href="https://www.linkedin.com/in/awais-mahboob-25202a13b/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              🔗 View LinkedIn Profile
            </a>
          </div>

          {/* ATS Resume Content */}
          <div className={styles.resumeWrapper}>
            <div className={styles.resumeCard} ref={resumeRef}>

              {/* Header */}
              <h1>AWAIS MEHBOOB</h1>
              <div className="subtitle">Cloud & AI Automation Engineer | AI Engineer | DevOps Specialist | Agentic AI Expert</div>
              <div className="header-contact">
                <span>📧 info@sardarawais.com</span>
                <span>📱 +92 347 2725754</span>
                <span>📍 Pakistan (Remote Worldwide)</span>
                <span>🔗 <a href="https://www.linkedin.com/in/awais-mahboob-25202a13b/">LinkedIn</a></span>
                <span>🟢 <a href="https://www.fiverr.com/sellers/mahboobhussa500">Fiverr</a></span>
                <span>🟢 <a href="https://www.upwork.com/freelancers/sardara32">Upwork</a></span>
              </div>

              {/* Professional Summary */}
              <h2>Professional Summary</h2>
              <p className="summary">
                Results-driven Cloud & AI Automation Engineer and AI Engineer with 6+ years of professional experience delivering 50+ production-grade projects across web development, AI agent systems, e-commerce platforms, and DevOps infrastructure. Expert in building custom AI agents using CrewAI, LangChain, and VAPI; scalable web applications with React, Next.js, and Node.js; and enterprise e-commerce solutions on Shopify and WooCommerce. Proven track record of automating complex business workflows, reducing operational costs by up to 60%, and delivering projects on Fiverr, Upwork, and Truelancer with consistent 5-star reviews. Passionate about leveraging cutting-edge agentic AI and RAG architectures to solve real-world business problems.
              </p>

              {/* Technical Skills */}
              <h2>Technical Skills</h2>
              <div className="skills-grid">
                <div>
                  <span className="skill-cat">Languages: </span>
                  <span className="skill-items">JavaScript, TypeScript, Python, PHP, HTML5, CSS3, SQL, Bash</span>
                </div>
                <div>
                  <span className="skill-cat">Frontend: </span>
                  <span className="skill-items">React, Next.js, Vue.js, Three.js, Tailwind CSS, Framer Motion, GSAP</span>
                </div>
                <div>
                  <span className="skill-cat">Backend: </span>
                  <span className="skill-items">Node.js, Express.js, FastAPI, Django, Flask, PHP/Laravel, GraphQL, REST APIs</span>
                </div>
                <div>
                  <span className="skill-cat">AI / ML: </span>
                  <span className="skill-items">OpenAI API, CrewAI, LangChain, VAPI, RAG, LLM Fine-tuning, NLP, TensorFlow, Vector DBs</span>
                </div>
                <div>
                  <span className="skill-cat">Databases: </span>
                  <span className="skill-items">PostgreSQL, MongoDB, MySQL, Redis, Firebase, Supabase, Pinecone</span>
                </div>
                <div>
                  <span className="skill-cat">DevOps & Cloud: </span>
                  <span className="skill-items">Docker, Kubernetes, AWS, GCP, Vercel, Netlify, CI/CD, GitHub Actions, Nginx</span>
                </div>
                <div>
                  <span className="skill-cat">E-Commerce: </span>
                  <span className="skill-items">Shopify, WooCommerce, Liquid, Shopify APIs, Payment Gateway Integration</span>
                </div>
                <div>
                  <span className="skill-cat">Tools: </span>
                  <span className="skill-items">Git, VS Code, Figma, Postman, Jira, Selenium, Puppeteer, n8n, Make.com</span>
                </div>
              </div>

              {/* Professional Experience */}
              <h2>Professional Experience</h2>

              <div style={{ marginBottom: '14px' }}>
                <div className="exp-header">
                  <h3>Senior Freelance Cloud & AI Automation Engineer</h3>
                  <span className="exp-date">2020 – Present</span>
                </div>
                <div className="exp-company">Fiverr, Upwork & Truelancer | Remote</div>
                <ul>
                  <li>Delivered <strong>500+ projects</strong> across AI agents, web applications, e-commerce, automation, and DevOps with consistent 5-star ratings</li>
                  <li>Built <strong>custom AI voice agents using VAPI</strong> for dental clinics, real estate, and customer support — handling 500+ calls/day</li>
                  <li>Developed <strong>multi-agent AI systems using CrewAI</strong> with RAG pipelines, reducing client operational costs by 40-60%</li>
                  <li>Created <strong>full-stack SaaS platforms</strong> using React/Next.js + Node.js/Python serving 10,000+ active users</li>
                  <li>Built <strong>automated trading bots</strong> for cryptocurrency markets with real-time Telegram alerts and portfolio management</li>
                  <li>Developed <strong>15+ Shopify/WooCommerce stores</strong> with custom themes, payment integration, and inventory management</li>
                  <li>Implemented <strong>CI/CD pipelines</strong> with Docker, GitHub Actions, and AWS for automated deployment workflows</li>
                  <li>Created <strong>Chrome extensions</strong> for lead generation, automating data scraping workflows saving 20+ hours/week</li>
                </ul>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div className="exp-header">
                  <h3>Cloud & AI Automation Engineer</h3>
                  <span className="exp-date">2019 – 2020</span>
                </div>
                <div className="exp-company">Kinitsol | On-site</div>
                <ul>
                  <li>Developed and maintained <strong>enterprise-grade web applications</strong> using PHP, JavaScript, MySQL, and MVC architecture</li>
                  <li>Designed and implemented <strong>RESTful APIs</strong> for internal tools, improving data flow efficiency by 35%</li>
                  <li>Collaborated with cross-functional teams to deliver <strong>client projects on schedule</strong> with zero critical bugs</li>
                  <li>Optimized database queries and application performance, achieving <strong>50% faster page load times</strong></li>
                  <li>Mentored junior developers on <strong>best practices in code review</strong>, Git workflows, and agile methodology</li>
                </ul>
              </div>

              {/* Key Projects */}
              <h2>Key Projects</h2>

              <div className="project-item">
                <h3>AI-Powered Celebrity Voice Bot</h3>
                <p>Built an AI chatbot using NLP, LangChain, and custom voice synthesis for celebrity voice replication. Featured real-time conversation handling and contextual understanding.</p>
                <div className="project-tech">Tech: Python, FastAPI, LangChain, NLP, OpenAI API</div>
              </div>

              <div className="project-item">
                <h3>Multi-Agent VAPI Dental Clinic System</h3>
                <p>Developed a 3-agent AI voice system (Triage, Emergency, Appointment) for a dental clinic handling appointment booking, emergency routing, and patient follow-ups autonomously.</p>
                <div className="project-tech">Tech: VAPI, Node.js, CrewAI, REST APIs</div>
              </div>

              <div className="project-item">
                <h3>BTC Polymarket Trading Bot</h3>
                <p>Automated cryptocurrency trading bot for Polymarket with prediction market analysis, real-time Telegram alerts, portfolio management, and risk assessment algorithms.</p>
                <div className="project-tech">Tech: Python, Polymarket API, Telegram, Web3</div>
              </div>

              <div className="project-item">
                <h3>AutoExec Mind — AI Workflow Automation Platform</h3>
                <p>AI automation platform that plans and executes complex workflows autonomously using multi-agent architecture. Handles data processing, API orchestration, and decision making.</p>
                <div className="project-tech">Tech: Python, React, FastAPI, Multi-Agent Systems</div>
              </div>

              <div className="project-item">
                <h3>Composable Commerce Engine (Shopify)</h3>
                <p>Advanced Shopify composable architecture with headless commerce, multi-vendor support, real-time inventory sync, and custom checkout flow processing $500K+ in transactions.</p>
                <div className="project-tech">Tech: Shopify, Liquid, Node.js, GraphQL</div>
              </div>

              <div className="project-item">
                <h3>AbleConnect WhatsApp ERP Integration</h3>
                <p>Enterprise WhatsApp chatbot integrated with Google Sheets for inventory management, customer support automation, and order processing. Reduced response time by 70%.</p>
                <div className="project-tech">Tech: Node.js, WhatsApp Cloud API, Google Sheets API</div>
              </div>

              {/* Education */}
              <h2>Education</h2>
              <div className="exp-header">
                <h3>Bachelor of Science in Computer Science</h3>
                <span className="exp-date">2015 – 2019</span>
              </div>

              {/* Certifications */}
              <h2>Certifications & Continuous Learning</h2>
              <ul>
                <li>AWS Cloud Practitioner — Amazon Web Services</li>
                <li>Google AI/ML Professional Certificate — Google</li>
                <li>Full-Stack Web Development — freeCodeCamp</li>
                <li>DevOps Engineering — LinkedIn Learning</li>
                <li>LangChain & LLM Application Development — DeepLearning.AI</li>
              </ul>

              {/* Languages */}
              <h2>Languages</h2>
              <p>English (Fluent) • Urdu (Native) • Punjabi (Native)</p>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
