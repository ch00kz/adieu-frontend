import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import JoinGamePage from "./pages/JoinGamePage";
import GamePage from "./pages/GamePage";
import GameVictoryPage from "./pages/GameVictoryPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join/:game" element={<JoinGamePage />} />
        <Route path="/play/:game" element={<GamePage />} />
        <Route path="/victory/:game" element={<GameVictoryPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
