import { NextRequest, NextResponse } from 'next/server';

const HUMANIZER_PROMPT = `Rewrite the user's text completely. Rules:
- Make it sound like a natural human wrote it
- Mix short and medium sentences
- Use contractions (don't, it's, we've)
- NEVER use: delve, landscape, multifaceted, leverage, tapestry, plethora, game-changer, crucial, moreover, furthermore
- Keep the same meaning and all facts
- Use active voice
- Output ONLY the rewritten text, nothing else. No intro, no "Here is...", just the text.`;

const DETECTOR_PROMPT = `Analyze the user's text and respond in EXACTLY this format:

AI_SCORE: [number 0-100]
PLAG_SCORE: [number 0-100]
INDICATORS:
- [indicator 1]
- [indicator 2]
- [indicator 3]
VERDICT: [one sentence]`;

// Free models that DON'T waste tokens on reasoning blocks
const FREE_MODELS = [
  'google/gemma-2-9b-it:free',
  'qwen/qwen-2.5-7b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
];

async function callAI(systemPrompt: string, userContent: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  // Try each model until one works
  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'Awais Portfolio - AI Humanizer',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
          temperature: 0.8,
          max_tokens: 2500,
        }),
      });

      if (!response.ok) {
        console.error(`Model ${model} failed:`, response.status);
        continue; // Try next model
      }

      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';

      // Strip any think tags just in case
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

      // Remove common AI prefixes
      result = result
        .replace(/^(Here is|Here's|Below is|The following is)[^:.\n]*[:.\n]\s*/i, '')
        .replace(/^(Sure|Certainly|Of course)[^:.\n]*[:.\n]\s*/i, '')
        .trim();

      if (result.length > 50) {
        console.log(`Model ${model} returned ${result.length} chars — success`);
        return result;
      }

      console.log(`Model ${model} returned too short (${result.length} chars), trying next`);
    } catch (err) {
      console.error(`Model ${model} error:`, err);
    }
  }

  // Last resort: try the env model (nemotron) with very short prompt
  try {
    const envModel = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';
    console.log(`Fallback to env model: ${envModel}`);
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Awais Portfolio - AI Humanizer',
      },
      body: JSON.stringify({
        model: envModel,
        messages: [
          { role: 'user', content: `Rewrite this text to sound human. Only output the rewritten text:\n\n${userContent}` },
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (result.length > 50) return result;
    }
  } catch (err) {
    console.error('Fallback model error:', err);
  }

  throw new Error('All models failed to generate a response');
}

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters of text.' },
        { status: 400 }
      );
    }

    if (mode === 'detect') {
      const result = await callAI(DETECTOR_PROMPT, text);

      const aiScoreMatch = result.match(/AI_SCORE:\s*(\d+)/i);
      const plagScoreMatch = result.match(/PLAG_SCORE:\s*(\d+)/i);
      const indicatorsMatch = result.match(/INDICATORS:\s*([\s\S]*?)VERDICT:/i);
      const verdictMatch = result.match(/VERDICT:\s*(.+)/i);

      return NextResponse.json({
        mode: 'detect',
        aiScore: aiScoreMatch ? parseInt(aiScoreMatch[1]) : 50,
        plagScore: plagScoreMatch ? parseInt(plagScoreMatch[1]) : 30,
        indicators: indicatorsMatch
          ? indicatorsMatch[1].trim().split('\n').map((l: string) => l.replace(/^-\s*/, '').trim()).filter(Boolean)
          : ['Analysis could not be completed'],
        verdict: verdictMatch ? verdictMatch[1].trim() : 'Try again for accurate results.',
        raw: result,
      });
    }

    // Humanize mode
    const result = await callAI(HUMANIZER_PROMPT, text);

    return NextResponse.json({
      mode: 'humanize',
      result,
      wordCount: result.split(/\s+/).length,
    });
  } catch (error) {
    console.error('Humanizer API Error:', error);
    return NextResponse.json(
      { error: 'Could not process your text. Please try again.' },
      { status: 500 }
    );
  }
}
