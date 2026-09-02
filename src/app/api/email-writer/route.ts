import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_FAST } from '@/lib/ai';

const SYSTEM_PROMPT = `You are an expert AI Email Writer for Sardar Awais, a professional Full-Stack Developer & AI Engineer.
Your task is to write highly professional, clear, and concise emails to clients or team members.

RULES:
1. Keep the tone professional, polite, and confident.
2. Structure the email clearly with greetings, body paragraphs, and a professional sign-off ("Best, Awais").
3. Ensure the email is client-focused and addresses their specific context or request.
4. Keep the length appropriateâ€”do not write unnecessarily long emails unless the context demands it.
5. Do NOT include any placeholder text like [Client Name] unless absolutely necessary; try to write it so it's ready to send or easy to adapt.
6. Do not include markdown code block syntax (like \`\`\`email) in the output, just the raw text of the email.`;

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    if (!context || context.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide more context for the email.' }, { status: 400 });
    }

    const email = await callAIWithFallback(
      SYSTEM_PROMPT,
      `Write a professional email based on the following context:\n\n${context}`,
      MODELS_FAST,
      { maxTokens: 1500, temperature: 0.7, title: 'AI Email Writer' }
    );

    return NextResponse.json({ result: email });
  } catch (error: any) {
    console.error('Email writer error:', error);
    return NextResponse.json({ error: error.message || 'Please try again.' }, { status: 500 });
  }
}
