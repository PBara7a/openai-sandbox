export interface OpenAICompletionPrompt {
  prompt: string;
  temperature?: number;
  max_tokens?: number;
}

export interface OpenAIImagePrompt {
  prompt: string;
  size?: "256x256" | "512x512" | "1024x1024" | null;
  format?: "url" | "b64_json";
  quantity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
