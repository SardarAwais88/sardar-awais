import { NextRequest, NextResponse } from 'next/server';

const HUMANIZER_PROMPT = `You are a professional human text rewriter. Your ONLY job is to rewrite the given text.

RULES:
- Rewrite completely so no plagiarism checker can match it
- Make it sound like a real human wrote it naturally
- Mix short sentences with medium ones
- Use contractions like don't, it's, we've
- NEVER use these AI words: delve, landscape, multifaceted, leverage, tapestry, plethora, game-changer, crucial, moreover, furthermore, in conclusion
- Keep the same meaning and facts
- Use active voice mostly
- Add natural phrases like "honestly", "the thing is", "from what I've seen"
- DO NOT add any explanation or commentary
- DO NOT say "Here is the rewritten text" or similar
- Just output the rewritten text directly, nothing else`;

const DETECTOR_PROMPT = `Analyze this text and respond in EXACTLY this format, nothing else:

AI_SCORE: [0-100 number, how likely AI wrote this]
PLAG_SCORE: [0-100 number, plagiarism risk]
INDICATORS:
- [pattern 1 that looks AI-generated]
- [pattern 2]
- [pattern 3]
VERDICT: [one sentence summary]

Do NOT add any other text before or after this format.`;

async function callAI(systemPrompt: string, userContent: string, retries = 2): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';

  if (!apiKey) throw new Error('API key not configured');

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
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
        const errText = await response.text();
        console.error(`OpenRouter error (attempt ${attempt + 1}):`, errText);
        if (attempt === retries) throw new Error('AI service unavailable');
        continue;
      }

      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';

      // Strip <think> reasoning blocks
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

      // If result is still empty after stripping, retry
      if (result.length < 30) {
        console.log(`Result too short (${result.length} chars), attempt ${attempt + 1}`);
        if (attempt === retries) {
          return result || 'The AI could not process this text. Please try again with different content.';
        }
        continue;
      }

      return result;
    } catch (err) {
      if (attempt === retries) throw err;
    }
  }

  throw new Error('All retry attempts failed');
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
      const userContent = `Analyze this text:\n\n${text}`;
      const result = await callAI(DETECTOR_PROMPT, userContent);

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
          : ['Analysis could not be completed. Try again.'],
        verdict: verdictMatch ? verdictMatch[1].trim() : 'Please try again for a more accurate analysis.',
        raw: result,
      });
    }

    // Humanize mode
    const userContent = `Rewrite this text completely to sound human and be plagiarism-free:\n\n${text}`;
    const result = await callAI(HUMANIZER_PROMPT, userContent);

    return NextResponse.json({
      mode: 'humanize',
      result,
      wordCount: result.split(/\s+/).length,
    });
  } catch (error) {
    console.error('Humanizer API Error:', error);
    return NextResponse.json(
      { error: 'Could not process your text. Please try again — the AI sometimes needs a second attempt.' },
      { status: 500 }
    );
  }
}
