import React, { useState } from "react";
import { getBotFirstImpression, getMovieIdea } from "../../api/MovieGenerator";
import { MovieIdea } from "../../models/Movie";
import { Bot } from "../../components/MovieGenerator/Bot/Bot";
import { BotControls } from "../../components/MovieGenerator/BotControls/BotControls";
import { Output } from "../../components/MovieGenerator/Output/Output";
import {
  defaultBotChat,
  defaultBotThinking,
  defaultMovie,
} from "../../utils/MovieGenerator";

import styles from "./MovieBot.module.scss";

export const MovieBot = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [botText, setBotText] = useState(defaultBotChat);
  const [movie, setMovie] = useState<MovieIdea>(defaultMovie);

  const getBotAnswer = async (prompt: string) => {
    const response = await getBotFirstImpression(prompt);
    setBotText(response);
    setPrompt("");
  };

  const loadMovieIdea = async (prompt: string) => {
    const movie = await getMovieIdea(prompt);
    setMovie(movie);
    setLoading(false);
  };

  const onSendHandler = async () => {
    setLoading(true);
    setBotText(defaultBotThinking);
    await getBotAnswer(prompt);
    await loadMovieIdea(prompt);
  };

  const resetBot = () => {
    setBotText(defaultBotChat);
    setMovie(defaultMovie);
  };

  return (
    <main className={styles["bot-one"]}>
      <section>
        <Bot speech={botText} />
        <BotControls
          promptHandler={setPrompt}
          resetBot={resetBot}
          sendHandler={onSendHandler}
          isLoading={loading}
        />
      </section>

      {movie.synopsis && <Output movie={movie} close={resetBot} />}
    </main>
  );
};
