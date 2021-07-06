import React, { useContext, useState } from 'react';
import AppModeContext from '../../context';
import './mode-controll.css';

function ModeControll() {
  const { appMode, setAppMode } = useContext(AppModeContext);
  const [mode, setMode] = useState("game-mode");
  const changeMode = () => {
    if (!appMode) {
      setAppMode(true);
      setMode("game-mode play");
    } else {
      setAppMode(false);
      setMode("game-mode");
    }
  };
  return (
    <div className={mode} onClick={changeMode}>
      <div className="play-mode-title">Play</div>
      <div className="train-mode-title">Train</div>
      <input className="checkbox" type="checkbox"/>
      <div className="mode-controller"></div>
    </div>
  );
}

export default ModeControll;