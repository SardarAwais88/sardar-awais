import { NextRequest, NextResponse } from 'next/server';
import { callAIWithFallback, MODELS_FAST } from '@/lib/ai';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { services } from '@/data/services';
import { timeline } from '@/data/timeline';

const skills = skillCategories.flatMap(c => c.skills);

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

    // Build chat history for the AI
    const chatHistory = messages.slice(-6).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    const fullPrompt = chatHistory.map((m: any) => `${m.role}: ${m.content}`).join('\n');

    const reply = await callAIWithFallback(SYSTEM_PROMPT, fullPrompt, MODELS_FAST, {
      maxTokens: 500, temperature: 0.7, title: 'Awais Portfolio - Chatbot',
    });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat Error:', error);
    return NextResponse.json({ reply: "I'm having a little trouble right now. Please reach out to Awais directly on WhatsApp at +923472725754!" });
  }
}
