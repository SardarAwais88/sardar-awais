import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { services } from '@/data/services';
import { timeline } from '@/data/timeline';

// Flatten skills from categories
const skills = skillCategories.flatMap(c => c.skills);

// Pre-compute the context string once to save processing time
const contextData = `
NAME: Awais Mehboob
ROLE: Full-Stack Developer, AI Engineer, & DevOps Expert
LOCATION: Pakistan (Available globally)
CONTACT: Email: khanowais8888@gmail.com, Phone/WhatsApp: +923472725754

--- SKILLS ---
${skillCategories.map(c => c.name).join(', ')}
Top Skills: ${skills.filter(s => s.level >= 90).map(s => s.name).join(', ')}

--- SERVICES OFFERED ---
${services.map(s => `- ${s.title}: ${s.description} (Price: ${s.priceRange})`).join('\n')}

--- NOTABLE PROJECTS ---
${projects.slice(0, 10).map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n')}

--- EXPERIENCE / TIMELINE ---
${timeline.map(t => `- ${t.year}: ${t.title} ${t.company ? 'at ' + t.company : ''} - ${t.description}`).join('\n')}
`;

const SYSTEM_PROMPT = `You are the personal AI Assistant representing Awais Mehboob on his professional portfolio website. 

YOUR GOAL: 
You are speaking DIRECTLY to potential clients. Answer their questions about Awais's skills, projects, pricing, and experience using the context provided below. Your ultimate goal is to build trust, sound highly professional yet human and friendly, and gently guide the user to contact Awais for a project.

YOUR PERSONA:
- You speak in the first person plural as Awais's AI assistant (e.g., "Awais has built...", "We can help you with...").
- You are highly knowledgeable, polite, and persuasive.
- You sound like a human expert, NOT a generic robot. Keep responses concise and conversational.
- Do NOT hallucinate. Only use the provided context. If asked something outside the context, politely state you don't have that specific detail but encourage them to contact Awais directly.

CALL TO ACTION:
Whenever appropriate (e.g., if they ask about pricing, starting a project, or complex requirements), encourage them to contact Awais directly via WhatsApp (+923472725754) or email (khanowais8888@gmail.com).

CONTEXT DATA:
${contextData}
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Format messages for OpenRouter
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Awais Portfolio - Chatbot',
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter error:', await response.text());
      return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || '';

    // Strip any potential think tags just in case
    reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
