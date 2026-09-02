import { NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_QUALITY } from '@/lib/ai';
import fs from 'fs';
import path from 'path';

// Static blogs committed to git (read-only on Vercel)
const STATIC_BLOG_DIR = path.join(process.cwd(), 'src', 'data', 'blogs');
// Writable directory for new blogs (uses /tmp on Vercel, project dir locally)
const isVercel = process.env.VERCEL === '1';
const WRITE_BLOG_DIR = isVercel
  ? path.join('/tmp', 'blogs')
  : STATIC_BLOG_DIR;

const TRENDING_TOPICS = [
  'Agentic AI: How Multi-Agent Systems Are Replacing Traditional Software in 2026',
  'RAG Architecture: Building Smarter AI Applications with Retrieval Augmented Generation',
  'Next.js 16 New Features: Server Components, Turbopack and Beyond',
  'VAPI Voice Agents: Building AI-Powered Phone Systems for Businesses',
  'CrewAI vs LangChain: Which Framework to Choose for AI Agent Development',
  'Docker and Kubernetes in 2026: Container Orchestration Best Practices',
  'Building SaaS Applications with React and Node.js: A Complete Guide',
  'AI Chatbot Development: From Basic Chatbots to Intelligent Conversational Agents',
  'Shopify Headless Commerce: Building High-Performance E-Commerce Stores',
  'DevOps Automation: CI/CD Pipelines with GitHub Actions and AWS',
  'LLM Fine-Tuning: Customizing Large Language Models for Business Applications',
  'Vector Databases Explained: Pinecone, Weaviate, and pgvector for AI Apps',
  'FastAPI vs Express.js: Choosing the Right Backend Framework in 2026',
  'Web Scraping with Python and Puppeteer: Ethical Automation Techniques',
  'Terraform Infrastructure as Code: Managing Cloud Resources Like a Pro',
  'React Three Fiber: Building Immersive 3D Web Experiences',
  'WhatsApp Business API: Building Automated Customer Support Bots',
  'Supabase vs Firebase: The Best Backend-as-a-Service for Modern Apps',
  'AI Workflow Automation: Replacing Manual Tasks with Intelligent Agents',
  'TypeScript Best Practices: Writing Scalable and Maintainable Code in 2026',
  'GraphQL vs REST API: When to Use Each for Modern Web Applications',
  'Chrome Extension Development: Monetizing Browser Extensions in 2026',
  'Kubernetes Security: Hardening Your Container Orchestration Platform',
  'OpenAI API Mastery: Building Production-Ready AI Features',
  'Prompt Engineering: The Art of Getting Better Results from LLMs',
  'No-Code vs Custom Development: When to Build from Scratch',
  'PostgreSQL Advanced Features: JSON, Full-Text Search, and Performance Tuning',
  'Microservices Architecture: Breaking Monoliths into Scalable Services',
  'AI in E-Commerce: Personalization, Recommendations, and Chatbots',
  'Building Real-Time Apps with WebSockets and Socket.io',
];

const SYSTEM_PROMPT = `You are an expert technical blog writer. Write a COMPLETE, FULL blog post in markdown format.

IMPORTANT RULES:
- Write 800-1200 words of ACTUAL content  
- Use ## for section headings, ### for sub-headings
- Include practical code examples in fenced code blocks
- Write a strong introduction paragraph
- Include 4-6 detailed sections with real technical content
- Write a conclusion with actionable takeaways
- Use transition words: Furthermore, Additionally, Moreover, In conclusion
- Be detailed and educational â€” explain concepts thoroughly
- Do NOT output JSON â€” just write the blog in plain markdown
- Do NOT wrap in code blocks â€” just write markdown directly
- Start immediately with the introduction paragraph, do NOT repeat the title`;

function ensureWriteDir() {
  if (!fs.existsSync(WRITE_BLOG_DIR)) {
    fs.mkdirSync(WRITE_BLOG_DIR, { recursive: true });
  }
}

function getAllBlogFiles(): { dir: string; file: string }[] {
  const results: { dir: string; file: string }[] = [];
  // Read from static (git committed) blogs
  if (fs.existsSync(STATIC_BLOG_DIR)) {
    fs.readdirSync(STATIC_BLOG_DIR)
      .filter((f) => f.endsWith('.json'))
      .forEach((f) => results.push({ dir: STATIC_BLOG_DIR, file: f }));
  }
  // Also read from writable dir (only different on Vercel)
  if (isVercel && fs.existsSync(WRITE_BLOG_DIR)) {
    fs.readdirSync(WRITE_BLOG_DIR)
      .filter((f) => f.endsWith('.json'))
      .forEach((f) => {
        if (!results.find((r) => r.file === f)) {
          results.push({ dir: WRITE_BLOG_DIR, file: f });
        }
      });
  }
  return results;
}

function getExistingTopics(): string[] {
  return getAllBlogFiles().map(({ dir, file }) => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      return data.topic || '';
    } catch {
      return '';
    }
  });
}

