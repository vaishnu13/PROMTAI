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
