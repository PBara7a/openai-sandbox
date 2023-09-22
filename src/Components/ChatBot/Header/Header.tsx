import { clearConversationFromDb } from "../../../api/utils/Firebase";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles["header"]}>
      <img
        src="images/brain.png"
        alt="brain"
        className={styles["header__logo"]}
      />
      <h1>WeeAssistant</h1>
      <h2>Ask away love!</h2>
      <p className={styles["header__support-id"]}>User ID: 2344</p>
      <button
        onClick={clearConversationFromDb}
        className={styles["header__clear-btn"]}
      >
        Clear
      </button>
    </div>
  );
};
