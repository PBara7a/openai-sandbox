import React, { FormEvent, useEffect, useState } from "react";
import cx from "classnames";
import { ReactComponent as SendIcon } from "../../assets/icons/Send.svg";
import { Header } from "../Header/Header";
import { botInstructions } from "../../utils/ChatBot";
import { ChatCompletionMessage } from "openai/resources/chat";
import { onValue, off } from "firebase/database";
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
        <div className={styles["chatbot__conversation-container"]}>
          <div
            className={cx(
              styles["chatbot__speech"],
              styles["chatbot__speech--ai"]
            )}
          >
            How can I help you?
          </div>
          {messages.map(({ role, content }, i) => {
            return (
              <div
                key={i}
                className={cx(styles["chatbot__speech"], {
                  [`${styles["chatbot__speech--ai"]}`]: role === "assistant",
                  [`${styles["chatbot__speech--human"]}`]: role === "user",
                })}
              >
                {content}
              </div>
            );
          })}
        </div>
        <form
          className={styles["chatbot__input-container"]}
          onSubmit={onSubmit}
        >
          <input
            name="user-input"
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            required
          />
          <button className={styles["chatbot__submit-btn"]}>
            <SendIcon height={24} />
          </button>
        </form>
      </section>
    </main>
  );
};
