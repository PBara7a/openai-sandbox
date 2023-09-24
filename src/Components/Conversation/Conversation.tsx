import React from "react";
import cx from "classnames";
import { ChatCompletionMessage } from "openai/resources/chat";

import styles from "./Conversation.module.scss";

interface ConversationProps {
  messages: ChatCompletionMessage[];
}

export const Conversation = ({ messages }: ConversationProps) => {
  return (
    <div className={styles["conversation"]}>
      <div
        className={cx(
          styles["conversation__speech"],
          styles["conversation__speech--ai"]
        )}
      >
        How can I help you?
      </div>
      {messages.map(({ role, content }, i) => {
        return (
          <div
            key={i}
            className={cx(styles["conversation__speech"], {
              [`${styles["conversation__speech--ai"]}`]: role === "assistant",
              [`${styles["conversation__speech--human"]}`]: role === "user",
            })}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};
