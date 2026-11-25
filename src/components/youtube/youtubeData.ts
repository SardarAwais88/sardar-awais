export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  category: string;
  tags: string[];
  rawApiPayload?: Record<string, unknown>;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  customUrl: string;
  description: string;
  publishedAt: string;
  avatar: string;
  banner: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  country: string;
  topics: string[];
  monthlyViews: { month: string; views: number; subs: number }[];
  trafficSources: { source: string; percentage: number }[];
  videos: YouTubeVideo[];
}

export const mockChannels: YouTubeChannel[] = [
  {
    id: 'UC_awais_cloud_dev',
    title: 'Sardar Awais | Cloud & AI Engineering',
    customUrl: '@sardarawais_dev',
    description:
      'Official engineering channel focused on building autonomous AI voice bots (VAPI), LangChain multi-agent systems, Next.js full-stack applications, and enterprise cloud architecture.',
    publishedAt: '2021-03-15T08:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    subscriberCount: 285400,
    viewCount: 28450000,
    videoCount: 148,
    country: 'United States / Pakistan',
    topics: ['AI Agents', 'VAPI Voice Bots', 'Next.js', 'Python & FastAPI', 'DevOps & Wazuh'],
    monthlyViews: [
      { month: 'Jun', views: 1850000, subs: 14200 },
      { month: 'Jul', views: 2150000, subs: 18500 },
      { month: 'Aug', views: 2420000, subs: 21300 },
      { month: 'Sep', views: 2980000, subs: 26800 },
      { month: 'Oct', views: 3450000, subs: 32400 },
      { month: 'Nov', views: 4120000, subs: 38900 },
    ],
    trafficSources: [
      { source: 'YouTube Search', percentage: 48 },
      { source: 'Suggested Videos', percentage: 26 },
      { source: 'Browse Features', percentage: 16 },
      { source: 'External / Direct', percentage: 10 },
    ],
    videos: [
      {
        id: 'vid_vapi_voice_agent',
        title: 'Building an Autonomous AI Voice Agent with VAPI & Python in 15 Minutes',
        description:
          'Step-by-step masterclass on deploying ultra-low latency conversational AI voice bots for phone calls using VAPI, Twilio, and FastAPI backend webhooks.',
        thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-11-18T14:30:00Z',
        viewCount: 348200,
        likeCount: 24500,
        commentCount: 1840,
        duration: '18:42',
        category: 'AI & Voice',
        tags: ['vapi', 'voice bot', 'python', 'fastapi', 'ai calling'],
      },
      {
        id: 'vid_mcp_claude_server',
        title: 'Model Context Protocol (MCP): Connect Your Database to Claude Desktop',
        description:
          'Learn how Model Context Protocol (MCP) works. We build a custom TypeScript MCP server that connects PostgreSQL and Stripe APIs to Claude 3.5 Sonnet.',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-11-05T10:15:00Z',
        viewCount: 198400,
        likeCount: 15200,
        commentCount: 920,
        duration: '22:15',
        category: 'Architecture',
        tags: ['mcp', 'claude', 'anthropic', 'typescript', 'postgresql'],
      },
      {
        id: 'vid_wazuh_siem_docker',
        title: 'Wazuh SIEM Full Deployment Guide: Open-Source Threat Detection',
        description:
          'Complete hands-on deployment of Wazuh Manager, Indexer, and Dashboard via Docker Compose with File Integrity Monitoring (FIM) and automated Slack alerting.',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-10-24T16:00:00Z',
        viewCount: 142000,
        likeCount: 9800,
        commentCount: 650,
        duration: '26:50',
        category: 'Cybersecurity',
        tags: ['wazuh', 'siem', 'docker', 'devops', 'soc'],
      },
      {
        id: 'vid_instagram_bot_meta',
        title: 'Instagram Auto Reply Bot: Meta Graph API Webhooks Tutorial',
        description:
          'How to safely automate Instagram DMs and reel comments without getting banned. Using official Meta Graph API webhooks and Python FastAPI.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-10-12T12:00:00Z',
        viewCount: 289500,
        likeCount: 21300,
        commentCount: 1430,
        duration: '15:30',
        category: 'Automation',
        tags: ['instagram bot', 'meta api', 'fastapi', 'dm automation'],
      },
      {
        id: 'vid_rag_enterprise_docs',
        title: 'Production RAG Chatbot: Chunking, Vector Databases & Hybrid Search',
        description:
          'Stop hallucinating: Learn how to build an enterprise RAG chatbot using Pinecone, BM25 hybrid search, and LangChain for company document question answering.',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-09-28T09:45:00Z',
        viewCount: 176400,
        likeCount: 13400,
        commentCount: 810,
        duration: '31:10',
        category: 'AI & Voice',
        tags: ['rag', 'vector database', 'pinecone', 'langchain', 'embeddings'],
      },
      {
        id: 'vid_nextjs_turbopack_2026',
        title: 'Next.js 16 Full-Stack Mastery: Server Components, Caching & Auth',
        description:
          'Master modern Next.js app router architecture, Prisma ORM database caching, streaming SSR, and edge deployment on Vercel.',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-09-14T11:20:00Z',
        viewCount: 220000,
        likeCount: 16800,
        commentCount: 1100,
        duration: '42:18',
        category: 'Full-Stack',
        tags: ['nextjs', 'react', 'prisma', 'turbopack', 'fullstack'],
      },
      {
        id: 'vid_crewai_multi_agent',
        title: 'CrewAI vs LangGraph: Building Autonomous Agentic Workflows',
        description:
          'Detailed architectural comparison between CrewAI and LangGraph for orchestrating multi-agent systems that research, code, and execute business tasks.',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-08-30T15:00:00Z',
        viewCount: 165000,
        likeCount: 12900,
        commentCount: 780,
        duration: '24:05',
        category: 'AI & Voice',
        tags: ['crewai', 'langgraph', 'multi agent', 'python'],
      },
      {
        id: 'vid_docker_kubernetes_prod',
        title: 'Deploying Microservices with Kubernetes and Helm on AWS EKS',
        description:
          'Production-grade guide to container orchestration with Docker, Kubernetes manifests, Helm charts, and AWS EKS cluster scaling.',
        thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-08-15T13:10:00Z',
        viewCount: 112000,
        likeCount: 8400,
        commentCount: 490,
        duration: '35:40',
        category: 'Cybersecurity',
        tags: ['kubernetes', 'docker', 'aws', 'helm', 'cloud'],
      },
    ],
  },
  {
    id: 'UC_tech_ai_hub',
    title: 'NextGen AI & Autonomous Systems',
    customUrl: '@nextgen_ai_hub',
    description:
      'Exploring cutting-edge advancements in foundation models, synthetic voice generation, computer vision, and autonomous agent orchestration.',
    publishedAt: '2020-06-10T11:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    subscriberCount: 1420000,
    viewCount: 184500000,
    videoCount: 342,
    country: 'United Kingdom',
    topics: ['Deep Learning', 'LLMs', 'Robotics', 'Voice AI'],
    monthlyViews: [
      { month: 'Jun', views: 12400000, subs: 65000 },
      { month: 'Jul', views: 14100000, subs: 74000 },
      { month: 'Aug', views: 15800000, subs: 82000 },
      { month: 'Sep', views: 18200000, subs: 96000 },
      { month: 'Oct', views: 21500000, subs: 112000 },
      { month: 'Nov', views: 24800000, subs: 128000 },
    ],
    trafficSources: [
      { source: 'Suggested Videos', percentage: 42 },
      { source: 'YouTube Search', percentage: 34 },
      { source: 'Browse Features', percentage: 14 },
      { source: 'External / Direct', percentage: 10 },
    ],
    videos: [
      {
        id: 'vid_gpt5_agentic_future',
        title: 'The Rise of Agentic Reasoning: Autonomous AI in Production',
        description:
          'Deep dive into how recursive reasoning and self-correcting agent chains are replacing single-prompt LLM architectures across Fortune 500 enterprises.',
        thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-11-20T17:00:00Z',
        viewCount: 890000,
        likeCount: 64000,
        commentCount: 4200,
        duration: '19:45',
        category: 'AI & Voice',
        tags: ['ai agents', 'deep learning', 'future tech'],
      },
      {
        id: 'vid_multimodal_speech_agents',
        title: 'Real-Time Multimodal Voice AI: Zero-Latency Speech Synthesis',
        description:
          'Examining end-to-end audio-to-audio neural models that generate expressive, emotion-aware voice responses with under 300ms latency.',
        thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-11-08T14:15:00Z',
        viewCount: 650000,
        likeCount: 48000,
        commentCount: 2900,
        duration: '16:12',
        category: 'AI & Voice',
        tags: ['multimodal', 'voice ai', 'speech synthesis'],
      },
      {
        id: 'vid_open_source_robotics_ai',
        title: 'Open-Source AI Hardware: Building Vision-Guided Robotic Arms',
        description:
          'How open weights vision-language-action (VLA) models allow low-cost robotic arms to interact with real-world objects using spatial embeddings.',
        thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&auto=format&fit=crop&q=80',
        publishedAt: '2026-10-19T11:30:00Z',
        viewCount: 520000,
        likeCount: 39000,
        commentCount: 2150,
        duration: '28:34',
        category: 'Architecture',
        tags: ['robotics', 'vla', 'computer vision'],
      },
    ],
  },
];

