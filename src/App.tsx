import React from "react";
import { Routes, Route } from "react-router-dom";
import { MovieBot } from "./Components/MovieGenerator/MovieBot";
import { Home } from "./Components/Home/Home";
import { ChatBot } from "./Components/ChatBot/ChatBot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie-generator" element={<MovieBot />} />
      <Route path="/chatbot" element={<ChatBot />} />
    </Routes>
  );
}

export default App;
