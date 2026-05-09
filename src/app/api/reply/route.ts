import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert Upwork/Fiverr negotiator and communication assistant for Awais Mehboob (Full-Stack Developer & AI Automation Expert).

YOUR RULES:
1. Goal: Reply to a client's message effectively to close the deal, especially when they ask for a price reduction or scope change.
2. Tone: Professional, accommodating, but confident in the value provided. Simple English.
3. Structure: 
   - Acknowledge their point/concern.
   - Propose a revised approach or revised quote based on their feedback.
   - Explain briefly WHY this revised approach makes sense.
   - Ask a closing question to move forward.
4. Formatting: Keep it to 2-4 short paragraphs. Do NOT use generic corporate jargon.
5. If the client says it's "too expensive", suggest a lower price but slightly reduce the scope, OR explain how your automated approach (e.g., using n8n/Puppeteer) is highly efficient and offer a one-time discount to build a long-term relationship.
6. Sign off with: "Best, Awais"

Do NOT include any <think> tags or internal reasoning in your final output. Return ONLY the reply text.`;

export async function POST(request: NextRequest) {
  try {
    const { originalOffer, clientReply } = await request.json();

    if (!clientReply || clientReply.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide the client\'s reply.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Awais Portfolio - AI Reply Generator',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Here is the context:\n\nMy Original Offer/Message:\n${originalOffer || 'No original offer provided.'}\n\nClient's Reply:\n${clientReply}\n\nPlease generate a professional and persuasive reply to the client.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate reply. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || '';

    // Strip <think> reasoning tags from model output
    reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    if (!reply || reply.length < 20) {
      return NextResponse.json({ reply: 'The AI model is still learning. Please click Generate again — it often works on the second try!' });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Reply generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
