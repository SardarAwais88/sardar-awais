import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_FAST } from '@/lib/ai';

const SYSTEM_PROMPT = `You are an expert Upwork/Fiverr negotiator and communication assistant for Sardar Awais (Full-Stack Developer & AI Automation Expert).

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
      return NextResponse.json({ error: "Please provide the client's reply." }, { status: 400 });
    }

    const reply = await callAIWithFallback(
      SYSTEM_PROMPT,
      `Here is the context:\n\nMy Original Offer/Message:\n${originalOffer || 'No original offer provided.'}\n\nClient's Reply:\n${clientReply}\n\nPlease generate a professional and persuasive reply to the client.`,
      MODELS_FAST,
      { maxTokens: 1500, temperature: 0.7, title: 'AI Reply Generator' }
    );

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Reply error:', error);
    return NextResponse.json({ error: error.message || 'Please try again.' }, { status: 500 });
  }
}
