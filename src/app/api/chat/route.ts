import { taskTools } from "@/ai/tools";
import SYSTEM_MESSAGE from "@/constants/system-message";
import { openai } from "@ai-sdk/openai";
// import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from "ai";

export const maxDuration = 30;

export const POST = async (req: Request) => {
  const { messages } = await req.json()

  const response = streamText({
    model: openai("gpt-4o-mini"),
    // model: deepseek('deepseek-chat'),
    system: SYSTEM_MESSAGE,
    messages: messages,
    tools: taskTools,
    maxSteps: 5,
    toolChoice: "auto",
    // temperature: 0,
    temperature: 0.3,
    // maxTokens: 1024,
  })

  return response.toDataStreamResponse()
}