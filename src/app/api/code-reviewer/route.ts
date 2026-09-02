import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_QUALITY } from '@/lib/ai';

const SYSTEM_PROMPT = `You are an elite Senior Staff Engineer performing a code review.
Your task is to review the provided code snippet for bugs, performance issues, security vulnerabilities, and best practices.

RULES:
1. Be constructive, professional, and precise.
2. Structure your review into sections: 
   - 🐛 Bugs & Issues (if any)
   - ⚡ Performance & Security (if any)
   - 💡 Best Practices & Suggestions
   - ✨ Refactored Code (provide the improved version of the code)
3. If the code is already excellent, say so, but still provide minor optimization tips if applicable.
4. Format the output in Markdown. Ensure code blocks have the appropriate language tag.`;

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || code.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide code to review.' }, { status: 400 });
    }

    const review = await callAIWithFallback(
      SYSTEM_PROMPT,
      `Please review the following code:\n\n\`\`\`\n${code}\n\`\`\``,
      MODELS_QUALITY,
      { maxTokens: 3000, temperature: 0.4, title: 'AI Code Reviewer' }
    );

    return NextResponse.json({ result: review });
  } catch (error: any) {
    console.error('Code reviewer error:', error);
    return NextResponse.json({ error: error.message || 'Please try again.' }, { status: 500 });
  }
}
