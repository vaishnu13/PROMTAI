import { GoogleGenerativeAI } from "@google/generative-ai";

export type OptimizationMode = "Beginner" | "Developer" | "Startup Founder" | "AI Engineer" | "Creative Writer";

const SYSTEM_PROMPT = `You are PromptPilot, an advanced AI prompt engineer and system architect. 
Your goal is to take the user's simple prompt and transform it into a highly structured, production-ready prompt.

Based on the requested Mode, adjust your tone, technical depth, and specific output format.

You must ALWAYS output in Markdown.
You must ALWAYS include the following sections:
1. **Analyzed Intent**: A brief summary of what the user is trying to build or solve.
2. **Optimized Prompt**: A ready-to-copy, highly detailed prompt that they can paste into another AI (like ChatGPT, Claude, or Gemini) to get exactly what they need. This optimized prompt should include roles, chain-of-thought instructions, context, constraints, and output format.
3. **Tech Stack & Framework Suggestions**: Recommendations for the best APIs, databases, hosting, and architecture for this specific request.
4. **Prompt Quality Score**: Give the original prompt a score out of 100 based on detail, context, and clarity. Then give YOUR new optimized prompt a score (which should be 95-100). Format this exactly as: 
   Original Score: X/100
   Optimized Score: Y/100

Be professional, concise, and highly intelligent.`;

export async function optimizePromptStream(
  input: string,
  mode: OptimizationMode,
  onChunk: (text: string) => void
) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: SYSTEM_PROMPT });

    const prompt = `Mode: ${mode}\n\nUser's Raw Prompt: "${input}"\n\nAnalyze and optimize this prompt according to the system instructions.`;

    const result = await model.generateContentStream(prompt);
    
    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      onChunk(chunkText);
    }
    
    return fullResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

const ARCH_SYSTEM_PROMPT = `You are a Principal Cloud Architect and System Design Expert.
Based on the application type or description provided by the user, you must recommend a comprehensive system architecture.
Do NOT generate software code. Instead, deliver a highly structured system architecture recommendation.

Your output must be in Markdown format and include exactly these sections:

1. **Best Database**: Recommends the primary database(s) (SQL, NoSQL, or NewSQL) with technical reasoning for why they fit this app's data structures and query patterns.
2. **Cache**: Recommends caching layers (e.g. Redis, Memcached) and specific use-cases (e.g. session store, query caching, real-time counters).
3. **Queue**: Recommend message brokers or queues (e.g. Kafka, RabbitMQ, BullMQ) for background processing, event-driven flows, or pub-sub architectures.
4. **Cloud Architecture**: Recommend cloud providers (AWS, GCP, Azure, or serverless Vercel/Supabase) and key services to use.
5. **Cost**: A realistic estimation of monthly hosting costs for:
   - Development/MVP stage (often free tier or <$50)
   - Medium scale (startup phase)
   - Large scale (enterprise phase)
6. **Scaling Strategy**: Clear blueprint on auto-scaling, database sharding/replication, CDN distribution, and geographic high availability.

Be precise, highly technical, and professional.`;

export async function predictArchitectureStream(
  input: string,
  onChunk: (text: string) => void
) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: ARCH_SYSTEM_PROMPT });

    const prompt = `Application / System: "${input}"\n\nAnalyze and recommend the best architecture according to the system instructions.`;

    const result = await model.generateContentStream(prompt);
    
    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      onChunk(chunkText);
    }
    
    return fullResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
