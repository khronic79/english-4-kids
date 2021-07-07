import React, { useState } from 'react';
import BlackLayer from '../black-layer/black-layer';
import { Burger } from '../burger/burger';
import Menu from '../menu/menu';
import './navigation.css';

function Navigation() {
  const [cName, changeClass] = useState("menu");
  const openCloseNavigation = (): void => {
    if (cName === "menu") {
      changeClass("menu open");
    } else {
      changeClass("menu");
    }
  }

  return (
    <nav className={cName}>
      <Burger cb={openCloseNavigation} />
      <BlackLayer />
      <Menu cb={openCloseNavigation}/>
    </nav>
  );
}

export default Navigation;