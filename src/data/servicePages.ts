export interface ServicePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtext: string;
  targetKeyword: string;
  icon: string;
  color: string;
  whatItIs: string;
  whatsIncluded: { title: string; description: string }[];
  caseStudy: {
    clientType: string;
    problem: string;
    solution: string;
    result: string;
    techStack: string[];
  };
  relatedBlogSlugs: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "mcp-server-development",
    title: "MCP Server Development",
    metaTitle: "Custom MCP Server Development | Connect APIs to Claude & LLM Agents",
    metaDescription: "Build custom Model Context Protocol (MCP) servers connecting APIs and databases to Claude and other LLM agents with real authentication, error handling, and rate limiting.",
    heroHeadline: "Connect Your Ecosystem to LLMs",
    heroSubtext: "Custom Model Context Protocol (MCP) servers to seamlessly integrate your existing APIs, databases, and tools with Claude and agentic frameworks.",
    targetKeyword: "MCP server development",
    icon: "server",
    color: "#3b82f6",
    whatItIs: "A model context protocol server acts as a bridge between powerful LLMs like Claude and your internal systems. When you need to connect Claude to internal tools MCP seamlessly, we build robust, custom MCP servers for business that allow your AI agents to read from and write to your APIs and databases securely. Our custom MCP server development implementations include robust authentication, strict error handling, and rate limiting to ensure enterprise-grade reliability.",
    whatsIncluded: [
      { title: "Custom Tool Development", description: "Design and implement specific tools tailored to your business logic." },
      { title: "Secure Authentication", description: "Implement OAuth, API keys, and custom auth flows for safe data access." },
      { title: "Data Source Integration", description: "Connect to PostgreSQL, REST APIs, GraphQL, vector databases, and more." },
      { title: "Reliability & Error Handling", description: "Built-in retries, rate limiting, and graceful degradation." }
    ],
    caseStudy: {
      clientType: "E-Commerce SaaS",
      problem: "Needed a way for customer support agents to use Claude to fetch live order status, issue refunds, and update shipping details securely without leaving the chat interface.",
      solution: "Developed a secure MCP server exposing specific e-commerce API endpoints (Orders, Customers, Inventory) to Claude Desktop and a custom web agent.",
      result: "Reduced average resolution time by 60% and allowed the AI to autonomously resolve 40% of tier 1 tickets.",
      techStack: ["TypeScript", "Express", "MCP SDK", "PostgreSQL", "Stripe API"]
    },
    relatedBlogSlugs: [
      "what-is-an-mcp-server",
      "connect-internal-tools-to-claude-using-mcp",
      "mcp-server-security-auth-rate-limiting"
    ]
  },
  {
    slug: "ai-voice-agent-development",
    title: "AI Voice Agent Development",
    metaTitle: "AI Voice Agent Development | VAPI & Retell Voice Bots for Business",
    metaDescription: "Develop custom AI voice agents using Vapi and Retell that answer calls 24/7, book appointments, and integrate seamlessly with your CRM and calendar.",
    heroHeadline: "Conversational AI Voice Agents",
    heroSubtext: "Deploy intelligent voice bots that handle customer calls, book appointments, and scale your support 24/7 without breaking a sweat.",
    targetKeyword: "AI voice agent development",
    icon: "mic",
    color: "#8b5cf6",
    whatItIs: "As a premier AI voice agent agency, we build advanced, conversational AI voice agents using platforms like Vapi and Retell AI. From enterprise solutions inspired by Lowe's AI voice agents to cutting-edge tech seen at the Y Combinator voice agents hackathon, we deliver robust voice infrastructure. Whether you need an AI voice agent cold calling B2B Austria GDPR legal compliant system or a high-volume VAPI voice agent restaurant Australia booking system, our dynamic, context-aware agents work 24/7. They handle interruptions, perform complex CRM actions, and significantly reduce operational costs.",
    whatsIncluded: [
      { title: "Custom Agent Persona", description: "Design the voice, tone, and personality of your agent to match your brand." },
      { title: "CRM & Calendar Integration", description: "Automated booking and syncing with tools like Calendly, HubSpot, and GoHighLevel." },
      { title: "Latency Optimization", description: "Tuned conversational flow to ensure sub-second response times for natural interaction." },
      { title: "Call Analytics & Logging", description: "Detailed transcripts, sentiment analysis, and action logs for every call." }
    ],
    caseStudy: {
      clientType: "Dental Clinic Network",
      problem: "Missing up to 30% of inbound calls during peak hours and after hours, leading to lost bookings and patient dissatisfaction.",
      solution: "Deployed a multi-agent voice system using Vapi, integrated with their practice management software. An initial triage agent handles FAQs, while a specialized booking agent checks availability and schedules appointments.",
      result: "Recovered $15,000/month in previously lost revenue and reduced front-desk call volume by 45%.",
      techStack: ["Vapi", "OpenAI", "Node.js", "Make.com", "Practice Management API"]
    },
    relatedBlogSlugs: [
      "ai-voice-agents-vs-traditional-ivr",
      "ai-receptionist-for-small-business",
      "case-study-multi-agent-voice-ai-dental-clinic"
    ]
  },
  {
    slug: "rag-chatbot-development",
    title: "RAG Chatbot Development",
    metaTitle: "RAG Chatbot Development | AI Chatbot Trained on Your Documents",
    metaDescription: "Custom RAG chatbot development trained on your company's documents. We handle chunking, embeddings, vector stores, and citation-backed answers.",
    heroHeadline: "AI Chatbots That Know Your Business",
    heroSubtext: "Retrieval-Augmented Generation (RAG) chatbots trained on your proprietary data to provide accurate, hallucination-free answers with citations.",
    targetKeyword: "RAG chatbot development",
    icon: "message-square",
    color: "#10b981",
    whatItIs: "We design robust enterprise RAG architecture to power intelligent, secure RAG chatbots on premise and in the cloud. By building a custom AI chatbot with citations, we ensure it answers questions specifically from your own data corpus—be it PDFs, internal wikis, or technical documentation. If you need a reliable AI chatbot for internal documents, we implement state-of-the-art chunking strategies and robust vector databases to guarantee precise answers and eliminate hallucinations.",
    whatsIncluded: [
      { title: "Data Processing Pipeline", description: "Extract, clean, and chunk text from PDFs, Notion, Confluence, and websites." },
      { title: "Vector Database Setup", description: "Implement scalable semantic search using Pinecone, Qdrant, or pgvector." },
      { title: "Citation & Source Tracking", description: "Every answer includes links to the exact source document and page number." },
      { title: "Hybrid Search", description: "Combine keyword (BM25) and semantic search for unparalleled retrieval accuracy." }
    ],
    caseStudy: {
      clientType: "Legal Tech Firm",
      problem: "Lawyers spent hours manually searching through thousands of pages of case law and internal memos to find relevant precedents.",
      solution: "Built a secure RAG chatbot application. Ingested 50,000+ legal documents using semantic chunking and deployed a hybrid search vector store. The chatbot provides answers strictly grounded in the uploaded documents.",
      result: "Reduced document discovery time from hours to minutes, increasing lawyer billable efficiency by 20%.",
      techStack: ["Next.js", "LangChain", "Pinecone", "OpenAI Embeddings", "AWS S3"]
    },
    relatedBlogSlugs: [
      "rag-chatbot-vs-chatgpt-prompt",
      "why-chatbots-hallucinate-how-rag-fixes-it",
      "chunking-embeddings-vector-stores-explained"
    ]
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    metaTitle: "AI Agent Development | Autonomous AI Agents & Multi-Agent Systems",
    metaDescription: "Custom AI agent development services. We build autonomous multi-agent systems using CrewAI, LangChain, and OpenAI to automate complex business workflows.",
    heroHeadline: "Autonomous AI Agents for Business",
    heroSubtext: "Deploy multi-agent systems that don't just answer questions, but autonomously execute complex workflows and take actions across your tool stack.",
    targetKeyword: "AI agent development",
    icon: "cpu",
    color: "#f59e0b",
    whatItIs: "An AI agent goes beyond a traditional chatbot by having agency—the ability to plan, use tools, and execute multi-step tasks autonomously. Through specialized custom AI agent development, our expert CrewAI development agency builds advanced multi-agent systems tailored to your needs. Whether you require an autonomous AI agent for research, a customer support bot with CRM write-access, or a team of specialized agents, we engineer systems that reliably execute complex business workflows.",
    whatsIncluded: [
      { title: "Multi-Agent Orchestration", description: "Design systems where specialized agents collaborate to solve complex problems." },
      { title: "Tool & API Integration", description: "Equip your agents with custom tools to interact with your databases, CRM, and SaaS platforms." },
      { title: "Agentic Planning & Reasoning", description: "Implement advanced prompting strategies (ReAct, Chain of Thought) for reliable decision making." },
      { title: "Guardrails & Safety", description: "Strict boundaries and human-in-the-loop approvals for critical actions." }
    ],
    caseStudy: {
      clientType: "Financial Services",
      problem: "Analysts spent 15 hours a week manually gathering market data, reading earnings reports, and summarizing competitor news.",
      solution: "Deployed a CrewAI multi-agent system consisting of a Research Agent (web scraping, API calls) and an Analyst Agent (data synthesis and report generation).",
      result: "Automated the entire research workflow, delivering comprehensive daily reports and saving the team 60 hours per month.",
      techStack: ["Python", "CrewAI", "LangChain", "OpenAI", "Tavily API"]
    },
    relatedBlogSlugs: [
      "crewai-vs-langchain-which-framework-to-choose-for-ai-agent-development",
      "5-signs-your-business-needs-an-ai-agent",
      "how-much-does-it-cost-to-build-ai-agent-2026",
      "fastapi-langchain-production-ai-agents"
    ]
  },
  {
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
    metaTitle: "Business Workflow Automation | Zapier, Make & Custom Scripts",
    metaDescription: "Streamline your operations with robust business workflow automation. We integrate your software stack using Make, Zapier, and custom Node.js/Python scripts.",
    heroHeadline: "Automate Your Operations",
    heroSubtext: "Connect your disjointed software tools, eliminate manual data entry, and streamline operations with robust business workflow automation.",
    targetKeyword: "Business workflow automation",
    icon: "git-merge",
    color: "#ec4899",
    whatItIs: "Manual data entry and disjointed software systems drain your team's time and introduce costly errors. As a dedicated B2B workflow automation consultant, we build scalable automations connecting your CRM, accounting, and internal databases. Whether you need comprehensive HubSpot automation services, a top-tier Make.com automation agency, or a custom Zapier integration expert, we build reliable Node.js/Python pipelines that handle the busywork so your team can focus on growth.",
    whatsIncluded: [
      { title: "End-to-End Workflow Design", description: "Map out and optimize your existing manual processes for automation." },
      { title: "Custom API Integrations", description: "Connect systems that don't have native integrations via custom webhooks and REST APIs." },
      { title: "No-Code & Pro-Code Solutions", description: "Leverage Make/Zapier for speed, and custom scripts for complex logic or large data volumes." },
      { title: "Error Handling & Alerting", description: "Robust monitoring so you know immediately if an external service goes down." }
    ],
    caseStudy: {
      clientType: "Real Estate Agency",
      problem: "Leads generated from Facebook ads were manually exported to CSV and emailed to agents, resulting in delayed follow-ups and lost sales.",
      solution: "Engineered an end-to-end automation pipeline. Facebook leads are instantly caught via webhooks, enriched with property data, inserted into the CRM, and routed to the correct agent via an automated SMS.",
      result: "Reduced lead response time from 4 hours to under 2 minutes, increasing the conversion rate by 25%.",
      techStack: ["Make (Integromat)", "Node.js Webhooks", "Twilio API", "HubSpot CRM"]
    },
    relatedBlogSlugs: [
      "microservices-architecture-breaking-monoliths-into-scalable-services",
      "terraform-infrastructure-as-code-managing-cloud-resources-like-a-pro"
    ]
  },
  {
    slug: "ai-automation-consulting",
    title: "AI Automation Consulting",
    metaTitle: "Enterprise AI Automation Consulting | Sardar Awais",
    metaDescription: "Top-tier AI automation consulting services for enterprises. We audit your workflows and design custom AI blueprints to scale operations effortlessly.",
    heroHeadline: "Strategic AI Automation Consulting",
    heroSubtext: "Don't just implement AI blindly. Let us audit your business workflows and build a scalable, ROI-driven AI architecture tailored for you.",
    targetKeyword: "ai automation consulting",
    icon: "lightbulb",
    color: "#f43f5e",
    whatItIs: "As a premier AI automation consulting firm, we don't just build chatbots; we fundamentally rethink how your business operates. We provide enterprise-level AI automation consulting, assessing your current software stack and human workflows. We then engineer a custom blueprint using Agentic AI, autonomous multi-agent systems, and bespoke LLM integrations that directly impact your bottom line.",
    whatsIncluded: [
      { title: "Deep Workflow Audit", description: "Comprehensive analysis of your manual processes to identify high-ROI automation targets." },
      { title: "Technical Blueprinting", description: "Detailed architectural designs for integrating AI safely into your existing systems." },
      { title: "Tool Stack Selection", description: "Unbiased recommendations on using VAPI, CrewAI, Make, or custom Node.js infrastructure." },
      { title: "Executive AI Training", description: "Educating your C-suite on AI security, limitations, and strategic advantages." }
    ],
    caseStudy: {
      clientType: "Global Logistics Firm",
      problem: "Operations were bogged down by manual document verification and disjointed communication across 4 different time zones.",
      solution: "Conducted a 2-week deep AI automation consulting sprint. Delivered a blueprint for an autonomous OCR document verification system coupled with an internal RAG-based knowledge retrieval bot.",
      result: "Implementation of our blueprint reduced processing errors by 94% and saved the firm $240,000 annually.",
      techStack: ["Process Mapping", "Enterprise AI Architecture", "ROI Modeling"]
    },
    relatedBlogSlugs: [
      "ai-automation-agency-pricing-2026",
      "how-ai-agents-for-business-automation-are-replacing-traditional-software"
    ]
  },
  {
    slug: "medical-call-answering-service",
    title: "Medical Call Answering Service",
    metaTitle: "AI Medical Call Answering Service | HIPAA Compliant Voice Bots",
    metaDescription: "Deploy a HIPAA-compliant AI medical call answering service. Never miss a patient call. Our voice bots handle scheduling, FAQs, and emergency routing 24/7.",
    heroHeadline: "24/7 AI Medical Receptionist",
    heroSubtext: "A HIPAA-compliant medical call answering service that sounds human, books appointments securely, and drastically reduces your front-desk workload.",
    targetKeyword: "medical call answering service",
    icon: "stethoscope",
    color: "#3b82f6",
    whatItIs: "A medical clinic's front desk is often overwhelmed, leading to missed calls and frustrated patients. We build custom, HIPAA-compliant AI voice agents that serve as a seamless medical call answering service. Unlike traditional offshore call centers, our AI agents understand complex medical terminology, can integrate securely with your EMR/EHR system to book appointments, and instantly triage emergency calls directly to on-call physicians.",
    whatsIncluded: [
      { title: "HIPAA Compliant Infrastructure", description: "End-to-end encryption ensuring patient data and transcriptions are strictly protected." },
      { title: "EMR/EHR Integration", description: "Direct calendar and database integrations to allow the AI to schedule or cancel appointments." },
      { title: "Emergency Triage Routing", description: "Natural language understanding to detect urgent scenarios and immediately transfer the call to a human." },
      { title: "Multi-Lingual Support", description: "Serve a broader patient base with an AI agent that speaks Spanish, French, and 20+ other languages fluently." }
    ],
    caseStudy: {
      clientType: "Multi-Location Dental Practice",
      problem: "The practice was missing 30% of incoming calls during peak hours, resulting in lost bookings and poor patient satisfaction.",
      solution: "Developed an AI medical call answering service using VAPI and custom secure webhooks to read/write to their scheduling software.",
      result: "Achieved a 0% missed call rate, increased daily bookings by 18%, and saved $4,000/month in overflow call center fees.",
      techStack: ["VAPI", "OpenAI GPT-4", "Custom EMR Webhooks", "AWS (HIPAA Secure)"]
    },
    relatedBlogSlugs: [
      "vapi-vs-elevenlabs",
      "after-hours-answering-service-for-lawyers"
    ]
  },
  {
    slug: "developing-custom-software",
    title: "Developing Custom Software",
    metaTitle: "Developing Custom Software | Enterprise B2B Solutions",
    metaDescription: "We specialize in developing custom software for enterprise clients. From scalable web apps to secure backend APIs, we build what off-the-shelf software can't.",
    heroHeadline: "Bespoke Enterprise Software",
    heroSubtext: "Stop forcing your business into rigid off-the-shelf tools. We specialize in developing custom software tailored perfectly to your unique operations.",
    targetKeyword: "developing custom software",
    icon: "code",
    color: "#10b981",
    whatItIs: "When your business outgrows standard SaaS solutions, you need a system built specifically for your workflows. We are experts at developing custom software from the ground up. Whether you need a massive internal logistics dashboard, a specialized CRM, or a customer-facing SaaS application, our full-stack engineering team builds robust, scalable, and secure architectures using modern technologies like Next.js, Node, and Python.",
    whatsIncluded: [
      { title: "Full-Stack Development", description: "Complete front-end and back-end development using modern frameworks like React and Node.js." },
      { title: "Database Architecture", description: "Scalable PostgreSQL or MongoDB database design for high-performance data querying." },
      { title: "Cloud Deployment", description: "Secure, highly available deployment on AWS or Google Cloud with proper CI/CD pipelines." },
      { title: "API Development", description: "Custom REST or GraphQL APIs to connect your new software with existing legacy systems." }
    ],
    caseStudy: {
      clientType: "Logistics & Supply Chain",
      problem: "The client was using 4 different software tools and endless spreadsheets to track shipments, leading to data silos and delays.",
      solution: "Spent 4 months developing custom software—a centralized web application that consolidated tracking, billing, and driver dispatching into one real-time dashboard.",
      result: "Eliminated data entry errors entirely and increased operational efficiency by 35%.",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS EC2", "Docker"]
    },
    relatedBlogSlugs: [
      "microservices-architecture-breaking-monoliths-into-scalable-services",
      "ivr-payment-system"
    ]
  }
];
