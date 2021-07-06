import React, { FunctionComponent } from 'react';
import './burger.css';

interface NewBurgerProps {
  cb: () => void;
}

export const Burger: FunctionComponent<NewBurgerProps> = ({ cb }): JSX.Element => {
  return (
    <div className="menu-button" onClick = {cb}>
    <div className="cross1"></div>
    <div className="cross2"></div>
    <div className="cross3"></div>
    <div className="cross4"></div>
  </div>
  );
};
