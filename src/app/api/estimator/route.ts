import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_QUALITY } from '@/lib/ai';

const SYSTEM_PROMPT = `You are an expert Technical Project Manager and Senior Software Architect. 
Your task is to analyze project requirements and provide a realistic, professional estimate for Cost and Timeline.
Assume the developer is a Senior Full-Stack Engineer charging around $40-$60/hour depending on complexity.

RULES:
1. Provide a clear breakdown of the project into logical phases (e.g., Planning, Design, Frontend, Backend, Testing, Deployment).
2. For each phase, provide estimated hours.
3. Provide a Total Estimated Timeline (in weeks or months).
4. Provide a Total Estimated Cost Range (e.g., $2,000 - $3,500).
5. Highlight any Potential Risks or Missing Information that could affect the estimate.
6. Keep the tone professional, structured, and easy to read for a client.
7. Format the output in clean Markdown with clear headings.`;

export async function POST(request: NextRequest) {
  try {
    const { requirements } = await request.json();

    if (!requirements || requirements.trim().length < 20) {
      return NextResponse.json({ error: 'Please provide detailed project requirements.' }, { status: 400 });
    }

    const estimate = await callAIWithFallback(
      SYSTEM_PROMPT,
      `Please provide a detailed cost and timeline estimate for the following project requirements:\n\n${requirements}`,
      MODELS_QUALITY,
      { maxTokens: 2500, temperature: 0.5, title: 'AI Project Estimator' }
    );

    return NextResponse.json({ result: estimate });
  } catch (error: any) {
    console.error('Estimator error:', error);
    return NextResponse.json({ error: error.message || 'Please try again.' }, { status: 500 });
  }
}
