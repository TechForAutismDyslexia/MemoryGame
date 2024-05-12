// import HomePage from './Components/HomePage';
import MissingLetterGame from './Components/MissingLetterGame';
import './Components/MissingLetterGame.css';
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/game" element={<MissingLetterGame/>}/>
      </Routes>
    </Router> */}
    <MissingLetterGame/>
    </>
  );
}

export default App;
