import fs from 'fs';
import path from 'path';

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  image?: string;
  excerpt?: string;
  description?: string;
  content: string;
}

const STATIC_BLOG_DIR = path.join(process.cwd(), 'src', 'data', 'blogs');
const isVercel = process.env.VERCEL === '1';
const WRITE_BLOG_DIR = isVercel ? path.join('/tmp', 'blogs') : STATIC_BLOG_DIR;

export function getAllBlogs(): BlogPost[] {
  const dirs = [STATIC_BLOG_DIR];
  if (isVercel && fs.existsSync(WRITE_BLOG_DIR)) dirs.push(WRITE_BLOG_DIR);

  const seenSlugs = new Set<string>();
  const blogs: BlogPost[] = [];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const data = JSON.parse(raw);
        const slugFromFile = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.json$/, '');
        const slug = data.slug || slugFromFile;
        if (!seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          blogs.push({
            ...data,
            slug,
            description: data.excerpt || data.description || '',
          });
        }
      } catch {
        continue;
      }
    }
  }

  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const dirs = [STATIC_BLOG_DIR];
  if (isVercel && fs.existsSync(WRITE_BLOG_DIR)) dirs.push(WRITE_BLOG_DIR);

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const data = JSON.parse(raw);
        const slugFromFile = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.json$/, '');
        if ((data.slug || slugFromFile) === slug) {
          return {
            ...data,
            slug: data.slug || slugFromFile,
            description: data.excerpt || data.description || '',
          };
        }
      } catch {
        continue;
      }
    }
  }
  return null;
}
