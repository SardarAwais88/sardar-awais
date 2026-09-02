import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This cron endpoint generates daily blog posts automatically
// Can be triggered by: Vercel Cron, external cron service, or on first visit each day

const isVercel = process.env.VERCEL === '1';
const LOCK_FILE = isVercel
  ? path.join('/tmp', '.blog-generated-today')
  : path.join(process.cwd(), 'src', 'data', '.blog-generated-today');

function alreadyGeneratedToday(): boolean {
  try {
    if (!fs.existsSync(LOCK_FILE)) return false;
    const lockDate = fs.readFileSync(LOCK_FILE, 'utf-8').trim();
    return lockDate === new Date().toISOString().split('T')[0];
  } catch {
    return false;
  }
}

function markGeneratedToday() {
  const dir = path.dirname(LOCK_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LOCK_FILE, new Date().toISOString().split('T')[0]);
}

export async function GET() {
  try {
    // Check if already generated today
    if (alreadyGeneratedToday()) {
      return NextResponse.json({
        message: 'Blog already generated today',
        generated: false,
      });
    }

    // Trigger blog generation via the main blog API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.success) {
      markGeneratedToday();
      console.log(`[CRON] Daily blog generated: ${data.blog?.title}`);
      return NextResponse.json({
        message: `Daily blog generated: ${data.blog?.title}`,
        generated: true,
        blog: data.blog?.title,
      });
    }

    return NextResponse.json({
      message: 'Blog generation failed, will retry next visit',
      generated: false,
      error: data.error,
    });
  } catch (error) {
    console.error('[CRON] Daily blog generation error:', error);
    return NextResponse.json({
      message: 'Error generating daily blog',
      generated: false,
    }, { status: 500 });
  }
}
