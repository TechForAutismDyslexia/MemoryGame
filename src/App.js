import MissingLetterGame from './Components/MissingLetterGame';
import './Components/MissingLetterGame.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/:index" element={<MissingLetterGame index={1} />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
