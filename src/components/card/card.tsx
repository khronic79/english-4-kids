import { Dispatch, useContext, useEffect, useState } from 'react';
import AppModeContext from '../../context';
import { CardData } from '../../interfaces';
import { playAudio } from '../../shared/play-audio';
import './card.css';

interface CardProps {
  card: CardData
  isGameStarted: number;
  cardsDataMix: CardData[];
  currentWord: boolean[];
  setcurrentWord: Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
  setIndex: Dispatch<React.SetStateAction<number>>;
  category: string;
}

interface LoccalStorageData {
  [word: string]: {
    [train: string]: number;
  }
}

export function Card({card, isGameStarted, cardsDataMix, currentWord, setcurrentWord, index, setIndex, category}: CardProps) {

  const { appMode } = useContext(AppModeContext);

  const [isFlipped, setIsFlipped] = useState(false);

  const [clickedStyle, setClickStyle] = useState('not-clicked');

  let cardStyle = "card-container";

  useEffect(() => {
    setClickStyle('not-clicked');
  }, [appMode, category]);

  const setStyles = () => {
    if (isFlipped) {
      cardStyle = cardStyle + ' flipped';
    } else {
      cardStyle = cardStyle.replace(' flipped', '');
    }
    if (appMode) {
      cardStyle = cardStyle + ' play';
    } else {
      cardStyle = cardStyle.replace(' play', '');
    }
    return cardStyle;
  };

  const clickHandler = () => {
    if (clickedStyle === 'not-clicked visible') return;
    if (isGameStarted === 1) {
      if (cardsDataMix[index].word === card.word) {
        setIndex(index + 1);
        currentWord.push(true);
        addDataToLocalStorage(category, card.word, 'success');
        let newArr = currentWord.slice(0);
        setcurrentWord(newArr);
        setClickStyle('not-clicked visible');
      } else {
        currentWord.push(false);
        addDataToLocalStorage(category, cardsDataMix[index].word, 'error');
        let newArr = currentWord.slice(0);
        setcurrentWord(newArr);
      }
    } else if (isGameStarted === 0) {
      if(!appMode) {
        addDataToLocalStorage(category, card.word, 'train');
        playAudio('/english-4-kids/' + card.audioSrc);
      }
    }
  }

  const addDataToLocalStorage = (category: string, word: string, param: string) => {
    if (localStorage.getItem(category)) { 
      let data = (JSON.parse(localStorage.getItem(category) as string)) as LoccalStorageData;
      if (data[word]){
        data[word][param] += 1;
        localStorage.setItem(category, JSON.stringify(data));
      } else {
        data[word] = {
          'train': 0,
          'error': 0,
          'success': 0
        }
        data[word][param] += 1;
        localStorage.setItem(category, JSON.stringify(data));
      }
    } else {
      let data: LoccalStorageData = {
        [word]: {
          "train": 0,
          "error": 0,
          "success": 0,
        }
      };
      data[word][param] += 1;
      localStorage.setItem(category, JSON.stringify(data));
    }
  }
  
  return (
    <div className={setStyles()} onClick={() => clickHandler()}  onMouseLeave={() => setIsFlipped(false)}>
      <div className="card" >  
        <div className="card-front">
          <div className="card-img-wrapper">
            <div className={clickedStyle}></div>
            <img src={"/english-4-kids/" + card.image} alt="Action-set-a" />
            <div className="card-name"><span>{card.word}</span></div>
            <div className="rotate-controller" onClick={() => setIsFlipped(true)}></div>
          </div>
        </div>
        <div className="card-back">
          <div className="card-img-wrapper">
            <img src={"/english-4-kids/" + card.image} alt="Action-set-a" />
            <div className="card-name"><span>{card.translation}</span></div>
          </div>
        </div>
      </div>
  </div>
  );
}