export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  client?: string;
  platform?: string;
  link?: string;
  image: string;
  color: string;
}

export const categories = [
  'All',
  'Full-Stack',
  'AI / ML',
  'AI Voice Agents',
  'E-Commerce',
  'Automation',
  'Chrome Extensions',
  'WordPress',
  'SaaS',
  'DevOps',
];

export const projects: Project[] = [
  // ── Full-Stack Web Applications ────────────────────────
  {
    id: 1,
    title: 'WatchesLuxury.org',
    description:
      'Premium luxury watch e-commerce platform with MVC architecture, user authentication, affiliate system, advanced search filters, and admin dashboard for inventory management.',
    category: 'Full-Stack',
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'MVC'],
    client: 'Robert',
    platform: 'Fiverr',
    image: '🕐',
    color: '#ffd700',
  },
  {
    id: 2,
    title: 'MyCoPack Website',
    description:
      'Modern corporate website for a packaging company with responsive design, product showcases, and contact integration.',
    category: 'Full-Stack',
    tech: ['HTML', 'CSS', 'JavaScript'],
    client: 'Robert',
    platform: 'Fiverr',
    image: '📦',
    color: '#00f5d4',
  },
  {
    id: 3,
    title: 'Caterman Platform',
    description:
      'Full-featured catering service platform with menu management, order system, and customer portal.',
    category: 'Full-Stack',
    tech: ['Node.js', 'Express', 'MongoDB', 'React'],
    client: 'Robert',
    platform: 'Fiverr',
    image: '🍽️',
    color: '#ff6b6b',
  },
  {
    id: 4,
    title: 'Finch Newsletter System',
    description:
      'Automated newsletter management system with subscriber management, template editor, scheduling, and analytics dashboard.',
    category: 'Full-Stack',
    tech: ['Node.js', 'Express', 'MongoDB', 'React'],
    client: 'VlnateBlack',
    platform: 'Fiverr',
    image: '📧',
    color: '#7b61ff',
  },
  {
    id: 5,
    title: 'EduNova Platform',
    description:
      'Comprehensive education platform with course management, student enrollment, progress tracking, and interactive learning modules.',
    category: 'Full-Stack',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    client: 'edu_nova',
    platform: 'Fiverr',
    image: '🎓',
    color: '#00f5d4',
  },
  {
    id: 6,
    title: 'MicroRate.site',
    description:
      'Micro-influencer rating and discovery platform with profile analytics, campaign management, and brand collaboration tools.',
    category: 'Full-Stack',
    tech: ['React', 'TypeScript', 'Node.js', 'CSS'],
    platform: 'Personal',
    image: '⭐',
    color: '#ffd700',
  },
  {
    id: 7,
    title: 'Love Chat Pay',
    description:
      'Real-time chat application with integrated payment system, user matching, and secure messaging features.',
    category: 'Full-Stack',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    client: 'John10',
    platform: 'Fiverr',
    image: '💬',
    color: '#ff6b6b',
  },
  {
    id: 8,
    title: 'Journey Jolly AI',
    description:
      'AI-powered travel planning platform with smart itinerary generation, hotel recommendations, and budget optimization.',
    category: 'Full-Stack',
    tech: ['React', 'TypeScript', 'OpenAI', 'Node.js'],
    client: 'Mehhthew',
    platform: 'Fiverr',
    image: '✈️',
    color: '#00f5d4',
  },
  {
    id: 9,
    title: 'Meal Route Master',
    description:
      'Meal planning and delivery route optimization app with dietary preferences, nutrition tracking, and driver management.',
    category: 'Full-Stack',
    tech: ['React', 'TypeScript', 'Node.js', 'Maps API'],
    platform: 'Upwork',
    image: '🥗',
    color: '#7b61ff',
  },
  {
    id: 10,
    title: 'Paragraph Painter',
    description:
      'Creative writing tool with AI-assisted text styling, formatting, and visual enhancement capabilities.',
    category: 'Full-Stack',
    tech: ['React', 'TypeScript', 'Canvas API', 'Node.js'],
    platform: 'Upwork',
    image: '🎨',
    color: '#ff6b6b',
  },

  // ── AI & Machine Learning ─────────────────────────────
  {
    id: 11,
    title: 'AI Quran Life Guidance Engine',
    description:
      'Islamic AI guidance system that provides Quran-based life advice using NLP, semantic search, and contextual understanding of Arabic text.',
    category: 'AI / ML',
    tech: ['Python', 'FastAPI', 'LangChain', 'NLP'],
    platform: 'Personal',
    image: '🕌',
    color: '#00f5d4',
  },
  {
    id: 12,
    title: 'AI Video Generator',
    description:
      'Gemini-powered automated video creation pipeline with script generation, voiceover, image synthesis, and video compilation.',
    category: 'AI / ML',
    tech: ['Python', 'Gemini API', 'FFmpeg', 'React'],
    platform: 'Personal',
    image: '🎬',
    color: '#7b61ff',
  },
  {
    id: 13,
    title: 'Voiceover Generator',
    description:
      'Professional AI voiceover generation tool supporting multiple languages, accents, and emotional tones for content creators.',
    category: 'AI / ML',
    tech: ['Python', 'TTS API', 'React', 'Node.js'],
    platform: 'Personal',
    image: '🎙️',
    color: '#ffd700',
  },
  {
    id: 14,
    title: 'PDF Master',
    description:
      'AI-powered PDF processing platform with intelligent document analysis, data extraction, and automated report generation.',
    category: 'AI / ML',
    tech: ['Python', 'FastAPI', 'LangChain', 'React'],
    platform: 'Personal',
    image: '📄',
    color: '#ff6b6b',
  },
  {
    id: 15,
    title: 'Claude Content Creation Agent',
    description:
      'Autonomous content creation agent powered by Claude AI for blog posts, social media, and marketing copy generation.',
    category: 'AI / ML',
    tech: ['Python', 'Claude API', 'CrewAI', 'React'],
    platform: 'Personal',
    image: '✍️',
    color: '#00f5d4',
  },
  {
    id: 16,
    title: 'DeepSeek Reasoning Chatbot',
    description:
      'Advanced reasoning chatbot using DeepSeek R1 with Ollama for local inference, chain-of-thought reasoning, and multi-turn conversations.',
    category: 'AI / ML',
    tech: ['Python', 'FastAPI', 'Ollama', 'DeepSeek'],
    platform: 'Personal',
    image: '🧠',
    color: '#7b61ff',
  },
  {
    id: 17,
    title: 'Progress Partner AI',
    description:
      'AI tutoring platform with personalized learning paths, adaptive assessments, and real-time progress analytics.',
    category: 'AI / ML',
    tech: ['React', 'TypeScript', 'Python', 'OpenAI'],
    client: 'Dolphinspirit88',
    platform: 'Fiverr',
    image: '📚',
    color: '#00f5d4',
  },
  {
    id: 18,
    title: 'Spark AI Factory',
    description:
      'Multi-model AI content factory supporting GPT, Claude, and Gemini for automated content production at scale.',
    category: 'AI / ML',
    tech: ['Python', 'FastAPI', 'Multi-LLM', 'React'],
    platform: 'Personal',
    image: '⚡',
    color: '#ffd700',
  },
  {
    id: 19,
    title: 'E-Commerce AI Agent System',
    description:
      'AI-powered e-commerce recommendation and customer support agent with product search, order tracking, and smart suggestions.',
    category: 'AI / ML',
    tech: ['Python', 'CrewAI', 'LangChain', 'React'],
    platform: 'Personal',
    image: '🤖',
    color: '#ff6b6b',
  },
  {
    id: 20,
    title: 'CrewAI Housing Agents',
    description:
      'Multi-agent real estate analysis system using CrewAI for property valuation, market analysis, and investment recommendations.',
    category: 'AI / ML',
    tech: ['Python', 'CrewAI', 'LangChain', 'FastAPI'],
    platform: 'Upwork',
    image: '🏠',
    color: '#7b61ff',
  },

  // ── AI Voice Agents ────────────────────────────────────
  {
    id: 21,
    title: 'VAPI Dental Clinic System',
    description:
      'Multi-agent AI voice system for dental clinics with 3 specialized agents: Triage, Emergency, and Appointment booking with VAPI integration.',
    category: 'AI Voice Agents',
    tech: ['Python', 'VAPI', 'Node.js', 'CrewAI'],
    platform: 'Upwork',
    image: '🦷',
    color: '#00f5d4',
  },
  {
    id: 22,
    title: 'CalligAgent',
    description:
      'AI-powered calling agent system for automated outbound calls with natural language processing and conversation management.',
    category: 'AI Voice Agents',
    tech: ['Python', 'VAPI', 'Twilio', 'OpenAI'],
    platform: 'Personal',
    image: '📞',
    color: '#7b61ff',
  },
  {
    id: 23,
    title: '8 AI Voice Agents Suite',
    description:
      'Enterprise-grade suite of 8 specialized AI voice agents for customer service, sales, support, and appointment management.',
    category: 'AI Voice Agents',
    tech: ['Python', 'VAPI', 'Node.js', 'Multi-LLM'],
    client: 'Nigeria Client',
    platform: 'Upwork',
    image: '🎧',
    color: '#ffd700',
  },
  {
    id: 24,
    title: 'Celebrity Voice Bot',
    description:
      'Custom AI chatbot with celebrity voice cloning for entertainment and fan engagement, with natural conversation flow.',
    category: 'AI Voice Agents',
    tech: ['Python', 'TTS', 'OpenAI', 'Node.js'],
    client: 'Joshua C.',
    platform: 'Upwork',
    image: '🌟',
    color: '#ff6b6b',
  },

  // ── E-Commerce Solutions ───────────────────────────────
  {
    id: 25,
    title: 'Composable Commerce Engine',
    description:
      'Advanced Shopify composable architecture with headless commerce, multi-vendor support, and real-time inventory sync.',
    category: 'E-Commerce',
    tech: ['Shopify', 'Liquid', 'Node.js', 'GraphQL'],
    client: 'GreenSystemsInc',
    platform: 'Fiverr',
    image: '🏪',
    color: '#00f5d4',
  },
  {
    id: 26,
    title: 'Shopify-ERPNext Integration',
    description:
      'Full ERP integration connecting Shopify store with ERPNext for automated inventory, order management, and financial sync.',
    category: 'E-Commerce',
    tech: ['Shopify', 'ERPNext', 'Python', 'REST API'],
    platform: 'Personal',
    image: '🔗',
    color: '#7b61ff',
  },
  {
    id: 27,
    title: 'Luxe WooCommerce Theme',
    description:
      'Premium WooCommerce theme with luxury design, product quick-view, AJAX cart, wishlists, and mobile-first responsive layout.',
    category: 'E-Commerce',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'CSS'],
    platform: 'Personal',
    image: '💎',
    color: '#ffd700',
  },
  {
    id: 28,
    title: 'Shopify Complete Store Theme',
    description:
      'Custom-built Shopify theme from scratch with advanced product filtering, collection pages, and checkout optimization.',
    category: 'E-Commerce',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    platform: 'Personal',
    image: '🛍️',
    color: '#ff6b6b',
  },
  {
    id: 29,
    title: 'NowaCash Payment Gateway',
    description:
      'Custom WooCommerce payment gateway plugin for NowaCash with secure transaction processing and order management.',
    category: 'E-Commerce',
    tech: ['PHP', 'WooCommerce', 'REST API', 'MySQL'],
    platform: 'Personal',
    image: '💳',
    color: '#00f5d4',
  },
  {
    id: 30,
    title: 'PrestaShop Store Customization',
    description:
      'PrestaShop 9 store customization with custom modules, theme modifications, and performance optimization.',
    category: 'E-Commerce',
    tech: ['PrestaShop', 'PHP', 'MySQL', 'Smarty'],
    platform: 'Personal',
    image: '🏬',
    color: '#7b61ff',
  },

  // ── Automation & Bots ──────────────────────────────────
  {
    id: 31,
    title: 'AbleConnect Ghana',
    description:
      'WhatsApp chatbot system for a Ghanaian business with Google Sheets database integration, automated responses, and customer management.',
    category: 'Automation',
    tech: ['Node.js', 'WhatsApp API', 'Google Sheets', 'Webhook'],
    client: 'AbleConnect',
    platform: 'Fiverr',
    image: '💬',
    color: '#00f5d4',
  },
  {
    id: 32,
    title: 'BTC Polymarket Trading Bot',
    description:
      'Automated cryptocurrency trading bot for Polymarket with prediction market analysis, Telegram alerts, and portfolio management.',
    category: 'Automation',
    tech: ['Python', 'Polymarket API', 'Telegram', 'Web3'],
    client: 'GoldenKeyCali',
    platform: 'Fiverr',
    image: '📈',
    color: '#ffd700',
  },
  {
    id: 33,
    title: 'Staple.com Payment Bot',
    description:
      'Automated order processing bot for Staple.com with payment automation, order tracking, and inventory management.',
    category: 'Automation',
    tech: ['Python', 'Selenium', 'Node.js', 'REST API'],
    client: 'Mubdes',
    platform: 'Fiverr',
    image: '🤖',
    color: '#ff6b6b',
  },
  {
    id: 34,
    title: 'Signal Command Center',
    description:
      'Live trading signal aggregation tracking X accounts, automated early signal ranking, and Telegram alerts via @Scraper_dashbot. Deployed on VPS with PM2 and Nginx.',
    category: 'Automation',
    tech: ['Python', 'Telegram API', 'X API', 'OpenAI', 'SQLite', 'PM2'],
    client: 'Matthew',
    platform: 'Fiverr',
    link: 'https://xsignaltracker.tech',
    image: '📡',
    color: '#7b61ff',
  },
  {
    id: 35,
    title: 'TrendSpark Autopilot',
    description:
      'Automated content trend detection and publishing system with social media scheduling, analytics, and A/B testing.',
    category: 'Automation',
    tech: ['Python', 'React', 'OpenAI', 'Social APIs'],
    client: 'Sheeeek',
    platform: 'Fiverr',
    image: '🚀',
    color: '#00f5d4',
  },
  {
    id: 36,
    title: 'WhatsApp Automation Suite',
    description:
      'Multi-feature WhatsApp automation platform with chatbots, broadcast messaging, CRM integration, and analytics dashboard.',
    category: 'Automation',
    tech: ['Node.js', 'WhatsApp API', 'MongoDB', 'React'],
    platform: 'Fiverr',
    image: '📱',
    color: '#ffd700',
  },
  {
    id: 37,
    title: 'DeepSeek Twitter Agent',
    description:
      'Automated Twitter engagement agent using DeepSeek for intelligent responses, content generation, and audience analysis.',
    category: 'Automation',
    tech: ['Python', 'DeepSeek', 'Twitter API', 'FastAPI'],
    platform: 'Fiverr',
    image: '🐦',
    color: '#ff6b6b',
  },

  // ── Chrome Extensions ──────────────────────────────────
  {
    id: 38,
    title: 'LeadConnectPro',
    description:
      'Chrome extension for automated lead generation with contact extraction, CRM sync, and outreach campaign management.',
    category: 'Chrome Extensions',
    tech: ['JavaScript', 'Chrome API', 'React', 'Node.js'],
    platform: 'Personal',
    image: '🔌',
    color: '#00f5d4',
  },
  {
    id: 39,
    title: 'VideoTranslator Extension',
    description:
      'Browser extension and web app for real-time video subtitle translation with multi-language support and AI-powered accuracy.',
    category: 'Chrome Extensions',
    tech: ['JavaScript', 'Chrome API', 'Translation API', 'React'],
    platform: 'Personal',
    image: '🌍',
    color: '#7b61ff',
  },
  {
    id: 40,
    title: 'User-Friendly Docs Generator',
    description:
      'Chrome extension that automatically generates user-friendly documentation from code repositories and APIs.',
    category: 'Chrome Extensions',
    tech: ['JavaScript', 'Chrome API', 'OpenAI', 'Markdown'],
    client: 'Studio',
    platform: 'Fiverr',
    image: '📝',
    color: '#ffd700',
  },

  // ── WordPress & CMS ────────────────────────────────────
  {
    id: 41,
    title: 'TwinVision WordPress Theme',
    description:
      'Figma-to-WordPress conversion with custom WPBakery shortcodes, responsive design, and pixel-perfect implementation.',
    category: 'WordPress',
    tech: ['WordPress', 'PHP', 'WPBakery', 'CSS'],
    platform: 'Client',
    image: '🎨',
    color: '#ff6b6b',
  },
  {
    id: 42,
    title: 'Volumetric Homepage Shortcode',
    description:
      'Advanced WordPress shortcode system for creating 3D volumetric homepage layouts with custom animations and interactions.',
    category: 'WordPress',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    platform: 'Client',
    image: '🏗️',
    color: '#00f5d4',
  },

  // ── SaaS Products ──────────────────────────────────────
  {
    id: 43,
    title: 'AutoExec Mind',
    description:
      'AI automation platform that plans and executes complex workflows autonomously using multi-agent architecture.',
    category: 'SaaS',
    tech: ['Python', 'React', 'FastAPI', 'Multi-Agent'],
    platform: 'Personal',
    image: '🧩',
    color: '#7b61ff',
  },
  {
    id: 44,
    title: 'EduFlow Suite',
    description:
      'Complete education management SaaS with course builder, student analytics, assessment engine, and collaboration tools.',
    category: 'SaaS',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    platform: 'Personal',
    image: '📐',
    color: '#00f5d4',
  },
  {
    id: 45,
    title: 'GadgetVerse',
    description:
      'Tech product discovery and review platform with AI-powered recommendations, comparison tools, and user reviews.',
    category: 'SaaS',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    platform: 'Personal',
    image: '📱',
    color: '#ffd700',
  },
  {
    id: 46,
    title: 'VibeProspecting',
    description:
      'Sales prospecting platform with AI-driven lead scoring, email automation, and pipeline management dashboard.',
    category: 'SaaS',
    tech: ['React', 'Python', 'FastAPI', 'Google APIs'],
    platform: 'Personal',
    image: '🎯',
    color: '#ff6b6b',
  },

  // ── DevOps & Security ──────────────────────────────────
  {
    id: 47,
    title: 'Wazuh SIEM Deployment',
    description:
      'Enterprise security information and event management system deployment with Docker, log analysis, and threat detection.',
    category: 'DevOps',
    tech: ['Docker', 'Wazuh', 'Linux', 'YAML'],
    platform: 'Personal',
    image: '🛡️',
    color: '#00f5d4',
  },
  {
    id: 48,
    title: 'Eliza AI Framework',
    description:
      'Open source contribution to the Eliza AI framework — a multi-agent simulation platform with character-driven conversations.',
    category: 'DevOps',
    tech: ['TypeScript', 'Node.js', 'AI', 'Open Source'],
    platform: 'Open Source',
    image: '🌐',
    color: '#7b61ff',
  },
];
