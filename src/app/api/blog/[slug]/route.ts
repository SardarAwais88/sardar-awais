import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STATIC_BLOG_DIR = path.join(process.cwd(), 'src', 'data', 'blogs');
const isVercel = process.env.VERCEL === '1';
const WRITE_BLOG_DIR = isVercel ? path.join('/tmp', 'blogs') : STATIC_BLOG_DIR;

function findBlogBySlug(slug: string) {
  // Search in static dir first, then writable dir
  const dirs = [STATIC_BLOG_DIR];
  if (isVercel) dirs.push(WRITE_BLOG_DIR);

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
        const slugFromFile = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.json$/, '');
        if ((data.slug || slugFromFile) === slug) {
          return { ...data, slug: data.slug || slugFromFile };
        }
      } catch {
        continue;
      }
    }
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = findBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
