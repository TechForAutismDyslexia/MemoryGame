import React, { useState } from 'react';
import HomePage from './Components/HomePage';
import MissingLetterGame from './Components/MissingLetterGame';
import EndPage from './Components/EndPage';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [tries, setTries] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setSelectedSetId={setSelectedSetId} />} />
        <Route path="/game" element={<MissingLetterGame selectedSetId={selectedSetId} setTries={setTries}/>} />
        <Route path="/end" element={<EndPage selectedSetId={selectedSetId} tries={tries} />} />
      </Routes>
    </Router>
  );
}

export default App;
