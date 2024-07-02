import React from 'react';
import HomePage from './Components/HomePage';
import MissingLetterGame from './Components/MissingLetterGame';
import EndPage from './Components/EndPage';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './Components/GameContext.js';

function App() {
  return (
    <GameProvider>
      <Router basename='/game/memorygame'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<MissingLetterGame />} />
          <Route path="/end" element={<EndPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
