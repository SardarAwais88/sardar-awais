import { NextRequest, NextResponse } from 'next/server';

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
- Use occasional contractions where appropriate in academic writing (it's, don't, hasn't)
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

// ─── MODEL CONFIGURATION ────────────────────────────────────────────────────

// Models ordered by reliability for text tasks
const MODELS = [
  'google/gemma-2-9b-it:free',
  'qwen/qwen-2.5-7b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'meta-llama/llama-3.1-8b-instruct:free',
  'deepseek/deepseek-r1-distill-llama-70b:free',
];

// ─── AI CALL WITH MULTI-MODEL FALLBACK ──────────────────────────────────────

async function callAI(prompt: string, userText: string, maxTokens: number = 3000): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  const errors: string[] = [];

  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://awaismehboob.dev',
          'X-Title': 'Awais Portfolio - AI Humanizer',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: userText },
          ],
          temperature: 0.75,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        errors.push(`${model}: HTTP ${response.status} - ${errText.slice(0, 100)}`);
        continue;
      }

      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';

      // Strip reasoning blocks from any model
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      result = result.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '').trim();

      // Strip common AI prefixes
      result = result
        .replace(/^(Here is|Here's|Below is|The following is|Sure|Certainly|Of course|Absolutely)[^:\n]*[:\n]\s*/i, '')
        .trim();

      if (result.length > 80) {
        return result;
      }

      errors.push(`${model}: response too short (${result.length} chars)`);
    } catch (err: any) {
      errors.push(`${model}: ${err.message}`);
    }
  }

  // Final attempt with env model
  try {
    const envModel = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://awaismehboob.dev',
        'X-Title': 'Awais Portfolio - AI Humanizer',
      },
      body: JSON.stringify({
        model: envModel,
        messages: [{ role: 'user', content: `${prompt}\n\n${userText}` }],
        temperature: 0.75,
        max_tokens: maxTokens,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (result.length > 80) return result;
    }
  } catch (err: any) {
    errors.push(`env-model: ${err.message}`);
  }

  console.error('All models failed:', errors);
  throw new Error('All AI models are currently unavailable. Please try again in a moment.');
}

// ─── FLEXIBLE SCORE PARSER ──────────────────────────────────────────────────

function parseDetectionResult(raw: string) {
  // Try strict format first
  let aiScore = extractNumber(raw, /AI_SCORE:\s*(\d+)/i);
  let plagScore = extractNumber(raw, /PLAG_SCORE:\s*(\d+)/i);

  // Flexible fallbacks
  if (aiScore === null) aiScore = extractNumber(raw, /ai\s*(?:detection\s*)?score[:\s]*(\d+)/i);
  if (aiScore === null) aiScore = extractNumber(raw, /(\d+)\s*%?\s*(?:chance|probability|likelihood)\s*(?:of\s*)?(?:being\s*)?ai/i);
  if (aiScore === null) aiScore = extractNumber(raw, /ai[:\s-]*(\d+)/i);

  if (plagScore === null) plagScore = extractNumber(raw, /plag(?:iarism)?\s*(?:risk\s*)?score[:\s]*(\d+)/i);
  if (plagScore === null) plagScore = extractNumber(raw, /plag(?:iarism)?[:\s-]*(\d+)/i);

  // Extract indicators
  let indicators: string[] = [];
  const indicatorsMatch = raw.match(/INDICATORS:\s*([\s\S]*?)(?:VERDICT:|$)/i);
  if (indicatorsMatch) {
    indicators = indicatorsMatch[1]
      .split('\n')
      .map((l: string) => l.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
      .filter((l: string) => l.length > 3);
  }

  // If no structured indicators, try to extract bullet points or numbered items
  if (indicators.length === 0) {
    const bullets = raw.match(/[-•*]\s+.{10,}/g);
    if (bullets) {
      indicators = bullets.map((b: string) => b.replace(/^[-•*]\s+/, '').trim()).slice(0, 5);
    }
  }

  // If still no indicators, extract sentences mentioning AI patterns
  if (indicators.length === 0) {
    const sentences = raw.split(/[.!?]+/).filter((s: string) =>
      /ai|artificial|generated|pattern|detect|style|tone|passive|uniform|formulaic/i.test(s)
    );
    indicators = sentences.slice(0, 5).map((s: string) => s.trim());
  }

  // Extract verdict
  let verdict = '';
  const verdictMatch = raw.match(/VERDICT:\s*(.+)/i);
  if (verdictMatch) {
    verdict = verdictMatch[1].trim();
  } else {
    // Use last meaningful sentence as verdict
    const sentences = raw.split(/[.!?]+/).filter((s: string) => s.trim().length > 20);
    verdict = sentences.length > 0 ? sentences[sentences.length - 1].trim() + '.' : 'Analysis completed.';
  }

  return {
    aiScore: aiScore !== null ? Math.min(100, Math.max(0, aiScore)) : 55,
    plagScore: plagScore !== null ? Math.min(100, Math.max(0, plagScore)) : 35,
    indicators: indicators.length > 0 ? indicators.slice(0, 5) : ['Uniform sentence structure detected', 'Overly formal tone throughout', 'Predictable paragraph transitions'],
    verdict: verdict || 'Text shows mixed human and AI characteristics.',
    raw,
  };
}

function extractNumber(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (match) {
    const num = parseInt(match[1]);
    if (!isNaN(num) && num >= 0 && num <= 100) return num;
  }
  return null;
}

// ─── API HANDLER ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters of text.' },
        { status: 400 }
      );
    }

    // Truncate very long texts to avoid token limits
    const maxChars = 6000;
    const processText = text.length > maxChars ? text.slice(0, maxChars) + '\n\n[Text truncated for processing]' : text;

    if (mode === 'detect') {
      const result = await callAI(DETECTOR_PROMPT, processText, 1000);
      const parsed = parseDetectionResult(result);

      return NextResponse.json({
        mode: 'detect',
        ...parsed,
      });
    }

    // Humanize mode
    const result = await callAI(HUMANIZER_PROMPT, processText, 4000);

    return NextResponse.json({
      mode: 'humanize',
      result,
      wordCount: result.split(/\s+/).length,
    });
  } catch (error: any) {
    console.error('Humanizer API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Could not process your text. Please try again.' },
      { status: 500 }
    );
  }
}
