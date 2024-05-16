import React, { useState, useEffect } from 'react';
import wordsData from '../words.json';
import { useNavigate } from 'react-router-dom';

export default function MissingLetterGame(props) {

  const navigate = useNavigate();
  const [index, setIndex] = useState(props.selectedSetId);
  const level2Data = wordsData['words'];
  const [w, setW] = useState([]);
  const [buttonColors, setButtonColors] = useState(Array(15).fill(''));
  const [noOfTries, setNoOfTries] = useState(0);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [correctTries, setCorrectTries] = useState(0);
  const [correctIndex, setCorrectIndex] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  let wordArr = [], alphabetArr = [], tempArr = [];
  const leftButtons = [];
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
    }
    else {
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
  }


  const checkLetter = async (letter, word, indexW, i) => {

    setNoOfTries(noOfTries + 1);

    const audio = new Audio(`/Audio/${letter}.mp3`);
    await audio.play();

    if (((index < 9 && letter === word[0]) || (index > 8 && letter === word.slice(0, 2))) && (correctIndex.indexOf(i) === -1)) {
      setTimeout(() => {
        rightClick(wordArr[indexW]);
      }, 1000);

      setCorrectIndex([...correctIndex, i]);
      const newW = [...w];
      newW[indexW] = word;
      console.log(correctTries)
      const newButtonColors = [...buttonColors];
      newButtonColors[i] = "#14fc03";
      setButtonColors(newButtonColors);
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const correctTries = prevCorrectTries + 1;
        if (correctTries === 5) {
          setNextButtonVisible(true);
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

  }

  const handleNext = () => {
    console.log("end");
    setStartTimer(false);
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000;
    setStartTime(timeDiff)
    props.setTimer(prevTimer => prevTimer + timeDiff);
    console.log(props.timer);
    setCorrectTries(0);
    setIndex(prevIndex => prevIndex + 1);
    setNextButtonVisible(false);
    setCorrectIndex([]);
    props.setTries(noOfTries);
    if ((props.selectedSetId === 1 && index === 5) || (props.selectedSetId === 6 && index === 10)) {
      navigate('/end');
    }
  }

  const rightClick = (word) => {
    const audio = new Audio(`/Audio/${word}.mp3`);
    audio.play();
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      singleAlphabet.push(alphabetArr[i][0][j]);
    }
  }

  for (let i = 0; i < 15; i++) {
    const letter = singleAlphabet[i];
    const correctWord = wordArr[parseInt(i / 3)];
    if (i % 3 === 0) {
      leftButtons.push(
        <button key={i} id={i} className="btn letter-button mt-3" style={{ backgroundColor: buttonColors[i] }} onClick={() => { handleTime(); checkLetter(letter, correctWord, parseInt(i / 3), i) }}>
          {letter}
        </button>
      );
    }
    else {
      leftButtons.push(
        <button key={i} id={i} className="btn letter-button" style={{ backgroundColor: buttonColors[i] }} onClick={() => checkLetter(letter, correctWord, parseInt(i / 3), i)}>
          {letter}
        </button>
      );
    }

  }

  const rightButtons = w.map((word, i) => (
    <button key={i} id={`rbutton${i}`} className="btn btn-lg word-button" onClick={() => rightClick(wordArr[i])}>{word}</button>
  ));

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
    
      <div className="grid-container mt-2">
        <div className="left-buttons">
          {leftButtons}
        </div>
        <div className="right-buttons">
          {rightButtons}
        </div>
      </div>
      <div className='nextButton mt-5'>
        <button className="btn btn-lg btn-danger me-5" onClick={() => navigate('/')} style={{ float: 'right' }}>Exit</button>
        {nextButtonVisible && <button className="btn btn-success btn-lg next-button" onClick={handleNext}>Next</button>}
      </div>
      <div style={{ marginBottom: '50px' }}></div>
    </div>
  );
}
