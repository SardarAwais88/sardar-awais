export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'MCP Server' | 'AI Voice Agent' | 'RAG Chatbot' | 'Full-Stack' | 'Automation' | 'E-Commerce' | 'Chrome Extension';
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  serviceLink: string;
}

export const caseStudies: CaseStudy[] = [
  // ── MCP Server Case Studies (5) ────────────────────────
  {
    slug: 'mcp-server-ecommerce-api',
    title: 'E-Commerce API MCP Server',
    metaTitle: 'MCP Server for E-Commerce API Integration | Case Study',
    metaDescription: 'Discover how we built an MCP server to integrate e-commerce APIs for unified product management and AI tool access.',
    category: 'MCP Server',
    problem: 'The client struggled with fragmented product data across multiple e-commerce platforms, preventing LLMs from analyzing inventory efficiently.',
    solution: 'Built a custom Model Context Protocol (MCP) server that unified data streams from Shopify and WooCommerce into standard tool calls for AI agents.',
    result: 'Reduced AI hallucination on inventory by 95% and enabled real-time product querying directly through conversational interfaces.',
    techStack: ['TypeScript', 'MCP SDK', 'Node.js', 'REST APIs', 'Shopify API'],
    serviceLink: '/services/mcp-server-development'
  },
  {
    slug: 'mcp-server-crm-integration',
    title: 'CRM Integration MCP Server',
    metaTitle: 'MCP Server for HubSpot CRM Integration | Case Study',
    metaDescription: 'Case study on developing a custom MCP server for seamless CRM integration and AI automation.',
    category: 'MCP Server',
    problem: 'Sales agents needed to manually extract data from HubSpot to answer customer inquiries via AI, slowing down response times.',
    solution: 'Developed an MCP server that exposed HubSpot CRM endpoints as standardized tools, allowing AI models to read/write contact records securely.',
    result: 'Decreased average response time by 40% and fully automated lead updating workflows.',
    techStack: ['Python', 'MCP SDK', 'FastAPI', 'HubSpot API', 'OAuth2'],
    serviceLink: '/services/mcp-server-development'
  },
  {
    slug: 'mcp-server-database-querying',
    title: 'Enterprise Database MCP Server',
    metaTitle: 'MCP Server for Secure Database Querying | Case Study',
    metaDescription: 'How an MCP server enabled secure, natural language querying of enterprise PostgreSQL databases.',
    category: 'MCP Server',
    problem: 'Non-technical managers couldn\'t access real-time business intelligence without asking data engineers for SQL queries.',
    solution: 'Engineered a read-only MCP server connected to a PostgreSQL data warehouse, providing schema context and safe query execution to Claude.',
    result: 'Saved data engineering teams 15 hours per week by enabling direct natural language querying for business users.',
    techStack: ['Go', 'MCP', 'PostgreSQL', 'Docker', 'Row-Level Security'],
    serviceLink: '/services/mcp-server-development'
  },
  {
    slug: 'mcp-server-internal-tools',
    title: 'Internal Tools MCP Server',
    metaTitle: 'MCP Server for Internal Developer Tools | Case Study',
    metaDescription: 'Streamlining DevOps and internal tools using a custom MCP server for AI assistants.',
    category: 'MCP Server',
    problem: 'DevOps engineers spent too much time context-switching between AWS, GitHub, and Jira to diagnose deployment failures.',
    solution: 'Created an internal MCP server that aggregated AWS CloudWatch logs, GitHub actions, and Jira tickets into a single AI context window.',
    result: 'Reduced incident resolution time (MTTR) by 60% with AI-assisted cross-platform debugging.',
    techStack: ['TypeScript', 'MCP SDK', 'AWS SDK', 'GitHub API', 'Jira API'],
    serviceLink: '/services/mcp-server-development'
  },
  {
    slug: 'mcp-server-document-management',
    title: 'Document Management MCP Server',
    metaTitle: 'MCP Server for Document Management Systems | Case Study',
    metaDescription: 'Enhancing enterprise document discovery with an MCP server connected to SharePoint and Google Drive.',
    category: 'MCP Server',
    problem: 'Legal teams couldn\'t efficiently search across thousands of contracts spread between SharePoint and Google Drive.',
    solution: 'Implemented an MCP server with semantic search capabilities that allowed LLMs to fetch and read relevant document chunks across platforms.',
    result: 'Improved document retrieval speed by 80% and increased the accuracy of legal summaries.',
    techStack: ['Python', 'MCP', 'LangChain', 'Google Drive API', 'Microsoft Graph'],
    serviceLink: '/services/mcp-server-development'
  },

  // ── AI Voice Agent Case Studies (5) ────────────────────
  {
    slug: 'dental-clinic-voice-agent',
    title: 'Dental Clinic Voice Agent',
    metaTitle: 'AI Voice Agent for Dental Clinic Scheduling | Case Study',
    metaDescription: 'How an AI voice agent automated appointment scheduling and emergency triage for a high-volume dental clinic.',
    category: 'AI Voice Agent',
    problem: 'A dental clinic in Madrid was losing patients due to long hold times and missed calls during peak hours.',
    solution: 'Engineered a bilingual VAPI voice agent with CrewAI backend to triage emergencies and handle complex scheduling directly in the CRM.',
    result: 'Resolved 85% of inbound calls without human intervention and captured 30% more bookings.',
    techStack: ['VAPI', 'CrewAI', 'FastAPI', 'Node.js', 'REST APIs'],
    serviceLink: '/services/ai-voice-agents'
  },
  {
    slug: 'real-estate-voice-agent',
    title: 'Real Estate Outbound Voice Agent',
    metaTitle: 'Outbound AI Voice Agent for Real Estate | Case Study',
    metaDescription: 'Case study on a real estate voice agent qualifying leads and booking property viewings autonomously.',
    category: 'AI Voice Agent',
    problem: 'Real estate agents were spending 4+ hours daily cold-calling and qualifying top-of-funnel leads.',
    solution: 'Deployed a custom AI voice agent with cloned human voices to conduct natural outbound qualification calls and sync responses to Salesforce.',
    result: 'Generated 4x more qualified appointments per week while reducing agent cold-calling time to zero.',
    techStack: ['Python', 'Twilio', 'ElevenLabs', 'OpenAI', 'Salesforce API'],
    serviceLink: '/services/ai-voice-agents'
  },
  {
    slug: 'restaurant-booking-agent',
    title: 'Restaurant Booking Voice Agent',
    metaTitle: 'AI Voice Agent for Restaurant Reservations | Case Study',
    metaDescription: 'Automating restaurant reservations and customer FAQs with a conversational AI voice agent.',
    category: 'AI Voice Agent',
    problem: 'Host staff were overwhelmed by phone calls asking about parking, menus, and reservations during busy dinner shifts.',
    solution: 'Integrated a voice assistant that checked live table availability via OpenTable API and answered common questions using RAG.',
    result: 'Reduced staff interruptions by 70% and completely eliminated hold times for callers.',
    techStack: ['VAPI', 'Node.js', 'OpenTable API', 'Supabase'],
    serviceLink: '/services/ai-voice-agents'
  },
  {
    slug: 'customer-support-voice-agent',
    title: 'E-Commerce Support Voice Agent',
    metaTitle: 'AI Voice Agent for E-Commerce Customer Support | Case Study',
    metaDescription: 'A scalable AI voice agent handling order tracking and returns for a mid-sized e-commerce brand.',
    category: 'AI Voice Agent',
    problem: 'During the holiday season, customer support ticket volume caused 48-hour delays in resolving simple "Where is my order?" requests.',
    solution: 'Developed an inbound voice agent that authenticated users, fetched real-time shipping data via Shopify API, and processed return requests.',
    result: 'Handled 5,000+ calls during peak season with a 92% first-call resolution rate.',
    techStack: ['Python', 'VAPI', 'Shopify API', 'Zendesk', 'Stripe'],
    serviceLink: '/services/ai-voice-agents'
  },
  {
    slug: 'appointment-scheduling-agent',
    title: 'Medical Appointment Voice Agent',
    metaTitle: 'AI Voice Agent for Medical Clinics | Case Study',
    metaDescription: 'HIPAA-compliant AI voice agent for medical appointment scheduling and patient reminders.',
    category: 'AI Voice Agent',
    problem: 'A network of clinics faced high no-show rates and needed a scalable way to confirm appointments and reschedule cancellations.',
    solution: 'Built a HIPAA-compliant voice bot that called patients 48 hours prior, understood complex rescheduling constraints, and updated the EHR.',
    result: 'Decreased patient no-show rates by 35% and saved administrative staff 20 hours a week.',
    techStack: ['Node.js', 'Twilio Voice', 'Google Cloud STT', 'Healthcare APIs'],
    serviceLink: '/services/ai-voice-agents'
  },

  // ── RAG Chatbot Case Studies (5) ────────────────────────
  {
    slug: 'legal-document-chatbot',
    title: 'Legal Document RAG Chatbot',
    metaTitle: 'RAG Chatbot for Legal Document Analysis | Case Study',
    metaDescription: 'How a RAG chatbot accelerated contract analysis and compliance checking for a law firm.',
    category: 'RAG Chatbot',
    problem: 'Paralegals spent countless hours manually reviewing 100-page contracts to find specific liability clauses and compliance risks.',
    solution: 'Developed a Retrieval-Augmented Generation (RAG) chatbot using ChromaDB and Claude 3 to ingest PDFs and provide cited answers.',
    result: 'Cut contract review time by 80% and improved clause detection accuracy significantly.',
    techStack: ['Python', 'ChromaDB', 'Claude 3', 'FastAPI', 'React'],
    serviceLink: '/services/rag-chatbots'
  },
  {
    slug: 'medical-knowledge-base',
    title: 'Medical Knowledge RAG Chatbot',
    metaTitle: 'RAG Chatbot for Medical Knowledge Base | Case Study',
    metaDescription: 'Providing doctors with instant access to clinical guidelines via an AI-powered RAG chatbot.',
    category: 'RAG Chatbot',
    problem: 'Healthcare professionals needed quick, reliable answers from thousands of pages of frequently updated clinical guidelines.',
    solution: 'Engineered a highly precise RAG system with chunking strategies optimized for medical terminology and integrated with Google Gemini.',
    result: 'Enabled sub-second retrieval of clinical protocols, citing exact page numbers for verification.',
    techStack: ['Python', 'Pinecone', 'Google Gemini', 'LangChain', 'Next.js'],
    serviceLink: '/services/rag-chatbots'
  },
  {
    slug: 'saas-help-desk-chatbot',
    title: 'SaaS Help Desk RAG Chatbot',
    metaTitle: 'RAG Chatbot for SaaS Customer Support | Case Study',
    metaDescription: 'Automating L1 support tickets with a documentation-trained RAG chatbot.',
    category: 'RAG Chatbot',
    problem: 'A SaaS company’s support team was flooded with repetitive "how-to" questions that were already covered in their documentation.',
    solution: 'Deployed a RAG widget trained on their Zendesk knowledge base and GitHub READMEs to instantly resolve user queries.',
    result: 'Deflected 45% of incoming L1 support tickets, reducing support costs by $10k/month.',
    techStack: ['TypeScript', 'OpenAI', 'Supabase Vector', 'Zendesk API', 'Tailwind'],
    serviceLink: '/services/rag-chatbots'
  },
  {
    slug: 'ecommerce-product-finder',
    title: 'E-Commerce Product Finder Chatbot',
    metaTitle: 'RAG Chatbot for E-Commerce Product Discovery | Case Study',
    metaDescription: 'An AI shopping assistant that uses RAG to recommend products based on complex customer needs.',
    category: 'RAG Chatbot',
    problem: 'Customers struggled to find specific electronic components among 50,000+ SKUs using standard keyword search.',
    solution: 'Built a conversational product finder that indexed product manuals, specs, and reviews using a vector database for semantic search.',
    result: 'Increased conversion rates by 22% for users interacting with the AI shopping assistant.',
    techStack: ['Python', 'Weaviate', 'FastAPI', 'React', 'Shopify API'],
    serviceLink: '/services/rag-chatbots'
  },
  {
    slug: 'hr-policy-chatbot',
    title: 'HR Policy RAG Chatbot',
    metaTitle: 'Internal HR Policy RAG Chatbot | Case Study',
    metaDescription: 'Streamlining employee onboarding and HR queries with a secure internal RAG chatbot.',
    category: 'RAG Chatbot',
    problem: 'The HR department was overwhelmed answering routine questions about benefits, PTO, and company policies via Slack.',
    solution: 'Integrated a Slack bot powered by RAG that searched the company’s internal Notion workspace to answer employee questions instantly.',
    result: 'Saved HR reps 10 hours a week and provided employees with instant 24/7 answers.',
    techStack: ['Node.js', 'Notion API', 'Slack API', 'Qdrant', 'OpenAI'],
    serviceLink: '/services/rag-chatbots'
  },

  // ── Full-Stack Case Studies (5) ────────────────────────
  {
    slug: 'watches-luxury-ecommerce',
    title: 'WatchesLuxury.org Platform',
    metaTitle: 'Full-Stack Luxury Watch E-Commerce Platform | Case Study',
    metaDescription: 'Building a premium MVC e-commerce platform with affiliate tracking for a luxury watch brand.',
    category: 'Full-Stack',
    problem: 'The client needed a scalable, bespoke luxury watch marketplace with an integrated affiliate tracking system.',
    solution: 'Built a custom PHP MVC application with MySQL, featuring user authentication, advanced search filters, and an admin dashboard.',
    result: 'Delivered a high-performance platform that saw a 40% increase in affiliate sign-ups in its first month.',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'MVC Architecture'],
    serviceLink: '/services/full-stack-development'
  },
  {
    slug: 'eduflow-school-management',
    title: 'EduFlow School Management SaaS',
    metaTitle: 'Full-Stack School Management SaaS | Case Study',
    metaDescription: 'A complete school management system with student portals and JWT authentication.',
    category: 'Full-Stack',
    problem: 'Local schools required an affordable, self-hosted management system with role-based access for teachers and students.',
    solution: 'Engineered a React and FastAPI SaaS platform with SQLite, JWT authentication, timetable management, and attendance tracking.',
    result: 'Successfully deployed a comprehensive platform with 10+ core administrative features.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Vite'],
    serviceLink: '/services/full-stack-development'
  },
  {
    slug: 'finch-newsletter-platform',
    title: 'Finch Newsletter System',
    metaTitle: 'Full-Stack Automated Newsletter System | Case Study',
    metaDescription: 'Developing an automated newsletter management system with advanced scheduling.',
    category: 'Full-Stack',
    problem: 'A marketing agency needed a custom newsletter platform to handle subscriber management, scheduling, and analytics without high monthly fees.',
    solution: 'Created a full-stack MERN application with a custom template editor and a scheduled dispatch system using Cron jobs.',
    result: 'Reduced the agency\'s email marketing costs by 75% while increasing deliverability tracking accuracy.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Cron'],
    serviceLink: '/services/full-stack-development'
  },
  {
    slug: 'journey-jolly-travel-planner',
    title: 'Journey Jolly AI Travel App',
    metaTitle: 'Full-Stack AI Travel Planning App | Case Study',
    metaDescription: 'An AI-powered travel planning platform generating smart itineraries.',
    category: 'Full-Stack',
    problem: 'Travelers wanted a unified platform to automatically generate optimized daily itineraries based on budget and preferences.',
    solution: 'Developed a React frontend and Node.js backend integrated with OpenAI to dynamically generate and adjust travel plans.',
    result: 'Attracted 1,000+ early access users and generated over 5,000 custom travel itineraries in the first quarter.',
    techStack: ['React', 'TypeScript', 'OpenAI API', 'Node.js', 'PostgreSQL'],
    serviceLink: '/services/full-stack-development'
  },
  {
    slug: 'zameen-real-estate-clone',
    title: 'Zameen Real Estate Platform',
    metaTitle: 'Full-Stack Real Estate Listing Platform | Case Study',
    metaDescription: 'Building a high-performance real estate listing clone with Next.js and Prisma.',
    category: 'Full-Stack',
    problem: 'Needed a modern, lightning-fast property listing platform capable of handling complex search filters and high image volume.',
    solution: 'Constructed a Next.js application using Prisma ORM and Tailwind CSS, featuring advanced filtering and optimized image delivery.',
    result: 'Achieved a perfect 100 Lighthouse performance score and streamlined the property submission workflow.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS', 'SQLite'],
    serviceLink: '/services/full-stack-development'
  },

  // ── Automation Case Studies (5) ────────────────────────
  {
    slug: 'btc-polymarket-trading',
    title: 'BTC Polymarket Trading Bot',
    metaTitle: 'Automated Crypto Trading Bot for Polymarket | Case Study',
    metaDescription: 'An AI-powered automated trading bot for prediction markets with Telegram alerts.',
    category: 'Automation',
    problem: 'A crypto trader needed a 24/7 automated system to analyze Polymarket prediction markets and execute trades based on AI sentiment.',
    solution: 'Built a Python bot integrating Polymarket API, GPT-4 for market analysis, Web3 for execution, and Telegram for real-time alerts.',
    result: 'The bot operates continuously, executing trades with calculated risk parameters and saving the client hours of daily screen time.',
    techStack: ['Python', 'Polymarket API', 'Web3', 'GPT-4', 'Telegram API'],
    serviceLink: '/services/automation'
  },
  {
    slug: 'signal-command-center',
    title: 'Crypto Signal Command Center',
    metaTitle: 'Automated Crypto Signal Aggregation System | Case Study',
    metaDescription: 'Tracking and ranking crypto trading signals automatically from X (Twitter).',
    category: 'Automation',
    problem: 'A trading group was manually monitoring over 50 X accounts to find alpha, often missing early signals.',
    solution: 'Developed a scraping architecture to aggregate posts, used OpenAI to score signal quality, and routed high-priority alerts to Telegram.',
    result: 'Processed over 1,000 signals daily, delivering actionable alerts within seconds of the original post.',
    techStack: ['Python', 'X API', 'OpenAI', 'SQLite', 'PM2', 'Nginx'],
    serviceLink: '/services/automation'
  },
  {
    slug: 'staple-payment-bot',
    title: 'Staple.com Order Automation',
    metaTitle: 'Automated Order Processing Bot | Case Study',
    metaDescription: 'Automating complex B2B order processing and inventory management.',
    category: 'Automation',
    problem: 'A dropshipper spent 6 hours daily manually placing orders on Staple.com and updating tracking numbers.',
    solution: 'Created an automation script using Selenium and REST APIs to read incoming orders, navigate the checkout process, and handle payments.',
    result: 'Eliminated manual order entry completely, processing 100+ orders per day autonomously.',
    techStack: ['Python', 'Selenium', 'Node.js', 'REST APIs'],
    serviceLink: '/services/automation'
  },
  {
    slug: 'whatsapp-crm-automation',
    title: 'WhatsApp Business Automation',
    metaTitle: 'WhatsApp Bot and CRM Automation | Case Study',
    metaDescription: 'A multi-feature WhatsApp bot integrated with Google Sheets for small businesses.',
    category: 'Automation',
    problem: 'A local business in Ghana could not keep up with customer inquiries and order tracking via standard WhatsApp.',
    solution: 'Built a Node.js webhook server connecting the WhatsApp Business API to a Google Sheets database for automated replies and order logging.',
    result: 'Improved customer response time to under 5 seconds and drastically reduced manual data entry errors.',
    techStack: ['Node.js', 'WhatsApp Business API', 'Google Sheets API', 'Webhooks'],
    serviceLink: '/services/automation'
  },
  {
    slug: 'crewai-housing-research',
    title: 'Autonomous Housing Research Agents',
    metaTitle: 'CrewAI Multi-Agent Research Automation | Case Study',
    metaDescription: 'Automating real estate land scouting and builder outreach using multi-agent AI.',
    category: 'Automation',
    problem: 'A housing development firm needed to research state grants, scout land, and contact builders at scale, which was labor-intensive.',
    solution: 'Deployed a 5-agent CrewAI system that autonomously scraped grant data, valued property, and managed outreach via Airtable.',
    result: 'Reduced research time by 70%, allowing the firm to evaluate 5x more properties per month.',
    techStack: ['Python', 'CrewAI', 'Anthropic Claude', 'Airtable', 'APScheduler'],
    serviceLink: '/services/automation'
  }
];
