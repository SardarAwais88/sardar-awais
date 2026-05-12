import { NextRequest, NextResponse } from 'next/server';

const HUMANIZER_PROMPT = `You are the world's most advanced AI-to-Human text rewriter and plagiarism remover.

YOUR TASK:
Take the input text and completely rewrite it so that:
1. NO AI detection tool (GPT-Zero, Originality.ai, Turnitin, Copyleaks, Writer.com, Sapling) can flag it as AI-generated.
2. NO plagiarism checker can find a match anywhere on the internet.
3. The output reads as if a real, educated human typed it naturally.

REWRITING RULES (follow ALL strictly):
- Vary sentence length: mix short punchy sentences (5-8 words) with medium ones (12-18 words). Avoid long uniform sentences.
- Use natural imperfections: contractions (don't, it's, we've), occasional informal phrases, rhetorical questions.
- Replace generic AI phrasing: avoid "delve", "landscape", "multifaceted", "it's important to note", "in today's world", "leveraging", "tapestry", "plethora", "game-changer". Use everyday vocabulary.
- Restructure completely: change paragraph order, split or merge ideas, invert sentence structures (start some sentences with "Because...", "Even though...", "What most people miss is...").
- Add personal flavor: sprinkle in phrases like "from what I've seen", "honestly", "the way I think about it", "here's the thing".
- Use active voice predominantly. Passive voice only when it sounds natural.
- Vary paragraph lengths: 2-4 sentences per paragraph. Never write wall-of-text paragraphs.
- Replace every cliché or overused phrase with a fresh alternative.
- Maintain the original meaning, facts, and key points exactly. Do NOT add false information.
- Do NOT wrap your response in quotes or add meta-commentary. Just output the rewritten text directly.

OUTPUT:
Return ONLY the rewritten text. No explanations, no headers, no "Here is the rewritten version". Just the clean rewritten content.`;

const DETECTOR_PROMPT = `You are an expert AI content analyst. Analyze the given text and provide:

1. **AI Detection Score**: Rate from 0-100 how likely this text was written by AI (0 = definitely human, 100 = definitely AI).
2. **Plagiarism Risk**: Rate from 0-100 how likely this text would trigger plagiarism detectors.
3. **Key Indicators**: List 3-5 specific phrases or patterns that make it look AI-generated or plagiarized.
4. **Verdict**: One line summary.

Format your response EXACTLY like this (no other format):
AI_SCORE: [number]
PLAG_SCORE: [number]
INDICATORS:
- [indicator 1]
- [indicator 2]
- [indicator 3]
VERDICT: [one line summary]`;

export async function POST(request: NextRequest) {
  try {
    const { text, mode } = await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters of text.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = 'meta-llama/llama-3-8b-instruct:free';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured.' },
        { status: 500 }
      );
    }

    const systemPrompt = mode === 'detect' ? DETECTOR_PROMPT : HUMANIZER_PROMPT;
    const userContent = mode === 'detect'
      ? `Analyze this text for AI patterns and plagiarism risk:\n\n${text}`
      : `Rewrite the following text to be 100% human-sounding and plagiarism-free:\n\n${text}`;

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
        temperature: mode === 'detect' ? 0.3 : 0.85,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter error:', await response.text());
      return NextResponse.json(
        { error: 'AI service error. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    let result = data.choices?.[0]?.message?.content || '';

    // Clean think tags
    result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    if (mode === 'detect') {
      // Parse the detection results
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
          : ['Analysis unavailable'],
        verdict: verdictMatch ? verdictMatch[1].trim() : 'Could not determine verdict.',
        raw: result,
      });
    }

    return NextResponse.json({
      mode: 'humanize',
      result,
      wordCount: result.split(/\s+/).length,
    });
  } catch (error) {
    console.error('Humanizer API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
