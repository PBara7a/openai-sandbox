import { ReactComponent as SendIcon } from "../../../assets/icons/Send.svg";

import styles from "./BotControls.module.scss";

interface BotControlsProps {
  promptHandler: (prompt: string) => void;
  resetBot: () => void;
  sendHandler: () => void;
  isLoading?: boolean;
}

export const BotControls = ({
  promptHandler,
  resetBot,
  sendHandler,
  isLoading = false,
}: BotControlsProps) => {
  return (
    <div className={styles["bot-controls"]}>
      {isLoading && (
        <img src="/loading.svg" alt="loading" width={128} height={16} />
      )}
      {!isLoading && (
        <>
          <textarea
            placeholder="Write your movie idea in one sentence..."
            onChange={(e) => {
              promptHandler(e.target.value);
              resetBot();
            }}
          />
          <button onClick={sendHandler}>
            <SendIcon height={24} />
          </button>
        </>
      )}
    </div>
  );
};
