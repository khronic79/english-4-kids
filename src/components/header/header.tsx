import React from 'react';
import ModeControll from '../mode-controll/mode-controll';
import Navigation from '../navigation/navigation';
import './header.css';

function Header() {
  return (
    <header className="header">
      <Navigation />
      <ModeControll />
    </header>
  );
}

export default Header;