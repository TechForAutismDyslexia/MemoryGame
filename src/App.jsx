import React from 'react';
import HomePage from './Components/HomePage.jsx';
import MissingLetterGame from './Components/MissingLetterGame.jsx';
import EndPage from './Components/EndPage.jsx';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './Components/GameContext.jsx';

function App() {
  return (
    <GameProvider>
      <Router basename='/games/memorygame'>
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
