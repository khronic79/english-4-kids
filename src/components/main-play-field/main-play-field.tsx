import { useContext, useEffect, useState } from 'react';
import cards from '../../cards';
import AppModeContext from '../../context';
import { Card } from '../card/card';
import { StartRepeatButton } from '../start-repeat-button/start-repeat-button';
import { CardData } from '../../interfaces';
import { Stars } from '../stars/stars';
import './main-play-field.css';
import { mixArray } from '../../shared/mix-array';
import { playAudio } from '../../shared/play-audio';
import { Redirect } from 'react-router-dom';

export function MainPlayField({category}: any) {

  const { appMode } = useContext(AppModeContext);

  const [isGameStarted, setIsGameStarted] = useState(0);

  const [currentWord, setcurrentWord] = useState([] as boolean[]);

  const [mixedWords, mixWords] = useState([] as CardData[]);

  const [gameResult, setGameResult] = useState('');

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isGameStarted === 1) {
      setIsGameStarted(0);
    }
    setcurrentWord([]);
  }, [appMode, category]);

  useEffect(() => {
    if (index < 8) {
      if (isGameStarted === 1) {
      (async function() {
        if (currentWord[currentWord.length - 1]) {
          playAudio('/english-4-kids/audio/correct.mp3');
          await setTimeout(()=>{
            playAudio('/english-4-kids/' + mixedWords[index].audioSrc);
          }, 1000);
        } else {
            playAudio('/english-4-kids/audio/error.mp3');
        }
      })();
      }
    } else {
      console.log('What happend: ', currentWord);
      let check = currentWord.every((elem) => {
        if (elem) return true 
        else return false;
      });
      if (check) setGameResult('success');
      else setGameResult('failure');
      (async function() {
        await setTimeout(()=>{
          setIsGameStarted(2);
        }, 1000);
      })();
    }
  }, [currentWord]);

  const cardsArr = (cards.slice(1)) as unknown as CardData[][];
  const cardsData = cardsArr[category];
  useEffect(() => {
    let cardsDataMix = mixArray(cardsData);
    mixWords(cardsDataMix);
  }, [category]);
  
  const cardsComponentArr = cardsData.map((card, i) => {
    return (
      <Card 
        key={i}
        card={card} 
        isGameStarted={isGameStarted} 
        cardsDataMix={mixedWords} 
        currentWord={currentWord} 
        setcurrentWord={setcurrentWord}
        index={index}
        setIndex={setIndex}
        category={category}
      />
    );
  });

  return (
    <main className="game-section">
      <div className="place-for-stars"><Stars currentWord={currentWord}/></div>
      <div className="cards-game-container">
        {cardsComponentArr}
      </div>
      <StartRepeatButton 
        isGameStarted={isGameStarted} 
        startGame={setIsGameStarted} 
        currentWord={currentWord} 
        cardsDataMix={mixedWords}
        index={index}
      />
      { isGameStarted === 2 ? <Redirect to={"/gameover/" + gameResult} />: '' }
    </main>
  );
}