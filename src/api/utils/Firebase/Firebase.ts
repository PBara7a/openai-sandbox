import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, remove } from "firebase/database";
import { ChatCompletionMessage } from "openai/resources/chat";
import { fetchCompletionFromOpenAI } from "../OpenAi";
import { botInstructions } from "../../../utils/ChatBot";

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_DB_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const conversationInDbRef = ref(db);

export const addMessageToConversation = (message: ChatCompletionMessage) => {
  push(conversationInDbRef, message);
};

export const getBotReply = async () => {
  try {
    const snapshot = await get(conversationInDbRef);
    const messages = Object.values(snapshot.val()) as ChatCompletionMessage[];
    messages.unshift(botInstructions);
    const botReply = await fetchCompletionFromOpenAI({ messages });
    addMessageToConversation(botReply);
    return botReply;
  } catch (error: any) {
    console.error("Error fetching conversation", error.message);
  }
};

export const getConversationFromDb = async () => {
  const snapshot = await get(conversationInDbRef);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()) as ChatCompletionMessage[];
  }
  return [];
};

export const clearConversationFromDb = () => {
  remove(conversationInDbRef);
};
