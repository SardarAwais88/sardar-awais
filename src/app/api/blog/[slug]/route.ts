import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug } from '@/lib/blogs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
