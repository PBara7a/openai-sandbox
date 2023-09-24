import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const ideas = [
  {
    name: "Movie Idea Generator",
    path: "/movie-generator",
  },
  {
    name: "Chat bot",
    path: "/chatbot",
  },
];

export const Home = () => {
  return (
    <main className={styles["home"]}>
      <h1>What idea do you want to try?</h1>
      {ideas.map(({ name, path }, i) => (
        <Link key={i} to={path} className={styles["home__link"]}>
          <div className={styles["home__item"]}>{name}</div>
        </Link>
      ))}
    </main>
  );
};
