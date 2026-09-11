const fs = require('fs');

const pages = {
  'about': 'Learn more about Sardar Awais, a full-stack developer and AI automation expert.',
  'blog': 'Read the latest insights on AI agents, website development, and business automation.',
  'case-studies': 'Explore real-world case studies of AI integrations and scalable web applications built by Sardar Awais.',
  'contact': 'Get in touch with Sardar Awais for urgent website development and custom AI chatbot solutions.',
  'projects': 'Browse the complete portfolio of 48+ web development, AI, e-commerce, and automation projects.',
  'resume': 'View the professional resume, experience, and technical background of Sardar Awais.',
  'services': 'Discover custom services including MCP server development, RAG chatbots, and VAPI voice agents.',
  'skills': 'A comprehensive overview of the programming languages, frameworks, and tools I use.'
};

Object.entries(pages).forEach(([slug, desc]) => {
  const path = `src/app/${slug}/layout.tsx`;
  let content = fs.readFileSync(path, 'utf8');
  // Add description after title
  content = content.replace(/title: '.*?',/g, `$&
  description: '${desc}',`);
  fs.writeFileSync(path, content);
});

console.log('Descriptions added!');
