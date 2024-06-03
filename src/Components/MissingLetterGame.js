import React, { useState, useEffect, useContext } from 'react';
import wordsData from '../words.json';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { GameContext } from './GameContext.js';
import './styles.css'; 

export default function MissingLetterGame() {
  const navigate = useNavigate();
  const { selectedSetId, setTries, timer, setTimer } = useContext(GameContext);

  useEffect(() => {
    if (selectedSetId === null) {
      navigate('/');
    }
  }, [selectedSetId, navigate]);

  const [index, setIndex] = useState(selectedSetId || 0);
  const level2Data = wordsData['words'];
  const [w, setW] = useState([]);
  const [buttonColors, setButtonColors] = useState(Array(15).fill(''));
  const [noOfTries, setNoOfTries] = useState(0);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [correctTries, setCorrectTries] = useState(0);
  const [correctIndex, setCorrectIndex] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  let wordArr = [], alphabetArr = [], tempArr = [];
  let singleAlphabet = [];

  for (let j in level2Data[index]) {
    wordArr.push(j);
    tempArr.push(level2Data[index][j]);
    alphabetArr.push(tempArr);
    tempArr = [];
  }

  useEffect(() => {
    let underWord = [];
    if (index > 8) {
      for (let i = 0; i < 5; i++) {
        let modifyWord = wordArr[i];
        modifyWord = modifyWord.replace(wordArr[i][0], "_");
        modifyWord = modifyWord.replace(wordArr[i][1], "_");
        underWord.push(modifyWord);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        underWord.push(wordArr[i].replace(wordArr[i][0], "_"));
      }
    }
    setW(underWord);
    setButtonColors(Array(15).fill(''));
    // eslint-disable-next-line
  }, [index]);

  const handleTime = () => {
    if (!startTimer) {
      setStartTime(new Date());
      setStartTimer(true);
      console.log('start');
    }
  };

  const checkLetter = async (letter, word, indexW, i) => {
    setNoOfTries(noOfTries + 1);

    const audio = new Audio(`/Audio/${letter}.mp3`);
    await audio.play();

    if (((index < 9 && letter === word[0]) || (index > 8 && letter === word.slice(0, 2))) && (correctIndex.indexOf(i) === -1)) {
      setTimeout(() => {
        eachLetter(wordArr[indexW]);
      }, 1000);
      setTimeout(() => {
        rightClick(wordArr[indexW]);
      }, 2500);

      setCorrectIndex([...correctIndex, i]);
      const newW = [...w];
      newW[indexW] = word;
      console.log(correctTries);
      const newButtonColors = [...buttonColors];
      newButtonColors[i] = "#14fc03";
      setButtonColors(newButtonColors);
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const correctTries = prevCorrectTries + 1;
        if (correctTries === 5) {
          setNextButtonVisible(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
        return correctTries;
      });
      const button = document.getElementById(i);
      button.classList.add('correct-animation');

      setTimeout(() => {
        button.classList.remove('correct-animation');
      }, 1000);

      return true;
    }
  };

  const handleNext = () => {
    setStartTimer(false);
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000;
    setStartTime(timeDiff);
    setTimer(prevTimer => prevTimer + timeDiff);
    console.log(timer);
    setCorrectTries(0);
    setIndex(prevIndex => prevIndex + 1);
    setNextButtonVisible(false);
    setCorrectIndex([]);
    setTries(noOfTries);
    if ((selectedSetId === 1 && index === 5) || (selectedSetId === 6 && index === 10)) {
      navigate('/end');
    }
  };

  const rightClick = (word) => {
    const audio = new Audio(`/Audio/${word}.mp3`);
    audio.play();
  };

  const eachLetter = (word) => {
    const audio = new Audio(`/EachAudio/${word}.mp3`);
    audio.play();
  };

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      singleAlphabet.push(alphabetArr[i][0][j]);
    }
  }

  const groupedButtons = [];
  for (let i = 0; i < 5; i++) {
    const buttonGroup = [];
    for (let j = 0; j < 3; j++) {
      const letterIndex = i * 3 + j;
      const letter = singleAlphabet[letterIndex];
      const correctWord = wordArr[i];
      buttonGroup.push(
        <button
          key={letterIndex}
          id={letterIndex}
          className="btn letter-button p-3"
          style={{ backgroundColor: buttonColors[letterIndex] }}
          onClick={() => { handleTime(); checkLetter(letter, correctWord, i, letterIndex); }}
        >
          {letter}
        </button>
      );
    }
    groupedButtons.push(
      <div key={i} className="button-group-horizontal d-flex">
        <div className="button-group-vertical">
          {buttonGroup}
        </div>
        <button key={`rbutton${i}`} id={`rbutton${i}`} className="btn btn-lg word-button" onClick={() => rightClick(wordArr[i])}>
          {w[i]}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex mt-3">
        <div>
          <span><h3>Tries : {noOfTries}</h3></span>
        </div>
        <div className='flex-grow-1 d-flex justify-content-center'>
          <div className="alert alert-warning" role="alert">
            Make sure to turn on the volume
          </div>
        </div>
      </div>

      <div className="grid-container mt-2 flex-column justify-content-center align-items-center">
        {groupedButtons}
      </div>
      <div className='nextButton mt-5'>
        <button className="btn btn-lg btn-danger me-5" onClick={() => navigate('/')} style={{ float: 'right' }}>Exit</button>
        {nextButtonVisible && <button className="btn btn-success btn-lg next-button" onClick={handleNext}>Next</button>}
      </div>
      <div style={{ marginBottom: '50px' }}></div>
      {showConfetti && <Confetti />}
    </div>
  );
}
