import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_FAST } from '@/lib/ai';

// ─── PROMPTS ────────────────────────────────────────────────────────────────

const HUMANIZER_PROMPT = `You are an expert academic writer who rewrites text to sound completely natural and human-written.

TASK: Rewrite the text below so that:
1. It passes ALL AI detection tools (GPTZero, Originality.ai, Turnitin, Copyleaks)
2. It is 100% plagiarism-free
3. It maintains academic quality and scholarly tone

STRICT REWRITING RULES:
- Completely restructure every sentence — change word order, split long sentences, merge short ones
- Replace ALL of these AI-giveaway words: "delve", "crucial", "comprehensive", "landscape", "multifaceted", "leverage", "tapestry", "plethora", "furthermore", "moreover", "in conclusion", "it is important to note", "it is worth noting", "plays a pivotal role"
- Use natural academic voice: "This study looks at...", "The findings suggest...", "One possible explanation is..."
- Vary sentence length deliberately — alternate between short (6-10 words) and medium (15-20 words) sentences
- Use occasional contractions where appropriate (it's, don't, hasn't)
- Keep ALL facts, citations, numbers, and references exactly as they are
- Maintain the same section structure and headings
- Keep the same academic depth and scholarly quality
- Write at least the same number of words as the input

OUTPUT ONLY the rewritten text. No commentary. No "Here is..." prefix. Just the clean rewritten content.`;

const DETECTOR_PROMPT = `You are an AI content detection expert. Analyze the text and give scores.

You MUST respond in this EXACT format — no other text before or after:

AI_SCORE: [number from 0 to 100]
PLAG_SCORE: [number from 0 to 100]
INDICATORS:
- [specific phrase or pattern 1]
- [specific phrase or pattern 2]
- [specific phrase or pattern 3]
- [specific phrase or pattern 4]
- [specific phrase or pattern 5]
VERDICT: [one detailed sentence about the text]

Scoring guide:
- AI_SCORE 0-20 = clearly human, 21-50 = mixed/uncertain, 51-80 = likely AI, 81-100 = definitely AI
- PLAG_SCORE 0-20 = original, 21-50 = some common phrases, 51-80 = significant overlap risk, 81-100 = highly plagiarized

Look for these AI indicators: uniform sentence length, passive voice overuse, words like "delve/crucial/comprehensive/landscape/multifaceted", formulaic transitions, lack of personal voice, overly polished flow, predictable paragraph structure.

Now analyze this text:`;

// ─── FLEXIBLE SCORE PARSER ──────────────────────────────────────────────────

function extractNumber(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (match) {
    const num = parseInt(match[1]);
    if (!isNaN(num) && num >= 0 && num <= 100) return num;
  }
  return null;
}

function parseDetectionResult(raw: string) {
  let aiScore = extractNumber(raw, /AI_SCORE:\s*(\d+)/i)
    ?? extractNumber(raw, /ai\s*(?:detection\s*)?score[:\s]*(\d+)/i)
    ?? extractNumber(raw, /(\d+)\s*%?\s*(?:chance|probability|likelihood)\s*(?:of\s*)?(?:being\s*)?ai/i);

  let plagScore = extractNumber(raw, /PLAG_SCORE:\s*(\d+)/i)
    ?? extractNumber(raw, /plag(?:iarism)?\s*(?:risk\s*)?score[:\s]*(\d+)/i);

  let indicators: string[] = [];
  const indicatorsMatch = raw.match(/INDICATORS:\s*([\s\S]*?)(?:VERDICT:|$)/i);
  if (indicatorsMatch) {
    indicators = indicatorsMatch[1]
      .split('\n')
      .map((l: string) => l.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
      .filter((l: string) => l.length > 5);
  }
  if (indicators.length === 0) {
    const bullets = raw.match(/[-•*]\s+.{10,}/g);
    if (bullets) indicators = bullets.map((b: string) => b.replace(/^[-•*]\s+/, '').trim()).slice(0, 5);
  }
  if (indicators.length === 0) {
    indicators = raw.split(/[.!?]+/)
      .filter((s: string) => /ai|pattern|detect|passive|uniform|formulaic|tone/i.test(s))
      .slice(0, 5)
      .map((s: string) => s.trim());
  }

  let verdict = '';
  const verdictMatch = raw.match(/VERDICT:\s*(.+)/i);
  if (verdictMatch) {
    verdict = verdictMatch[1].trim();
  } else {
    const sentences = raw.split(/[.!?]+/).filter((s: string) => s.trim().length > 20);
    verdict = sentences.length > 0 ? sentences[sentences.length - 1].trim() + '.' : 'Analysis completed.';
  }

  return {
    aiScore: aiScore !== null ? Math.min(100, Math.max(0, aiScore)) : 55,
    plagScore: plagScore !== null ? Math.min(100, Math.max(0, plagScore)) : 35,
    indicators: indicators.length > 0 ? indicators.slice(0, 5) : ['Uniform sentence structure', 'Overly formal tone', 'Predictable transitions'],
    verdict: verdict || 'Text shows mixed characteristics.',
    raw,
  };
}

// ─── API HANDLER ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: 'Please provide at least 20 characters.' }, { status: 400 });
    }

    const maxChars = 8000;
    const processText = text.length > maxChars ? text.slice(0, maxChars) + '\n[Truncated]' : text;

    if (mode === 'detect') {
      const result = await callAIWithFallback(DETECTOR_PROMPT, processText, MODELS_FAST, {
        maxTokens: 1000, temperature: 0.3, title: 'AI Humanizer - Detect',
      });
      return NextResponse.json({ mode: 'detect', ...parseDetectionResult(result) });
    }

    const result = await callAIWithFallback(HUMANIZER_PROMPT, processText, MODELS_FAST, {
      maxTokens: 4000, temperature: 0.8, title: 'AI Humanizer - Rewrite',
    });

    return NextResponse.json({ mode: 'humanize', result, wordCount: result.split(/\s+/).length });
  } catch (error: any) {
    console.error('Humanizer Error:', error);
    return NextResponse.json({ error: error.message || 'Please try again.' }, { status: 500 });
  }
}
