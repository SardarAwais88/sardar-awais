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
    icon: 'ðŸŽ¨',
    color: '#00f5d4',
    skills: [
      { name: 'React / Next.js', level: 95, icon: 'âš›ï¸', category: 'Frontend', projects: 25 },
      { name: 'TypeScript', level: 90, icon: 'ðŸ“˜', category: 'Frontend', projects: 20 },
      { name: 'HTML5 / CSS3', level: 95, icon: 'ðŸŒ', category: 'Frontend', projects: 40 },
      { name: 'JavaScript (ES6+)', level: 95, icon: 'âš¡', category: 'Frontend', projects: 35 },
      { name: 'Vue.js', level: 80, icon: 'ðŸ’š', category: 'Frontend', projects: 6 },
      { name: 'Tailwind CSS', level: 88, icon: 'ðŸŽ¨', category: 'Frontend', projects: 15 },
      { name: 'Shopify Liquid', level: 85, icon: 'ðŸ›ï¸', category: 'Frontend', projects: 8 },
      { name: 'Three.js / R3F', level: 75, icon: 'ðŸŽ®', category: 'Frontend', projects: 5 },
    ],
  },
  {
    name: 'Backend',
    icon: 'âš™ï¸',
    color: '#7b61ff',
    skills: [
      { name: 'Node.js / Express', level: 92, icon: 'ðŸŸ¢', category: 'Backend', projects: 22 },
      { name: 'Python / FastAPI', level: 90, icon: 'ðŸ', category: 'Backend', projects: 18 },
      { name: 'Django / Flask', level: 82, icon: 'ðŸŽ¸', category: 'Backend', projects: 8 },
      { name: 'PHP / Laravel', level: 85, icon: 'ðŸ˜', category: 'Backend', projects: 12 },
      { name: 'REST API Design', level: 93, icon: 'ðŸ”—', category: 'Backend', projects: 30 },
      { name: 'GraphQL', level: 78, icon: 'ðŸ“Š', category: 'Backend', projects: 5 },
      { name: 'WebSocket', level: 80, icon: 'ðŸ”Œ', category: 'Backend', projects: 8 },
    ],
  },
  {
    name: 'AI & ML',
    icon: 'ðŸ¤–',
    color: '#ff6b6b',
    skills: [
      { name: 'LangChain / CrewAI', level: 90, icon: 'ðŸ”—', category: 'AI & ML', projects: 12 },
      { name: 'OpenAI / GPT API', level: 92, icon: 'ðŸ§ ', category: 'AI & ML', projects: 15 },
      { name: 'VAPI Voice Agents', level: 88, icon: 'ðŸŽ™ï¸', category: 'AI & ML', projects: 6 },
      { name: 'Agentic AI Workflows', level: 88, icon: 'ðŸ¤–', category: 'AI & ML', projects: 10 },
      { name: 'RAG Architecture', level: 85, icon: 'ðŸ“š', category: 'AI & ML', projects: 8 },
      { name: 'Gemini / Claude API', level: 85, icon: 'âœ¨', category: 'AI & ML', projects: 8 },
      { name: 'Vector Databases', level: 82, icon: 'ðŸ”¶', category: 'AI & ML', projects: 6 },
      { name: 'NLP / Text Processing', level: 82, icon: 'ðŸ“', category: 'AI & ML', projects: 10 },
    ],
  },
  {
    name: 'Automation',
    icon: 'âš¡',
    color: '#ffd700',
    skills: [
      { name: 'N8N / Flowise', level: 85, icon: 'ðŸ”„', category: 'Automation', projects: 8 },
      { name: 'WhatsApp Bot API', level: 90, icon: 'ðŸ’¬', category: 'Automation', projects: 6 },
      { name: 'Telegram Bot API', level: 88, icon: 'ðŸ“±', category: 'Automation', projects: 5 },
      { name: 'Web Scraping', level: 85, icon: 'ðŸ•·ï¸', category: 'Automation', projects: 7 },
      { name: 'Chrome Extensions', level: 82, icon: 'ðŸ”Œ', category: 'Automation', projects: 4 },
      { name: 'Selenium / Puppeteer', level: 80, icon: 'ðŸ¤–', category: 'Automation', projects: 5 },
    ],
  },
  {
    name: 'E-Commerce',
    icon: 'ðŸ›’',
    color: '#00d4aa',
    skills: [
      { name: 'Shopify Development', level: 90, icon: 'ðŸ›ï¸', category: 'E-Commerce', projects: 8 },
      { name: 'WooCommerce', level: 88, icon: 'ðŸª', category: 'E-Commerce', projects: 6 },
      { name: 'PrestaShop', level: 75, icon: 'ðŸ¬', category: 'E-Commerce', projects: 3 },
      { name: 'Payment Integration', level: 85, icon: 'ðŸ’³', category: 'E-Commerce', projects: 10 },
      { name: 'ERPNext Integration', level: 80, icon: 'ðŸ“¦', category: 'E-Commerce', projects: 3 },
    ],
  },
  {
    name: 'DevOps',
    icon: 'ðŸš€',
    color: '#ff8c42',
    skills: [
      { name: 'Docker / Kubernetes', level: 85, icon: 'ðŸ³', category: 'DevOps', projects: 10 },
      { name: 'AWS / GCP Cloud', level: 82, icon: 'â˜ï¸', category: 'DevOps', projects: 8 },
      { name: 'CI/CD Pipelines', level: 85, icon: 'ðŸ”„', category: 'DevOps', projects: 12 },
      { name: 'GitHub Actions', level: 88, icon: 'âš™ï¸', category: 'DevOps', projects: 15 },
      { name: 'Terraform / IaC', level: 78, icon: 'ðŸ—ï¸', category: 'DevOps', projects: 5 },
      { name: 'Nginx / Reverse Proxy', level: 82, icon: 'ðŸŒ', category: 'DevOps', projects: 8 },
      { name: 'Git / GitHub', level: 95, icon: 'ðŸ“', category: 'DevOps', projects: 45 },
      { name: 'Linux Server Admin', level: 80, icon: 'ðŸ§', category: 'DevOps', projects: 12 },
    ],
  },
  {
    name: 'Database',
    icon: 'ðŸ—„ï¸',
    color: '#b388ff',
    skills: [
      { name: 'PostgreSQL', level: 88, icon: 'ðŸ˜', category: 'Database', projects: 12 },
      { name: 'MySQL', level: 90, icon: 'ðŸ¬', category: 'Database', projects: 15 },
      { name: 'MongoDB', level: 85, icon: 'ðŸƒ', category: 'Database', projects: 10 },
      { name: 'Redis', level: 75, icon: 'âš¡', category: 'Database', projects: 5 },
      { name: 'Firebase', level: 82, icon: 'ðŸ”¥', category: 'Database', projects: 7 },
      { name: 'Supabase', level: 80, icon: 'âš¡', category: 'Database', projects: 5 },
      { name: 'Pinecone (Vector)', level: 78, icon: 'ðŸ”¶', category: 'Database', projects: 4 },
    ],
  },
];
