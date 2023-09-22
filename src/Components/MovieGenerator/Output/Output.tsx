import { MovieIdea } from "../../../models/Movie";
import styles from "./Output.module.scss";

interface OutputProps {
  movie: MovieIdea;
  close: () => void;
}

export const Output = ({
  movie: { poster, title, actors, synopsis },
  close,
}: OutputProps) => {
  return (
    <section className={styles["output-container"]}>
      <img src={poster} alt={`Poster of ${title}`} />
      <h1>{title}</h1>
      <h2>Featuring: {actors}</h2>
      <p>{synopsis}</p>
      <button onClick={close}>Close</button>
    </section>
  );
};
