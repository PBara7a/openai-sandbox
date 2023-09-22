import OpenAI from "openai";
import { OpenAICompletionPrompt } from "../../../models/OpenAI";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export const fetchCompletionFromOpenAI = async ({
  messages,
  temperature,
  max_tokens,
}: OpenAICompletionPrompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature,
      max_tokens,
    });
    return completion.choices[0]?.message;
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error?.message
    );
    throw error;
  }
};
