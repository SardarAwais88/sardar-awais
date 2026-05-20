// ─── Shared AI Model Configuration ──────────────────────────────────────────
// Best free models on OpenRouter, ordered by quality for different tasks

export const MODELS_FAST = [
  'google/gemma-4-26b-a4b-it:free',    // Gemma 4 MoE
  'openai/gpt-oss-120b:free',           // Highly available
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-coder:free',
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'liquid/lfm-2.5-1.2b-instruct:free',
];

export const MODELS_QUALITY = [
  'google/gemma-4-31b-it:free',         // Best quality
  'openai/gpt-oss-120b:free',           // Highly available 120B
  'nousresearch/hermes-3-llama-3.1-405b:free', // Huge
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
];

export async function callAIWithFallback(
  systemPrompt: string,
  userContent: string,
  models: string[],
  options: { temperature?: number; maxTokens?: number; referer?: string; title?: string; minLength?: number } = {}
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('API key not configured');

  const { temperature = 0.7, maxTokens = 2500, referer, title, minLength = 10 } = options;
  const errors: string[] = [];

  for (const model of models) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': referer || process.env.NEXT_PUBLIC_SITE_URL || 'https://awaismehboob.dev',
          'X-Title': title || 'Awais Portfolio',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error && errData.error.message) {
            errorMsg = errData.error.message;
          }
        } catch (e) {}

        errors.push(`${model}: ${errorMsg}`);
        
        // If it's a global free-tier rate limit, no other free model will work either
        if (response.status === 429 && errorMsg.includes('free-models-per-day')) {
          throw new Error('OpenRouter daily free tier limit exceeded. Please add credits or try again tomorrow.');
        }
        continue;
      }

      const data = await response.json();
      let result = data.choices?.[0]?.message?.content || '';

      // Strip reasoning/thinking blocks
      result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      result = result.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '').trim();

      // Strip common AI prefixes
      result = result
        .replace(/^(Here is|Here's|Below is|The following is|Sure|Certainly|Of course|Absolutely)[^:\n]*[:\n]\s*/i, '')
        .trim();

      if (result.length >= minLength) {
        return result;
      }
      errors.push(`${model}: too short (${result.length} chars)`);
    } catch (err: any) {
      if (err.message.includes('OpenRouter daily free tier limit exceeded')) {
        throw err;
      }
      errors.push(`${model}: ${err.message}`);
    }
  }

  console.error('All models failed:', errors);
  
  // If we have a 429 error anywhere in the logs, bubble it up to user
  const rateLimitError = errors.find(e => e.includes('429') || e.includes('Rate limit'));
  if (rateLimitError) {
    throw new Error('AI Provider Rate Limit Exceeded. Please try again later.');
  }

  throw new Error('AI service temporarily unavailable. Please try again.');
}
