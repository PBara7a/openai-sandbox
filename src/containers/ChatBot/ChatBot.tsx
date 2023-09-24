import React, { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { botInstructions } from "../../utils/ChatBot";
import { ChatCompletionMessage } from "openai/resources/chat";
import { onValue, off } from "firebase/database";
import { Conversation } from "../../components/Conversation";
import { MessageInput } from "../../components/MessageInput";
import {
  addMessageToConversation,
  conversationInDbRef,
  getBotReply,
  getConversationFromDb,
} from "../../api/utils/Firebase";

import styles from "./ChatBot.module.scss";

export const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([
    botInstructions,
  ]);

  const loadConversation = async () => {
    setMessages(await getConversationFromDb());
  };

  useEffect(() => {
    const unsubscribe = onValue(conversationInDbRef, loadConversation);

    return () => off(conversationInDbRef, "value", unsubscribe);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessageToConversation({ role: "user", content: userInput });
    setUserInput("");
    await getBotReply();
  };

  return (
    <main>
      <section className={styles["chatbot"]}>
        <Header
          logo="images/brain.png"
          title="WeeAssistant"
          subtitle="Ask away love!"
        />
        <Conversation messages={messages} />
        <MessageInput
          message={userInput}
          onChangeHandler={setUserInput}
          onSubmitHandler={onSubmit}
        />
      </section>
    </main>
  );
};
