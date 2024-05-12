import React, { useState, useEffect } from 'react';
import wordsData from '../words.json';
import EndPage from './EndPage';

export default function MissingLetterGame(props) {
  let n = props.selectedLevelId;
  const [index, setIndex] = useState(props.selectedSetId);
  const level2Data = wordsData['words'];
  const [w, setW] = useState([]);
  const [buttonColors, setButtonColors] = useState(Array(15).fill(''));
  const [noOfTries,setNoOfTries] = useState(0);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [correctTries, setCorrectTries] = useState(0);
  console.log(correctTries)
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
    if((n===1 && index === 6) || (n===6 && index === 11)){
      <EndPage/>
    }
    let underWord = [];
    if(index>8){
      for (let i = 0; i < 5; i++) {
        let modifyWord = wordArr[i];
        modifyWord = modifyWord.replace(wordArr[i][0], "_");
        modifyWord = modifyWord.replace(wordArr[i][1], "_");
        underWord.push(modifyWord);
      }
    }
    else{
      for (let i = 0; i < 5; i++) {
        underWord.push(wordArr[i].replace(wordArr[i][0], "_"));
      }
    }
    setW(underWord);
    setButtonColors(Array(15).fill(''));
    // eslint-disable-next-line
  }, [index]);

  const checkLetter = (letter, word, indexW, i) => {
    const audio = new Audio(`/Audio/${letter}.mp3`);
    audio.play();
    setNoOfTries(noOfTries+1);
    console.log(noOfTries, word, letter, word[0]);
    if ((index<9 && letter === word[0]) || (index>8 && letter === word.slice(0,2))) {
      const newW = [...w];
      newW[indexW] = word;

      const newButtonColors = [...buttonColors];
      newButtonColors[i] = "#14fc03";
      setButtonColors(newButtonColors);
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const correctTries = prevCorrectTries + 1;
        console.log(correctTries)
        if (correctTries === 5) {
          setNextButtonVisible(true);
        }
        return correctTries;
      });
      return true;
    } 
  }

  const handleNext = () =>{
    setCorrectTries(0);
    setIndex(prevIndex => prevIndex + 1);
    setNextButtonVisible(false);
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
    if(i%3 === 0){
      leftButtons.push(
        <button key={i} id={i} className="btn letter-button mt-3" style={{ backgroundColor: buttonColors[i] }} onClick={() => checkLetter(letter, correctWord, parseInt(i / 3),i)}>
          {letter}
        </button>
      );
    }
    else{
      leftButtons.push(
        <button key={i} id={i} className="btn letter-button" style={{ backgroundColor: buttonColors[i] }} onClick={() => checkLetter(letter, correctWord, parseInt(i / 3),i)}>
          {letter}
        </button>
      );
    }
    
  }

  const rightButtons = w.map((word, i) => (
    <button key={i} id={`rbutton${i}`} className="btn btn-lg word-button" onClick={()=>rightClick(wordArr[i])}>{word}</button>
  ));

  return (
    <div>
      <div>
        <span><h3>Tries : {noOfTries}</h3></span>
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
      {nextButtonVisible && <button className="btn btn-success next-button" onClick={handleNext}>Next</button>}
    </div>
    </div>
  );
}
