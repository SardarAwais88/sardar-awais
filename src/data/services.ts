export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceRange: string;
  color: string;
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web application development from concept to deployment. Modern, scalable, and performant solutions.',
    icon: '🌐',
    features: [
      'React / Next.js Frontend',
      'Node.js / Python Backend',
      'Database Design & Integration',
      'RESTful & GraphQL APIs',
      'Authentication & Security',
      'Cloud Deployment',
    ],
    priceRange: '$2,000 - $15,000',
    color: '#00f5d4',
  },
  {
    id: 2,
    title: 'AI Agent & Voice Bot Development',
    description:
      'Custom AI agents and voice bots for customer service, sales automation, and intelligent process management.',
    icon: '🤖',
    features: [
      'VAPI Voice Agent Setup',
      'Multi-Agent Systems (CrewAI)',
      'Custom LLM Integration',
      'Chatbot Development',
      'NLP & Intent Recognition',
      'Conversation Flow Design',
    ],
    priceRange: '$3,000 - $20,000',
    color: '#7b61ff',
    popular: true,
  },
  {
    id: 3,
    title: 'E-Commerce Solutions',
    description:
      'Complete e-commerce setups on Shopify, WooCommerce, or custom platforms with payment, inventory, and analytics.',
    icon: '🛒',
    features: [
      'Shopify Theme Development',
      'WooCommerce Customization',
      'Payment Gateway Integration',
      'ERP System Integration',
      'Inventory Management',
      'Performance Optimization',
    ],
    priceRange: '$1,500 - $10,000',
    color: '#ffd700',
  },
  {
    id: 4,
    title: 'Automation & Bot Development',
    description:
      'Smart automation solutions that eliminate manual tasks. WhatsApp bots, trading bots, web scrapers, and workflow automation.',
    icon: '⚡',
    features: [
      'WhatsApp / Telegram Bots',
      'Trading & Crypto Bots',
      'Web Scraping Solutions',
      'N8N / Workflow Automation',
      'Social Media Automation',
      'Data Processing Pipelines',
    ],
    priceRange: '$1,000 - $8,000',
    color: '#ff6b6b',
  },
  {
    id: 5,
    title: 'Chrome Extension Development',
    description:
      'Custom Chrome extensions for lead generation, productivity, content management, and browser automation.',
    icon: '🔌',
    features: [
      'Chrome Manifest V3',
      'Content Scripts & Popups',
      'Background Service Workers',
      'API Integration',
      'Data Extraction Tools',
      'Chrome Web Store Publishing',
    ],
    priceRange: '$500 - $5,000',
    color: '#00d4aa',
  },
  {
    id: 6,
    title: 'WordPress & CMS Development',
    description:
      'Custom WordPress themes, plugins, and Figma-to-WordPress conversions with pixel-perfect implementation.',
    icon: '📝',
    features: [
      'Custom Theme Development',
      'Figma to WordPress',
      'WPBakery / Elementor',
      'Plugin Development',
      'Speed Optimization',
      'SEO Configuration',
    ],
    priceRange: '$800 - $6,000',
    color: '#b388ff',
  },
  {
    id: 7,
    title: 'DevOps & Cloud Infrastructure',
    description:
      'Enterprise-grade DevOps solutions with Docker, Kubernetes, AWS, and CI/CD pipelines for scalable, reliable deployments.',
    icon: '☁️',
    features: [
      'Docker & Kubernetes Setup',
      'AWS / GCP Cloud Architecture',
      'CI/CD Pipeline (GitHub Actions)',
      'Infrastructure as Code (Terraform)',
      'Server Monitoring & Security',
      'Performance Optimization & Scaling',
    ],
    priceRange: '$2,000 - $12,000',
    color: '#ff8c42',
  },
];

export const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'Understanding your business goals, target audience, and project requirements through detailed consultation.',
    icon: '🔍',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'Creating detailed technical specifications, architecture diagrams, and project roadmap with milestones.',
    icon: '📋',
  },
  {
    step: 3,
    title: 'Development',
    description: 'Building your solution with clean code, regular updates, and milestone-based delivery.',
    icon: '💻',
  },
  {
    step: 4,
    title: 'Testing',
    description: 'Rigorous quality assurance, performance testing, and security audits before launch.',
    icon: '🧪',
  },
  {
    step: 5,
    title: 'Deployment',
    description: 'Smooth production deployment with documentation, training, and handover support.',
    icon: '🚀',
  },
  {
    step: 6,
    title: 'Support',
    description: 'Ongoing maintenance, updates, and priority support to keep your system running flawlessly.',
    icon: '🛡️',
  },
];
