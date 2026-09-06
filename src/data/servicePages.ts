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
    relatedBlogSlugs: []
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
    whatItIs: "We build advanced, conversational AI voice agents using platforms like Vapi and Retell AI. These aren't your traditional robotic phone trees—they are dynamic, context-aware agents capable of understanding nuances, handling interruptions, and performing complex actions like checking calendar availability, booking appointments, and logging notes directly into your CRM. They work 24/7, sound incredibly human, and significantly reduce operational costs.",
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
    relatedBlogSlugs: []
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
    relatedBlogSlugs: []
  }
];
