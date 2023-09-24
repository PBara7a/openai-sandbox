import { clearConversationFromDb } from "../../api/utils/Firebase";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  title: string;
  subtitle: string;
}

export const Header = ({ logo, title, subtitle }: HeaderProps) => {
  return (
    <div className={styles["header"]}>
      <img src={logo} alt="logo" className={styles["header__logo"]} />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
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
