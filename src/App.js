import React, { useState } from 'react';
import HomePage from './Components/HomePage';
import MissingLetterGame from './Components/MissingLetterGame';
import EndPage from './Components/EndPage';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [selectedSetId, setSelectedSetId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setSelectedSetId={setSelectedSetId} />} />
        <Route path="/game" element={<MissingLetterGame selectedSetId={selectedSetId} />} />
        <Route path="/end" element={<EndPage setSelectedSetId={setSelectedSetId} />} />
      </Routes>
    </Router>
  );
}

export default App;
