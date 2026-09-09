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
    whatItIs: "Model Context Protocol (MCP) servers act as a bridge between powerful LLMs like Claude and your internal systems. We build robust, custom MCP servers that allow your AI agents to read from and write to your APIs, databases, and enterprise software securely. Our implementations include robust authentication, strict error handling, and rate limiting to ensure enterprise-grade reliability.",
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
    whatItIs: "We develop intelligent chatbots powered by Retrieval-Augmented Generation (RAG) that answer questions specifically from your own data corpus—be it PDFs, internal wikis, or technical documentation. We implement state-of-the-art chunking strategies, semantic search via embeddings, and robust vector databases to ensure high retrieval accuracy. The resulting chatbots provide precise answers backed by exact citations, drastically reducing AI hallucinations.",
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
    whatItIs: "An AI agent goes beyond a traditional chatbot by having agency—the ability to plan, use tools, and execute multi-step tasks autonomously. We build advanced multi-agent systems using frameworks like CrewAI and LangChain. Whether you need a research agent, a customer support agent with CRM write-access, or a team of specialized agents working together, we engineer systems that reliably execute your workflows.",
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
    whatItIs: "Manual data entry and disjointed software systems drain your team's time and introduce costly errors. We build robust, scalable business workflow automations that connect your CRM, accounting software, marketing platforms, and internal databases. Whether through enterprise platforms like Make and Zapier, or fully custom Node.js/Python microservices, we build reliable pipelines that handle the busywork so your team can focus on growth.",
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
  }
];
