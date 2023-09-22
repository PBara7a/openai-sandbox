import styles from "./Bot.module.scss";

interface BotProps {
  speech: string;
}

export const Bot = ({ speech }: BotProps) => {
  return (
    <div className={styles["bot-container"]}>
      <img src="/images/bot.png" alt="" width={128} height={192} />
      <div className={styles["bot-container__speech-bubble"]}>
        <p>{speech}</p>
      </div>
    </div>
  );
};
