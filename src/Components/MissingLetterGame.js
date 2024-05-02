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
  }, []);

  const checkLetter = (letter, missingIndex, word, i) => {
    const audio = new Audio(`/Audio/${letter}.mp3`);
    audio.play();
    noOfTries++;
    console.log(noOfTries, word, letter, word[missingIndex]);
    if (letter === word[missingIndex]) {
      const newW = [...w];
      newW[i] = word;
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const newCorrectTries = prevCorrectTries + 1;
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
    leftButtons.push(
      <button key={i} className="btn btn-primary" onClick={() => checkLetter(letter, 0, correctWord, parseInt(i / 3))}>
        {letter}
      </button>
    );
  }

  const rightButtons = w.map((word, i) => (
    <button key={i} id={`rbutton${i}`} className="btn btn-dark">{word}</button>
  ));

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
}