async function getTrendingTopic(): Promise<string> {
  try {
    const usedTopics = new Set(getExistingTopics());
    
    // Fetch live Google Trends RSS (US region)
    const res = await fetch('https://trends.google.com/trends/trendingsearches/daily/rss?geo=US', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch trends');
    const xml = await res.text();
    
    // Simple regex to extract titles from the RSS items
    const matches = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/gi)];
    // Skip the first match as it's the channel title
    const trendingSearches = matches.slice(1).map(m => m[1]);
    
    // Find a trending search that hasn't been written about
    const available = trendingSearches.filter(t => !usedTopics.has(t));
    
    if (available.length > 0) {
      return available[0]; // Return the top unused trending topic
    }
    
    // Fallback if all trending topics are used or parsing fails
    return TRENDING_TOPICS[Math.floor(Math.random() * TRENDING_TOPICS.length)] + ' â€” 2026 Updated Guide';
  } catch (error) {
    console.error('Error fetching Google Trends:', error);
    // Fallback to static list
    const usedTopics = new Set(getExistingTopics());
    const available = TRENDING_TOPICS.filter((t) => !usedTopics.has(t));
    if (available.length === 0) {
      return TRENDING_TOPICS[Math.floor(Math.random() * TRENDING_TOPICS.length)] + ' â€” 2026 Updated Guide';
    }
    return available[Math.floor(Math.random() * available.length)];
  }
}

function cleanModelOutput(raw: string): string {
  // Remove <think>...</think> reasoning blocks
  let cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, '');
  // Remove any JSON wrapper attempts
  cleaned = cleaned.replace(/^```(json|markdown|md)?\s*/gm, '').replace(/```\s*$/gm, '');
  // Remove leading/trailing whitespace
  cleaned = cleaned.trim();
  return cleaned;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function generateDescription(topic: string, content: string): string {
  // Use first 150 chars of content as description
  const firstParagraph = content.split('\n').find((l) => l.trim().length > 50) || '';
  const desc = firstParagraph.replace(/[#*`]/g, '').trim();
  if (desc.length > 50) {
    return desc.substring(0, 155) + '...';
  }
  return `Learn everything about ${topic}. A comprehensive guide for developers and businesses looking to stay ahead in 2026.`;
}

function generateTags(topic: string): string[] {
  const words = topic.toLowerCase().split(/[\s:,\-â€”]+/).filter((w) => w.length > 2);
  const techKeywords = [
    'react', 'nextjs', 'python', 'nodejs', 'ai', 'devops', 'docker', 'kubernetes',
    'typescript', 'javascript', 'shopify', 'api', 'automation', 'machine-learning',
    'web-development', 'backend', 'frontend', 'cloud', 'aws', 'database',
  ];
  const tags = words.filter((w) => !['the', 'and', 'for', 'how', 'with', 'are', 'from', 'which'].includes(w));
  // Add some general tech tags
  const extra = techKeywords.filter((k) => topic.toLowerCase().includes(k.replace('-', ' ')));
  return [...new Set([...tags.slice(0, 3), ...extra])].slice(0, 6);
}

async function generateBlogPost(topic?: string) {
  const selectedTopic = topic || await getTrendingTopic();

  const rawContent = await callAIWithFallback(
    SYSTEM_PROMPT,
    `Write a COMPLETE, detailed, SEO-optimized blog post about: "${selectedTopic}".\n\nWrite at least 800 words. Include code examples. Use ## headings. Start with an engaging introduction paragraph. End with a conclusion. Write in markdown format. Do NOT return JSON â€” just write the full article.`,
    MODELS_QUALITY,
    { maxTokens: 4000, temperature: 0.75, title: 'Blog Generator' }
  );

  const content = cleanModelOutput(rawContent);
  if (content.length < 100) {
    throw new Error('Generated content too short. Model may need retry.');
  }

  const today = new Date();
  const slug = generateSlug(selectedTopic);

  const blogPost = {
    slug,
    title: selectedTopic,
    description: generateDescription(selectedTopic, content),
    content,
    tags: generateTags(selectedTopic),
    readTime: `${Math.max(3, Math.ceil(content.split(/\s+/).length / 200))} min read`,
    topic: selectedTopic,
    author: 'Sardar Awais',
    date: today.toISOString().split('T')[0],
    createdAt: today.toISOString(),
  };

  ensureWriteDir();
  const filename = `${blogPost.date}-${slug}.json`;
  fs.writeFileSync(path.join(WRITE_BLOG_DIR, filename), JSON.stringify(blogPost, null, 2));

  return blogPost;
}

// POST â€” generate a new blog
export async function POST() {
  try {
    const blog = await generateBlogPost();
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Blog generation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET â€” list all blogs (merges static + dynamic)
export async function GET() {
  try {
    const allFiles = getAllBlogFiles()
      .sort((a, b) => b.file.localeCompare(a.file));

    const blogs = allFiles.map(({ dir, file }) => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
        // Skip blogs with empty content
        if (!data.content || data.content.length < 50) return null;
        return {
          slug: data.slug,
          title: data.title,
          description: data.description,
          tags: data.tags,
          readTime: data.readTime,
          date: data.date,
          author: data.author,
        };
      } catch {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ blogs: [] });
  }
}