export function getSampleApiPayload(video: YouTubeVideo, channel: YouTubeChannel) {
  return {
    kind: 'youtube#video',
    etag: `etag_${video.id}_2026`,
    id: video.id,
    snippet: {
      publishedAt: video.publishedAt,
      channelId: channel.id,
      title: video.title,
      description: video.description,
      thumbnails: {
        default: { url: video.thumbnail, width: 120, height: 90 },
        medium: { url: video.thumbnail, width: 320, height: 180 },
        high: { url: video.thumbnail, width: 640, height: 480 },
        maxres: { url: video.thumbnail, width: 1280, height: 720 },
      },
      channelTitle: channel.title,
      tags: video.tags,
      categoryId: '28', // Science & Technology
      liveBroadcastContent: 'none',
      localized: {
        title: video.title,
        description: video.description,
      },
    },
    contentDetails: {
      duration: `PT${video.duration.replace(':', 'M')}S`,
      dimension: '2d',
      definition: 'hd',
      caption: 'true',
      licensedContent: true,
      projection: 'rectangular',
    },
    statistics: {
      viewCount: String(video.viewCount),
      likeCount: String(video.likeCount),
      favoriteCount: '0',
      commentCount: String(video.commentCount),
    },
    status: {
      uploadStatus: 'processed',
      privacyStatus: 'public',
      license: 'youtube',
      embeddable: true,
      publicStatsViewable: true,
    },
  };
}
