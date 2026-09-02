export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
  projects: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    color: '#00f5d4',
    skills: [
      { name: 'React / Next.js', level: 95, icon: '⚛️', category: 'Frontend', projects: 25 },
      { name: 'TypeScript', level: 90, icon: '📘', category: 'Frontend', projects: 20 },
      { name: 'HTML5 / CSS3', level: 95, icon: '🌐', category: 'Frontend', projects: 40 },
      { name: 'JavaScript (ES6+)', level: 95, icon: '⚡', category: 'Frontend', projects: 35 },
      { name: 'Vue.js', level: 80, icon: '💚', category: 'Frontend', projects: 6 },
      { name: 'Tailwind CSS', level: 88, icon: '🎨', category: 'Frontend', projects: 15 },
      { name: 'Shopify Liquid', level: 85, icon: '🛍️', category: 'Frontend', projects: 8 },
      { name: 'Three.js / R3F', level: 75, icon: '🎮', category: 'Frontend', projects: 5 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: '#7b61ff',
    skills: [
      { name: 'Node.js / Express', level: 92, icon: '🟢', category: 'Backend', projects: 22 },
      { name: 'Python / FastAPI', level: 90, icon: '🐍', category: 'Backend', projects: 18 },
      { name: 'Django / Flask', level: 82, icon: '🎸', category: 'Backend', projects: 8 },
      { name: 'PHP / Laravel', level: 85, icon: '🐘', category: 'Backend', projects: 12 },
      { name: 'REST API Design', level: 93, icon: '🔗', category: 'Backend', projects: 30 },
      { name: 'GraphQL', level: 78, icon: '📊', category: 'Backend', projects: 5 },
      { name: 'WebSocket', level: 80, icon: '🔌', category: 'Backend', projects: 8 },
    ],
  },
  {
    name: 'AI & ML',
    icon: '🤖',
    color: '#ff6b6b',
    skills: [
      { name: 'LangChain / CrewAI', level: 90, icon: '🔗', category: 'AI & ML', projects: 12 },
      { name: 'OpenAI / GPT API', level: 92, icon: '🧠', category: 'AI & ML', projects: 15 },
      { name: 'VAPI Voice Agents', level: 88, icon: '🎙️', category: 'AI & ML', projects: 6 },
      { name: 'Agentic AI Workflows', level: 88, icon: '🤖', category: 'AI & ML', projects: 10 },
      { name: 'RAG Architecture', level: 85, icon: '📚', category: 'AI & ML', projects: 8 },
      { name: 'Gemini / Claude API', level: 85, icon: '✨', category: 'AI & ML', projects: 8 },
      { name: 'Vector Databases', level: 82, icon: '🔶', category: 'AI & ML', projects: 6 },
      { name: 'NLP / Text Processing', level: 82, icon: '📝', category: 'AI & ML', projects: 10 },
    ],
  },
  {
    name: 'Automation',
    icon: '⚡',
    color: '#ffd700',
    skills: [
      { name: 'N8N / Flowise', level: 85, icon: '🔄', category: 'Automation', projects: 8 },
      { name: 'WhatsApp Bot API', level: 90, icon: '💬', category: 'Automation', projects: 6 },
      { name: 'Telegram Bot API', level: 88, icon: '📱', category: 'Automation', projects: 5 },
      { name: 'Web Scraping', level: 85, icon: '🕷️', category: 'Automation', projects: 7 },
      { name: 'Chrome Extensions', level: 82, icon: '🔌', category: 'Automation', projects: 4 },
      { name: 'Selenium / Puppeteer', level: 80, icon: '🤖', category: 'Automation', projects: 5 },
    ],
  },
  {
    name: 'E-Commerce',
    icon: '🛒',
    color: '#00d4aa',
    skills: [
      { name: 'Shopify Development', level: 90, icon: '🛍️', category: 'E-Commerce', projects: 8 },
      { name: 'WooCommerce', level: 88, icon: '🏪', category: 'E-Commerce', projects: 6 },
      { name: 'PrestaShop', level: 75, icon: '🏬', category: 'E-Commerce', projects: 3 },
      { name: 'Payment Integration', level: 85, icon: '💳', category: 'E-Commerce', projects: 10 },
      { name: 'ERPNext Integration', level: 80, icon: '📦', category: 'E-Commerce', projects: 3 },
    ],
  },
  {
    name: 'DevOps',
    icon: '🚀',
    color: '#ff8c42',
    skills: [
      { name: 'Docker / Kubernetes', level: 85, icon: '🐳', category: 'DevOps', projects: 10 },
      { name: 'AWS / GCP Cloud', level: 82, icon: '☁️', category: 'DevOps', projects: 8 },
      { name: 'CI/CD Pipelines', level: 85, icon: '🔄', category: 'DevOps', projects: 12 },
      { name: 'GitHub Actions', level: 88, icon: '⚙️', category: 'DevOps', projects: 15 },
      { name: 'Terraform / IaC', level: 78, icon: '🏗️', category: 'DevOps', projects: 5 },
      { name: 'Nginx / Reverse Proxy', level: 82, icon: '🌐', category: 'DevOps', projects: 8 },
      { name: 'Git / GitHub', level: 95, icon: '📁', category: 'DevOps', projects: 45 },
      { name: 'Linux Server Admin', level: 80, icon: '🐧', category: 'DevOps', projects: 12 },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    color: '#b388ff',
    skills: [
      { name: 'PostgreSQL', level: 88, icon: '🐘', category: 'Database', projects: 12 },
      { name: 'MySQL', level: 90, icon: '🐬', category: 'Database', projects: 15 },
      { name: 'MongoDB', level: 85, icon: '🍃', category: 'Database', projects: 10 },
      { name: 'Redis', level: 75, icon: '⚡', category: 'Database', projects: 5 },
      { name: 'Firebase', level: 82, icon: '🔥', category: 'Database', projects: 7 },
      { name: 'Supabase', level: 80, icon: '⚡', category: 'Database', projects: 5 },
      { name: 'Pinecone (Vector)', level: 78, icon: '🔶', category: 'Database', projects: 4 },
    ],
  },
];
