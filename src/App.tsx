import React from "react";
import { Routes, Route } from "react-router-dom";
import { MovieBot } from "./containers/MovieGenerator/MovieBot";
import { Home } from "./Pages/Home";
import { ChatBot } from "./containers/ChatBot";
import { ChatBotV2 } from "./containers/ChatBotV2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie-generator" element={<MovieBot />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/chatbot-v2" element={<ChatBotV2 />} />
    </Routes>
  );
}

export default App;
