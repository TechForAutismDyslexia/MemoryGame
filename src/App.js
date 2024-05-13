import React, { useState } from 'react';
import HomePage from './Components/HomePage';
import MissingLetterGame from './Components/MissingLetterGame';
import EndPage from './Components/EndPage';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [tries, setTries] = useState(0);
  const [timer, setTimer] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setSelectedSetId={setSelectedSetId} />} />
        <Route path="/game" element={<MissingLetterGame selectedSetId={selectedSetId} setTries={setTries} timer={timer} setTimer={setTimer}/>} />
        <Route path="/end" element={<EndPage selectedSetId={selectedSetId} tries={tries} timer={timer} />} />
      </Routes>
    </Router>
  );
}

export default App;
