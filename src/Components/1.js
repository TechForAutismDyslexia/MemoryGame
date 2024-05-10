import { useState, useEffect } from 'react';
import React from 'react';
import wordsData from '../words.json';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function MissingLetterGame() {
  const { index } = useParams();
  const level2Data = wordsData['words'];
  const [w, setW] = useState([]);

  let wordArr = [], alphabetArr = [], tempArr = [];
  const leftButtons = [];
  let singleAlphabet = [];
  for (let j in level2Data[index]) {
    wordArr.push(j);
    tempArr.push(level2Data[index][j]);
    alphabetArr.push(tempArr);
    tempArr = [];
  }

  let noOfTries = 0;

  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [correctTries, setCorrectTries] = useState(0);

  useEffect(() => {
    let underWord = [];
    for (let i = 0; i < 5; i++) {
      underWord.push(wordArr[i].replace(wordArr[i][0], "_"));
    }
    setW(underWord);
  }, [index]);

  const checkLetter = (letter, missingIndex, word, index,i) => {
    const audio = new Audio(`/Audio/${letter}.mp3`);
    audio.play();
    noOfTries++;
    console.log(noOfTries, word, letter, word[missingIndex]);
    if (letter === word[missingIndex]) {
      const newW = [...w];
      newW[index] = word;
      document.getElementById(i).style.backgroundColor = "#14fc03";
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const newCorrectTries = prevCorrectTries + 1;
        console.log(newCorrectTries)
        if (newCorrectTries === 5) {
          setNextButtonVisible(true);
        }
        return newCorrectTries;
      });
      return true;
    } 
    return false;
  };

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
        <button key={i} id={i} className="btn letter-button mt-3" onClick={() => checkLetter(letter, 0, correctWord, parseInt(i / 3),i)}>
          {letter}
        </button>
      );
    }
    else{
      leftButtons.push(
        <button key={i} id={i} className="btn letter-button" onClick={() => checkLetter(letter, 0, correctWord, parseInt(i / 3),i)}>
          {letter}
        </button>
      );
    }
    
  }

  const rightButtons = w.map((word, i) => (
    <button key={i} id={`rbutton${i}`} className="btn btn-lg word-button">{word}</button>
  ));

  return (
    <div>
    <div className="grid-container mt-2">
      <div className="left-buttons">
        {leftButtons}
      </div>
      <div className="right-buttons">
        {rightButtons}
      </div>
      
    </div>
    <div className='nextButton mt-5'>
      {nextButtonVisible && <Link type="button" to={`/${parseInt(index)+1}`} className="btn btn-success next-button ">Next</Link>}
    </div>
    </div>
  );
}
