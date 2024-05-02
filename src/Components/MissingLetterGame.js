import { useState } from 'react';
import React from 'react';
import wordsData from '../words.json';

const MissingLetterGame = () => {
  const level2Data = wordsData['words'];

  let wordArr = [], alphabetArr = [], tempArr = [];
  for (let j in level2Data[1]) {
    wordArr.push(j);
    tempArr.push(level2Data[1][j]);
    alphabetArr.push(tempArr);
    tempArr = [];
  }

  let noOfTries = 0;
  let correctTries = 0;


  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  const checkLetter = (letter, missingIndex, word,i) => {
    const audio = new Audio(`/Audio/${letter}.mp3`); 
    audio.play();
    noOfTries++;
    console.log(word);
    console.log(noOfTries,word,letter,word[missingIndex])
    if (letter === word[missingIndex]) {
      document.getElementById(`rbutton${i}`).textContent = word;
      correctTries++;
      console.log(correctTries)
      if (correctTries === 5) {
        setNextButtonVisible(true);
      }
      return true;
    }
    return false;
  };

  const leftButtons = [];
  let singleAlphabet = [];


  for(let i = 0; i < 5; i++) {
    for(let j = 0;j<3;j++){
      singleAlphabet.push(alphabetArr[i][0][j]);
    }
  }

  for (let i = 0; i < 15; i++) {
    const letter = singleAlphabet[i];
    const correctWord = wordArr[parseInt(i/3)];
    leftButtons.push(
      <button key={i} className="btn btn-primary" onClick={() => checkLetter(letter, 0, correctWord,i/3)}>
        {letter}
      </button>
    );
  }

  const rightButtons = [];
  let underWord = [];
  for(let i = 0;i<5; i++){
    underWord.push(wordArr[i].replace(wordArr[i][0], "_"));
  }
  for (let i = 0; i < 5; i++) {
    rightButtons.push(<button key={i} id={`rbutton${i}`} className="btn btn-dark">{underWord[i]}</button>);
  }

  return (
    <div className="grid-container mt-5">

      <div className="left-buttons">
        {leftButtons}
      </div>
      <div className="right-buttons">
        {rightButtons}
      </div>
      {nextButtonVisible && <button className="btn btn-success">Next</button>}
    </div>
  );
};

export default MissingLetterGame;
