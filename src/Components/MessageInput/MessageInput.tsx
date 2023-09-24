import React, { FormEvent } from "react";
import { ReactComponent as SendIcon } from "../../assets/icons/Send.svg";

import styles from "./MessageInput.module.scss";

interface MessageInputProps {
  message: string;
  onChangeHandler: (message: string) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export const MessageInput = ({
  message,
  onChangeHandler,
  onSubmitHandler,
}: MessageInputProps) => {
  return (
    <form className={styles["input-container"]} onSubmit={onSubmitHandler}>
      <input
        name="user-input"
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={message}
        required
      />
      <button className={styles["input-container__submit-btn"]}>
        <SendIcon height={24} />
      </button>
    </form>
  );
};
