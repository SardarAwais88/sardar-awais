import { NextResponse } from 'next/server';

export async function GET() {
  // Return the OpenRouter API key so the client-side component can bypass Vercel's 10s timeout
  return NextResponse.json({ key: process.env.OPENROUTER_API_KEY || '' });
}
