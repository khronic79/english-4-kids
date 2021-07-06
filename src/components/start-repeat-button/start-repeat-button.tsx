import { Dispatch, SetStateAction } from 'react';
import { CardData } from '../../interfaces';
import { playAudio } from '../../shared/play-audio';
import './start-repeat-button.css';

interface  StartGameFunction{
  appMode: boolean
  isGameStarted: number;
  startGame: Dispatch<SetStateAction<number>>;
  currentWord: boolean[];
  cardsDataMix: CardData[];
  index: number;
}

export const StartRepeatButton = ({appMode, isGameStarted, startGame, currentWord, cardsDataMix, index}: StartGameFunction): JSX.Element => {

  const startHandler = () => {
    if (isGameStarted === 0) {
      startGame(1);
      playAudio('/english-4-kids/' + cardsDataMix[0].audioSrc);
    } else if(isGameStarted === 1) {
      playAudio('/english-4-kids/' + cardsDataMix[index].audioSrc);
    }
  };

  const changeButtonName = () => {
    if (isGameStarted === 0) return 'start-repeat-button';
    if (isGameStarted === 1) return 'start-repeat-button game';
  };

  const thisButtonVisibility = () => {
    if (!appMode) {
      return 'button-visibility';
    }
    return '';
  }

  return (
    <div className={thisButtonVisibility()}>
      <div className={changeButtonName()} onClick={() => {startHandler()}}>
        <div className="start-button"><div>Start</div></div>
        <div className="repeat-button"></div>
      </div>
    </div>
  );
}